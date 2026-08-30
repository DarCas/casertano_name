FROM node:22-alpine AS build

WORKDIR /opt/app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --omit=dev

FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /opt/app

COPY --from=build /opt/app/package.json ./
COPY --from=build /opt/app/tsconfig.json ./
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist

EXPOSE 1337

CMD ["npm", "run", "start"]
