-- Add documento_url column to ocr_matrimonio table
ALTER TABLE ocr_matrimonio ADD COLUMN IF NOT EXISTS documento_url TEXT;

COMMENT ON COLUMN ocr_matrimonio.documento_url IS 'URL del documento en Storage.';
