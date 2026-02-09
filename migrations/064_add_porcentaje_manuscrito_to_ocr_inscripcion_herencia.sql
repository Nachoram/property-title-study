-- Migration 064: Add porcentaje_manuscrito to ocr_inscripcion_herencia
ALTER TABLE public.ocr_inscripcion_herencia ADD COLUMN IF NOT EXISTS porcentaje_manuscrito NUMERIC;
