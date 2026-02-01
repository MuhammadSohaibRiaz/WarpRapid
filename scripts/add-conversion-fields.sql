-- Add high-conversion fields to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS client_description TEXT,
ADD COLUMN IF NOT EXISTS business_outcome TEXT;

-- Add comments for documentation
COMMENT ON COLUMN projects.client_description IS 'Detailed description of the client business and industry context.';
COMMENT ON COLUMN projects.business_outcome IS 'High-level business result or value proposition (e.g., "Helping X achieve Y").';
