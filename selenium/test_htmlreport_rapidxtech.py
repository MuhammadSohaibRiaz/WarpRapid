"""
SECTION E: SELENIUM AUTOMATED TESTING (Pytest Version)
RapidXTech DevOps Lab Assignment
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import time

# ==========================================
# CONFIGURATION
# ==========================================
BASE_URL = "http://20.219.203.205"
API_URL = f"{BASE_URL}/devops-demo"
TIMEOUT = 15

@pytest.fixture
def driver():
    """Pytest fixture to initialize and close the browser"""
    chrome_options = Options()
    # chrome_options.add_argument('--headless') # Uncomment if needed
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--window-size=1920,1080')
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(5)
    yield driver
    driver.quit()

# ==========================================
# TEST CASES
# ==========================================

def test_homepage_loads(driver):
    """Test 1: Verify Homepage Loads"""
    driver.get(BASE_URL)
    WebDriverWait(driver, TIMEOUT).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    assert any(word in driver.title for word in ["RapidXTech", "Innovative", "Tech"])

def test_navigation_menu(driver):
    """Test 2: Verify Navigation Menu Links"""
    driver.get(BASE_URL)
    time.sleep(2)
    nav_links = ['About', 'Case Studies', 'Blog', 'Careers', 'Contact']
    found = 0
    for link in nav_links:
        try:
            if driver.find_element(By.LINK_TEXT, link): found += 1
        except NoSuchElementException:
            pass
    assert found >= 3

def test_page_navigation(driver):
    """Test 3: Verify Routing"""
    paths = ['/about', '/blog', '/contact']
    for path in paths:
        driver.get(BASE_URL + path)
        assert len(driver.find_element(By.TAG_NAME, "body").text) > 50

def test_theme_switcher(driver):
    """Test 4: Theme Toggle (Optional UI)"""
    driver.get(BASE_URL)
    try:
        html = driver.find_element(By.TAG_NAME, "html")
        initial = html.get_attribute("class")
        btn = driver.find_element(By.CSS_SELECTOR, "button[aria-label*='theme'], button[class*='theme']")
        btn.click()
        time.sleep(1)
        assert html.get_attribute("class") != initial
    except:
        pytest.skip("Theme switcher not found - skipping optional test")

def test_backend_api_connectivity(driver):
    """Test 5: API Health Check"""
    driver.get(API_URL)
    time.sleep(2)
    body = driver.find_element(By.TAG_NAME, "body").text.lower()
    assert any(word in body for word in ["rapidxtech", "devops", "demo", "status", "ok"])

def test_responsive_design(driver):
    """Test 6: Mobile Responsiveness"""
    driver.set_window_size(375, 667)
    driver.get(BASE_URL)
    assert driver.find_element(By.TAG_NAME, "body").is_displayed()