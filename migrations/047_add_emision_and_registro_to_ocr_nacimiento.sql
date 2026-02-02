-- Migration 047: Add emission date and registration data to ocr_nacimiento
ALTER TABLE public.ocr_nacimiento ADD COLUMN IF NOT EXISTS fecha_emision TEXT;
ALTER TABLE public.ocr_nacimiento ADD COLUMN IF NOT EXISTS datos_registro TEXT;
