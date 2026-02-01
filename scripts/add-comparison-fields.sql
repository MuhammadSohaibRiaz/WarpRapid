-- Add Before vs After fields for high-conversion case studies
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS before_items TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS after_items TEXT[] DEFAULT '{}';

-- Add comments for documentation
COMMENT ON COLUMN projects.before_items IS 'List of pain points and legacy issues before the project.';
COMMENT ON COLUMN projects.after_items IS 'List of improvements and positive outcomes after the project.';
