import { notFound } from "next/navigation"
import { PortfolioCMS } from "@/lib/supabase-cms"
import ProjectDetailClient from "./ProjectDetailClient"

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const data = await PortfolioCMS.getProjectBySlug(params.slug)
  if (!data) return notFound()
  return <ProjectDetailClient project={data} />
}
