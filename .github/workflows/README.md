# GitHub Actions Workflows Documentation

This directory contains all GitHub Actions workflows for the Docker React.js Sample project. These workflows provide comprehensive CI/CD automation, security scanning, code quality checks, and AI-powered code reviews.

---

## 📋 Table of Contents

- [Workflow Overview](#workflow-overview)
- [Core CI Workflows](#core-ci-workflows)
- [Deployment Workflows](#deployment-workflows)
- [Security & Quality Workflows](#security--quality-workflows)
- [Maintenance Workflows](#maintenance-workflows)
- [Workflow Triggers](#workflow-triggers)
- [Required Secrets](#required-secrets)
- [Workflow Dependencies](#workflow-dependencies)

---

## 🎯 Workflow Overview

### Workflow Structure

```
┌─────────────────────────────────────────────────────────┐
│                    CI/CD Pipeline                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │   Lint   │  │   Test   │  │  Build   │             │
│  │  (ESLint)│  │(Coverage)│  │ (Docker) │             │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘             │
│       │             │              │                    │
│       └─────────────┴──────────────┘                    │
│                     │                                   │
│              ┌──────▼──────┐                           │
│              │   Security   │                           │
│              │ (Scout+Snyk) │                           │
│              └──────┬───────┘                           │
│                     │                                   │
│              ┌──────▼──────┐                           │
│              │ AI Review    │                           │
│              │  (OpenAI)    │                           │
│              └──────┬───────┘                           │
│                     │                                   │
│         ┌───────────▼───────────┐                      │
│         │    CD Deployment      │                      │
│         │ (Multi-arch Images)   │                      │
│         └───────────────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Core CI Workflows

### 1. `ci.yml` - Continuous Integration Orchestrator

**Purpose:** Main CI pipeline that orchestrates all quality checks

**Triggers:**
- Pull requests to `main` and `develop`
- Push to `main` and `develop`
- Manual dispatch

**Jobs:**
- Calls `lint.yml` (code quality)
- Calls `test.yml` (unit tests & coverage)
- Calls `build.yml` (Docker build validation)
- Calls `security.yml` (security scans)
- Generates CI success summary

**Permissions:**
- `contents: read` - Read repository code
- `pull-requests: write` - Comment on PRs
- `checks: write` - Create check runs
- `security-events: write` - Upload security findings

**Concurrency:** Cancels in-progress runs for the same branch

**Required Secrets:** None (uses `GITHUB_TOKEN`)

---

### 2. `lint.yml` - Code Quality Check

**Purpose:** ESLint code quality validation with inline PR comments

**Features:**
- ✅ ESLint validation for TypeScript & React
- ✅ Inline PR comments via Reviewdog
- ✅ Fails on linting errors
- ✅ No Docker - runs directly with Node.js for speed

**Triggers:**
- Pull requests
- Push to main branches
- Called by `ci.yml`

**Technology:**
- Node.js 20
- `reviewdog/action-eslint@v1`
- ESLint flat config

**Output:**
- Inline comments on PR
- GitHub Check status

**Required Secrets:** None

---

### 3. `test.yml` - Test & Coverage

**Purpose:** Run unit tests with comprehensive coverage reporting

**Features:**
- ✅ Vitest unit tests
- ✅ 100% code coverage enforcement
- ✅ Interactive coverage reports in PRs
- ✅ Coverage trend indicators
- ✅ GitHub Step Summary
- ✅ Coverage artifacts (30-day retention)

**Triggers:**
- Pull requests
- Push to main branches
- Called by `ci.yml`

**Technology:**
- Node.js 20
- Vitest with V8 coverage
- `davelosert/vitest-coverage-report-action@v2`

**Coverage Reports:**
1. **PR Comments** - Detailed file-by-file coverage
2. **Step Summary** - High-level overview
3. **Artifacts** - Downloadable HTML reports

**Required Secrets:** None

**Configuration:**
```yaml
Coverage Thresholds:
  - Lines: 100%
  - Functions: 100%
  - Branches: 100%
  - Statements: 100%
```

---

### 4. `build.yml` - Build & Validate

**Purpose:** Build and validate production Docker images

**Features:**
- ✅ Production Docker build
- ✅ Docker layer caching
- ✅ Container health checks
- ✅ Static asset verification
- ✅ Nginx configuration validation
- ✅ Image artifact upload (7-day retention)

**Triggers:**
- Pull requests
- Push to main branches
- Called by `ci.yml`

**Build Target:** `react-prod` (production Nginx image)

**Validations:**
1. Container starts successfully
2. HTTP 200 response on port 8080
3. Static assets accessible
4. Nginx configuration valid

**Required Secrets:** None

---

## 🚀 Deployment Workflows

### 5. `cd.yml` - Continuous Deployment

**Purpose:** Build and push multi-architecture Docker images to Docker Hub

**Features:**
- ✅ Multi-architecture builds (amd64, arm64)
- ✅ QEMU emulation for cross-platform
- ✅ Docker Buildx caching
- ✅ Semantic versioning
- ✅ Latest tag on main branch
- ✅ Deployment notifications

**Triggers:**
- Push to `main` branch
- Git tags (`v*.*.*`)
- Manual dispatch

**Platforms:**
- `linux/amd64`
- `linux/arm64`

**Image Tags:**
- `latest` (main branch only)
- `main-{sha}` (commit SHA)
- `v1.0.0` (semver tags)
- `v1.0` (major.minor)
- `v1` (major only)

**Registry:** Docker Hub

**Required Secrets:**
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKERHUB_TOKEN` - Docker Hub access token
- `DOCKERHUB_PROJECT_NAME` - Repository name

**Concurrency:** No concurrent deployments (safety)

---

### 6. `release.yml` - GitHub Releases

**Purpose:** Create GitHub releases with changelog and artifacts

**Triggers:**
- Git tags (`v*.*.*`)
- Manual dispatch

**Features:**
- ✅ Automatic changelog generation
- ✅ Docker image references
- ✅ Pull command examples
- ✅ Release notes

**Required Secrets:** None (uses `GITHUB_TOKEN`)

---

## 🔒 Security & Quality Workflows

### 7. `security.yml` - Security Scanning

**Purpose:** Comprehensive security vulnerability scanning

**Jobs:**

#### a. Docker Scout (Always Runs)
- ✅ CVE vulnerability detection
- ✅ Base image recommendations
- ✅ Security trend comparison
- ✅ SARIF upload to GitHub Security
- ✅ PR comments with findings

#### b. Snyk Scan (Optional - requires token)
- ✅ npm dependency scanning
- ✅ Known vulnerability detection
- ✅ High severity threshold
- ✅ SARIF upload to GitHub Security

#### c. Dependency Review (PRs only)
- ✅ Checks new dependencies
- ✅ Fails on moderate+ severity
- ✅ License compliance

**Triggers:**
- Pull requests
- Push to `main`
- **Scheduled:** Every Sunday at 3 AM UTC
- Called by `ci.yml`

**Required Secrets:**
- None (Docker Scout)
- `SNYK_TOKEN` (optional, for Snyk)

**Output:**
- PR comments with vulnerabilities
- GitHub Security tab (SARIF)
- Step summary

---

### 8. `ai-code-review.yml` - AI-Powered Code Review

**Purpose:** AI-powered code review using ChatGPT and CodeRabbit

**Features:**
- ✅ GPT-4o-mini reviews (cost-effective)
- ✅ CodeRabbit AI analysis
- ✅ React.js & TypeScript best practices
- ✅ Security recommendations
- ✅ Performance suggestions
- ✅ Docker optimization tips

**Triggers:**
- Pull requests (opened, synchronized, reopened)
- PR review comments
- Manual dispatch

**AI Models:**
- **ChatGPT:** `gpt-4o-mini` (default) or `gpt-4o`
- **CodeRabbit:** `gpt-4o-mini` (light) / `gpt-4o` (heavy)

**Review Focus:**
- Code quality & clean code
- React Hooks best practices
- TypeScript type safety
- Docker optimization
- Security vulnerabilities
- Performance improvements

**Cost:**
- ~$0.01-0.05 per PR review (gpt-4o-mini)
- ~$0.10-0.50 per PR review (gpt-4o)

**Required Secrets:**
- `OPENAI_API_KEY` - OpenAI API key

**Concurrency:** Cancels in-progress reviews

---

## 🔧 Maintenance Workflows

### 9. `stale.yml` - Stale Issue Management

**Purpose:** Automatically manage stale issues and PRs

**Features:**
- ✅ Marks issues stale after 60 days
- ✅ Closes after 7 days of inactivity
- ✅ Custom messages
- ✅ Exempt labels supported

**Schedule:** Daily at midnight

**Required Secrets:** None

---

### 10. `performance.yml` - Performance Testing

**Purpose:** Lighthouse performance audits

**Features:**
- ✅ Lighthouse CI
- ✅ Performance metrics
- ✅ Bundle size tracking
- ✅ Accessibility checks

**Triggers:**
- Pull requests
- Manual dispatch

**Required Secrets:** None

---

## 🔔 Workflow Triggers

### Event Matrix

| Workflow         | PR | Push Main | Tag  | Schedule | Manual |
|------------------|----|-----------| -----|----------|--------|
| ci.yml           | ✅ | ✅        | ❌   | ❌       | ✅     |
| lint.yml         | ✅ | ✅        | ❌   | ❌       | ✅     |
| test.yml         | ✅ | ✅        | ❌   | ❌       | ✅     |
| build.yml        | ✅ | ✅        | ❌   | ❌       | ✅     |
| security.yml     | ✅ | ✅        | ❌   | ✅ Sun 3AM| ✅     |
| ai-code-review.yml| ✅| ❌        | ❌   | ❌       | ✅     |
| cd.yml           | ❌ | ✅        | ✅   | ❌       | ✅     |
| release.yml      | ❌ | ❌        | ✅   | ❌       | ✅     |
| stale.yml        | ❌ | ❌        | ❌   | ✅ Daily | ❌     |
| performance.yml  | ✅ | ❌        | ❌   | ❌       | ✅     |

---

## 🔑 Required Secrets

### Minimal Setup (No secrets needed!)

All core CI workflows work out of the box:
- ✅ Linting
- ✅ Testing
- ✅ Building
- ✅ Docker Scout security scanning

### Optional Secrets

| Secret                   | Workflow           | Purpose                   | Required |
| ------------------------ | ------------------ | ------------------------- | -------- |
| `DOCKER_USERNAME`        | cd.yml             | Docker Hub login          | For CD   |
| `DOCKERHUB_TOKEN`        | cd.yml             | Docker Hub push access    | For CD   |
| `DOCKERHUB_PROJECT_NAME` | cd.yml             | Docker Hub repo name      | For CD   |
| `SNYK_TOKEN`             | security.yml       | Snyk vulnerability scans  | Optional |
| `OPENAI_API_KEY`         | ai-code-review.yml | AI code reviews           | Optional |

### Automatic Secrets

| Secret         | Provided By | Used By        | Purpose                 |
| -------------- | ----------- | -------------- | ----------------------- |
| `GITHUB_TOKEN` | Automatic   | All workflows  | GitHub API access       |

---

## 📊 Workflow Dependencies

### Reusable Workflows

The `ci.yml` workflow calls these workflows using `workflow_call`:

```yaml
ci.yml (Orchestrator)
├── lint.yml (Parallel)
├── test.yml (Parallel)
├── build.yml (Parallel)
└── security.yml (Parallel)
```

### Job Dependencies

```yaml
security.yml:
  scout-scan (independent)
  snyk-scan (independent)
  dependency-review (independent)
  security-summary (needs: [scout-scan, snyk-scan])

cd.yml:
  multi-arch-build (matrix: amd64, arm64)
  merge-and-push (needs: multi-arch-build)
  deploy-notification (needs: merge-and-push)

ai-code-review.yml:
  ai-review (independent)
  coderabbit-review (independent)
  review-summary (needs: [ai-review, coderabbit-review])
```

---

## 🎯 Best Practices

### 1. Permissions (Principle of Least Privilege)

Each workflow only requests the minimum required permissions:

```yaml
permissions:
  contents: read          # Read code
  pull-requests: write    # Comment on PRs
  security-events: write  # Upload SARIF
  checks: write           # Create checks
```

### 2. Concurrency Control

Workflows use concurrency groups to prevent duplicate runs:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true  # or false for deployments
```

### 3. Caching Strategy

- **Node modules:** `actions/setup-node` with `cache: npm`
- **Docker layers:** `actions/cache` with `/tmp/.buildx-cache`

### 4. Artifact Retention

- **Coverage reports:** 30 days
- **Docker images:** 7 days
- **Build artifacts:** 7 days

### 5. Error Handling

- Use `if: always()` for cleanup steps
- Use `continue-on-error: true` for non-critical scans
- Provide meaningful error messages

---

## 📚 Additional Documentation

- [Secrets and Variables Setup](../SECRETS_AND_VARIABLES.md)
- [GitHub Actions Guide](../GITHUB_ACTIONS.md)
- [Dependabot Configuration](../dependabot.yml)

---

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Scout Action](https://github.com/marketplace/actions/docker-scout)
- [Snyk GitHub Action](https://github.com/marketplace/actions/snyk)
- [Vitest Coverage Report](https://github.com/marketplace/actions/vitest-coverage-report)
- [Reviewdog ESLint](https://github.com/marketplace/actions/eslint-reviewdog)
- [ChatGPT Code Review](https://github.com/marketplace/actions/chatgpt-codereviewer)
- [CodeRabbit AI](https://github.com/marketplace/coderabbitai)

---

**Perfect for: "Docker for React.js Developers"** 🎉

All workflows are production-ready and optimized for teaching modern CI/CD practices!

