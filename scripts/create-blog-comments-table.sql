-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
    id BIGSERIAL PRIMARY KEY,
    post_slug TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,
    content TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup by post slug
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_slug ON blog_comments(post_slug);

-- Index for filtering approved comments
CREATE INDEX IF NOT EXISTS idx_blog_comments_is_approved ON blog_comments(is_approved);

-- Trigger for auto-updating updated_at
CREATE TRIGGER update_blog_comments_updated_at 
    BEFORE UPDATE ON blog_comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
