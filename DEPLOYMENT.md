# Nihongo Learning - Deployment Guide

This document provides comprehensive deployment instructions for both development and production environments.

---

## Table of Contents

1. [Development with Dev Container](#development-with-dev-container)
2. [Production Deployment](#production-deployment)
3. [Environment Variables](#environment-variables)
4. [Port Configuration](#port-configuration)
5. [Troubleshooting](#troubleshooting)

---

## Development with Dev Container

### Prerequisites

- [VS Code](https://code.visualstudio.com/) installed
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running

### Quick Start

1. **Open the project in VS Code:**
   ```bash
   code /path/to/nihongo_learning
   ```

2. **Open in Dev Container:**
   - Click the green "><>" icon in the bottom-left corner of VS Code
   - Select "Reopen in Container"
   - Or use Command Palette (Ctrl+Shift+P) and type "Remote-Containers: Reopen in Container"

3. **VS Code will automatically:**
   - Build the Docker image
   - Install all dependencies (`npm install`)
   - Start the development server (`npm run dev`)
   - Forward port 5173 to your local machine

4. **Access the application:**
   - VS Code will prompt to open the browser
   - Or manually open: http://localhost:5173

### Manual Docker Commands

If you want to run the dev container manually without VS Code:

```bash
# Build and start the dev container
cd /path/to/nihongo_learning
docker-compose -f .devcontainer/docker-compose.yml -f .devcontainer/docker-compose.dev.yml up -d

# View logs
docker-compose -f .devcontainer/docker-compose.yml logs -f

# Stop the container
docker-compose -f .devcontainer/docker-compose.yml down

# Rebuild the container
docker-compose -f .devcontainer/docker-compose.yml build --no-cache
```

### Hot Reload

- **Automatic:** Changes to source files are automatically detected and the app reloads
- **Polling mode:** Enabled via `CHOKIDAR_USEPOLLING=true` for Docker compatibility
- **Works for:** TypeScript, CSS, HTML, and all source files

### Dev Container Features

- **Node.js 20 LTS** - Stable, modern JavaScript runtime
- **Non-root user** - Avoids permission issues with mounted volumes
- **VS Code Extensions** - Pre-configured with recommended extensions
- **Git** - Installed for version control operations
- **Port Forwarding** - Port 5173 forwarded to host
- **TypeScript Support** - Full TypeScript language server support

---

## Production Deployment

### Prerequisites

- Docker installed
- Docker Compose installed
- (Optional) Nginx for reverse proxy (recommended for production)

### Quick Start with Docker Compose

```bash
# Build the production image and start the container
cd /path/to/nihongo_learning
docker-compose -f docker-compose.prod.yml up -d --build

# View the running application
# Open http://localhost:80 in your browser

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop the application
docker-compose -f docker-compose.prod.yml down
```

### Build and Run Manually

```bash
# Step 1: Build the production Docker image
docker build -t nihongo-learning:production .

# Step 2: Run the container
docker run -d \
  --name nihongo-learning \
  -p 80:80 \
  -p 8080:80 \
  --restart unless-stopped \
  -e NODE_ENV=production \
  nihongo-learning:production

# Step 3: Access the application at http://localhost:80
```

### Production Image Details

| Aspect | Detail |
|--------|--------|
| **Base Image** | node:20-alpine (Alpine Linux for minimal size) |
| **Build Type** | Multi-stage build (builder + production) |
| **Final Image Size** | ~150MB (with Alpine) |
| **User** | Non-root user (nodejs:1001) for security |
| **Port** | 80 (configurable) |
| **Health Check** | HTTP endpoint check every 30 seconds |

### Multi-Stage Build Breakdown

1. **Builder Stage (`node:20-bookworm`):**
   - Installs all dependencies (including devDependencies)
   - Runs `npm run build` to create optimized production assets
   - Builds in `/app/dist`

2. **Production Stage (`node:20-alpine`):**
   - Copies only the built files from the builder stage
   - Installs only production dependencies (`--only=production`)
   - Uses a non-root user for security
   - Runs a simple HTTP server (`npx serve`) to serve the static files

---

## Environment Variables

### Development Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Node.js environment mode |
| `CHOKIDAR_USEPOLLING` | true | Enable file watching polling (required for Docker) |
| `VITE_APP_ENV` | development | Application environment |

### Production Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | production | Node.js environment mode |
| `VITE_APP_ENV` | production | Application environment |
| `PORT` | 80 | Port the app listens on inside the container |

### Custom Environment Variables

Create a `.env` file in the project root for custom configuration:

```bash
# .env
VITE_APP_API_URL=https://api.example.com
VITE_APP_BASE_URL=/app
```

These will be embedded in the build at compile time by Vite.

---

## Port Configuration

### Development Ports

| Port | Service | Description |
|------|---------|-------------|
| 5173 | Vite Dev Server | Default Vite development server port |

### Production Ports

| Port | Service | Description |
|------|---------|-------------|
| 80 | HTTP | Primary production port |
| 8080 | HTTP | Alternative production port (mapped to 80) |
| 443 | HTTPS | Nginx HTTPS port (when using nginx profile) |

### Changing Ports

**For Development:**

Edit `.devcontainer/docker-compose.dev.yml`:
```yaml
ports:
  - "NEW_PORT:5173"
```

**For Production:**

Edit `Dockerfile` (change the EXPOSE line):
```dockerfile
EXPOSE 8080
```

And update `docker-compose.prod.yml`:
```yaml
ports:
  - "8080:8080"
```

---

## Deployment Recommendations

### Cloud Providers

#### AWS ECS

```bash
# Build and push to ECR
docker build -t nihongo-learning:production .
aws ecr get-login-password | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com
docker tag nihongo-learning:production ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/nihongo-learning:production
docker push ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/nihongo-learning:production
```

#### Google Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/nihongo-learning:production .

# Deploy to Cloud Run
gcloud run deploy nihongo-learning \
  --image gcr.io/PROJECT_ID/nihongo-learning:production \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80
```

#### Azure Container Instances

```bash
# Build and push to ACR
az acr build --registry MYREGISTRY --image nihongo-learning:production .

# Deploy to ACI
az container create \
  --resource-group MYGROUP \
  --name nihongo-learning \
  --image MYREGISTRY.azurecr.io/nihongo-learning:production \
  --cpu 1 \
  --memory 1 \
  --ports 80 \
  --dns-name-label nihongo-learning \
  --restart-policy Always
```

### Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nihongo-learning
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nihongo-learning
  template:
    metadata:
      labels:
        app: nihongo-learning
    spec:
      containers:
      - name: nihongo-learning
        image: nihongo-learning:production
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: "100m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: nihongo-learning
spec:
  selector:
    app: nihongo-learning
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

### Server Deployment (Bare Metal / VM)

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Clone the repository
git clone https://github.com/your-repo/nihongo_learning.git
cd nihongo_learning

# Build and run
docker-compose -f docker-compose.prod.yml up -d --build

# Set up as a systemd service for auto-restart
cat > /etc/systemd/system/nihongo-learning.service << 'EOF'
[Unit]
Description=Nihongo Learning Application
After=docker.service
Requires=docker.service

[Service]
WorkingDirectory=/path/to/nihongo_learning
ExecStart=/usr/bin/docker-compose -f docker-compose.prod.yml up
ExecStop=/usr/bin/docker-compose -f docker-compose.prod.yml down
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable nihongo-learning.service
sudo systemctl start nihongo-learning.service
```

---

## Security Best Practices

1. **Use HTTPS:** Always use HTTPS in production. Use Nginx with SSL certificates or a CDN like Cloudflare.

2. **Keep Dependencies Updated:**
   ```bash
   npm audit
   npm update
   ```

3. **Image Scanning:**
   ```bash
   # Using Docker Scout (Docker Desktop)
docker scout quickview nihongo-learning:production
   
   # Using Trivy
   docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image nihongo-learning:production
   ```

4. **Non-Root User:** The production Dockerfile already uses a non-root user for security.

5. **Read-Only Filesystem:** The production compose file has `read_only: true` for additional security.

---

## Performance Optimization

### Docker Build Cache

To speed up builds, use Docker's build cache:
```bash
# Rebuild with cache
docker build -t nihongo-learning:production .

# Force clean build (no cache)
docker build --no-cache -t nihongo-learning:production .
```

### Multi-Stage Build Benefits

- **Smaller Image:** Final image only contains production dependencies and built files
- **Better Security:** No devDependencies or build tools in production
- **Faster Deployment:** Smaller images deploy faster

### Caching Strategy

The Nginx configuration includes:
- **Gzip compression** for all text-based assets
- **1-year cache** for static assets (JS, CSS, images)
- **1-hour cache** for HTML files (to allow updates)

---

## Monitoring

### Container Logs

```bash
# View logs
docker logs nihongo-learning-app

# Follow logs
docker logs -f nihongo-learning-app

# View last 100 lines
docker logs --tail 100 nihongo-learning-app
```

### Health Check

The production container includes a health check:
```bash
# View health status
docker inspect --format='{{json .State.Health}}' nihongo-learning-app
```

### Metrics

For production monitoring, consider adding:
- Prometheus + Grafana for metrics
- ELK Stack for logging
- Sentry for error tracking

---

## Backup and Restore

Since the application uses localStorage, data is stored in the user's browser. For server-side persistence (if you add a backend):

```bash
# Database backup (if using a database)
docker exec CONTAINER_NAME pg_dump -U USER DB_NAME > backup.sql

# Database restore
docker exec -i CONTAINER_NAME psql -U USER DB_NAME < backup.sql
```

---

## Troubleshooting

### Common Issues

#### Dev Container: Permission Denied

**Symptom:** Files created in the container have wrong permissions on the host.

**Solution:** The Dev Container Dockerfile already creates a user with UID 1000. If you need a different UID:

```bash
# Rebuild with your UID/GID
docker-compose -f .devcontainer/docker-compose.yml build --build-arg USER_UID=$(id -u) --build-arg USER_GID=$(id -g)
```

#### Hot Reload Not Working

**Symptom:** Changes to files don't trigger a reload.

**Solutions:**
1. Ensure `CHOKIDAR_USEPOLLING=true` is set
2. Check that the volume mount is correct
3. Restart the dev container

#### Production: White Screen

**Symptom:** Application loads but shows a white screen.

**Solutions:**
1. Check browser console for errors (F12)
2. Ensure the build completed successfully
3. Verify the `dist` folder exists and has files
4. Check that the `base` URL in Vite config matches your deployment

#### Port Already in Use

**Symptom:** Cannot start container because port is in use.

**Solutions:**
```bash
# Find and kill the process
sudo lsof -i :5173
kill -9 PID

# Or use a different port
# Edit the port mapping in docker-compose file
```

#### Docker Build Fails

**Symptom:** Build fails with dependency errors.

**Solutions:**
1. Delete `node_modules` and `package-lock.json`, then rebuild
2. Clear Docker cache: `docker system prune -a`
3. Check Node.js version compatibility

---

## Updates

### Updating Dependencies

```bash
# In development container
npm update

# Or manually
npm install package@latest

# Rebuild production image
docker-compose -f docker-compose.prod.yml build --no-cache
```

### Updating the Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## Support

For issues with this deployment guide:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the Docker logs
3. Ensure all prerequisites are installed
4. Check the application's GitHub issues

---

*Last updated: 2024*
