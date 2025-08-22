# 🚀 GitHub Actions Setup Guide

This document explains how to set up and configure the GitHub Actions workflows for this project.

## 📋 Overview

Our CI/CD pipeline includes:

- **🔍 Code Quality**: Linting and TypeScript checking
- **🏗️ Build & Test**: Automated builds and testing
- **🔒 Security**: Vulnerability scanning and audits
- **🚀 Deployment**: Preview and production deployments
- **📦 Dependencies**: Automated dependency management
- **🚨 Performance**: Lighthouse CI monitoring
- **🏷️ Releases**: Automated semantic versioning

## ⚙️ Required Secrets

To enable all features, add these secrets to your GitHub repository:

### Vercel Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Settings** → **Tokens**
3. Create a new token and add it as `VERCEL_TOKEN`

4. Get your Vercel Organization ID:
   ```bash
   npx vercel login
   npx vercel link
   cat .vercel/project.json
   ```
   Add the `orgId` as `VERCEL_ORG_ID`

5. Add the `projectId` as `VERCEL_PROJECT_ID`

### GitHub Token

The `GITHUB_TOKEN` is automatically provided by GitHub Actions.

## 📁 Workflow Files

### 1. Main CI/CD Pipeline (`.github/workflows/ci.yml`)

Runs on every push and pull request:

- **Triggers**: Push to `main`/`develop`, PRs to `main`
- **Jobs**: 
  - Code quality checks (ESLint, TypeScript)
  - Build and test
  - Security audit
  - Dependency review (PRs only)
  - Deploy preview (PRs only)
  - Deploy production (main branch only)
  - Lighthouse performance testing

### 2. Dependency Updates (`.github/workflows/dependencies.yml`)

Automated dependency management:

- **Schedule**: Weekly on Mondays at 9 AM UTC
- **Actions**: 
  - Updates npm dependencies
  - Runs security fixes
  - Creates pull request with changes

### 3. Automated Releases (`.github/workflows/release.yml`)

Semantic versioning and releases:

- **Triggers**: Push to `main` branch
- **Actions**:
  - Analyzes commit messages
  - Bumps version appropriately
  - Creates GitHub release
  - Generates changelog

### 4. Dependabot (`.github/dependabot.yml`)

Automated dependency updates:

- **Schedule**: Weekly updates for npm and GitHub Actions
- **Configuration**: 
  - Limits to 5 open PRs
  - Auto-assigns reviewers
  - Proper commit message formatting

## 🎯 Commit Message Convention

For automated releases to work properly, use conventional commits:

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature (minor version bump)
- `fix`: Bug fix (patch version bump)
- `feat!`: Breaking change (major version bump)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
git commit -m "feat: add custom badge designer"
git commit -m "fix: resolve TypeScript compilation error"
git commit -m "feat!: redesign badge configuration API"
```

## 🔧 Local Development

### Setup
```bash
# Install dependencies
npm ci

# Run development server
npm run dev

# Run quality checks (same as CI)
npm run lint
npm run type-check
npm run build
```

### Pre-commit Checks

Before committing, run:
```bash
npm run lint:fix    # Fix linting issues
npm run type-check  # Check TypeScript
npm run build      # Verify build works
```

## 🚀 Deployment

### Preview Deployments
- Created automatically for every pull request
- URL posted as comment on PR
- Perfect for testing changes before merge

### Production Deployments
- Triggered automatically when code is merged to `main`
- Deployed to your production Vercel project
- Includes performance monitoring

## 🚨 Performance Monitoring

Lighthouse CI runs on every PR to ensure:

- **Performance**: Minimum score of 80%
- **Accessibility**: Minimum score of 90%
- **Best Practices**: Minimum score of 80%
- **SEO**: Minimum score of 80%

Results are posted as PR comments with detailed reports.

## 📦 Dependency Management

### Automated Updates
- **Dependabot**: Weekly updates for all dependencies
- **Security**: Automatic security patches
- **Review**: All updates create PRs for review

### Manual Updates
```bash
# Update all dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

## 🛠️ Customization

### Modifying Workflows

1. **Change Schedule**: Edit the `cron` expression in workflow files
2. **Add Jobs**: Follow existing patterns in `.github/workflows/ci.yml`
3. **Environment Variables**: Add to the `env` section
4. **Secrets**: Add in GitHub repository settings

### Performance Thresholds

Edit `.github/lighthouse/lighthouserc.json` to adjust:
- Performance score requirements
- Test URLs
- Report upload settings

### Dependabot Configuration

Edit `.github/dependabot.yml` to:
- Change update frequency
- Add/remove package ecosystems
- Modify reviewer assignments

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Run `npm run build` locally first

2. **Deployment Issues**
   - Verify Vercel secrets are correct
   - Check Vercel project configuration
   - Ensure build succeeds locally

3. **Lighthouse Failures**
   - Review performance recommendations
   - Check accessibility issues
   - Optimize images and assets

### Getting Help

1. Check [GitHub Actions logs](https://github.com/your-username/github-badge-maker/actions)
2. Review [Vercel deployment logs](https://vercel.com/dashboard)
3. Open an issue with detailed error information

## 📈 Monitoring

### Key Metrics
- **Build Success Rate**: Should be >95%
- **Performance Scores**: Monitor Lighthouse trends
- **Security**: Zero high-severity vulnerabilities
- **Dependencies**: Keep up-to-date (green Dependabot PRs)

### Notifications
- **Failed Builds**: GitHub will notify repository maintainers
- **Security Issues**: Dependabot will create PRs automatically
- **Performance Regression**: Lighthouse will comment on PRs

---

## 🎉 Benefits

With this CI/CD setup, you get:

- ✅ **Automatic Quality Assurance**: Every change is tested
- ✅ **Fast Feedback**: Issues caught before merge
- ✅ **Security Monitoring**: Vulnerabilities detected early
- ✅ **Performance Tracking**: Lighthouse scores on every PR
- ✅ **Automated Deployments**: Zero-downtime releases
- ✅ **Dependency Management**: Stay up-to-date automatically
- ✅ **Professional Workflow**: Industry best practices

Your project is now enterprise-ready with automated testing, security, and deployment! 🚀