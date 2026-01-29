-- Migration: Drop unused ID OCR tables
-- User requested deletion of identity-related OCR tables.

DROP TABLE IF EXISTS public.ocr_id_cedentes CASCADE;
DROP TABLE IF EXISTS public.ocr_id_propietarios CASCADE;
