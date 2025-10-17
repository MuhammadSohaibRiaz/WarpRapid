// Project and Blog Constants - centralized for reusability

export const CATEGORIES = [
  "Web Development", 
  "App Development", 
  "UI/UX Design", 
  "E-commerce", 
  "Enterprise Software"
] as const

export const TECHNOLOGIES = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "Python",
  "Django",
  "Flask",
  "PHP",
  "Laravel",
  "Ruby",
  "Rails",
  "Java",
  "Spring",
  "C#",
  ".NET",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Sass",
  "Tailwind CSS",
  "Material-UI",
  "Bootstrap",
  "Figma",
  "Adobe XD",
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