# Dev Container Dockerfile for Nihongo Learning
# Uses Node.js LTS with the built-in 'node' user (UID 1000, GID 1000)

FROM node:20-bookworm

# Install git while still root
RUN apt-get update && apt-get install -y --no-install-recommends git

# Create app directory owned by node user
RUN mkdir -p /app && \
    chown node:node /app

WORKDIR /app

# Copy all source files
# node_modules is in .dockerignore, so it won't be in the build context
COPY . .

# Ensure node user has write access
RUN chown -R node:node /app

# Switch to node user
USER node
WORKDIR /app

# Ensure node_modules/.bin is in PATH for npm scripts
ENV PATH="/app/node_modules/.bin:$PATH"

# Expose the development server port
EXPOSE 5173

# Keep container running - dev server starts via postStartCommand
CMD ["sleep", "infinity"]
