-- Migration 083: Add naturaleza_acto to ocr_dominio_vigente
-- Description: Adds a specific column to track the nature of the act in the dominance certificate.

BEGIN;

ALTER TABLE public.ocr_dominio_vigente 
ADD COLUMN IF NOT EXISTS naturaleza_acto TEXT;

COMMIT;
