# GitHub Actions - Secrets and Variables Setup Guide

This document lists all secrets and variables required for the GitHub Actions workflows to function properly.

---

## 📋 Table of Contents

- [Quick Setup Checklist](#quick-setup-checklist)
- [Required Secrets](#required-secrets)
- [Optional Secrets](#optional-secrets)
- [Repository Variables](#repository-variables)
- [Repository Settings](#repository-settings)
- [Step-by-Step Setup Instructions](#step-by-step-setup-instructions)

---

## ✅ Quick Setup Checklist

### Minimal Setup (Required)

- [ ] Enable GitHub Actions
- [ ] Configure repository permissions
- [ ] No secrets required!

### Optional Enhancements

- [ ] Container Registry access (for CD workflow)

---

## 🔑 Required Secrets

### For Continuous Deployment (CD Workflow)

If you want to deploy images to Docker Hub, you need these secrets:

| Secret                   | Required | Purpose                                                            |
| ------------------------ | -------- | ------------------------------------------------------------------ |
| `DOCKER_USERNAME`        | ✅ Yes   | Your Docker Hub username                                           |
| `DOCKERHUB_TOKEN`        | ✅ Yes   | Docker Hub Personal Access Token                                   |
| `DOCKERHUB_PROJECT_NAME` | ✅ Yes   | Name of your Docker Hub repository (e.g., `docker-reactjs-sample`) |

**How to set up:**

1. **Get Docker Hub Token:**

   ```bash
   1. Go to https://hub.docker.com
   2. Sign in to your account
   3. Click your username (top right) → Account Settings
   4. Security → New Access Token
   5. Description: "GitHub Actions"
   6. Permissions: "Read & Write"
   7. Generate and copy the token
   ```

2. **Add secrets to GitHub:**

   ```bash
   1. Go to your repository on GitHub
   2. Settings → Secrets and variables → Actions
   3. Click "New repository secret"

   Secret 1:
   - Name: DOCKER_USERNAME
   - Value: your-dockerhub-username

   Secret 2:
   - Name: DOCKERHUB_TOKEN
   - Value: <paste the token from step 1>

   Secret 3:
   - Name: DOCKERHUB_PROJECT_NAME
   - Value: docker-reactjs-sample (or your project name)
   ```

**Impact if not set:**

- CI workflows (lint, test, build, security) will work fine
- Only CD workflow (deployment) will fail
- You can skip these if you don't need to push images to Docker Hub

---

## 🔐 Automatic Secrets

These secrets are automatically provided by GitHub:

| Secret         | Provided By  | Purpose                                          |
| -------------- | ------------ | ------------------------------------------------ |
| `GITHUB_TOKEN` | ✅ Automatic | GitHub API access, PR comments, artifact uploads |

No configuration needed! Works out of the box.

---

## 🔐 Optional Secrets

Add these secrets only if you want to enable specific features:

### Container Registry Secrets (Optional)

**Used in:** `cd.yml` (Continuous Deployment)  
**Purpose:** Push multi-arch images to a container registry  
**Required:** Only for deployment to production

#### Using GitHub Container Registry (GHCR) - Recommended ⭐

**Why GHCR over Docker Hub?**

✅ **No Additional Secrets Required**

- Uses `GITHUB_TOKEN` automatically
- No need to create or manage tokens
- Zero configuration needed

✅ **Tightly Integrated with GitHub**

- Images appear in your repository's Packages tab
- Automatic linking between code and images
- Same permissions as your repository

✅ **Better for CI/CD**

- No rate limits for private repositories
- Faster pulls from GitHub Actions
- Better caching and performance

✅ **No Rate Limits**

- Docker Hub free tier: 200 pulls/6 hours
- GHCR: No pull limits for public repos
- Perfect for CI/CD pipelines

✅ **Cost-Effective**

- Free for public repositories
- Included with GitHub Pro/Team
- No separate billing

✅ **Better for Teaching**

- Simpler setup for your book readers
- Everything stays within GitHub
- One less external service to explain

**No additional secrets needed!** Uses `GITHUB_TOKEN` automatically.

**What you need to do:**

1. Enable GHCR in your repository settings
2. Ensure workflow has `packages: write` permission (already configured)

**Images will be pushed to:**

```
ghcr.io/your-username/docker-reactjs-sample:latest
ghcr.io/your-username/docker-reactjs-sample:main-abc1234
ghcr.io/your-username/docker-reactjs-sample:v1.0.0
```

**View your images:**

```
https://github.com/USERNAME/REPO/pkgs/container/docker-reactjs-sample
```

---

#### Using Docker Hub (Alternative)

**Why you might choose Docker Hub:**

⚠️ **More Complex Setup**

- Requires separate account
- Need to create and manage access tokens
- Two secrets to configure

⚠️ **Rate Limits**

- Free tier: 200 pulls per 6 hours
- Can affect CI/CD pipelines
- Need Docker Hub Pro for higher limits

⚠️ **Additional Maintenance**

- Tokens can expire
- Separate billing if you exceed limits
- Need to manage two platforms

**Use Docker Hub if:**

- You already have a Docker Hub account
- You want images on Docker Hub specifically
- You need Docker Hub's public visibility

If you prefer Docker Hub instead of GHCR:

**Secrets needed:**

- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub access token (not password!)

**How to get Docker Hub token:**

1. Go to https://hub.docker.com
2. Account Settings → Security → New Access Token
3. Generate token with "Read & Write" permissions

**Update cd.yml:**

```yaml
env:
  REGISTRY: docker.io  # Change from ghcr.io
  IMAGE_NAME: ${{ secrets.DOCKER_USERNAME }}/docker-reactjs-sample

# Update login step:
- name: Log in to Container Registry
  uses: docker/login-action@v3
  with:
    registry: ${{ env.REGISTRY }}
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}
```

---

## 📊 Repository Variables

**Used in:** None currently  
**Optional:** You can add variables for configuration

### How to add variables:

```bash
Settings → Secrets and variables → Actions → Variables tab → New repository variable
```

### Example variables you might add:

```yaml
NODE_VERSION: "20"
DOCKER_BUILDKIT: "1"
NPM_CONFIG_LOGLEVEL: "error"
```

Then use in workflows:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: ${{ vars.NODE_VERSION }}
```

---

## ⚙️ Repository Settings

### Required Permissions

Go to: `Settings → Actions → General → Workflow permissions`

**Select:** ✅ Read and write permissions

This allows workflows to:

- Comment on pull requests
- Upload artifacts
- Create releases
- Push to GHCR (if using CD workflow)

**Also enable:** ✅ Allow GitHub Actions to create and approve pull requests

---

### Security Features

Enable these for full security scanning capabilities:

#### 1. Code Scanning

Go to: `Settings → Code security and analysis`

**Enable:**

- ✅ Dependency graph
- ✅ Dependabot alerts
- ✅ Dependabot security updates
- ✅ Code scanning (for SARIF uploads)

#### 2. Secret Scanning

**Enable:**

- ✅ Secret scanning
- ✅ Push protection

---

## 🚀 Step-by-Step Setup Instructions

### Initial Setup (5 minutes)

#### Step 1: Enable GitHub Actions

```bash
1. Go to your repository on GitHub
2. Click "Actions" tab
3. If disabled, click "I understand my workflows, go ahead and enable them"
```

#### Step 2: Configure Workflow Permissions

```bash
1. Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"
5. Click "Save"
```

#### Step 3: Enable Security Features

```bash
1. Settings → Code security and analysis
2. Enable all recommended features:
   - Dependency graph ✅
   - Dependabot alerts ✅
   - Dependabot security updates ✅
   - Code scanning ✅
   - Secret scanning ✅
```

#### Step 4: Configure Dependabot (Already done!)

```bash
# Already configured in .github/dependabot.yml
# Dependabot will automatically:
# - Update npm dependencies weekly
# - Update GitHub Actions weekly
# - Update Docker base images weekly
```

✅ **Done!** All workflows will now work.

---

### Optional: Enable Container Deployment (10 minutes)

Only do this if you want to deploy images to GHCR:

#### Using GHCR (Recommended - No secrets needed!)

```bash
1. Go to repository Settings → Actions → General
2. Under "Workflow permissions", ensure "packages: write" is enabled
3. Push to main branch or create a tag
4. Images will be pushed to ghcr.io automatically
5. View images at: github.com/USERNAME/REPO/pkgs/container/docker-reactjs-sample
```

#### Using Docker Hub (Alternative)

```bash
1. Get Docker Hub token:
   - Go to https://hub.docker.com
   - Settings → Security → New Access Token
   - Name: "GitHub Actions"
   - Permissions: "Read & Write"
   - Copy the token

2. Add secrets to GitHub:
   Settings → Secrets and variables → Actions

   Secret 1:
   - Name: DOCKER_USERNAME
   - Value: your-dockerhub-username

   Secret 2:
   - Name: DOCKER_PASSWORD
   - Value: <paste-token-from-step-1>

3. Update cd.yml (see example in Optional Secrets section)
```

---

## 🔍 Verifying Your Setup

### Test Basic CI (No secrets required)

```bash
# Create a test branch
git checkout -b test-actions
git commit --allow-empty -m "test: verify GitHub Actions"
git push origin test-actions

# Create a Pull Request on GitHub
# Check Actions tab - should see:
✅ Lint Code Quality
✅ Test & Coverage
✅ Build & Validate
✅ Security Scan (Trivy + Docker Scout)
```

### Test Container Deployment (If configured)

```bash
# Push to main or create a tag
git tag v1.0.0
git push origin v1.0.0

# Check cd.yml workflow run
# Should see: "✅ Multi-arch images pushed"
# View images:
#   GHCR: https://github.com/USERNAME/REPO/pkgs/container/docker-reactjs-sample
#   Docker Hub: https://hub.docker.com/r/USERNAME/docker-reactjs-sample
```

---

## 📊 Secrets Summary Table

| Secret                   | Required  | Used By       | Purpose                 | Get From       |
| ------------------------ | --------- | ------------- | ----------------------- | -------------- |
| `GITHUB_TOKEN`           | ✅ Auto   | All workflows | GitHub API access       | Automatic      |
| `DOCKER_USERNAME`        | ✅ For CD | cd.yml        | Docker Hub login        | hub.docker.com |
| `DOCKERHUB_TOKEN`        | ✅ For CD | cd.yml        | Docker Hub push access  | hub.docker.com |
| `DOCKERHUB_PROJECT_NAME` | ✅ For CD | cd.yml        | Docker Hub project name | hub.docker.com |

---

## 🎯 Workflow Capabilities by Setup Level

### Level 1: Minimal (No secrets)

✅ Linting with inline PR comments  
✅ Testing with 100% coverage reports  
✅ Docker build validation  
✅ Security scanning (Trivy + Docker Scout)  
✅ Dependabot dependency updates  
✅ PR comments and summaries  
✅ Coverage reports in PRs (Vitest Coverage Report Action)

### Level 2: With Container Registry

✅ Everything from Level 1  
✅ Multi-architecture image builds  
✅ Automated deployments  
✅ Image versioning and tagging  
✅ Production-ready releases

---

## 🆘 Troubleshooting

### "Resource not accessible by integration"

**Problem:** Workflow can't comment on PRs or upload artifacts

**Solution:**

```bash
Settings → Actions → General → Workflow permissions
Select: "Read and write permissions" ✅
```

### "Docker login failed"

**Problem:** Container registry credentials invalid

**Solution:**

- For GHCR: Check `packages: write` permission
- For Docker Hub: Verify DOCKER_USERNAME and DOCKER_PASSWORD secrets
- Ensure using token, not password for Docker Hub

### "SARIF upload failed"

**Problem:** Code scanning not enabled

**Solution:**

```bash
Settings → Code security and analysis
Enable: "Code scanning" ✅
```

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Docker Scout Documentation](https://docs.docker.com/scout/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Vitest Coverage Report Action](https://github.com/marketplace/actions/vitest-coverage-report)
- [Reviewdog ESLint Action](https://github.com/marketplace/actions/eslint-reviewdog)

---

## ✅ Final Checklist

Before pushing your first commit:

- [ ] GitHub Actions enabled
- [ ] Workflow permissions set to "Read and write"
- [ ] Security features enabled (Dependabot, Code scanning)
- [ ] Dependabot configuration reviewed (`.github/dependabot.yml`)
- [ ] Container registry configured (if deploying)
- [ ] Test workflows triggered successfully
- [ ] PR comments working
- [ ] Security scans completing

---

**Perfect for your book: "Docker for React.js Developers"** 🎉

The setup is intentionally minimal - workflows work out of the box with no secrets required for the core functionality!
