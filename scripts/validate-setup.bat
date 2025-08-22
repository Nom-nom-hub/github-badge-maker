@echo off
REM GitHub Actions Setup Validation Script for Windows

echo 🔍 Validating GitHub Actions Setup...
echo.

set ERRORS=0
set WARNINGS=0

echo 📁 Checking directory structure...
if exist ".github" (
    echo ✅ .github directory exists
) else (
    echo ❌ .github directory missing
    set /a ERRORS+=1
)

if exist ".github\workflows" (
    echo ✅ .github\workflows directory exists
) else (
    echo ❌ .github\workflows directory missing
    set /a ERRORS+=1
)

if exist ".github\ISSUE_TEMPLATE" (
    echo ✅ .github\ISSUE_TEMPLATE directory exists
) else (
    echo ❌ .github\ISSUE_TEMPLATE directory missing
    set /a ERRORS+=1
)

echo.
echo 📄 Checking workflow files...
if exist ".github\workflows\ci.yml" (
    echo ✅ .github\workflows\ci.yml exists
) else (
    echo ❌ .github\workflows\ci.yml missing
    set /a ERRORS+=1
)

if exist ".github\workflows\dependencies.yml" (
    echo ✅ .github\workflows\dependencies.yml exists
) else (
    echo ❌ .github\workflows\dependencies.yml missing
    set /a ERRORS+=1
)

if exist ".github\workflows\release.yml" (
    echo ✅ .github\workflows\release.yml exists
) else (
    echo ❌ .github\workflows\release.yml missing
    set /a ERRORS+=1
)

echo.
echo 📝 Checking configuration files...
if exist ".github\dependabot.yml" (
    echo ✅ .github\dependabot.yml exists
) else (
    echo ❌ .github\dependabot.yml missing
    set /a ERRORS+=1
)

if exist ".github\pull_request_template.md" (
    echo ✅ .github\pull_request_template.md exists
) else (
    echo ❌ .github\pull_request_template.md missing
    set /a ERRORS+=1
)

echo.
echo 📦 Checking package.json...
if exist "package.json" (
    findstr "\"build\":" package.json >nul
    if %errorlevel%==0 (
        echo ✅ npm script 'build' exists
    ) else (
        echo ❌ npm script 'build' missing
        set /a ERRORS+=1
    )
    
    findstr "\"lint\":" package.json >nul
    if %errorlevel%==0 (
        echo ✅ npm script 'lint' exists
    ) else (
        echo ❌ npm script 'lint' missing
        set /a ERRORS+=1
    )
) else (
    echo ❌ package.json missing
    set /a ERRORS+=1
)

echo.
echo 📋 Summary:
echo ==========

if %ERRORS%==0 (
    echo 🎉 All checks passed! Your GitHub Actions setup is complete.
    echo.
    echo Next steps:
    echo 1. Commit and push these changes to GitHub
    echo 2. Add Vercel secrets to GitHub repository settings
    echo 3. Create your first pull request to test the workflows
    echo.
    echo 📖 See GITHUB_ACTIONS_SETUP.md for detailed configuration instructions.
) else (
    echo ❌ Setup incomplete. Found %ERRORS% error(s).
    echo Please fix the missing files/configurations before proceeding.
)

echo.
echo 🔗 Useful commands:
echo   npm run lint         # Check code quality
echo   npm run type-check   # Verify TypeScript  
echo   npm run build        # Test build process
echo   git add .github/     # Add workflow files to git
echo.

pause