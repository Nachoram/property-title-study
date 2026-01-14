-- Migration: Modify ocr_propietarios_actuales schema
-- 1. Remove composite primary key and foreign key to ocr_propietarios
-- 2. Add standalone id column as primary key
-- 3. Ensure connection to ocr_dominio_vigente

BEGIN;

-- 1. Drop existing constraints
-- We need to find the correct constraint name for the composite PK. 
-- Based on previous tool calls, it's 'ocr_dv_propietarios_actuales_pkey'
ALTER TABLE public.ocr_propietarios_actuales 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_actuales_pkey;

ALTER TABLE public.ocr_propietarios_actuales 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_actuales_propietario_id_fkey;

-- 2. Modify columns
ALTER TABLE public.ocr_propietarios_actuales 
DROP COLUMN IF EXISTS propietario_id;

-- 3. Add new ID column and make it PK
-- If there are existing rows, we need to generate UUIDs for them.
ALTER TABLE public.ocr_propietarios_actuales 
ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid();

-- Set the new PK
ALTER TABLE public.ocr_propietarios_actuales 
ADD PRIMARY KEY (id);

-- 4. Ensure dv_id constraint (it was already a FK, but let's make sure it's correct)
-- Dropping and recreating to be sure of the name and target
ALTER TABLE public.ocr_propietarios_actuales 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_actuales_dv_id_fkey;

ALTER TABLE public.ocr_propietarios_actuales 
ADD CONSTRAINT ocr_propietarios_actuales_dv_id_fkey 
FOREIGN KEY (dv_id) REFERENCES public.ocr_dominio_vigente(id) ON DELETE CASCADE;

COMMIT;
