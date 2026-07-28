# Build frontend (Next.js static export)
FROM node:22-alpine AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

COPY .env.build .env

RUN npm run build

# Build API
FROM node:22-alpine AS api-builder

WORKDIR /app

COPY --from=frontend-builder /app/out ./out
COPY api/package.json api/package-lock.json* ./api/

RUN npm install --prefix api

COPY api/ ./api/

RUN npm run build --prefix api && npm prune --omit=dev --prefix api

# Production
FROM node:22-alpine

WORKDIR /app

COPY --from=api-builder /app/out ./out
COPY --from=api-builder /app/api/dist ./dist
COPY --from=api-builder /app/api/node_modules ./node_modules
