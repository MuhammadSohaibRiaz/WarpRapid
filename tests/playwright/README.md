# AI-Driven Automated Testing - README

## 📋 Overview

This directory contains AI-driven automated tests for the RapidXTech application using **Playwright** and **Applitools Eyes** for visual regression testing.

## 🎯 Test Modules

### Module 1: Blog CMS (`blog-cms.spec.ts`)
**14 Test Cases** covering:
- Blog post CRUD operations
- SEO metadata management
- Tag management
- Publish/unpublish functionality
- Search and filtering
- Form validation
- Visual regression testing

### Module 2: Portfolio CMS (`portfolio-cms.spec.ts`)
**14 Test Cases** covering:
- Project CRUD operations
- Technology tags management
- Features and results management
- Featured project toggle
- Category filtering
- Form validation
- Visual regression testing

**Total: 28 AI-Driven Test Cases**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Chrome browser (for Playwright)
- Applitools account (free tier available)

### Installation

```bash
cd tests/playwright
npm install
npx playwright install chromium
```

### Configuration

Set environment variables:
```bash
# Windows PowerShell
$env:APPLITOOLS_API_KEY="your_api_key_here"
$env:BASE_URL="http://20.219.203.205"

# Linux/Mac
export APPLITOOLS_API_KEY="your_api_key_here"
export BASE_URL="http://20.219.203.205"
```

---

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Module
```bash
# Blog CMS tests only
npm run test:blog

# Portfolio CMS tests only
npm run test:portfolio
```

### Run with UI Mode (Interactive)
```bash
npm run test:ui
```

### Run in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Debug Mode
```bash
npm run test:debug
```

---

## 📊 Test Reports

### View HTML Report
```bash
npm run report
```

This opens an interactive HTML report showing:
- Pass/fail status for each test
- Screenshots of failures
- Execution time
- Error details

### Test Artifacts
- **HTML Report**: `playwright-report/index.html`
- **JSON Results**: `test-results.json`
- **Screenshots**: `test-results/` (on failure)
- **Videos**: `test-results/` (on failure)

---

## 🤖 AI Features Used

### Playwright AI Features
1. **Auto-waiting**: Automatically waits for elements to be ready
2. **Auto-retrying**: Retries failed actions automatically
3. **Smart Locators**: Resilient element selectors that adapt to DOM changes
4. **Screenshot Comparison**: Built-in visual comparison

### Applitools Eyes AI Features
1. **Visual AI**: Detects visual regressions using AI algorithms
2. **Smart Diff**: Highlights meaningful visual differences
3. **Layout Algorithm**: Ignores minor layout shifts
4. **Cross-browser Testing**: Validates across different browsers
5. **Baseline Management**: Automatically manages visual baselines

---

## 📁 Project Structure

```
tests/playwright/
├── package.json              # Dependencies and scripts
├── playwright.config.ts      # Playwright configuration
├── tests/
│   ├── blog-cms.spec.ts     # Blog CMS test suite
│   ├── portfolio-cms.spec.ts # Portfolio CMS test suite
│   └── helpers/
│       ├── auth.helper.ts   # Authentication utilities
│       └── data.helper.ts   # Test data generators
├── fixtures/
│   ├── test-blog-post.json  # Sample blog post data
│   └── test-project.json    # Sample project data
└── README.md                # This file
```

---

## 🔧 CI/CD Integration

Tests run automatically in GitHub Actions on every push:

1. **Build & Test** → Lint and build checks
2. **AI Testing** → Runs Playwright tests
3. **Docker Build** → Builds and pushes images
4. **Deploy** → Deploys to staging

View test results in GitHub Actions artifacts.

---

## 📸 Test Coverage Summary

| Module | Test Cases | Coverage |
|--------|-----------|----------|
| Blog CMS | 14 | CRUD, SEO, Tags, Publish, Search, Validation, Visual |
| Portfolio CMS | 14 | CRUD, Tech Tags, Features, Results, Featured, Validation, Visual |
| **Total** | **28** | **Complete CMS Testing** |

---

## 🎓 For Assignment Submission

### Required Deliverables

1. **Test Code**: `blog-cms.spec.ts` and `portfolio-cms.spec.ts`
2. **Test Reports**: HTML report from `playwright-report/`
3. **Visual Regression**: Applitools dashboard screenshots
4. **CI/CD Integration**: GitHub Actions workflow logs
5. **Documentation**: This README

### Running Tests for Submission

```bash
# Run all tests and generate report
cd tests/playwright
npm install
npx playwright install chromium
npm test
npm run report
```

### Expected Results
- ✅ 28 test cases total
- ✅ 90%+ pass rate (some may fail due to UI differences)
- ✅ Visual regression baselines created in Applitools
- ✅ Test reports generated
- ✅ CI/CD integration working

---

## 🆘 Troubleshooting

### Tests Failing Due to Selectors
- UI elements may have different selectors
- Update selectors in test files based on actual HTML
- Use Playwright Inspector: `npx playwright test --debug`

### Applitools API Key Issues
- Sign up at https://applitools.com (free tier)
- Get API key from account settings
- Set `APPLITOOLS_API_KEY` environment variable

### Browser Not Found
```bash
npx playwright install chromium
```

### Timeout Errors
- Increase timeout in `playwright.config.ts`
- Check if BASE_URL is accessible
- Ensure admin credentials are correct

---

## 📝 Notes

- Tests run against deployed AKS instance (http://20.219.203.205)
- Admin credentials needed for CMS access
- Applitools free tier: 100 checkpoints/month
- Visual baselines created on first run
- Tests designed to be resilient to minor UI changes

---

**Author**: Muhammad Sohaib Riaz  
**Course**: Software Construction & Development  
**Assignment**: AI-Driven Automated Testing with Regression Testing
