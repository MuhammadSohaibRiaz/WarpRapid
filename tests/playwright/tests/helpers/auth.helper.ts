import { Page } from '@playwright/test';

/**
 * Authentication Helper for RapidXTech Admin Panel
 * Handles login, session management, and logout
 */

export class AuthHelper {
    constructor(private page: Page) { }

    /**
     * Login to admin panel with credentials
     */
    async login(email: string = 'sohaib@rapidnextech.com', password: string = 'Sohaib@123') {
        // Navigate to admin login page
        await this.page.goto('/admin-login');

        // Wait for login form to be visible
        await this.page.waitForSelector('form', { state: 'visible' });

        // Fill in credentials
        await this.page.fill('input[type="email"], input[name="email"]', email);
        await this.page.fill('input[type="password"], input[name="password"]', password);

        // Click login button
        await this.page.click('button[type="submit"]');

        // Wait for navigation to admin page (could be /admin or /admin/dashboard)
        await this.page.waitForURL('**/admin**', { timeout: 10000 });

        // Wait for page to load
        await this.page.waitForTimeout(2000);
    }

    /**
     * Check if user is currently logged in
     */
    async isLoggedIn(): Promise<boolean> {
        try {
            const url = this.page.url();
            return url.includes('/admin');
        } catch {
            return false;
        }
    }

    /**
     * Logout from admin panel
     */
    async logout() {
        // Look for logout button or user menu
        const logoutButton = this.page.locator('button:has-text("Logout"), button:has-text("Sign Out")');

        if (await logoutButton.count() > 0) {
            await logoutButton.first().click();
            await this.page.waitForURL('**/admin-login');
        }
    }

    /**
     * Navigate to a specific admin section
     */
    async navigateToSection(section: 'blog' | 'portfolio' | 'testimonials' | 'partners') {
        // Ensure we're on dashboard
        if (!await this.isLoggedIn()) {
            throw new Error('Not logged in. Please login first.');
        }

        // Map sections to tab names
        const sectionMap = {
            blog: 'Blog',
            portfolio: 'Projects',
            testimonials: 'Testimonials',
            partners: 'Partners'
        };

        // Click on the tab button
        const tabButton = this.page.locator(`button:has-text("${sectionMap[section]}")`).first();
        await tabButton.click();

        // Wait for content to load
        await this.page.waitForTimeout(2000);
    }
}

/**
 * Create a new auth helper instance
 */
export function createAuthHelper(page: Page): AuthHelper {
    return new AuthHelper(page);
}
