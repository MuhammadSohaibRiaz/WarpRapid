"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin-auth"
import { AdminLayout } from "@/components/admin-layout"
import { useAdminAuth } from "@/lib/auth"
import AdminDashboard from "@/components/admin/admin-dashboard"
// Categories and technologies
const categories = ["Web Development", "App Development", "UI/UX Design", "E-commerce", "Enterprise Software"]
const technologies = [
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
]

const blogTags = [
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
]

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAdminAuth()
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    setShowDashboard(isAuthenticated)
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Initializing admin panel...</p>
        </div>
      </div>
    )
  }

  if (!showDashboard) {
    return <AdminAuth onAuthenticated={() => setShowDashboard(true)} />
  }

  return (
    <AdminLayout>
      <AdminDashboard /> {/* render AdminDashboard and avoid the monolithic inline component */}
    </AdminLayout>
  )
}
