-- Migration: Add datos_escritura and identificacion_sociedad to ocr_directorio
-- Created: 2026-02-11

ALTER TABLE public.ocr_directorio 
ADD COLUMN IF NOT EXISTS datos_escritura JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS identificacion_sociedad JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.ocr_directorio.datos_escritura IS 'Información estructurada de la escritura (notaría, fecha, repertorio).';
COMMENT ON COLUMN public.ocr_directorio.identificacion_sociedad IS 'Información estructurada de la sociedad (razón social, rut).';
