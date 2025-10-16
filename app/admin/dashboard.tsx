"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { useSupabaseCMS } from "@/lib/supabase-cms"
import type { ProjectDetail } from "@/lib/supabase"
import { categories } from "@/lib/cms-data"
import { ProjectsControls } from "@/components/admin/projects/projects-controls"
import { ProjectsStats } from "@/components/admin/projects/projects-stats"
import { ProjectCard } from "@/components/admin/projects/project-card"
import { ProjectFormModal } from "@/components/admin/projects/project-form-modal"

export default function AdminDashboard() {
  const { mode, color } = useThemeContext()
  const { getAllProjects, addProject, updateProject, deleteProject, togglePublishStatus } = useSupabaseCMS()

  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  const [formData, setFormData] = useState<Partial<ProjectDetail>>({
    title: "",
    category: "",
    technology: [],
    description: "",
    longDescription: "",
    challenge: "",
    solution: "",
    results: [""],
    features: [""],
    images: [{ id: 1, url: "", alt: "", caption: "" }],
    duration: "",
    teamSize: 1,
    clientType: "",
    liveUrl: "",
    githubUrl: "",
    isPublished: false,
    testimonial: {
      quote: "",
      author: "",
      position: "",
      company: "",
    },
  })

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        const data = await getAllProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadProjects()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown-container")) {
        // setCategoryDropdownOpen(false)
        // setStatusDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const cardBgClass = useMemo(() => {
    if (mode === "dark" || color === "black") return "bg-gray-900/40"
    return "bg-white/40"
  }, [mode, color])

  const handleEdit = (project: ProjectDetail) => {
    setFormData(project)
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleSave = useCallback(async () => {
    if (!formData.title || !formData.category || !formData.description) {
      alert("Please fill in all required fields")
      return
    }

    try {
      if (editingProject) {
        const updated = await updateProject(editingProject.id, formData)
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? updated : p))
        )
      } else {
        const newProject = await addProject(formData as Omit<ProjectDetail, "id" | "created_at" | "updated_at">)
        setProjects((prev) => [...prev, newProject])
      }

      setIsFormOpen(false)
      setEditingProject(null)
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project. Please try again.')
    }
  }, [formData, editingProject, updateProject, addProject])

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm("Are you sure you want to delete this project?")) {
        try {
          await deleteProject(id)
          setProjects((prev) => prev.filter((p) => p.id !== id))
        } catch (error) {
          console.error('Error deleting project:', error)
          alert('Error deleting project. Please try again.')
        }
      }
    },
    [deleteProject],
  )

  const handleTogglePublish = useCallback(
    async (id: number) => {
      try {
        const updated = await togglePublishStatus(id)
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        )
      } catch (error) {
        console.error('Error toggling publish status:', error)
        alert('Error updating project status. Please try again.')
      }
    },
    [togglePublishStatus],
  )

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

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            Portfolio CMS
          </h1>
          <p className="theme-text opacity-80 theme-transition">
            Manage your portfolio projects - add, edit, delete, and control visibility
          </p>
        </motion.div>

        <div className={`${cardBgClass} backdrop-blur-md rounded-lg p-6 mb-8 shadow-lg theme-transition`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <ProjectsControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterCategory={filterCategory}
              onFilterCategory={setFilterCategory}
              filterStatus={filterStatus}
              onFilterStatus={setFilterStatus}
              allCategories={["All", ...categories]}
              statusOptions={["All", "Published", "Draft"]}
            />
            <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>

          <ProjectsStats
            total={projects.length}
            published={projects.filter((p) => p.is_published).length}
            drafts={projects.filter((p) => !p.is_published).length}
            filtered={filteredProjects.length}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onTogglePublish={handleTogglePublish}
              onDelete={handleDelete}
              cardBgClass={cardBgClass}
              index={index}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">No projects found</h3>
            <p className="theme-text opacity-70 theme-transition">
              {searchTerm || filterCategory !== "All" || filterStatus !== "All"
                ? "Try adjusting your filters"
                : "Create your first project to get started"}
            </p>
          </motion.div>
        )}
      </div>

      <ProjectFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingProject(null)
        }}
        onSave={handleSave}
        editingProject={editingProject}
        categories={categories}
        formData={formData}
        setFormData={(updater) => setFormData((prev) => updater(prev))}
      />
    </div>
  )
}
