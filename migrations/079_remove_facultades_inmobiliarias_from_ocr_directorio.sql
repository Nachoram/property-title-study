-- Migration: Remove facultades_inmobiliarias from ocr_directorio
-- Created: 2026-02-11

ALTER TABLE public.ocr_directorio 
DROP COLUMN IF EXISTS facultades_inmobiliarias;
