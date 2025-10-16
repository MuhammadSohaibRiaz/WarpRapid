"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Search,
  Calendar,
  Users,
  ChevronDown,
  FileText,
  Briefcase,
  MessageSquare,
  UploadCloud,
} from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { useSupabaseCMS } from "@/lib/supabase-cms"
import type { ProjectDetail, BlogPost, ClientReview, ProjectImage } from "@/lib/supabase"
import { slugify } from "@/lib/utils"
import { BlogCard } from "@/components/admin/blog/blog-card"
import { BlogFormModal } from "@/components/admin/blog/blog-form-modal"
import { TestimonialCard } from "@/components/admin/testimonials/testimonial-card"
import { TestimonialFormModal } from "@/components/admin/testimonials/testimonial-form-modal"

// Categories and technologies (preserved)
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

export default function AdminDashboard() {
  const { mode, color } = useThemeContext()
  const cms = useSupabaseCMS()

  // State management
  const [activeTab, setActiveTab] = useState<"projects" | "blog" | "testimonials">("projects")
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [testimonials, setTestimonials] = useState<ClientReview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false)
  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(null)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<ClientReview | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  // Dropdown states
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  // Upload UX states
  const [uploadingImageIndex, setUploadingImageIndex] = useState<number | null>(null)
  const [bulkUploading, setBulkUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Project form data
  const [projectFormData, setProjectFormData] = useState<Partial<ProjectDetail>>({
    title: "",
    category: "",
    technology: [],
    description: "",
    long_description: "",
    challenge: "",
    solution: "",
    results: [""],
    features: [""],
    images: [{ id: 1, url: "", alt: "", caption: "" }],
    duration: "",
    team_size: 1,
    client_type: "",
    live_url: "",
    github_url: "",
    is_published: false,
    testimonial: {
      quote: "",
      author: "",
      position: "",
      company: "",
    },
  })

  // Blog form data
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    tags: [],
    author: "RapidXTech Team",
    date: new Date().toISOString().split("T")[0],
    is_published: false,
    seo_title: "",
    seo_description: "",
  })

  // Testimonial form data
  const [testimonialFormData, setTestimonialFormData] = useState<Partial<ClientReview>>({
    client_name: "",
    client_position: "",
    client_company: "",
    client_image: "",
    review_text: "",
    rating: 5,
    project_category: "",
    testimonial_type: "identified",
    is_featured: false,
    is_published: false,
  })

  // Load data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [projectsData, blogData, testimonialsData] = await Promise.all([
        cms.getAllProjects(),
        cms.getAllBlogPosts(),
        cms.getAllReviews(),
      ])
      setProjects(projectsData)
      setBlogPosts(blogData)
      setTestimonials(testimonialsData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // UI helpers
  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  const getDropdownBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/95 border-gray-700"
    } else {
      return "bg-white/95 border-gray-300"
    }
  }

  // Filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || project.category === filterCategory
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && project.is_published) ||
      (filterStatus === "Draft" && !project.is_published)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredBlogPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && post.is_published) ||
      (filterStatus === "Draft" && !post.is_published)

    return matchesSearch && matchesStatus
  })

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      (testimonial.client_name && testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (testimonial.client_company && testimonial.client_company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      testimonial.review_text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && testimonial.is_published) ||
      (filterStatus === "Draft" && !testimonial.is_published)

    return matchesSearch && matchesStatus
  })

  // Project handlers
  const resetProjectForm = () => {
    setProjectFormData({
      title: "",
      category: "",
      technology: [],
      description: "",
      long_description: "",
      challenge: "",
      solution: "",
      results: [""],
      features: [""],
      images: [{ id: 1, url: "", alt: "", caption: "" }],
      duration: "",
      team_size: 1,
      client_type: "",
      live_url: "",
      github_url: "",
      is_published: false,
      testimonial: {
        quote: "",
        author: "",
        position: "",
        company: "",
      },
    })
    setEditingProject(null)
    setIsProjectFormOpen(false)
  }

  const handleEditProject = (project: ProjectDetail) => {
    setProjectFormData(project)
    setEditingProject(project)
    setIsProjectFormOpen(true)
  }

  const handleSaveProject = async () => {
    if (!projectFormData.title || !projectFormData.category || !projectFormData.description) {
      alert("Please fill in all required fields")
      return
    }
    try {
      if (editingProject) {
        const updated = await cms.updateProject(editingProject.id, projectFormData)
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      } else {
        const created = await cms.addProject(projectFormData as any)
        setProjects((prev) => [...prev, created])
      }
      setIsProjectFormOpen(false)
      setEditingProject(null)
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Error saving project. Please try again.")
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    try {
      await cms.deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Error deleting project. Please try again.")
    }
  }

  const handleToggleProjectPublish = async (id: number) => {
    try {
      const updated = await cms.togglePublishStatus(id)
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    } catch (error) {
      console.error("Error toggling project publish status:", error)
      alert("Error updating project status. Please try again.")
    }
  }

  // Blog handlers
  const resetBlogForm = () => {
    setBlogFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      tags: [],
      author: "RapidXTech Team",
      date: new Date().toISOString().split("T")[0],
      is_published: false,
      seo_title: "",
      seo_description: "",
    })
    setEditingBlogPost(null)
    setIsBlogFormOpen(false)
  }

  const handleEditBlogPost = (post: BlogPost) => {
    setBlogFormData(post)
    setEditingBlogPost(post)
    setIsBlogFormOpen(true)
  }

  const handleSaveBlogPost = async () => {
    if (!blogFormData.title || !blogFormData.excerpt || !blogFormData.content) {
      alert("Please fill in all required fields")
      return
    }
    try {
      const slug = blogFormData.slug || slugify(blogFormData.title || "")
      const formDataWithSlug = { ...blogFormData, slug }
      if (editingBlogPost) {
        const updated = await cms.updateBlogPost(editingBlogPost.id, formDataWithSlug)
        setBlogPosts((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
      } else {
        const created = await cms.addBlogPost(formDataWithSlug as any)
        setBlogPosts((prev) => [created, ...prev])
      }
      setIsBlogFormOpen(false)
      setEditingBlogPost(null)
    } catch (error) {
      console.error("Error saving blog post:", error)
      alert("Error saving blog post. Please try again.")
    }
  }

  const handleDeleteBlogPost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    try {
      await cms.deleteBlogPost(id)
      setBlogPosts((prev) => prev.filter((b) => b.id !== id))
    } catch (error) {
      console.error("Error deleting blog post:", error)
      alert("Error deleting blog post. Please try again.")
    }
  }

  const handleToggleBlogPublish = async (id: number) => {
    try {
      const updated = await cms.toggleBlogPublishStatus(id)
      setBlogPosts((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
    } catch (error) {
      console.error("Error toggling blog publish status:", error)
      alert("Error updating blog status. Please try again.")
    }
  }

  // Testimonial handlers
  const resetTestimonialForm = () => {
    setTestimonialFormData({
      client_name: "",
      client_position: "",
      client_company: "",
      client_image: "",
      review_text: "",
      rating: 5,
      project_category: "",
      testimonial_type: "identified",
      is_featured: false,
      is_published: false,
    })
    setEditingTestimonial(null)
    setIsTestimonialFormOpen(false)
  }

  const handleEditTestimonial = (testimonial: ClientReview) => {
    setTestimonialFormData(testimonial)
    setEditingTestimonial(testimonial)
    setIsTestimonialFormOpen(true)
  }

  const handleSaveTestimonial = async () => {
    if (!testimonialFormData.review_text) {
      alert("Please fill in the review text")
      return
    }

    if (testimonialFormData.testimonial_type === "identified") {
      if (!testimonialFormData.client_name || !testimonialFormData.client_company) {
        alert("Please fill in client name and company for identified testimonials")
        return
      }
    }

    try {
      if (editingTestimonial) {
        const updated = await cms.updateReview(editingTestimonial.id, testimonialFormData)
        setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
      } else {
        const created = await cms.addReview(testimonialFormData as any)
        setTestimonials((prev) => [created, ...prev])
      }
      setIsTestimonialFormOpen(false)
      setEditingTestimonial(null)
    } catch (error) {
      console.error("Error saving testimonial:", error)
      alert("Error saving testimonial. Please try again.")
    }
  }

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return
    try {
      await cms.deleteReview(id)
      setTestimonials((prev) => prev.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      alert("Error deleting testimonial. Please try again.")
    }
  }

  const handleToggleTestimonialPublish = async (id: number) => {
    try {
      const updated = await cms.toggleReviewPublishStatus(id)
      setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } catch (error) {
      console.error("Error toggling testimonial publish status:", error)
      alert("Error updating testimonial status. Please try again.")
    }
  }

  const handleToggleTestimonialFeatured = async (id: number) => {
    try {
      const updated = await cms.toggleReviewFeaturedStatus(id)
      setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } catch (error) {
      console.error("Error toggling testimonial featured status:", error)
      alert("Error updating testimonial featured status. Please try again.")
    }
  }

  // Array helpers
  const addArrayItem = (field: "results" | "features") => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }))
  }

  const updateArrayItem = (field: "results" | "features", index: number, value: string) => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeArrayItem = (field: "results" | "features", index: number) => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }))
  }

  // Images helpers
  const addImage = () => {
    const newId = Math.max(...(projectFormData.images?.map((img) => img.id) || [0])) + 1
    setProjectFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), { id: newId, url: "", alt: "", caption: "" }],
    }))
  }

  const updateImage = (index: number, field: keyof ProjectImage, value: string) => {
    setProjectFormData((prev) => ({
      ...prev,
      images: (prev.images || []).map((img, i) => (i === index ? { ...img, [field]: value } : img)),
    }))
  }

  const removeImage = (index: number) => {
    setProjectFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }))
  }

  // Upload handlers
  const handleUploadImage = async (index: number, file: File) => {
    try {
      setUploadingImageIndex(index)
      setUploadError(null)
      const publicUrl = await cms.uploadImage(file)
      if (!publicUrl) {
        throw new Error("Upload failed. Please try again.")
      }
      setProjectFormData((prev) => {
        const images = [...(prev.images || [])]
        const current = images[index]
        images[index] = {
          ...current,
          url: publicUrl,
          alt: current?.alt || file.name.replace(/\.[^/.]+$/, ""),
          caption: current?.caption || "",
        }
        return { ...prev, images }
      })
    } catch (e: any) {
      setUploadError(e?.message || "Upload failed")
    } finally {
      setUploadingImageIndex(null)
    }
  }

  const handleBulkUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    setBulkUploading(true)
    setUploadError(null)
    try {
      let nextId = Math.max(...(projectFormData.images?.map((i) => i.id) || [0])) + 1
      const toAppend: ProjectImage[] = []
      for (const file of Array.from(fileList)) {
        const url = await cms.uploadImage(file)
        if (url) {
          toAppend.push({
            id: nextId++,
            url,
            alt: file.name.replace(/\.[^/.]+$/, ""),
            caption: "",
          })
        }
      }
      if (toAppend.length) {
        setProjectFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...toAppend],
        }))
      }
    } catch (e: any) {
      setUploadError(e?.message || "Bulk upload failed")
    } finally {
      setBulkUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const allCategories = ["All", ...categories]
  const statusOptions = ["All", "Published", "Draft"]

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition"
          animate={{ x: ["0%", "100%", "0%"], y: ["0%", "50%", "0%"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            Content Management System
          </h1>
          <p className="theme-text opacity-80 theme-transition">
            Manage your portfolio projects, blog posts, and client testimonials - add, edit, delete, and control
            visibility
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "projects"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Projects</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{projects.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "blog"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{blogPosts.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "testimonials"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{testimonials.length}</span>
            </button>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 mb-8 shadow-lg theme-transition`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 theme-text opacity-50" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 theme-text bg-transparent border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Category Filter (Projects only) */}
              {activeTab === "projects" && (
                <div className="relative dropdown-container">
                  <button
                    onClick={() => {
                      setCategoryDropdownOpen(!categoryDropdownOpen)
                      setStatusDropdownOpen(false)
                    }}
                    className={`flex items-center justify-between w-full md:w-48 px-3 py-2 rounded-md border ${
                      mode === "dark" || color === "black"
                        ? "border-gray-600 bg-gray-800/50"
                        : "border-gray-300 bg-white/50"
                    } theme-text theme-transition hover:bg-opacity-80`}
                  >
                    <span>{filterCategory}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {categoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full left-0 right-0 mt-1 ${getDropdownBgClass()} backdrop-blur-md rounded-md shadow-lg border z-50 max-h-60 overflow-y-auto`}
                      >
                        {["All", ...categories].map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setFilterCategory(category)
                              setCategoryDropdownOpen(false)
                            }}
                            className={`w-full text-left px-3 py-2 theme-text hover:bg-primary/20 transition-colors ${filterCategory === category ? "bg-primary/10" : ""}`}
                          >
                            {category}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Status Filter */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => {
                    setStatusDropdownOpen(!statusDropdownOpen)
                    setCategoryDropdownOpen(false)
                  }}
                  className={`flex items-center justify-between w-full md:w-48 px-3 py-2 rounded-md border ${
                    mode === "dark" || color === "black"
                      ? "border-gray-600 bg-gray-800/50"
                      : "border-gray-300 bg-white/50"
                  } theme-text theme-transition hover:bg-opacity-80`}
                >
                  <span>{filterStatus}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${statusDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {statusDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute top-full left-0 right-0 mt-1 ${getDropdownBgClass()} backdrop-blur-md rounded-md shadow-lg border z-50`}
                    >
                      {["All", "Published", "Draft"].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setFilterStatus(status)
                            setStatusDropdownOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2 theme-text hover:bg-primary/20 transition-colors ${filterStatus === status ? "bg-primary/10" : ""}`}
                        >
                          {status}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Add Button */}
            <Button
              onClick={() => {
                if (activeTab === "projects") setIsProjectFormOpen(true)
                else if (activeTab === "blog") setIsBlogFormOpen(true)
                else if (activeTab === "testimonials") setIsTestimonialFormOpen(true)
              }}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {activeTab === "projects" ? "Project" : activeTab === "blog" ? "Blog Post" : "Testimonial"}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {activeTab === "projects"
                  ? projects.length
                  : activeTab === "blog"
                    ? blogPosts.length
                    : testimonials.length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">
                Total {activeTab === "projects" ? "Projects" : activeTab === "blog" ? "Posts" : "Testimonials"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {activeTab === "projects"
                  ? projects.filter((p) => p.is_published).length
                  : activeTab === "blog"
                    ? blogPosts.filter((p) => p.is_published).length
                    : testimonials.filter((p) => p.is_published).length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {activeTab === "projects"
                  ? projects.filter((p) => !p.is_published).length
                  : activeTab === "blog"
                    ? blogPosts.filter((p) => !p.is_published).length
                    : testimonials.filter((p) => !p.is_published).length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {activeTab === "projects"
                  ? filteredProjects.length
                  : activeTab === "blog"
                    ? filteredBlogPosts.length
                    : filteredTestimonials.length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Filtered</div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Projects Grid (unchanged UI, handlers above now optimistic) */}
          {activeTab === "projects" &&
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg shadow-lg overflow-hidden theme-transition`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      project.images[0]?.url ||
                      "/placeholder.svg?height=200&width=300&query=No%20image%20available" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.is_published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                      }`}
                    >
                      {project.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-secondary/20 theme-text rounded text-xs theme-transition">
                      {project.category}
                    </span>
                    <span className="text-xs theme-text opacity-50 theme-transition">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold theme-text mb-2 theme-transition">{project.title}</h3>

                  <p className="text-sm theme-text opacity-70 mb-4 line-clamp-2 theme-transition">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-xs theme-text opacity-60 mb-4 theme-transition">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {project.team_size}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditProject(project)} className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleProjectPublish(project.id)}
                      className={project.is_published ? "text-yellow-600" : "text-green-600"}
                    >
                      {project.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Blog Posts Grid (modularized) */}
          {activeTab === "blog" &&
            filteredBlogPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                onEdit={(p) => {
                  setEditingBlogPost(p)
                  setBlogFormData(p)
                  setIsBlogFormOpen(true)
                }}
                onTogglePublish={handleToggleBlogPublish}
                onDelete={handleDeleteBlogPost}
                cardBgClass={getCardBgClass()}
                index={index}
              />
            ))}

          {/* Testimonials Grid (modularized) */}
          {activeTab === "testimonials" &&
            filteredTestimonials.map((t, index) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                onEdit={(item) => {
                  setEditingTestimonial(item)
                  setTestimonialFormData(item)
                  setIsTestimonialFormOpen(true)
                }}
                onTogglePublish={handleToggleTestimonialPublish}
                onToggleFeatured={handleToggleTestimonialFeatured}
                onDelete={handleDeleteTestimonial}
                cardBgClass={getCardBgClass()}
                index={index}
              />
            ))}
        </motion.div>

        {/* Empty State */}
        {((activeTab === "projects" && filteredProjects.length === 0) ||
          (activeTab === "blog" && filteredBlogPosts.length === 0) ||
          (activeTab === "testimonials" && filteredTestimonials.length === 0)) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">{activeTab === "projects" ? "📁" : activeTab === "blog" ? "📝" : "💬"}</div>
            <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">
              No {activeTab === "projects" ? "projects" : activeTab === "blog" ? "blog posts" : "testimonials"} found
            </h3>
            <p className="theme-text opacity-70 theme-transition">
              {searchTerm || filterCategory !== "All" || filterStatus !== "All"
                ? "Try adjusting your filters"
                : `Create your first ${activeTab === "projects" ? "project" : activeTab === "blog" ? "blog post" : "testimonial"} to get started`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {isProjectFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => resetProjectForm()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto theme-transition`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold theme-text theme-transition">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <Button variant="ghost" onClick={resetProjectForm}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Title *</label>
                    <Input
                      value={projectFormData.title || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Project title"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Category *</label>
                    <select
                      value={projectFormData.category || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        mode === "dark" || color === "black"
                          ? "border-gray-600 bg-gray-800/50"
                          : "border-gray-300 bg-white/50"
                      } theme-text theme-transition`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Technology Stack */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Technology Stack</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                    {technologies.map((tech) => (
                      <label key={tech} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectFormData.technology?.includes(tech) || false}
                          onChange={(e) => {
                            const currentTech = projectFormData.technology || []
                            if (e.target.checked) {
                              setProjectFormData((prev) => ({ ...prev, technology: [...currentTech, tech] }))
                            } else {
                              setProjectFormData((prev) => ({
                                ...prev,
                                technology: currentTech.filter((t) => t !== tech),
                              }))
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm theme-text theme-transition">{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Short Description *
                  </label>
                  <Textarea
                    value={projectFormData.description || ""}
                    onChange={(e) => setProjectFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief project description"
                    className="theme-text bg-transparent"
                    rows={3}
                  />
                </div>

                {/* Long Description */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Long Description</label>
                  <Textarea
                    value={projectFormData.long_description || ""}
                    onChange={(e) => setProjectFormData((prev) => ({ ...prev, long_description: e.target.value }))}
                    placeholder="Detailed project description"
                    className="theme-text bg-transparent"
                    rows={5}
                  />
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Challenge</label>
                    <Textarea
                      value={projectFormData.challenge || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, challenge: e.target.value }))}
                      placeholder="What challenges did you face?"
                      className="theme-text bg-transparent"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Solution</label>
                    <Textarea
                      value={projectFormData.solution || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, solution: e.target.value }))}
                      placeholder="How did you solve them?"
                      className="theme-text bg-transparent"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Duration</label>
                    <Input
                      value={projectFormData.duration || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 3 months"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Team Size</label>
                    <Input
                      type="number"
                      value={projectFormData.team_size || 1}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, team_size: Number(e.target.value) }))}
                      min={1}
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Client Type</label>
                    <Input
                      value={projectFormData.client_type || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, client_type: e.target.value }))}
                      placeholder="e.g., Startup, Enterprise"
                      className="theme-text bg-transparent"
                    />
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Live URL</label>
                    <Input
                      value={projectFormData.live_url || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, live_url: e.target.value }))}
                      placeholder="https://example.com"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">GitHub URL</label>
                    <Input
                      value={projectFormData.github_url || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, github_url: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="theme-text bg-transparent"
                    />
                  </div>
                </div>

                {/* Images with Upload Support */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium theme-text theme-transition">Project Images</label>
                    <div className="flex items-center gap-2">
                      <input
                        id="bulkUploadInput"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          handleBulkUpload(e.target.files)
                          e.currentTarget.value = ""
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("bulkUploadInput")?.click()}
                        className="bg-transparent"
                        disabled={bulkUploading}
                      >
                        <UploadCloud className="w-4 h-4 mr-2" />
                        {bulkUploading ? "Uploading..." : "Upload image(s)"}
                      </Button>
                      <Button type="button" variant="outline" onClick={addImage} className="bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Add empty row
                      </Button>
                    </div>
                  </div>
                  {uploadError && <p className="text-sm text-red-600 mb-2">{uploadError}</p>}
                  <div className="space-y-3">
                    {projectFormData.images?.map((image, index) => (
                      <div key={image.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border rounded-md">
                        {/* Preview */}
                        <div className="md:col-span-2 flex items-center justify-center">
                          <div className="relative w-full aspect-video max-h-24 overflow-hidden rounded bg-muted">
                            {image.url ? (
                              <img
                                src={image.url || "/placeholder.svg"}
                                alt={image.alt || "Preview"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <img
                                src="/no-image-selected.jpg"
                                alt="No image"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </div>

                        {/* Fields */}
                        <div className="md:col-span-4">
                          <Input
                            placeholder="Alt text"
                            value={image.alt}
                            onChange={(e) => updateImage(index, "alt", e.target.value)}
                            className="theme-text bg-transparent"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            placeholder="Caption (optional)"
                            value={image.caption || ""}
                            onChange={(e) => updateImage(index, "caption", e.target.value)}
                            className="theme-text bg-transparent"
                          />
                        </div>

                        {/* URL Field (optional manual override) + Per-image Upload */}
                        <div className="md:col-span-3 flex gap-2 items-center">
                          <Input
                            placeholder="Image URL"
                            value={image.url}
                            onChange={(e) => updateImage(index, "url", e.target.value)}
                            className="theme-text bg-transparent"
                          />
                          <input
                            id={`upload-input-${image.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                handleUploadImage(index, file)
                              }
                              e.currentTarget.value = ""
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById(`upload-input-${image.id}`)?.click()}
                            disabled={uploadingImageIndex === index || bulkUploading}
                            className="bg-transparent whitespace-nowrap"
                         >
                            {uploadingImageIndex === index ? "Uploading..." : "Upload"}
                          </Button>
                        </div>

                        <div className="md:col-span-12 flex items-center gap-2 justify-end">
                          {projectFormData.images && projectFormData.images.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeImage(index)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publish Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={projectFormData.is_published || false}
                    onChange={(e) => setProjectFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium theme-text theme-transition">
                    Publish immediately
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <Button onClick={handleSaveProject} className="bg-primary hover:bg-primary/90 text-white flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
                <Button variant="outline" onClick={resetProjectForm} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Form Modal (modularized) */}
      <BlogFormModal
        isOpen={isBlogFormOpen}
        onClose={() => {
          setIsBlogFormOpen(false)
          setEditingBlogPost(null)
        }}
        onSave={handleSaveBlogPost}
        editingPost={editingBlogPost}
        formData={blogFormData}
        setFormData={(updater) => setBlogFormData((prev) => updater(prev))}
        blogTags={blogTags}
        slugify={slugify}
      />

      {/* Testimonial Form Modal (modularized) */}
      <TestimonialFormModal
        isOpen={isTestimonialFormOpen}
        onClose={() => {
          setIsTestimonialFormOpen(false)
          setEditingTestimonial(null)
        }}
        onSave={handleSaveTestimonial}
        editingTestimonial={editingTestimonial}
        categories={categories}
        formData={testimonialFormData}
        setFormData={(updater) => setTestimonialFormData((prev) => updater(prev))}
      />
    </div>
  )
}
