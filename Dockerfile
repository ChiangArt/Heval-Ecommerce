# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# API_URL por defecto para evitar errores en build
ARG API_URL=http://localhost:8080
ENV NEXT_PUBLIC_API_URL=$API_URL

RUN npm run build

# Stage 2: runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN npm ci --production

EXPOSE 3000
CMD ["npm", "start"]
