-- Migration: Remove legacy columns from ocr_directorio
-- Created: 2026-02-11

ALTER TABLE public.ocr_directorio 
DROP COLUMN IF EXISTS rut_entidad,
DROP COLUMN IF EXISTS entidad_nombre,
DROP COLUMN IF EXISTS fecha_escritura,
DROP COLUMN IF EXISTS repertorio,
DROP COLUMN IF EXISTS fecha_acta,
DROP COLUMN IF EXISTS vigencia_hasta;
