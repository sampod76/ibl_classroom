#!/usr/bin/env bash
set -Eeuo pipefail

log() { echo -e "\n\033[1;32m$1\033[0m"; }

APP_DIR="/home/sampod/apps/ibl_classroom"
IMAGE_TAR="$APP_DIR/ibl_classroom.tar.gz"

log "📦 Loading new Docker image..."
docker load -i "$IMAGE_TAR"

log "🚀 Restarting Docker Compose service..."
cd "$APP_DIR"

# Use SERVICE NAME, not container name
docker compose up -d --force-recreate client_classroom

log "🧹 Cleaning TAR..."
rm -f "$IMAGE_TAR"

log "✅ Deployment completed successfully!"




# #!/usr/bin/env bash
# set -Eeuo pipefail

# # Simple logger
# log() {
#   echo -e "\n\033[1;32m$1\033[0m"
# }

# # ========= Config =========
# APP_DIR="/home/sampod/apps/ibl_classroom"
# BRANCH="main"
# COPY_ENV=true                     # .env.production -> .env.local

# cd "$APP_DIR"

# # 1.3) Stronger pull (avoids merge/lock issues)
# log "[1/4] Pull latest from origin/$BRANCH (fetch + hard reset)…"
# git fetch --all --prune
# git checkout -f "$BRANCH" || git switch -f "$BRANCH"
# git reset --hard "origin/$BRANCH"
# git pull

# # 2) env copy (if exists)
# if [ "${COPY_ENV}" = "true" ]; then
#   if [ -f ".env.production" ]; then
#     cp -f .env.production .env.local
#     log "Copied .env.production -> .env.local"
#   else
#     log "No .env.production found (skipping COPY_ENV)"
#   fi
# fi

# # 4) Build & Up (no deps if আপনি শুধু একটাই সার্ভিস rebuild করতে চান)
# log "[3/4] Building and updating containers…"

# # Default safe deploy (recommended)
# docker compose up -d --build --remove-orphans 

# # Hard deploy (optional) — force recreate, but keeping your comment untouched
# # docker compose up -d --build --remove-orphans --force-recreate

# log "✅ Deployment completed successfully!"
# # 
# # docker compose up -d --build --force-recreate   use dicrea eco but not remove any comment
