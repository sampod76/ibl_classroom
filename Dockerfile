# ---- 1) Base deps with pnpm (Node 22.18.0) ----
FROM node:22.18.0-slim AS deps
ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    PNPM_HOME=/pnpm \
    PNPM_STORE_DIR=/pnpm-store
WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@10.19.0 --activate \
    && mkdir -p "$PNPM_HOME" "$PNPM_STORE_DIR"

# Copy lockfiles for reproducible installs
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./

# Prefetch dependencies into the global pnpm store
RUN pnpm fetch



# ---- 2) Builder: install (+prefer-offline) + build Next.js standalone ----
FROM node:22.18.0-slim AS builder
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PNPM_HOME=/pnpm \
    PNPM_STORE_DIR=/pnpm-store
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.19.0 --activate \
    && mkdir -p "$PNPM_HOME" "$PNPM_STORE_DIR"

COPY --from=deps /pnpm-store /pnpm-store
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./

# Install dependencies using the fetched store
RUN pnpm install --frozen-lockfile --prefer-offline

# ------------------------------------------------------------------
# ✅ FIX: Prevent Next.js build error: EACCES .next/cache permission
# ------------------------------------------------------------------
RUN mkdir -p /app/.next/cache && chmod -R 777 /app/.next

# Copy application source code
COPY . .

# Build in standalone mode (requires output: "standalone" in next.config.js)
RUN pnpm build



# ---- 3) Runner: PM2-managed, minimal, non-root ----
FROM node:22.18.0-slim AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001 \
    HOSTNAME=0.0.0.0

# Install curl + PM2
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && npm i -g pm2 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy standalone Next.js server + minimal node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY ecosystem.config.js ./ecosystem.config.js

# Deploy script + entry script with permissions
COPY --chown=node:node deploy_client.sh ./deploy_client.sh
RUN chmod +x ./deploy_client.sh

COPY --chown=node:node docker-entry.sh ./docker-entry.sh
RUN chmod +x ./docker-entry.sh

# Drop to non-root user
USER node

EXPOSE 3001

ENTRYPOINT ["/app/docker-entry.sh"]
