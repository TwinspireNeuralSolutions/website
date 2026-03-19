# Pseudoanonymization Procedure

## Purpose
This procedure pseudoanonymizes uploads in the website backend before writing to GCS.

It is implemented for:
- `statssports`
- `vald`

Current architecture:
- pseudoanonymization is done in the website upload API only (pre-upload, in-memory transform)
- pipeline keeps only the alert notifier service
- there is no standalone pseudoanonymization processor in `Pipeline`

## Where Interception Happens
Upload entrypoint:
- `app/api/upload/route.ts` (`POST /api/upload`)

Pseudoanonymization module:
- `lib/pseudoanonymization/preUploadPseudo.ts`

The route calls `preUploadPseudoanonymize(...)` after reading the uploaded file buffer and before `blob.save(...)`.

## Firestore Connection (Current)
Lookup backend is Firestore only.

Database resolution (no env file changes required):
- `PSEUDO_FIRESTORE_DB`
- `FIRESTORE_DATABASE`
- `NEXT_PUBLIC_FIREBASE_DB_NAME`
- fallback: `twinspire`

Collection resolution:
- Team collection: `REF_TEAM_COLLECTION` -> `REF_TEAM_TABLE` -> `ref.ref_team`
- Player collection: `REF_PLAYER_COLLECTION` -> `REF_PLAYER_TABLE` -> `ref.ref_player`

Compatibility behavior:
- if `REF_*_TABLE` is passed as full FQN (for example `project.ref.ref_team`), the code normalizes it to Firestore collection id (`ref.ref_team`).
- BigQuery fallback is disabled.

## End-to-End Flow
1. Client submits `file`, `teamId`, `measureDate`, `deviceName` to `POST /api/upload`.
2. Route validates file type/size/date.
3. Route resolves team identity with `resolveTeamFolderKey(...)`:
   - if `teamId` is UUID, it is treated as `tns_team_id` directly
   - if `teamId` is not UUID, it is looked up in `ref.ref_team` and resolved to `tns_team_id`
   - when `tns_team_id` is resolvable, GCS path uses `team_id=<tns_team_id>`
   - when unresolved or ambiguous, upload falls back to `team_id=<input teamId>` and emits an alert (`reason=team_lookup_unresolved` or `team_lookup_ambiguous`)
4. For `statssports` and `vald`, route attempts pre-upload pseudoanonymization.
5. Module resolves `tns_team_id` and loads team-scoped player maps from `ref.ref_player`.
6. Module transforms file content in memory:
   - mapped rows: identity field replaced with `tns_player_id`
   - unmapped rows: kept unchanged
   - for `statssports` only: detected team column values are replaced with `tns_team_id` when resolvable
7. Route uploads transformed bytes to GCS.
8. Route sets pseudo metadata on object when pseudo succeeds.
9. If unmapped rows exist (or technical fallback happens, or team resolution is unresolved), route publishes alert payload to Pub/Sub topic `pseudoanonymization-unmapped`.

## GCS Write Path
Current path format:

`source=<deviceName>/measure_date=<YYYY-MM-DD>/team_id=<pathTeamId>/file=<timestamp-random>-<sanitizedOriginalName>`

Notes:
- `pathTeamId` is `tns_team_id` when resolvable, otherwise original input `teamId`.
- Path behavior applies to all devices handled by the upload route.

## Mapping Data Sources
Firestore collections:
- Team aliases: `ref.ref_team`
- Player mappings: `ref.ref_player`

Team alias match order:
1. exact `doc id` or exact `tns_team_id`
2. exact `team_key` or `app_profile_id`
3. normalized exact alias (`doc id`, `tns_team_id`, `team_key`, `team_display_name`, `app_profile_id`)

Collision handling:
- if one input resolves to multiple `tns_team_id`, result is `ambiguous` and no auto-selection is made.

## Mapping Precedence
Per row identity resolution:
1. normalized display name exact match
2. `whoop_player_id`
3. `statssports_playerExtId`

Normalization for name matching:
- remove BOM
- trim
- lowercase
- collapse internal whitespace

## Source File Handling
Supported extensions:
- `.csv`
- `.xls`
- `.xlsx`

### CSV
- delimiter auto-detected from `,`, `;`, `tab`
- custom parser + serializer
- identity field updated in-place

### Excel
- first worksheet is used
- header row is auto-detected
  - StatsSports favors `playerDisplayName`/`playerName`
- identity cell updated in-place in worksheet

## Column Rewrite Behavior
What is replaced:
- player display/name field (`playerDisplayName`, `playerName`, `name`)
- `statssports` team field when detected (`teamId`, `team_id`, `external_team_id`, `source_team_id`) and `tns_team_id` is resolvable

What is not replaced:
- source IDs are preserved unless they are the selected identity display/name column
- unmapped rows are left unchanged

## Failure and Fallback Semantics
### Row-level unmapped
- Row remains unchanged.
- Processing continues.
- `rowsUnmapped` increments.
- top 5 unmapped samples captured for alert payload.

### Technical pseudo failure
- Upload does not fail.
- Original file is uploaded unchanged (fail-open behavior).
- Alert is published with `technicalFallback=true`.

## Object Metadata on Success
When pseudo succeeds, object metadata includes:
- `pseudoanonymized_version` (from `PSEUDO_VERSION`, default `v1`)
- `pseudoanonymized_at` (ISO timestamp)
- `pseudo_source` (`statssports` or `vald`)
- `pseudo_mode` (`preupload`)

If pseudo technically fails, these pseudo marker keys are not set.

## Alerting
Pub/Sub topic:
- `PSEUDO_UNMAPPED_TOPIC` or default
- `projects/<GCP_PROJECT_ID>/topics/pseudoanonymization-unmapped`

Published on:
- unmapped rows (`rowsUnmapped > 0`)
- technical fallback
- unresolved/ambiguous team mapping (`reason=team_lookup_unresolved` or `team_lookup_ambiguous`)

Payload contains:
- source, bucket, object name, generation
- team identifiers
- row counters
- team rewrite counters (`teamColumnDetected`, `teamCellsUpdated`)
- unmapped samples (top 5)

## Environment Variables
Required:
- `GCP_PROJECT_ID`
- `GCP_CLIENT_EMAIL`
- `GCP_PRIVATE_KEY`
- `GCP_BUCKET_NAME`

Optional:
- `REF_PLAYER_COLLECTION`
- `REF_TEAM_COLLECTION`
- `REF_PLAYER_TABLE`
- `REF_TEAM_TABLE`
- `PSEUDO_FIRESTORE_DB`
- `FIRESTORE_DATABASE`
- `NEXT_PUBLIC_FIREBASE_DB_NAME`
- `PSEUDO_VERSION`
- `PSEUDO_UNMAPPED_TOPIC`

Frontend note:
- dashboard currently sends `teamId` from `NEXT_PUBLIC_TEAM_ID`

## Logging
Route logs:
- `[upload][team_resolution_completed]`
- `[upload][team_resolution_error]`
- `[upload][request_received]`
- `[upload][preupload_pseudo_success]`
- `[upload][preupload_pseudo_fallback]`
- `[upload][gcs_upload_complete]`
- notifier publish attempt/success/failure
- `[upload][request_completed]`

Pseudo module logs:
- `[pseudo][lookup_config_resolved]`
- `[pseudo][team_lookup_start]`
- `[pseudo][team_lookup_result]`
- `[pseudo][player_map_load_result]`
- `[pseudo][transform_summary]`
- `[pseudo][lookup_error]`

## Verification Checklist
1. Upload a StatsSports file through website.
2. Confirm object path includes expected `team_id=<tns_team_id>` when team resolves.
3. Confirm unresolved team uploads fall back to `team_id=<input teamId>` and emit Slack alert.
4. Confirm object metadata has pseudo keys.
5. Download object and verify mapped rows are UUID-like `tns_player_id`.
6. For StatsSports, verify detected team field values are `tns_team_id`.
7. Verify unmapped rows stayed unchanged.
8. Confirm notifier events for unmapped, technical fallback, or unresolved team mapping.

## Current Known Limits
1. Fully blank CSV rows are preserved by serializer and may still be ingested as mostly-null rows downstream.
2. Matching is exact-normalized; no fuzzy matching.
3. Only first worksheet is transformed for Excel.
4. Team-field rewrite is currently limited to `statssports` files.
