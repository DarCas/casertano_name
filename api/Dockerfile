# Build frontend (Next.js static export)
FROM node:22-alpine AS frontend-builder
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_NAME
ARG NEXT_PUBLIC_VAT
ARG NEXT_PUBLIC_SOCIAL_LINKEDIN
ARG NEXT_PUBLIC_SOCIAL_GITHUB
ARG NEXT_PUBLIC_SOCIAL_TELEGRAM
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_NAME=$NEXT_PUBLIC_NAME
ENV NEXT_PUBLIC_VAT=$NEXT_PUBLIC_VAT
ENV NEXT_PUBLIC_SOCIAL_LINKEDIN=$NEXT_PUBLIC_SOCIAL_LINKEDIN
ENV NEXT_PUBLIC_SOCIAL_GITHUB=$NEXT_PUBLIC_SOCIAL_GITHUB
ENV NEXT_PUBLIC_SOCIAL_TELEGRAM=$NEXT_PUBLIC_SOCIAL_TELEGRAM
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Build API
FROM node:22-alpine AS api-builder
WORKDIR /app
COPY --from=frontend-builder /app/out ./out
COPY api/package.json api/package-lock.json* ./api/
RUN npm install --prefix api
COPY api/ ./api/
RUN npm run build --prefix api

# Production
FROM node:22-alpine
WORKDIR /app
COPY --from=api-builder /app/out ./out
COPY --from=api-builder /app/api/dist ./dist
COPY --from=api-builder /app/api/node_modules ./node_modules
ENV PORT=3008
CMD ["node", "dist/index.js"]
