#!/usr/bin/env python3
"""Submit URLs to Google's Indexing API to nudge Google to crawl them.

The Indexing API is officially supported only for JobPosting and
BroadcastEvent pages. In practice, many sites use it as a general
"please crawl this URL now" signal and report it works at low volume,
though Google does not guarantee anything for non-JobPosting content.
Use it on the highest-priority unindexed pages, not as a permanent
crawl strategy. The right long-term fix is internal linking,
inbound links, and time.

Prerequisites
-------------
1. The `indexing.googleapis.com` API must be enabled in your GCP project.
   Run once: gcloud services enable indexing.googleapis.com
2. Your ADC must include the `https://www.googleapis.com/auth/indexing`
   scope. Re-auth if needed:

       gcloud auth application-default login \\
           --scopes=https://www.googleapis.com/auth/cloud-platform,\\
   https://www.googleapis.com/auth/webmasters.readonly,\\
   https://www.googleapis.com/auth/userinfo.email,\\
   https://www.googleapis.com/auth/indexing

3. The Google account behind your ADC must be a **verified owner** of
   the site in Search Console (not just a "user"). The Indexing API
   refuses URLs from non-owners with a 403.

Usage
-----
Submit the default priority list (all currently unindexed posts):
    python3 scripts/index-batch.py

Submit specific URLs:
    python3 scripts/index-batch.py https://www.sunfm.fitness/training/deadlift-setup-for-over-30

Submit from a file (one URL per line):
    python3 scripts/index-batch.py --file urls.txt

Notify Google of a removal:
    python3 scripts/index-batch.py --remove https://www.sunfm.fitness/old-page

Daily quota is 200 publish calls. The script stops at 180 to leave
headroom for retries.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
from urllib.error import HTTPError
from urllib.request import Request, urlopen

QUOTA_PROJECT = "focal-elf-497403-c0"
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
DAILY_QUOTA_SAFE = 180  # API limit is 200; leave headroom

# Curated default list — pages that were unindexed in the May 24 audit.
# Update this list as pages get indexed (or just delete entries after
# Google has crawled them).
DEFAULT_PRIORITY_URLS = [
    "https://www.sunfm.fitness/training/strength-training-for-longevity-beginners-guide-over-30",
    "https://www.sunfm.fitness/training/functional-movement-exercises-for-desk-workers",
    "https://www.sunfm.fitness/training/deadlift-setup-for-over-30",
    "https://www.sunfm.fitness/training/knee-pain-when-sitting-at-a-desk",
    "https://www.sunfm.fitness/training/neck-pain-when-sitting-at-a-desk",
    "https://www.sunfm.fitness/training/how-often-should-you-strength-train-after-30",
    "https://www.sunfm.fitness/training/what-to-do-on-rest-days-strength-training",
    "https://www.sunfm.fitness/training/how-to-warm-up-before-lifting",
    "https://www.sunfm.fitness/training/how-to-return-to-strength-training-after-a-break",
    "https://www.sunfm.fitness/training/when-to-take-a-deload-week",
    "https://www.sunfm.fitness/training/ankle-mobility-test-at-home",
    "https://www.sunfm.fitness/training/hamstring-flexibility-test-at-home",
    "https://www.sunfm.fitness/training/shoulder-mobility-test-at-home",
    "https://www.sunfm.fitness/nutrition/meal-prep-for-busy-professionals",
]


def get_access_token() -> str:
    result = subprocess.run(
        ["gcloud", "auth", "application-default", "print-access-token"],
        capture_output=True,
        text=True,
        timeout=15,
    )
    if result.returncode != 0 or not result.stdout.strip():
        sys.stderr.write(
            "Failed to get an access token. Run:\n"
            "  gcloud auth application-default login --scopes=...indexing\n"
        )
        sys.exit(1)
    return result.stdout.strip()


def notify(url: str, type_: str, token: str) -> tuple[int, str]:
    payload = json.dumps({"url": url, "type": type_}).encode()
    req = Request(
        ENDPOINT,
        data=payload,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Goog-User-Project": QUOTA_PROJECT,
        },
        method="POST",
    )
    try:
        resp = urlopen(req, timeout=30).read().decode()
        return 200, resp
    except HTTPError as e:
        return e.code, e.read().decode()[:400]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument(
        "urls",
        nargs="*",
        help="URLs to submit (positional). If omitted, uses the default priority list.",
    )
    parser.add_argument("--file", help="File with one URL per line.")
    parser.add_argument(
        "--remove",
        action="store_true",
        help="Notify Google of a URL deletion instead of an update.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be submitted without calling the API.",
    )
    args = parser.parse_args()

    if args.file:
        with open(args.file) as f:
            urls = [line.strip() for line in f if line.strip() and not line.startswith("#")]
    elif args.urls:
        urls = args.urls
    else:
        urls = list(DEFAULT_PRIORITY_URLS)

    if not urls:
        print("No URLs to submit.")
        return 0

    if len(urls) > DAILY_QUOTA_SAFE:
        print(
            f"Refusing to submit {len(urls)} URLs (daily safe cap is {DAILY_QUOTA_SAFE}). "
            f"Slice the list or run across multiple days.",
            file=sys.stderr,
        )
        return 1

    notification_type = "URL_DELETED" if args.remove else "URL_UPDATED"

    if args.dry_run:
        print(f"Would submit {len(urls)} URLs as {notification_type}:")
        for u in urls:
            print(f"  {u}")
        return 0

    token = get_access_token()

    successes = 0
    failures = []
    for i, url in enumerate(urls, 1):
        code, body = notify(url, notification_type, token)
        if code == 200:
            successes += 1
            print(f"  [{i}/{len(urls)}] OK   {url}")
        else:
            failures.append((url, code, body))
            print(f"  [{i}/{len(urls)}] FAIL ({code}) {url}")
            print(f"      {body[:200]}", file=sys.stderr)
        # Polite spacing; the publish endpoint can rate-limit aggressive bursts
        if i < len(urls):
            time.sleep(0.5)

    print()
    print(f"Done. {successes}/{len(urls)} succeeded.")
    if failures:
        print(f"{len(failures)} failed. First failure body above.")
        # Most common failure: 403 because the auth identity isn't a verified
        # GSC owner. Tell the user.
        if any(code == 403 for _, code, _ in failures):
            print(
                "\nHint: 403 usually means the Google account behind your ADC "
                "isn't a verified Search Console *owner* for sunfm.fitness. "
                "Add it as Owner in GSC > Settings > Users and permissions.",
                file=sys.stderr,
            )
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
