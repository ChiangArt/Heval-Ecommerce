# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# copia package y lock para aprovechar cache
COPY package*.json ./
RUN npm ci --production=false
COPY . .
# crea build
RUN npm run build




# Stage 2: runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# crea usuario no-root por seguridad
RUN addgroup -S app && adduser -S app -G app

# copia artefactos necesarios
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json  
# instala sólo deps de producción
RUN npm ci --production=true

USER app
EXPOSE 3000
CMD ["npm", "start"]

