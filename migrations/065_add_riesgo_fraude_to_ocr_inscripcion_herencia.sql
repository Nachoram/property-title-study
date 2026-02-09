-- Migration 065: Add riesgo_fraude to ocr_inscripcion_herencia
ALTER TABLE public.ocr_inscripcion_herencia ADD COLUMN IF NOT EXISTS riesgo_fraude TEXT;
