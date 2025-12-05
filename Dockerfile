# ------------------------
# 1) Dependencies + pnpm
# ------------------------
FROM node:22.18.0-slim AS deps
ENV PNPM_HOME="/pnpm" \
    PNPM_STORE_DIR="/pnpm-store" \
    NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@10.19.0 --activate \
    && mkdir -p /pnpm /pnpm-store

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./
RUN pnpm fetch


# ------------------------
# 2) Builder (Next.js)
# ------------------------
FROM node:22.18.0-slim AS builder
ENV PNPM_HOME="/pnpm" \
    PNPM_STORE_DIR="/pnpm-store" \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.19.0 --activate \
    && mkdir -p /pnpm /pnpm-store

COPY --from=deps /pnpm-store /pnpm-store
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./
RUN pnpm install --frozen-lockfile --prefer-offline

COPY . .

RUN mkdir -p .next/cache && chmod -R 777 .next
RUN pnpm build


# ------------------------
# 3) Runner (PM2 + smallest)
# ------------------------
FROM node:22.18.0-slim AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001 \
    HOSTNAME=0.0.0.0

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends curl procps \
    && npm i -g pm2 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY ecosystem.config.js .

RUN mkdir -p .next/cache && chmod -R 777 .next

USER node

EXPOSE 3001

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
