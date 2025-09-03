# web/Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm i --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# --- ARGS/ENVS que vienen del compose ---
ARG USE_DOCKER_REWRITE
ARG API_INTERNAL_URL
ARG NEXT_PUBLIC_API_BASE_URL

# Exponerlos como ENV para que Next los lea en build
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV USE_DOCKER_REWRITE=$USE_DOCKER_REWRITE
ENV API_INTERNAL_URL=$API_INTERNAL_URL
# 
RUN npm install -g pnpm
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm i --prod --frozen-lockfile
EXPOSE 3000
CMD ["pnpm", "start"]