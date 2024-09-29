FROM node:21.1.0-alpine as deps

COPY package*.json ./

RUN npm ci

FROM node:21.1.0-alpine as builder

COPY . .
COPY --from=deps /node_modules ./node_modules

RUN npm run build

FROM node:21.1.0-alpine as runner

COPY --from=builder /next.config.mjs ./
COPY --from=builder /public ./public
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /.next ./.next

EXPOSE 80

CMD ["node_modules/.bin/next", "start", "-p", "80" ]