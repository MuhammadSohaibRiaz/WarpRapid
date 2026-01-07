import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog-data"
import { portfolioProjects } from "@/lib/portfolio-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rapidnextech.com"
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Dynamic case studies pages
  const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${baseUrl}/case-studies/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages, ...portfolioPages]
}
