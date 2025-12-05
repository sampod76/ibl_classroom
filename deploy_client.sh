#!/usr/bin/env bash
set -Eeuo pipefail
# ========= Config =========
APP_DIR="/home/sampod/apps/ibl_classroom"
BRANCH="main"
COPY_ENV=true                     # .env.production -> .env.local
cd "$APP_DIR"
# 1.3) Stronger pull (avoids merge/lock issues)
log "[1/4] Pull latest from origin/$BRANCH (fetch + hard reset)…"
git fetch --all --prune
git checkout -f "$BRANCH" || git switch -f "$BRANCH"
git reset --hard "origin/$BRANCH"
git pull

# 2) env copy (if exists)
if [ "${COPY_ENV}" = "true" ]; then
  if [ -f ".env.production" ]; then
    cp -f .env.production .env.local
    log "Copied .env.production -> .env.local"
  else
    log "No .env.production found (skipping COPY_ENV)"
  fi
fi

# 4) Build & Up (no deps if আপনি শুধু একটাই সার্ভিস rebuild করতে চান)
log "[3/4] Building and updating containers…"
docker compose up -d --build --remove-orphans 
# docker compose up -d --build --remove-orphans --force-recreate

log "✅ Deployment completed successfully!"
# 
# docker compose up -d --build --force-recreate
