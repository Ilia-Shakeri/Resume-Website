#!/bin/sh
# Pull the latest built site from the `site` branch and publish it to ./site.
# Run by iliashakeri-update.timer every two minutes; does nothing when the
# branch hasn't changed. GitHub Actions builds and pushes that branch, so this
# server never needs Node.js, npm, or inbound SSH from GitHub.
set -eu

BASE=${BASE:-/opt/iliashakeri}
REPO_URL=${REPO_URL:-https://github.com/Ilia-Shakeri/Resume-Website.git}
BRANCH=${BRANCH:-site}
REPO="$BASE/repo"
SITE="$BASE/site"
STATE="$BASE/.deployed"

# One run at a time; a slow fetch must not overlap the next timer tick.
exec 9>"$BASE/.update.lock"
flock -n 9 || exit 0

if [ ! -d "$REPO/.git" ]; then
    git clone --quiet --depth 1 --single-branch --branch "$BRANCH" "$REPO_URL" "$REPO"
fi

git -C "$REPO" fetch --quiet --depth 1 origin "$BRANCH"
new=$(git -C "$REPO" rev-parse FETCH_HEAD)
current=$(cat "$STATE" 2>/dev/null || true)
[ "$new" = "$current" ] && exit 0

git -C "$REPO" reset --quiet --hard FETCH_HEAD
test -s "$REPO/index.html" || { echo "refusing to publish: index.html missing in $new" >&2; exit 1; }

# Old /_next/static chunks are kept (P = protect from --delete) so a page still
# cached by a browser or ArvanCloud never references a missing file.
mkdir -p "$SITE"
rsync -a --delete --delay-updates --exclude=.git --filter='P /_next/static/**' "$REPO/" "$SITE/"
echo "$new" > "$STATE"

# The branch is force-pushed on every build; drop the previous build's objects.
git -C "$REPO" reflog expire --expire=now --all
git -C "$REPO" gc --quiet --prune=now

echo "published $new"
