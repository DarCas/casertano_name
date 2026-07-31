# Build frontend (Next.js static export)
FROM node:22-alpine AS frontend-builder

WORKDIR /app

COPY www/. .
RUN unlink .env.local

RUN npm install && npm run build

# Build API
FROM node:22-alpine AS api-builder

WORKDIR /app

COPY api/. ./

RUN npm install

RUN sh ./@bin/build && npm prune --omit=dev

# Production
FROM node:22-alpine

RUN apk add --no-cache bash nano libwebp-tools file

WORKDIR /app

COPY --from=frontend-builder /app/out ./www

COPY --from=api-builder /app/node_modules ./api/node_modules
COPY --from=api-builder /app/package-lock.json /app/package.json ./api/
COPY --from=api-builder /app/dist ./api/src

COPY optimize-images.sh ./api/optimize-images.sh
