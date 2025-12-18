# AI-Driven Automated Testing - Assignment Submission

## 📋 Assignment Details

**Course**: Software Construction & Development (SCD)  
**Assignment**: AI-Driven Software Testing with Regression Testing  
**Student**: Muhammad Sohaib Riaz  
**Date**: December 2024

---

## 🎯 Assignment Requirements

✅ **Select AI-driven software testing tool**  
✅ **Develop multiple sprints in CI/CD pipeline**  
✅ **Apply automated testing on components**  
✅ **Submit 2 module's testing outcomes using AI regression testing**

---

## 🤖 AI Testing Tools Selected

### 1. Playwright (Primary Framework)
**AI Features**:
- Auto-waiting for elements (no manual waits needed)
- Auto-retrying failed actions
- Smart element locators (resilient to DOM changes)
- Built-in screenshot comparison
- Automatic error recovery

### 2. Applitools Eyes (Visual AI)
**AI Features**:
- Visual AI for regression detection
- Smart diff highlighting (ignores minor differences)
- Layout algorithm (detects meaningful changes only)
- Automatic baseline management
- Cross-browser visual validation

---

## 📦 Modules Tested

### Module 1: Blog CMS
**Location**: `tests/playwright/tests/blog-cms.spec.ts`  
**Test Cases**: 14  
**Coverage**:
- TC-BLOG-001: Page load verification
- TC-BLOG-002: Create new blog post
- TC-BLOG-003: Add tags to blog post
- TC-BLOG-004: Add SEO metadata
- TC-BLOG-005: Edit existing blog post
- TC-BLOG-006: Publish blog post
- TC-BLOG-007: Unpublish blog post
- TC-BLOG-008: Search and filter posts
- TC-BLOG-009: Delete blog post
- TC-BLOG-010: Validate required fields
- TC-BLOG-011: Visual regression - List view
- TC-BLOG-012: Visual regression - Edit form
- TC-BLOG-013: Slug generation
- TC-BLOG-014: Date handling

### Module 2: Portfolio CMS
**Location**: `tests/playwright/tests/portfolio-cms.spec.ts`  
**Test Cases**: 14  
**Coverage**:
- TC-PORT-001: Page load verification
- TC-PORT-002: Create new project
- TC-PORT-003: Add technology tags
- TC-PORT-004: Add project features
- TC-PORT-005: Add project results
- TC-PORT-006: Toggle featured status
- TC-PORT-007: Edit existing project
- TC-PORT-008: Add metadata (duration, team size)
- TC-PORT-009: Filter by category
- TC-PORT-010: Publish project
- TC-PORT-011: Delete project
- TC-PORT-012: Validate required fields
- TC-PORT-013: Visual regression - List view
- TC-PORT-014: Visual regression - Edit form

**Total Test Cases**: 28

---

## 🚀 CI/CD Integration

### GitHub Actions Workflow
**File**: `.github/workflows/ci-cd.yml`

**Pipeline Stages**:
1. **Build & Test** - Lint and build checks
2. **AI Testing** ← NEW STAGE
   - Install Playwright dependencies
   - Install browsers
   - Run Blog CMS tests
   - Run Portfolio CMS tests
   - Upload test results as artifacts
   - Upload screenshots on failure
3. **Docker Build & Push** - Build and push images
4. **Deploy to Staging** - Deploy to AKS

**Test Artifacts**:
- HTML test reports
- JSON test results
- Failure screenshots
- Test execution logs

---

## 📊 Test Results

### Execution Summary
```
Total Test Suites: 2
Total Test Cases: 28
Modules Tested: Blog CMS, Portfolio CMS
Test Framework: Playwright v1.40.0
Visual AI: Applitools Eyes v1.19.0
```

### Test Coverage
| Module | Test Cases | CRUD | Validation | Visual Regression | Search/Filter |
|--------|-----------|------|------------|-------------------|---------------|
| Blog CMS | 14 | ✅ | ✅ | ✅ | ✅ |
| Portfolio CMS | 14 | ✅ | ✅ | ✅ | ✅ |

---

## 🔬 AI Features Demonstrated

### 1. Playwright AI Capabilities
```typescript
// Auto-waiting - No manual waits needed
await page.click('button:has-text("Save")');

// Smart locators - Resilient to DOM changes
await page.locator('button').filter({ hasText: /add|create|new/i }).first().click();

// Auto-retrying - Automatically retries failed actions
await expect(page.locator(`text=${title}`)).toBeVisible({ timeout: 10000 });
```

### 2. Applitools Visual AI
```typescript
// Visual regression testing with AI
await eyes.open(page, 'RapidXTech', 'Blog CMS - List View');
await eyes.check('Blog List Page', Target.window().fully());
const results = await eyes.close(false);
```

**AI Benefits**:
- Detects visual regressions automatically
- Ignores minor pixel differences
- Highlights meaningful changes only
- Manages baselines automatically

---

## 📁 Project Structure

```
tests/playwright/
├── package.json                    # Dependencies
├── playwright.config.ts            # Configuration
├── README.md                       # Documentation
├── tests/
│   ├── blog-cms.spec.ts           # Module 1 tests
│   ├── portfolio-cms.spec.ts      # Module 2 tests
│   └── helpers/
│       ├── auth.helper.ts         # Authentication
│       └── data.helper.ts         # Test data generators
└── fixtures/
    ├── test-blog-post.json        # Sample blog data
    └── test-project.json          # Sample project data
```

---

## 🎯 Sprint Implementation

### Sprint 1: Setup & Blog CMS ✅
- Installed Playwright and Applitools
- Created test infrastructure
- Implemented Blog CMS test suite (14 tests)
- Added visual regression tests

### Sprint 2: Portfolio CMS & CI Integration ✅
- Implemented Portfolio CMS test suite (14 tests)
- Integrated into GitHub Actions CI/CD
- Configured test artifacts upload
- Added parallel test execution

### Sprint 3: Documentation & Optimization ✅
- Created comprehensive README
- Added test data fixtures
- Optimized test performance
- Generated test reports

---

## 📸 Deliverables

### 1. Test Code
- ✅ `blog-cms.spec.ts` - 14 test cases
- ✅ `portfolio-cms.spec.ts` - 14 test cases
- ✅ Helper utilities (auth, data generators)

### 2. Test Reports
- ✅ HTML test report (`playwright-report/`)
- ✅ JSON test results
- ✅ Screenshots (on failure)

### 3. Visual Regression
- ✅ Applitools Eyes integration
- ✅ Visual baselines created
- ✅ AI-powered diff detection

### 4. CI/CD Integration
- ✅ GitHub Actions workflow updated
- ✅ Automated test execution
- ✅ Test artifacts uploaded

### 5. Documentation
- ✅ Comprehensive README
- ✅ Setup instructions
- ✅ Usage guide
- ✅ This submission document

---

## 🚀 How to Run Tests

### Prerequisites
```bash
cd tests/playwright
npm install
npx playwright install chromium
```

### Run All Tests
```bash
npm test
```

### Run Specific Module
```bash
npm run test:blog        # Blog CMS only
npm run test:portfolio   # Portfolio CMS only
```

### View Test Report
```bash
npm run report
```

---

## 📝 Key Achievements

1. ✅ **28 comprehensive test cases** across 2 modules
2. ✅ **AI-powered testing** with Playwright and Applitools
3. ✅ **Visual regression testing** with automatic baseline management
4. ✅ **CI/CD integration** with GitHub Actions
5. ✅ **Automated test reports** and artifacts
6. ✅ **Clean, maintainable code** with TypeScript
7. ✅ **Comprehensive documentation**

---

## 🎓 Learning Outcomes

### AI Testing Benefits
- **Reduced maintenance**: Smart locators adapt to UI changes
- **Faster execution**: Auto-waiting eliminates manual delays
- **Better coverage**: Visual AI detects regressions humans might miss
- **Improved reliability**: Auto-retrying handles flaky tests

### Best Practices Applied
- Data-driven testing with fixtures
- Page Object Model pattern (helpers)
- Separation of concerns
- Comprehensive error handling
- CI/CD integration

---

## 📌 Conclusion

This assignment successfully demonstrates:
- Implementation of AI-driven testing tools (Playwright + Applitools)
- Comprehensive test coverage for 2 CMS modules
- Visual regression testing with AI
- Full CI/CD pipeline integration
- Professional-grade test automation

All requirements met with 28 test cases providing thorough coverage of Blog CMS and Portfolio CMS functionality.

---

**Submitted by**: Muhammad Sohaib Riaz  
**Date**: December 2024  
**Repository**: RapidXTech DevOps Project
