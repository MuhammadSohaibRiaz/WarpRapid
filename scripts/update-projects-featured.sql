-- Add is_featured to projects and supporting index
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_projects_featured_published
  ON projects(is_published, is_featured);
