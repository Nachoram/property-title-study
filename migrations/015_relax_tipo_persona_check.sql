-- Migration: Relax tipo_persona check constraint in propietarios tables
-- This allows more flexibility in the values, including case-insensitivity and common variations.

BEGIN;

-- 1. Relax ocr_propietarios_actuales
ALTER TABLE public.ocr_propietarios_actuales 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_actuales_tipo_persona_check;

ALTER TABLE public.ocr_propietarios_actuales 
ADD CONSTRAINT ocr_propietarios_actuales_tipo_persona_check 
CHECK (LOWER(tipo_persona) IN ('natural', 'juridica', 'persona natural', 'persona juridica'));

-- 2. Relax ocr_propietarios_anteriores
ALTER TABLE public.ocr_propietarios_anteriores 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_anteriores_tipo_persona_check;

ALTER TABLE public.ocr_propietarios_anteriores 
ADD CONSTRAINT ocr_propietarios_anteriores_tipo_persona_check 
CHECK (LOWER(tipo_persona) IN ('natural', 'juridica', 'persona natural', 'persona juridica'));

COMMIT;
