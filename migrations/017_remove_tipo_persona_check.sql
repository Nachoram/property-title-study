-- Migration: Remove tipo_persona check constraints in propietarios tables
-- This provides absolute flexibility for the tipo_persona column.

BEGIN;

-- 1. Remove constraint from ocr_propietarios_actuales
ALTER TABLE public.ocr_propietarios_actuales 
DROP CONSTRAINT IF EXISTS ocr_propietarios_actuales_tipo_persona_check;

-- 2. Remove constraint from ocr_propietarios_anteriores
ALTER TABLE public.ocr_propietarios_anteriores 
DROP CONSTRAINT IF EXISTS ocr_propietarios_anteriores_tipo_persona_check;

COMMIT;
