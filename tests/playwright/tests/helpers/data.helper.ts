/**
 * Test Data Generator for Blog Posts and Projects
 */

export interface BlogPostData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    author: string;
    seoTitle?: string;
    seoDescription?: string;
}

export interface ProjectData {
    title: string;
    slug: string;
    category: string;
    technology: string[];
    description: string;
    longDescription?: string;
    features: string[];
    results: string[];
    duration?: string;
    teamSize?: number;
}

/**
 * Generate random blog post data for testing
 */
export function generateBlogPost(overrides?: Partial<BlogPostData>): BlogPostData {
    const timestamp = Date.now();
    const randomId = Math.floor(Math.random() * 1000);

    return {
        title: `Test Blog Post ${randomId}`,
        slug: `test-blog-post-${timestamp}`,
        excerpt: 'This is a test blog post excerpt for automated testing purposes.',
        content: `# Test Blog Post Content\n\nThis is the main content of the test blog post created at ${new Date().toISOString()}.\n\n## Section 1\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\n## Section 2\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        tags: ['Testing', 'Automation', 'AI'],
        author: 'Test Author',
        seoTitle: `SEO Title for Test Post ${randomId}`,
        seoDescription: 'SEO description for automated testing blog post',
        ...overrides
    };
}

/**
 * Generate random project data for testing
 */
export function generateProject(overrides?: Partial<ProjectData>): ProjectData {
    const timestamp = Date.now();
    const randomId = Math.floor(Math.random() * 1000);

    return {
        title: `Test Project ${randomId}`,
        slug: `test-project-${timestamp}`,
        category: 'Web Development',
        technology: ['React', 'Node.js', 'TypeScript'],
        description: 'This is a test project description for automated testing.',
        longDescription: 'Detailed description of the test project with more information about the implementation and outcomes.',
        features: [
            'Feature 1: Responsive design',
            'Feature 2: API integration',
            'Feature 3: Real-time updates'
        ],
        results: [
            'Result 1: 50% performance improvement',
            'Result 2: 100% test coverage',
            'Result 3: Successful deployment'
        ],
        duration: '3 months',
        teamSize: 5,
        ...overrides
    };
}

/**
 * Generate multiple blog posts
 */
export function generateMultipleBlogPosts(count: number): BlogPostData[] {
    return Array.from({ length: count }, (_, i) =>
        generateBlogPost({ title: `Test Blog Post ${i + 1}` })
    );
}

/**
 * Generate multiple projects
 */
export function generateMultipleProjects(count: number): ProjectData[] {
    return Array.from({ length: count }, (_, i) =>
        generateProject({ title: `Test Project ${i + 1}` })
    );
}
