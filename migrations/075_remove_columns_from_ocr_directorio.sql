-- Migration: Remove unused columns from ocr_directorio
-- Created: 2026-02-11

ALTER TABLE public.ocr_directorio 
DROP COLUMN IF EXISTS cargos_designados,
DROP COLUMN IF EXISTS poderes_conferidos,
DROP COLUMN IF EXISTS puede_vender,
DROP COLUMN IF EXISTS puede_hipotecar,
DROP COLUMN IF EXISTS puede_percibir,
DROP COLUMN IF EXISTS puede_autocontratar,
DROP COLUMN IF EXISTS limitaciones_texto,
DROP COLUMN IF EXISTS nombre_documento_ocr;
