# SECTION E: SELENIUM AUTOMATED TESTING

## 📋 Overview
This section demonstrates automated testing using Selenium WebDriver to verify the functionality of the RapidXTech application deployed on Azure Kubernetes Service (AKS).

---

## 📁 Files Included

1. **`test_rapidxtech.py`** - Main Selenium test script with 6 test cases
2. **`requirements.txt`** - Python dependencies
3. **`README_SECTION_E.md`** - This documentation file

---

## 🧪 Test Cases Included

### Test Case 1: Homepage Loads Successfully
- Verifies the homepage loads without errors
- Checks page title contains "RapidXTech"
- Validates page content is not empty
- Ensures no Supabase error messages

### Test Case 2: Navigation Menu Functionality
- Verifies navigation menu exists
- Checks for key navigation links (About, Blog, Case Studies, Careers, Contact)
- Validates link URLs are correct

### Test Case 3: Page Navigation and Routing
- Tests navigation to different pages
- Verifies each page loads successfully
- Checks page content is rendered

### Test Case 4: Theme Switcher Functionality
- Verifies light/dark theme toggle exists
- Tests theme switching functionality
- Validates theme state changes

### Test Case 5: Backend API Connectivity
- Attempts to verify backend API is reachable
- Tests health endpoint if accessible

### Test Case 6: Responsive Design
- Tests application on different screen sizes
- Verifies desktop (1920x1080), tablet (768x1024), and mobile (375x667)
- Ensures page renders correctly on all devices

---

## 🚀 SETUP INSTRUCTIONS

### Prerequisites

1. **Install Python** (if not already installed):
   ```bash
   # Check Python version
   python --version

   # Should be Python 3.8 or higher
   ```

2. **Install Google Chrome Browser**:
   - Download from: https://www.google.com/chrome/
   - Install and verify it's working

3. **Install ChromeDriver**:
   - **Option A (Automatic)**: The script will use webdriver-manager to auto-download
   - **Option B (Manual)**: Download from https://chromedriver.chromium.org/

---

## 📝 INSTALLATION STEPS

### Step 1: Navigate to Selenium Directory

```bash
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy\selenium"
```

### Step 2: Install Python Dependencies

```bash
# Install required packages
pip install -r requirements.txt

# Or install manually:
pip install selenium==4.15.2
pip install webdriver-manager==4.0.1
```

### Step 3: Update Test Configuration

Edit `test_rapidxtech.py` and update the `BASE_URL` variable:

```python
# Line 22 - Update with your actual AKS external IP
BASE_URL = "http://20.219.203.205"  # Your frontend external IP
```

---

## 🏃 RUNNING THE TESTS

### Basic Execution

```bash
# Run all tests
python test_rapidxtech.py
```

### Expected Output

```
============================================================
🚀 RAPIDXTECH SELENIUM TEST SUITE
============================================================
Target URL: http://20.219.203.205
Timeout: 10 seconds
============================================================

⚙️  Initializing Chrome WebDriver...
✅ WebDriver initialized successfully

🧪 Running Test 1: Homepage Loads Successfully...
✅ Test 1: Homepage Loads Successfully: PASS
   └─ Page title: RapidXTech - Innovative Software Development

🧪 Running Test 2: Navigation Menu Functionality...
   ✓ Found: About → http://20.219.203.205/about
   ✓ Found: Blog → http://20.219.203.205/blog
   ✓ Found: Case Studies → http://20.219.203.205/case-studies
✅ Test 2: Navigation Menu Functionality: PASS
   └─ Found 5/5 navigation links

[... more test output ...]

============================================================
📊 TEST EXECUTION SUMMARY
============================================================
Total Tests: 6
✅ Passed: 6
❌ Failed: 0
Success Rate: 100.0%
============================================================
```

---

## 📸 SCREENSHOTS FOR SUBMISSION

### Screenshot 1: Test Execution Start
```bash
python test_rapidxtech.py
```
**Capture**: Beginning of test execution showing WebDriver initialization

### Screenshot 2: Test Cases Running
**Capture**: Middle of execution showing individual test cases passing

### Screenshot 3: Test Summary
**Capture**: Final summary showing all tests passed with success rate

### Screenshot 4: Browser Window During Test
**Capture**: Chrome browser window showing the application being tested

### Screenshot 5: Test Code
```bash
# Open test file in editor
notepad test_rapidxtech.py
```
**Capture**: Portion of the test code showing test case implementation

---

## 🔧 ADVANCED OPTIONS

### Run in Headless Mode

Edit `test_rapidxtech.py` line 35:
```python
chrome_options.add_argument('--headless')  # Uncomment this line
```

### Adjust Timeout

Edit `test_rapidxtech.py` line 23:
```python
TIMEOUT = 20  # Increase timeout for slower connections
```

### Run Specific Test

Modify the `run_all_tests()` function to run only specific tests:
```python
test_functions = [
    test_homepage_loads,  # Run only this test
    # test_navigation_menu,  # Comment out others
]
```

---

## 🔍 TROUBLESHOOTING

### Issue: "ChromeDriver not found"
**Solution**: Install webdriver-manager or download ChromeDriver manually
```bash
pip install webdriver-manager
```

### Issue: "Connection refused" or timeout errors
**Solution**: 
1. Verify your AKS frontend is accessible: http://20.219.203.205
2. Check if the external IP is correct: `kubectl get svc rapidx-frontend`
3. Increase TIMEOUT value in the script

### Issue: "Element not found" errors
**Solution**: 
1. The application might still be loading
2. Increase implicit wait time
3. Check if Supabase credentials are set correctly in K8s

### Issue: Chrome version mismatch
**Solution**: Update Chrome browser and ChromeDriver
```bash
pip install --upgrade selenium webdriver-manager
```

### Issue: Tests fail on specific pages
**Solution**: 
1. Manually test the page in browser
2. Check browser console for JavaScript errors
3. Verify Supabase environment variables are set

---

## 📊 TEST RESULTS INTERPRETATION

### Success Criteria:
- ✅ **100% Pass Rate**: All 6 tests pass - Excellent!
- ✅ **80-99% Pass Rate**: Most tests pass - Good (minor issues)
- ⚠️ **60-79% Pass Rate**: Some tests fail - Needs attention
- ❌ **<60% Pass Rate**: Major issues - Requires debugging

### Common Failure Reasons:
1. **Homepage not loading**: Check AKS deployment and external IP
2. **Navigation tests failing**: Frontend routing issues
3. **Theme switcher not found**: Element selector needs adjustment
4. **API connectivity fails**: Backend service not accessible (expected for ClusterIP)
5. **Responsive design fails**: CSS or viewport issues

---

## 🎓 FOR YOUR REPORT

### Test Environment:
- **Testing Tool**: Selenium WebDriver 4.15.2
- **Browser**: Google Chrome (latest)
- **Programming Language**: Python 3.x
- **Test Framework**: Custom test suite
- **Target Application**: RapidXTech on AKS
- **Application URL**: http://20.219.203.205

### Test Coverage:
- **Functional Testing**: Homepage load, navigation, routing
- **UI Testing**: Theme switcher, responsive design
- **Integration Testing**: Frontend-backend connectivity
- **Cross-device Testing**: Desktop, tablet, mobile viewports

### Test Metrics:
- **Total Test Cases**: 6
- **Execution Time**: ~30-60 seconds
- **Pass Rate**: [Your actual percentage]%
- **Failed Tests**: [Number of failures]
- **Test Coverage**: Frontend UI and basic functionality

---

## 📋 SECTION E CHECKLIST

- [ ] Python installed (3.8+)
- [ ] Google Chrome installed
- [ ] Selenium dependencies installed (`pip install -r requirements.txt`)
- [ ] Test script configured with correct BASE_URL
- [ ] AKS frontend accessible via browser
- [ ] Test script executed successfully
- [ ] All 6 test cases completed
- [ ] Screenshots captured
- [ ] Test results documented

---

## 🎯 QUICK EXECUTION (Copy-Paste)

```bash
# Complete Section E execution
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy\selenium"
pip install -r requirements.txt
python test_rapidxtech.py
```

---

## 📝 ADDITIONAL TEST IDEAS (Optional)

If you want to add more tests:

1. **Form Validation**: Test contact form submission
2. **Search Functionality**: Test blog search feature
3. **Admin Login**: Test admin authentication
4. **Image Loading**: Verify all images load correctly
5. **Performance**: Measure page load times
6. **Accessibility**: Test keyboard navigation

---

**✅ Section E Complete!** Your automated tests verify the application is working correctly on AKS.
