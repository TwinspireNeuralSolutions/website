#!/usr/bin/env python3
"""
Batch uploader for TwinSpire website upload API.

Usage example:
python scripts/upload_batch.py --team-id 3edc1602-9397-418f-a04d-f10e7cf7171c --max-files 1 --exclude-substring 16-01
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import sys
import time
import uuid
from dataclasses import dataclass
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any
from urllib import error, request


ALLOWED_EXTENSIONS = {".csv", ".xlsx"}


@dataclass
class UploadTarget:
    path: Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Batch upload files to website API")
    parser.add_argument(
        "--folder",
        default=r"E:\TwinSpire\tmp\unique_raw_files_statssports",
        help="Root folder to scan recursively",
    )
    parser.add_argument(
        "--url",
        default="http://localhost:3000/api/upload",
        help="Upload API endpoint",
    )
    parser.add_argument("--team-id", required=True, help="Team UUID for upload")
    parser.add_argument(
        "--device",
        default="statssports",
        help="Device name sent to API (default: statssports)",
    )
    parser.add_argument(
        "--measure-date",
        default=date.today().isoformat(),
        help="Measure date sent for all files in YYYY-MM-DD (default: today)",
    )
    parser.add_argument(
        "--wait-sec",
        type=int,
        default=30,
        help="Seconds to wait between uploads",
    )
    parser.add_argument(
        "--max-files",
        type=int,
        default=0,
        help="Maximum files to upload (0 means all)",
    )
    parser.add_argument(
        "--exclude-substring",
        default="",
        help="Skip files whose name contains this substring (case-insensitive)",
    )
    parser.add_argument(
        "--report",
        default="",
        help="JSON report output path (default: upload_batch_report_<timestamp>.json)",
    )
    return parser.parse_args()


def discover_targets(folder: Path, exclude_substring: str) -> list[UploadTarget]:
    if not folder.exists() or not folder.is_dir():
        raise FileNotFoundError(f"Folder does not exist or is not a directory: {folder}")

    exclude = exclude_substring.lower().strip()
    targets: list[UploadTarget] = []
    for item in folder.rglob("*"):
        if not item.is_file():
            continue
        if item.suffix.lower() not in ALLOWED_EXTENSIONS:
            continue
        if exclude and exclude in item.name.lower():
            continue
        targets.append(UploadTarget(path=item))
    targets.sort(key=lambda x: str(x.path).lower())
    return targets


def build_multipart(file_name: str, file_bytes: bytes, fields: dict[str, str]) -> tuple[bytes, str]:
    boundary = f"----TwinSpireBoundary{uuid.uuid4().hex}"
    line_break = b"\r\n"
    body = bytearray()

    for key, value in fields.items():
        body.extend(f"--{boundary}".encode("utf-8"))
        body.extend(line_break)
        body.extend(f'Content-Disposition: form-data; name="{key}"'.encode("utf-8"))
        body.extend(line_break)
        body.extend(line_break)
        body.extend(value.encode("utf-8"))
        body.extend(line_break)

    content_type = mimetypes.guess_type(file_name)[0] or "application/octet-stream"
    body.extend(f"--{boundary}".encode("utf-8"))
    body.extend(line_break)
    body.extend(
        f'Content-Disposition: form-data; name="file"; filename="{file_name}"'.encode(
            "utf-8"
        )
    )
    body.extend(line_break)
    body.extend(f"Content-Type: {content_type}".encode("utf-8"))
    body.extend(line_break)
    body.extend(line_break)
    body.extend(file_bytes)
    body.extend(line_break)

    body.extend(f"--{boundary}--".encode("utf-8"))
    body.extend(line_break)
    return bytes(body), boundary


def parse_json_or_text(raw_text: str) -> Any:
    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        return raw_text


def upload_file(
    url: str,
    target: UploadTarget,
    team_id: str,
    device: str,
    measure_date: str,
) -> dict[str, Any]:
    started = datetime.now(timezone.utc)
    file_bytes = target.path.read_bytes()
    fields = {
        "teamId": team_id,
        "measureDate": measure_date,
        "deviceName": device,
    }
    payload, boundary = build_multipart(target.path.name, file_bytes, fields)

    req = request.Request(url=url, data=payload, method="POST")
    req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")
    req.add_header("Accept", "application/json")

    http_status: int | None = None
    response_body: Any = None
    response_error: str | None = None
    success = False

    try:
        with request.urlopen(req, timeout=120) as resp:
            http_status = int(resp.status)
            raw = resp.read().decode("utf-8", errors="replace")
            response_body = parse_json_or_text(raw)
            if isinstance(response_body, dict):
                success = bool(response_body.get("success")) and http_status < 400
            else:
                success = http_status < 400
    except error.HTTPError as http_err:
        http_status = int(http_err.code)
        raw = http_err.read().decode("utf-8", errors="replace")
        response_body = parse_json_or_text(raw)
        response_error = f"HTTPError {http_err.code}"
    except Exception as exc:  # noqa: BLE001
        response_error = str(exc)

    ended = datetime.now(timezone.utc)
    duration = (ended - started).total_seconds()

    return {
        "filePath": str(target.path),
        "fileName": target.path.name,
        "measureDate": measure_date,
        "bytes": len(file_bytes),
        "startedAt": started.isoformat(),
        "endedAt": ended.isoformat(),
        "durationSec": duration,
        "success": success,
        "status": "success" if success else "error",
        "httpStatus": http_status,
        "response": response_body,
        "error": response_error,
    }


def main() -> int:
    args = parse_args()
    try:
        date.fromisoformat(args.measure_date)
    except ValueError:
        print("--measure-date must be in YYYY-MM-DD format", file=sys.stderr)
        return 1

    folder = Path(args.folder)
    targets = discover_targets(folder, args.exclude_substring)

    if args.max_files and args.max_files > 0:
        targets = targets[: args.max_files]

    if not targets:
        print("No eligible files found to upload.", file=sys.stderr)
        return 1

    started = datetime.now(timezone.utc)
    print(f"Discovered {len(targets)} file(s). Starting uploads to {args.url}")

    results: list[dict[str, Any]] = []
    total = len(targets)

    for idx, target in enumerate(targets, start=1):
        print(f"[{idx}/{total}] Uploading: {target.path} (measureDate={args.measure_date})")
        result = upload_file(
            args.url, target, args.team_id, args.device, args.measure_date
        )
        results.append(result)

        outcome = "OK" if result["success"] else "FAILED"
        print(
            f"[{idx}/{total}] {outcome} status={result['httpStatus']} "
            f"duration={result['durationSec']:.2f}s"
        )

        if idx < total and args.wait_sec > 0:
            print(f"Waiting {args.wait_sec}s before next upload...")
            time.sleep(args.wait_sec)

    ended = datetime.now(timezone.utc)
    success_count = sum(1 for item in results if item["success"])
    failure_count = len(results) - success_count

    report = {
        "startedAt": started.isoformat(),
        "endedAt": ended.isoformat(),
        "durationSec": (ended - started).total_seconds(),
        "url": args.url,
        "folder": str(folder),
        "teamId": args.team_id,
        "deviceName": args.device,
        "measureDate": args.measure_date,
        "waitSec": args.wait_sec,
        "maxFiles": args.max_files,
        "excludeSubstring": args.exclude_substring,
        "attempted": len(results),
        "succeeded": success_count,
        "failed": failure_count,
        "results": results,
    }

    report_path = (
        Path(args.report)
        if args.report
        else Path.cwd() / f"upload_batch_report_{started.strftime('%Y%m%d_%H%M%S')}.json"
    )
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(f"Completed uploads. success={success_count} failed={failure_count}")
    print(f"Report written: {report_path}")
    return 0 if success_count == len(results) else 2


if __name__ == "__main__":
    raise SystemExit(main())
