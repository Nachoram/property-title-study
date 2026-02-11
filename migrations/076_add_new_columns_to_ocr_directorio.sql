-- Migration: Add new structured columns to ocr_directorio
-- Created: 2026-02-11

ALTER TABLE public.ocr_directorio 
ADD COLUMN IF NOT EXISTS cargos_designados JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS poderes_conferidos JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS facultades_inmobiliarias JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.ocr_directorio.cargos_designados IS 'Lista de cargos y nombres designados en la sesión.';
COMMENT ON COLUMN public.ocr_directorio.poderes_conferidos IS 'Detalle de apoderados y sus facultades generales.';
COMMENT ON COLUMN public.ocr_directorio.facultades_inmobiliarias IS 'Análisis específico de facultades para vender, hipotecar, etc.';
