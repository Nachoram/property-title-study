-- Migration: Solve UUID syntax and Foreign Key errors in propietarios tables
-- 1. Change id to TEXT to allow both UUIDs and RUTs as primary identifiers
-- 2. Make dv_id nullable to avoid FK errors if the parent document is not yet present
-- 3. Add numero_operacion (TEXT) to facilitate linking without UUIDs

BEGIN;

-- For ocr_propietarios_actuales
ALTER TABLE public.ocr_propietarios_actuales 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_actuales_dv_id_fkey;

ALTER TABLE public.ocr_propietarios_actuales 
ALTER COLUMN dv_id DROP NOT NULL;

ALTER TABLE public.ocr_propietarios_actuales 
ALTER COLUMN id DROP DEFAULT;

ALTER TABLE public.ocr_propietarios_actuales 
ALTER COLUMN id TYPE TEXT;

ALTER TABLE public.ocr_propietarios_actuales 
ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;

ALTER TABLE public.ocr_propietarios_actuales 
ADD COLUMN IF NOT EXISTS numero_operacion TEXT;

-- Re-add the FK but make it more flexible (nullable)
ALTER TABLE public.ocr_propietarios_actuales 
ADD CONSTRAINT ocr_propietarios_actuales_dv_id_fkey 
FOREIGN KEY (dv_id) REFERENCES public.ocr_dominio_vigente(id) ON DELETE SET NULL;


-- For ocr_propietarios_anteriores
ALTER TABLE public.ocr_propietarios_anteriores 
DROP CONSTRAINT IF EXISTS ocr_propietarios_anteriores_dv_id_fkey;

ALTER TABLE public.ocr_propietarios_anteriores 
ALTER COLUMN dv_id DROP NOT NULL;

ALTER TABLE public.ocr_propietarios_anteriores 
ALTER COLUMN id DROP DEFAULT;

ALTER TABLE public.ocr_propietarios_anteriores 
ALTER COLUMN id TYPE TEXT;

ALTER TABLE public.ocr_propietarios_anteriores 
ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;

ALTER TABLE public.ocr_propietarios_anteriores 
ADD COLUMN IF NOT EXISTS numero_operacion TEXT;

-- Re-add the FK
ALTER TABLE public.ocr_propietarios_anteriores 
ADD CONSTRAINT ocr_propietarios_anteriores_dv_id_fkey 
FOREIGN KEY (dv_id) REFERENCES public.ocr_dominio_vigente(id) ON DELETE SET NULL;

COMMIT;
