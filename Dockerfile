# Production Dockerfile for Nihongo Learning
# Multi-stage build for minimal image size

# ============================================
# STAGE 1: Builder
# ============================================
FROM node:20-bookworm AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# ============================================
# STAGE 2: Production
# ============================================
FROM node:20-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/index.html ./

# Install only production dependencies
RUN npm ci --only=production

# Switch to non-root user
USER nodejs

# Expose the production port (default 80, but can be overridden)
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start the server using a simple HTTP server
CMD ["npx", "serve", "-s", "dist", "-l", "80"]
