#!/usr/bin/env bash
set -Eeuo pipefail

# ========= Config =========
APP_DIR="/home/sampod/apps/ibl_classroom"
BRANCH="main"
SERVICE="client"                  # docker compose service name
PROJECT_NAME="ibl_classroom"   # optional
COPY_ENV=true                     # .env.production -> .env.local
RELOAD_NGINX=false                # set true if you really want to reload

# ========= Better trap (show failing command) =========
trap 'code=$?; echo "❌ Failed at line $LINENO: $BASH_COMMAND (exit $code)" >&2; exit $code' ERR

log()  { printf "%s %s\n" "$(date '+%F %T')" "$*"; }
fail() { echo "❌ $*" >&2; exit 1; }

# ========= Docker Compose binary detect =========
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  DC="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  DC="docker-compose"
else
  fail "docker compose/docker-compose not found"
fi

# ========= Start =========
log "=============================="
log "🚀 Starting client Deployment"
log "=============================="

# 0) SSH/Git sanity (avoid host key prompt + ensure config used)
mkdir -p ~/.ssh
chmod 700 ~/.ssh
# Make sure github.com host key is known (idempotent)
ssh-keygen -F github.com >/dev/null || ssh-keyscan -H github.com >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

# 1) Go to app dir
[ -d "$APP_DIR" ] || fail "APP_DIR not found: $APP_DIR"
cd "$APP_DIR"

# 1.1) Mark safe worktree (if different user/CI)
git config --global --add safe.directory "$APP_DIR" || true

# 1.2) Show current remote (helps debug wrong host alias)
log "Git remote:"
git remote -v || true

# 1.3) Stronger pull (avoids merge/lock issues)
log "[1/4] Pull latest from origin/$BRANCH (fetch + hard reset)…"
git fetch --all --prune
git checkout -f "$BRANCH" || git switch -f "$BRANCH"
git reset --hard "origin/$BRANCH"

# 2) env copy (if exists)
if [ "${COPY_ENV}" = "true" ]; then
  if [ -f ".env.production" ]; then
    cp -f .env.production .env.local
    log "Copied .env.production -> .env.local"
  else
    log "No .env.production found (skipping COPY_ENV)"
  fi
fi

# 3) Validate compose & service
log "[2/4] Validating docker compose config…"
$DC --project-name "$PROJECT_NAME" config >/dev/null

if ! $DC --project-name "$PROJECT_NAME" config --services | grep -qx "$SERVICE"; then
  log "Available services:"
  $DC --project-name "$PROJECT_NAME" config --services || true
  fail "Service \"$SERVICE\" not found in compose config"
fi

# 4) Build & Up (no deps if আপনি শুধু একটাই সার্ভিস rebuild করতে চান)
log "[3/4] Building and updating containers…"
$DC --project-name "$PROJECT_NAME" up -d --build --no-deps "$SERVICE"


# Optional: Health wait (simple curl if your app exposes a port)
# sleep 5
# curl -f http://localhost:3000/health || fail "Healthcheck failed"

# 5) Nginx reload (optional)
if [ "${RELOAD_NGINX}" = "true" ]; then
  log "[4/4] Reloading nginx…"
  if command -v systemctl >/dev/null 2>&1; then
    sudo nginx -t && sudo systemctl reload nginx
  else
    sudo nginx -t && sudo nginx -s reload
  fi
else
  log "[4/4] Skipping nginx reload (RELOAD_NGINX=false)"
fi

log "✅ Deployment completed successfully!"
