import { supabase, type ProjectDetail, type BlogPost, type ClientReview, type TrustedPartner } from "./supabase"
import { slugify } from "./utils"


// Portfolio Projects CMS
export class PortfolioCMS {
  static async getAllProjects(): Promise<ProjectDetail[]> {
    const { data, error } = await supabase.from("projects").select("*").order("updated_at", { ascending: false })
    if (error) throw error
    return data || []
  }

  static async getPublishedProjects(): Promise<ProjectDetail[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("updated_at", { ascending: false })
    if (error) throw error
    return data || []
  }

  static async getFeaturedProjects(): Promise<ProjectDetail[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("updated_at", { ascending: false })
    if (error) throw error
    return data || []
  }

  static async getProjectById(id: number): Promise<ProjectDetail | null> {
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()
    if (error) throw error
    return data
  }

  static async getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
    // First try to find by exact slug match
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()
    
    if (!error && data) {
      return data
    }
    
    if (error && error.code !== 'PGRST116') {
      throw error
    }
    
    // If not found by slug, try to find all published projects and match by generated slug
    // This handles projects that don't have slugs saved yet
    const { data: allProjects, error: allError } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
    
    if (allError) throw allError
    if (!allProjects || allProjects.length === 0) return null
    
    // Find project where generated slug matches
    const project = allProjects.find(project => slugify(project.title) === slug)
    return project || null
  }

  static async addProject(project: Omit<ProjectDetail, "id" | "created_at" | "updated_at">): Promise<ProjectDetail> {
    const slug = project.slug || slugify(project.title)
    const { data, error } = await supabase.from("projects").insert([{ ...project, slug }]).select().single()
    if (error) throw error
    return data
  }

  static async updateProject(id: number, updates: Partial<ProjectDetail>): Promise<ProjectDetail> {
    if (updates.title && !updates.slug) updates.slug = slugify(updates.title)
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()
    if (error) throw error
    return data
  }

  static async deleteProject(id: number): Promise<void> {
    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (error) throw error
  }

  static async togglePublishStatus(id: number): Promise<ProjectDetail> {
    const { data: current, error: fetchError } = await supabase
      .from("projects")
      .select("is_published")
      .eq("id", id)
      .single()
    if (fetchError) throw fetchError

    const { data, error } = await supabase
      .from("projects")
      .update({ is_published: !current.is_published })
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  static async toggleProjectFeaturedStatus(id: number): Promise<ProjectDetail> {
    const { data: current, error: fetchError } = await supabase
      .from("projects")
      .select("is_featured")
      .eq("id", id)
      .single()
    if (fetchError) throw fetchError
    const { data, error } = await supabase
      .from("projects")
      .update({ is_featured: !current.is_featured })
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return data
  }

}

// Blog CMS (unchanged except for import usage)
export class BlogCMS {
  static async getAllBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })
    if (error) throw error
    return data || []
  }

  static async getPublishedBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: false })
    if (error) throw error
    return data || []
  }

  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()
    if (error) throw error
    return data
  }

  static async addBlogPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> {
    const slug = post.slug || slugify(post.title)
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([{ ...post, slug }])
      .select()
      .single()
    if (error) throw error
    return data
  }

  static async updateBlogPost(id: number, updates: Partial<BlogPost>): Promise<BlogPost> {
    if (updates.title && !updates.slug) updates.slug = slugify(updates.title)
    const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single()
    if (error) throw error
    return data
  }

  static async deleteBlogPost(id: number): Promise<void> {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)
    if (error) throw error
  }

  static async toggleBlogPublishStatus(id: number): Promise<BlogPost> {
    const { data: current, error: fetchError } = await supabase
      .from("blog_posts")
      .select("is_published")
      .eq("id", id)
      .single()
    if (fetchError) throw fetchError

    const { data, error } = await supabase
      .from("blog_posts")
      .update({ is_published: !current.is_published })
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  static async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order("date", { ascending: false })
    if (error) throw error
    return data || []
  }

  static async getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .contains("tags", [tag])
      .order("date", { ascending: false })
    if (error) throw error
    return data || []
  }
}

// Reviews CMS (unchanged)
export class ReviewsCMS {
  static async getAllReviews(): Promise<ClientReview[]> {
    const { data, error } = await supabase.from("client_reviews").select("*").order("created_at", { ascending: false })
    if (error) throw error
    return data || []
  }
  static async getPublishedReviews(): Promise<ClientReview[]> {
    const { data, error } = await supabase
      .from("client_reviews")
      .select("*")
      .eq("is_published", true)
      .order("rating", { ascending: false })
      .order("created_at", { ascending: false })
    if (error) throw error
    return data || []
  }
  static async getFeaturedReviews(): Promise<ClientReview[]> {
    const { data, error } = await supabase
      .from("client_reviews")
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("rating", { ascending: false })
      .order("created_at", { ascending: false })
    if (error) throw error
    return data || []
  }
  static async addReview(review: Omit<ClientReview, "id" | "created_at" | "updated_at">): Promise<ClientReview> {
    const { data, error } = await supabase.from("client_reviews").insert([review]).select().single()
    if (error) throw error
    return data
  }
  static async updateReview(id: number, updates: Partial<ClientReview>): Promise<ClientReview> {
    const { data, error } = await supabase.from("client_reviews").update(updates).eq("id", id).select().single()
    if (error) throw error
    return data
  }
  static async deleteReview(id: number): Promise<void> {
    const { error } = await supabase.from("client_reviews").delete().eq("id", id)
    if (error) throw error
  }
  static async toggleReviewPublishStatus(id: number): Promise<ClientReview> {
    const { data: current, error: fetchError } = await supabase
      .from("client_reviews")
      .select("is_published")
      .eq("id", id)
      .single()
    if (fetchError) throw fetchError
    const { data, error } = await supabase
      .from("client_reviews")
      .update({ is_published: !current.is_published })
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return data
  }
  static async toggleReviewFeaturedStatus(id: number): Promise<ClientReview> {
    const { data: current, error: fetchError } = await supabase
      .from("client_reviews")
      .select("is_featured")
      .eq("id", id)
      .single()
    if (fetchError) throw fetchError
    const { data, error } = await supabase
      .from("client_reviews")
      .update({ is_featured: !current.is_featured })
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return data
  }
}

// Partners CMS (unchanged)
export class PartnersCMS {
  static async getAllPartners(): Promise<TrustedPartner[]> {
    const { data, error } = await supabase
      .from("trusted_partners")
      .select("*")
      .order("display_order", { ascending: true })
    if (error) throw error
    return data || []
  }
  static async getPublishedPartners(): Promise<TrustedPartner[]> {
    const { data, error } = await supabase
      .from("trusted_partners")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
    if (error) throw error
    return data || []
  }
  static async getFeaturedPartners(): Promise<TrustedPartner[]> {
    const { data, error } = await supabase
      .from("trusted_partners")
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("display_order", { ascending: true })
    if (error) throw error
    return data || []
  }
  static async addPartner(partner: Omit<TrustedPartner, "id" | "created_at" | "updated_at">): Promise<TrustedPartner> {
    const { data, error } = await supabase.from("trusted_partners").insert([partner]).select().single()
    if (error) throw error
    return data
  }
  static async updatePartner(id: number, updates: Partial<TrustedPartner>): Promise<TrustedPartner> {
    const { data, error } = await supabase.from("trusted_partners").update(updates).eq("id", id).select().single()
    if (error) throw error
    return data
  }
  static async deletePartner(id: number): Promise<void> {
    const { error } = await supabase.from("trusted_partners").delete().eq("id", id)
    if (error) throw error
  }
  static async togglePartnerPublishStatus(id: number): Promise<TrustedPartner> {
    const { data: current, error: fetchError } = await supabase
      .from("trusted_partners")
      .select("is_published")
      .eq("id", id)
      .single()
    if (fetchError) throw fetchError
    const { data, error } = await supabase
      .from("trusted_partners")
      .update({ is_published: !current.is_published })
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return data
  }
  static async togglePartnerFeaturedStatus(id: number): Promise<TrustedPartner> {
    const { data: current, error: fetchError } = await supabase
      .from("trusted_partners")
      .select("is_featured")
      .eq("id", id)
      .single()
    if (fetchError) throw fetchError
    const { data, error } = await supabase
      .from("trusted_partners")
      .update({ is_featured: !current.is_featured })
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return data
  }
}

// Combined CMS
export function useSupabaseCMS() {
  return {
    // Portfolio
    getAllProjects: PortfolioCMS.getAllProjects,
    getPublishedProjects: PortfolioCMS.getPublishedProjects,
    getFeaturedProjects: PortfolioCMS.getFeaturedProjects,
    getProjectById: PortfolioCMS.getProjectById,
    getProjectBySlug: PortfolioCMS.getProjectBySlug,
    addProject: PortfolioCMS.addProject,
    updateProject: PortfolioCMS.updateProject,
    deleteProject: PortfolioCMS.deleteProject,
    togglePublishStatus: PortfolioCMS.togglePublishStatus,
    toggleProjectFeaturedStatus: PortfolioCMS.toggleProjectFeaturedStatus,

    // Blog
    getAllBlogPosts: BlogCMS.getAllBlogPosts,
    getPublishedBlogPosts: BlogCMS.getPublishedBlogPosts,
    getBlogPostBySlug: BlogCMS.getBlogPostBySlug,
    addBlogPost: BlogCMS.addBlogPost,
    updateBlogPost: BlogCMS.updateBlogPost,
    deleteBlogPost: BlogCMS.deleteBlogPost,
    toggleBlogPublishStatus: BlogCMS.toggleBlogPublishStatus,
    searchBlogPosts: BlogCMS.searchBlogPosts,
    getBlogPostsByTag: BlogCMS.getBlogPostsByTag,

    // Reviews
    getAllReviews: ReviewsCMS.getAllReviews,
    getPublishedReviews: ReviewsCMS.getPublishedReviews,
    getFeaturedReviews: ReviewsCMS.getFeaturedReviews,
    addReview: ReviewsCMS.addReview,
    updateReview: ReviewsCMS.updateReview,
    deleteReview: ReviewsCMS.deleteReview,
    toggleReviewPublishStatus: ReviewsCMS.toggleReviewPublishStatus,
    toggleReviewFeaturedStatus: ReviewsCMS.toggleReviewFeaturedStatus,

    // Partners
    getAllPartners: PartnersCMS.getAllPartners,
    getPublishedPartners: PartnersCMS.getPublishedPartners,
    getFeaturedPartners: PartnersCMS.getFeaturedPartners,
    addPartner: PartnersCMS.addPartner,
    updatePartner: PartnersCMS.updatePartner,
    deletePartner: PartnersCMS.deletePartner,
    togglePartnerPublishStatus: PartnersCMS.togglePartnerPublishStatus,
    togglePartnerFeaturedStatus: PartnersCMS.togglePartnerFeaturedStatus,
  }
}
