-- Migration 067: Add codigo_kardex to ocr_escritura_cv
ALTER TABLE public.ocr_escritura_cv ADD COLUMN IF NOT EXISTS codigo_kardex TEXT;
