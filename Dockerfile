# =========================
# STAGE 1: BUILD
# =========================
FROM node:20-alpine AS builder
WORKDIR /app

# Variable de entorno para el build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copiar dependencias y lock
COPY package*.json ./
RUN npm ci --production=false
COPY . .

# Build de Next.js
RUN npm run build

# =========================
# STAGE 2: RUNTIME
# =========================
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Usuario no-root
RUN addgroup -S app && adduser -S app -G app

# Copiar artefactos necesarios
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Instalar deps de producción
RUN npm ci --production=true

USER app
EXPOSE 3000
CMD ["npm", "start"]
