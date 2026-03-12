# Pre-Upload Pseudoanonymization (Website)

## Purpose
This module intercepts file uploads in the website backend before writing to GCS and replaces player identity values with `tns_player_id` when a mapping exists.

It is implemented for:
- `statssports`

The integration is non-invasive to pipeline processors: upload still goes to the same bucket/path shape and existing ingest services keep running.

## Where Interception Happens
Upload entrypoint:
- `app/api/upload/route.ts` (`POST /api/upload`)

Pseudoanonymization module:
- `lib/pseudoanonymization/preUploadPseudo.ts`

The route calls `preUploadPseudoanonymize(...)` after reading the uploaded file buffer and before `blob.save(...)`.

## End-to-End Flow
1. Client submits `file`, `teamId`, `measureDate`, `deviceName` to `POST /api/upload`.
2. Route validates file type/size/date.
3. Route resolves folder team key with `resolveTeamFolderKey(...)`:
   - if input `teamId` is UUID, it resolves `team_key` from `ref.ref_team`
   - GCS path uses `team_id=<team_key>` when available (for example `DK1LYN`)
4. For `statssports`, route attempts pre-upload pseudoanonymization.
5. Module resolves `tns_team_id` and loads team-scoped player maps from `ref.ref_player`.
6. Module transforms file content in memory:
   - mapped rows: identity field replaced with `tns_player_id`
   - unmapped rows: kept unchanged
7. Route uploads transformed bytes to GCS.
8. Route sets pseudo metadata on object when pseudo succeeds.
9. If unmapped rows exist (or technical fallback happens), route publishes alert payload to Pub/Sub topic `pseudoanonymization-unmapped`.

## GCS Write Path
Current path format:

`source=<deviceName>/measure_date=<YYYY-MM-DD>/team_id=<teamFolderKey>/file=<timestamp-random>-<sanitizedOriginalName>`

Notes:
- `teamFolderKey` is resolved from `teamId` using `ref.ref_team`.
- This path naming is independent from row-level pseudo mapping.

## Mapping Data Sources
Team resolution table:
- `REF_TEAM_TABLE` (default: `twinspire-neural-solutions.ref.ref_team`)

Player mapping table:
- `REF_PLAYER_TABLE` (default: `twinspire-neural-solutions.ref.ref_player`)

Team resolution supports these lookup columns when present:
- `team_key`
- `teamId`
- `team_id`
- `external_team_id`
- `source_team_id`

Player map columns are discovered dynamically from schema:
- Required: `tns_player_id`, `tns_team_id`
- Optional identity columns:
  - display/name: `player_display_name`, `player_name`, `name`
  - `whoop_player_id`
  - `statssports_playerExtId` or `statssports_player_ext_id`

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

What is not replaced:
- team ID/team key fields
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
- `pseudo_source` (`statssports`)
- `pseudo_mode` (`preupload`)

If pseudo technically fails, these pseudo marker keys are not set.

## Alerting
Pub/Sub topic:
- `PSEUDO_UNMAPPED_TOPIC` or default
- `projects/<GCP_PROJECT_ID>/topics/pseudoanonymization-unmapped`

Published on:
- unmapped rows (`rowsUnmapped > 0`)
- technical fallback

Payload contains:
- source, bucket, object name, generation
- team identifiers
- row counters
- unmapped samples (top 5)

## Environment Variables
Required:
- `GCP_PROJECT_ID`
- `GCP_CLIENT_EMAIL`
- `GCP_PRIVATE_KEY`
- `GCP_BUCKET_NAME`

Optional:
- `REF_PLAYER_TABLE`
- `REF_TEAM_TABLE`
- `PSEUDO_VERSION`
- `PSEUDO_UNMAPPED_TOPIC`

Frontend note:
- dashboard currently sends `teamId` from `NEXT_PUBLIC_TEAM_ID`

## Logging
Route logs:
- `[upload][team_folder_resolved]`
- `[upload][request_received]`
- `[upload][preupload_pseudo_success]`
- `[upload][preupload_pseudo_fallback]`
- `[upload][gcs_upload_complete]`
- notifier publish attempt/success/failure
- `[upload][request_completed]`

Pseudo module logs:
- `[pseudo][start]`
- `[pseudo][team_resolved]`
- `[pseudo][player_maps_ready]`
- `[pseudo][transform_complete]`

## Verification Checklist
1. Upload a StatsSports file through website.
2. Confirm object path includes expected `team_id=<team key>`.
3. Confirm object metadata has pseudo keys.
4. Download object and verify mapped rows are UUID-like `tns_player_id`.
5. Verify unmapped rows stayed unchanged.
6. Confirm notifier events for unmapped or technical fallback.

## Current Known Limits
1. Fully blank CSV rows are preserved by serializer and may still be ingested as mostly-null rows downstream.
2. Matching is exact-normalized; no fuzzy matching.
3. Only first worksheet is transformed for Excel.
4. Module use in this flow is for `statssports`.
