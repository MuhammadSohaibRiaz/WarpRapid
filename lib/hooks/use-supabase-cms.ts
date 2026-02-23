"use client"

import {
    PortfolioCMS,
    BlogCMS,
    ReviewsCMS,
    PartnersCMS,
    BlogCommentsCMS
} from "../supabase-cms"

/**
 * Client-side hook for accessing CMS operations.
 * Separated from the main CMS file to prevent build-time pre-rendering 
 * context errors in Next.js.
 */
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
        getBlogPostById: BlogCMS.getBlogPostById,
        getPublishedBlogPosts: BlogCMS.getPublishedBlogPosts,
        getBlogPostBySlug: BlogCMS.getBlogPostBySlug,
        addBlogPost: BlogCMS.addBlogPost,
        updateBlogPost: BlogCMS.updateBlogPost,
        deleteBlogPost: BlogCMS.deleteBlogPost,
        toggleBlogPublishStatus: BlogCMS.toggleBlogPublishStatus,
        searchBlogPosts: BlogCMS.searchBlogPosts,
        getBlogPostsByTag: BlogCMS.getBlogPostsByTag,
        getRelatedBlogPosts: BlogCMS.getRelatedBlogPosts,

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

        // Blog Comments
        getCommentsForPost: BlogCommentsCMS.getCommentsForPost,
        getAllComments: BlogCommentsCMS.getAllComments,
        addComment: BlogCommentsCMS.addComment,
        approveComment: BlogCommentsCMS.approveComment,
        deleteComment: BlogCommentsCMS.deleteComment,
    }
}
