-- Migration: Drop unused legacy OCR tables
-- User requested deletion of general OCR detail tables.

DROP TABLE IF EXISTS public.ocr_escritura_compradores CASCADE;
DROP TABLE IF EXISTS public.ocr_escritura_vendedores CASCADE;
DROP TABLE IF EXISTS public.ocr_propietarios CASCADE;
