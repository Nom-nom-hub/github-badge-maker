#!/bin/bash

# GitHub Actions Setup Validation Script

echo "🔍 Validating GitHub Actions Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track validation status
ERRORS=0
WARNINGS=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1 exists${NC}"
    else
        echo -e "${RED}❌ $1 missing${NC}"
        ((ERRORS++))
    fi
}

# Function to check if directory exists
check_directory() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅ $1 directory exists${NC}"
    else
        echo -e "${RED}❌ $1 directory missing${NC}"
        ((ERRORS++))
    fi
}

# Function to check package.json scripts
check_script() {
    if grep -q "\"$1\":" package.json; then
        echo -e "${GREEN}✅ npm script '$1' exists${NC}"
    else
        echo -e "${RED}❌ npm script '$1' missing${NC}"
        ((ERRORS++))
    fi
}

echo "📁 Checking directory structure..."
check_directory ".github"
check_directory ".github/workflows"
check_directory ".github/ISSUE_TEMPLATE"
check_directory ".github/lighthouse"

echo ""
echo "📄 Checking workflow files..."
check_file ".github/workflows/ci.yml"
check_file ".github/workflows/dependencies.yml"
check_file ".github/workflows/release.yml"

echo ""
echo "📝 Checking configuration files..."
check_file ".github/dependabot.yml"
check_file ".github/pull_request_template.md"
check_file ".github/lighthouse/lighthouserc.json"

echo ""
echo "🎫 Checking issue templates..."
check_file ".github/ISSUE_TEMPLATE/bug_report.md"
check_file ".github/ISSUE_TEMPLATE/feature_request.md"

echo ""
echo "📦 Checking package.json scripts..."
check_script "build"
check_script "lint"
check_script "type-check"
check_script "start"

echo ""
echo "🔍 Checking for required dependencies..."
if grep -q "\"next\":" package.json; then
    echo -e "${GREEN}✅ Next.js dependency found${NC}"
else
    echo -e "${RED}❌ Next.js dependency missing${NC}"
    ((ERRORS++))
fi

if grep -q "\"typescript\":" package.json; then
    echo -e "${GREEN}✅ TypeScript dependency found${NC}"
else
    echo -e "${RED}❌ TypeScript dependency missing${NC}"
    ((ERRORS++))
fi

if grep -q "\"eslint\":" package.json; then
    echo -e "${GREEN}✅ ESLint dependency found${NC}"
else
    echo -e "${RED}❌ ESLint dependency missing${NC}"
    ((ERRORS++))
fi

echo ""
echo "⚙️ Checking configuration files in project..."
if [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✅ TypeScript config exists${NC}"
else
    echo -e "${YELLOW}⚠️ TypeScript config missing${NC}"
    ((WARNINGS++))
fi

if [ -f "next.config.ts" ] || [ -f "next.config.js" ]; then
    echo -e "${GREEN}✅ Next.js config exists${NC}"
else
    echo -e "${YELLOW}⚠️ Next.js config missing${NC}"
    ((WARNINGS++))
fi

echo ""
echo "📋 Summary:"
echo "=========="

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Your GitHub Actions setup is complete.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push these changes to GitHub"
    echo "2. Add Vercel secrets to GitHub repository settings"
    echo "3. Create your first pull request to test the workflows"
    echo ""
    echo "📖 See GITHUB_ACTIONS_SETUP.md for detailed configuration instructions."
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️ Setup complete with $WARNINGS warning(s).${NC}"
    echo "The workflows will function, but consider addressing the warnings."
else
    echo -e "${RED}❌ Setup incomplete. Found $ERRORS error(s) and $WARNINGS warning(s).${NC}"
    echo "Please fix the missing files/configurations before proceeding."
fi

echo ""
echo "🔗 Useful commands:"
echo "  npm run lint         # Check code quality"
echo "  npm run type-check   # Verify TypeScript"
echo "  npm run build        # Test build process"
echo "  git add .github/     # Add workflow files to git"
echo ""