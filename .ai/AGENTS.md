# Docker Best Practices Guide

This document outlines Docker best practices and standards for creating production-ready Dockerfiles and Docker Compose configurations.

## Table of Contents

1. [Image Version Pinning](#image-version-pinning)
2. [Base Image Selection](#base-image-selection)
3. [Multi-Stage Builds](#multi-stage-builds)
4. [Non-Root User](#non-root-user)
5. [Layer Caching Optimization](#layer-caching-optimization)
6. [Security Best Practices](#security-best-practices)
7. [Docker Compose Best Practices](#docker-compose-best-practices)
8. [.dockerignore Best Practices](#dockerignore-best-practices)
9. [Common Mistakes to Avoid](#common-mistakes-to-avoid)

---

## Image Version Pinning

### ✅ DO: Pin Exact Versions

Always pin exact versions of base images and dependencies to ensure reproducible builds.

```dockerfile
# ✅ GOOD - Pinned exact version
ARG NODE_VERSION=24.11.1-alpine
ARG NGINX_VERSION=1.27.3-alpine3.22
FROM node:${NODE_VERSION} AS builder
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner

# ❌ BAD - Using latest or floating tags
FROM node:latest
FROM node:24-alpine
FROM nginx:alpine
```

**Why?**

- Prevents unexpected breaking changes
- Ensures consistent builds across environments
- Makes security updates intentional and traceable
- Improves build reproducibility

---

## Base Image Selection

### ✅ DO: Use Alpine or Slim Variants

Prefer Alpine Linux or Debian Slim variants for smaller image sizes and reduced attack surface.

```dockerfile
# ✅ GOOD - Alpine variant (smallest, ~5MB base)
FROM node:24.11.1-alpine

# ✅ GOOD - Slim variant (Debian-based, ~70MB base)
FROM node:24.11.1-slim

# ❌ BAD - Full image (Debian-based, ~300MB+ base)
FROM node:24.11.1
```

**Why?**

- Smaller image size = faster pulls and deployments
- Fewer packages = reduced attack surface
- Lower resource consumption
- Alpine uses musl libc (may have compatibility considerations)

**When to use Alpine:**

- Most Node.js applications
- Static file serving
- Microservices

**When to use Slim:**

- Applications requiring glibc compatibility
- Applications with native dependencies that don't work with musl

---

## Multi-Stage Builds

### ✅ DO: Use Multi-Stage Builds

Separate build dependencies from runtime dependencies to minimize final image size.

```dockerfile
# ✅ GOOD - Multi-stage build
# Stage 1: Build
FROM node:24.11.1-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:24.11.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
RUN npm ci --only=production
USER node
CMD ["node", "server.js"]

# ❌ BAD - Single stage with all dependencies
FROM node:24.11.1-alpine
WORKDIR /app
COPY . .
RUN npm install  # Includes devDependencies
RUN npm run build
CMD ["node", "server.js"]
```

**Benefits:**

- Final image only contains runtime dependencies
- Significantly smaller image size
- Better security (no build tools in production)
- Faster deployments

**Best Practices:**

- Name stages descriptively (`builder`, `runner`, `test`)
- Copy only necessary artifacts between stages
- Use `--from=<stage>` to reference previous stages

---

## Non-Root User

### ✅ DO: Run as Non-Root User

Always run containers as a non-root user to minimize security risks.

```dockerfile
# ✅ GOOD - Using built-in non-root user
FROM node:24.11.1-alpine
WORKDIR /app
COPY --chown=node:node . .
USER node
CMD ["node", "server.js"]

# ✅ GOOD - Creating custom non-root user
FROM node:24.11.1-alpine
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
WORKDIR /app
COPY --chown=nodejs:nodejs . .
USER nodejs
CMD ["node", "server.js"]

# ✅ GOOD - Using official non-root images
FROM nginxinc/nginx-unprivileged:1.27.3-alpine3.22
COPY --chown=nginx:nginx . /usr/share/nginx/html
USER nginx

# ❌ BAD - Running as root
FROM node:24.11.1-alpine
WORKDIR /app
COPY . .
# No USER directive = runs as root
CMD ["node", "server.js"]
```

**Why?**

- Principle of least privilege
- Reduces impact of container escape vulnerabilities
- Required by many security scanners and policies
- Best practice for production deployments

**Implementation Tips:**

- Use `--chown` flag when copying files
- Set ownership before switching users
- Use fixed UIDs/GIDs for consistency
- Prefer official non-root images when available

---

## Layer Caching Optimization

### ✅ DO: Optimize Layer Ordering

Order Dockerfile instructions from least to most frequently changing.

```dockerfile
# ✅ GOOD - Optimal layer ordering
FROM node:24.11.1-alpine AS builder
WORKDIR /app

# 1. Copy dependency files first (changes infrequently)
COPY package.json package-lock.json ./

# 2. Install dependencies (cached unless package files change)
RUN --mount=type=cache,target=/root/.npm npm ci

# 3. Copy source code last (changes frequently)
COPY . .

# 4. Build application
RUN npm run build

# ❌ BAD - Poor layer ordering
FROM node:24.11.1-alpine
WORKDIR /app
COPY . .  # Changes frequently, invalidates cache
RUN npm install  # Re-runs every time
RUN npm run build
```

**Best Practices:**

- Copy dependency manifests (`package.json`, `package-lock.json`) before source code
- Use `npm ci` instead of `npm install` for reproducible installs
- Leverage BuildKit cache mounts: `--mount=type=cache,target=/root/.npm`
- Combine related RUN commands to reduce layers
- Use `.dockerignore` to exclude unnecessary files

---

## Security Best Practices

### 1. Minimize Attack Surface

```dockerfile
# ✅ Remove unnecessary packages
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    python3 \
    make && \
    npm install && \
    apk del .build-deps  # Remove build dependencies
```

### 2. Use Specific COPY Instead of Wildcards

```dockerfile
# ✅ GOOD - Explicit files
COPY package.json package-lock.json ./

# ❌ BAD - Wildcards can include unexpected files
COPY * ./
```

### 3. Set Environment Variables Securely

```dockerfile
# ✅ GOOD - Use ARG for build-time, ENV for runtime
ARG BUILD_VERSION
ENV NODE_ENV=production
ENV APP_VERSION=${BUILD_VERSION}

# ❌ BAD - Don't hardcode secrets
ENV API_KEY=secret123
```

### 4. Scan Images Regularly

- Use `docker scout` or `trivy` to scan for vulnerabilities
- Update base images regularly
- Pin versions to control when updates happen

### 5. Use Secrets Management

```dockerfile
# ✅ GOOD - Use Docker secrets or environment variables
# Don't commit secrets to Dockerfile
RUN --mount=type=secret,id=api_key \
    API_KEY=$(cat /run/secrets/api_key) npm run build
```

---

## Docker Compose Best Practices

### ✅ DO: Follow These Practices

```yaml
# ✅ GOOD - Proper compose.yaml structure
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_VERSION: 24.11.1-alpine
    image: myapp:1.0.0
    container_name: myapp-prod # Unique, descriptive names
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

**Best Practices:**

- Use unique, descriptive container names
- Pin image versions in production
- Add healthchecks for critical services
- Use named networks for service isolation
- Set appropriate restart policies
- Use environment files for sensitive data
- Avoid using `latest` tag in production

### Common Compose Mistakes:

```yaml
# ❌ BAD - Container name conflicts
services:
  app1:
    container_name: myapp
  app2:
    container_name: myapp  # Conflict!

# ❌ BAD - Using latest tag
services:
  app:
    image: node:latest

# ❌ BAD - Exposing all ports
services:
  app:
    ports:
      - "3000-9000:3000-9000"  # Too broad
```

---

## .dockerignore Best Practices

### ✅ DO: Exclude Unnecessary Files

```dockerignore
# Dependencies (will be installed in container)
node_modules
npm-debug.log
yarn-error.log

# Build outputs (will be built in container)
dist
build
.next
out

# Development files
.env.local
.env.development
.env.test
*.log

# Version control
.git
.gitignore
.gitattributes

# IDE files
.vscode
.idea
*.swp
*.swo

# Docker files (don't copy into image)
Dockerfile*
docker-compose*.yml
.dockerignore

# CI/CD
.github
.gitlab-ci.yml
Jenkinsfile

# Documentation
*.md
docs/
README.md

# Test files (if not needed in production)
**/*.test.ts
**/*.test.tsx
**/*.spec.ts
coverage/

# Cache directories
.cache
.parcel-cache
.eslintcache
```

**Why?**

- Reduces build context size
- Faster builds
- Prevents accidentally copying secrets
- Excludes unnecessary files from image

---

## Common Mistakes to Avoid

### 1. ❌ Using `latest` Tag

```dockerfile
# ❌ BAD
FROM node:latest

# ✅ GOOD
FROM node:24.11.1-alpine
```

### 2. ❌ Running as Root

```dockerfile
# ❌ BAD
FROM node:24.11.1-alpine
COPY . .
CMD ["node", "server.js"]

# ✅ GOOD
FROM node:24.11.1-alpine
COPY --chown=node:node . .
USER node
CMD ["node", "server.js"]
```

### 3. ❌ Including Dev Dependencies in Production

```dockerfile
# ❌ BAD
RUN npm install

# ✅ GOOD
RUN npm ci --only=production
# Or use multi-stage build
```

### 4. ❌ Poor Layer Caching

```dockerfile
# ❌ BAD
COPY . .
RUN npm install

# ✅ GOOD
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
```

### 5. ❌ Not Using Multi-Stage Builds

```dockerfile
# ❌ BAD - Single stage with all tools
FROM node:24.11.1-alpine
RUN npm install
RUN npm run build
CMD ["node", "server.js"]

# ✅ GOOD - Multi-stage
FROM node:24.11.1-alpine AS builder
RUN npm ci && npm run build

FROM node:24.11.1-alpine
COPY --from=builder /app/dist ./dist
RUN npm ci --only=production
CMD ["node", "server.js"]
```

### 6. ❌ Copying Everything

```dockerfile
# ❌ BAD
COPY . .

# ✅ GOOD
COPY package.json package-lock.json ./
COPY src ./src
COPY public ./public
```

### 7. ❌ Not Using BuildKit Cache Mounts

```dockerfile
# ❌ BAD
RUN npm install  # Downloads every time

# ✅ GOOD
RUN --mount=type=cache,target=/root/.npm npm ci
```

### 8. ❌ Hardcoding Secrets

```dockerfile
# ❌ BAD
ENV API_KEY=secret123
ENV DATABASE_PASSWORD=password

# ✅ GOOD
# Use Docker secrets, environment variables, or secret management
```

---

## Checklist for Dockerfiles

Before finalizing a Dockerfile, ensure:

- [ ] Base image version is pinned (no `latest`)
- [ ] Using Alpine or Slim variant
- [ ] Multi-stage build for production images
- [ ] Running as non-root user
- [ ] Layer ordering optimized for caching
- [ ] Using `npm ci` instead of `npm install`
- [ ] BuildKit cache mounts for package managers
- [ ] `.dockerignore` file is comprehensive
- [ ] No secrets hardcoded in Dockerfile
- [ ] Healthcheck defined (if applicable)
- [ ] Appropriate labels added
- [ ] Image scanned for vulnerabilities

---

## Example: Production-Ready Dockerfile

```dockerfile
# =========================================
# Stage 1: Build
# =========================================
ARG NODE_VERSION=24.11.1-alpine

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY package.json package-lock.json ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# =========================================
# Stage 2: Runtime
# =========================================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built application and production dependencies
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./
COPY --from=builder --chown=nodejs:nodejs /app/package-lock.json ./

# Install only production dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production && \
    npm cache clean --force

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "server.js"]
```

---

## Additional Resources

- [Dockerfile Best Practices (Official)](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [OWASP Docker Security](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [Docker Scout Documentation](https://docs.docker.com/scout/)
- [Multi-stage builds guide](https://docs.docker.com/build/building/multi-stage/)

---

**Last Updated:** 2025
**Maintained by:** Kristiyan Velkov
