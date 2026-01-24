// Project and Blog Constants - centralized for reusability

export const CATEGORIES = [
  "Web Development",
  "App Development",
  "UI/UX Design",
  "E-commerce",
  "Enterprise Software",
  "AI & Machine Learning",
  "FinTech Solutions",
  "Healthcare Tech",
  "SaaS Products",
  "Cloud Infrastructure",
  "Cybersecurity",
  "Digital Transformation",
  "Blockchain & Web3",
  "IoT Solutions",
  "Big Data & Analytics"
] as const

export const TECHNOLOGIES = [
  // Core Web
  "React", "Next.js", "Vue.js", "Angular", "Svelte", "HTML5", "CSS3", "JavaScript", "TypeScript",
  // Backend & APIs
  "Node.js", "Express", "Python", "Django", "Flask", "FastAPI", "PHP", "Laravel", "Ruby", "Rails", "Java", "Spring Boot", "C#", ".NET Core", "Go", "Rust", "GraphQL", "REST API", "gRPC",
  // Mobile
  "React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin",
  // Database
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase", "DynamoDB", "MariaDB", "SQLite", "Elasticsearch",
  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud", "Vercel", "Netlify", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI", "Jenkins",
  // AI & ML
  "OpenAI (GPT-4)", "Claude AI", "Google Gemini", "LangChain", "PyTorch", "TensorFlow", "Pandas", "Scikit-learn", "Hugging Face",
  // UI & Styling
  "Tailwind CSS", "Framer Motion", "Material UI", "Chakra UI", "shadcn/ui", "Sass", "Styled Components", "Radix UI", "PostCSS",
  // Tools & Design
  "Figma", "Adobe XD", "Photoshop", "Postman", "Swagger", "Jira", "Trello", "Vite", "ESLint",
  // Libraries & State
  "Zustand", "TanStack Query", "Radix primitives", "React Router", "React Hook Form", "Zod", "Recharts",
  // Finance & E-com
  "Stripe", "PayPal", "Shopify", "WooCommerce", "Magento",
  // Others
  "Web3.js", "Ether.js", "Solidity", "MQTT", "Arduino", "Raspberry Pi"
] as const

export const BLOG_TAGS = [
  "web development",
  "mobile development",
  "UI/UX",
  "javascript",
  "react",
  "nodejs",
  "python",
  "database",
  "cloud computing",
  "devops",
  "artificial intelligence",
  "machine learning",
  "cybersecurity",
  "blockchain",
  "startup",
  "technology",
  "programming",
  "software engineering",
  "best practices",
  "tutorials",
] as const

export const STATUS_OPTIONS = ["All", "Published", "Draft"] as const

// Type exports for type safety
export type Category = typeof CATEGORIES[number]
export type Technology = typeof TECHNOLOGIES[number]
export type BlogTag = typeof BLOG_TAGS[number]
export type StatusOption = typeof STATUS_OPTIONS[number]