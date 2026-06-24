# #hotel-management-gateway

# ---------- Build stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build TypeScript
RUN npm run build


# ---------- Production stage ----------
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy build output
COPY --from=builder /app/dist ./dist

# If needed: copy static files / config
# COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]