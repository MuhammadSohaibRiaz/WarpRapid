-- Add mobile_image field to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS mobile_image TEXT;

-- Optional: Add a comment for documentation
COMMENT ON COLUMN projects.mobile_image IS 'URL to mobile device screenshot for Device Mockup Hero display';
