-- Migration: Add documentos_url to ocr_nacimiento
-- Created at: 2026-02-03
-- Description: Add documento_url column to ocr_nacimiento table as requested by user.
-- Even though OCR tables use documento_url, the user explicitly asked for documento_url again.
-- Checking current table definition, ocr_nacimiento already has documento_url in types,
-- but we ensure it exists in the DB.

BEGIN;

ALTER TABLE public.ocr_nacimiento 
ADD COLUMN IF NOT EXISTS documento_url TEXT;

COMMIT;
