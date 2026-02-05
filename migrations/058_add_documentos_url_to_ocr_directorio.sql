-- Migration: Add documentos_url to ocr_directorio
-- Created at: 2026-02-03
-- Description: Add documentos_url column to ocr_directorio table as requested by user.

BEGIN;

ALTER TABLE public.ocr_directorio 
ADD COLUMN IF NOT EXISTS documentos_url TEXT;

-- For consistency with other OCR tables that use documento_url
-- we check if we should also have that one, but we prioritize what the user asked.
-- The user explicitly asked for 'documetos_url' (likely 'documentos_url').

COMMIT;
