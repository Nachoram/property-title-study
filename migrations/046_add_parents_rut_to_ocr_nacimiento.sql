-- Migration 046: Add parent RUTs to ocr_nacimiento
ALTER TABLE public.ocr_nacimiento ADD COLUMN IF NOT EXISTS rut_padre TEXT;
ALTER TABLE public.ocr_nacimiento ADD COLUMN IF NOT EXISTS rut_madre TEXT;
