-- Migration: Modify ocr_propietarios_anteriores schema
-- 1. Remove composite primary key and foreign key to ocr_propietarios
-- 2. Add standalone id column as primary key
-- 3. Ensure connection to ocr_dominio_vigente (consistent with propietarios_actuales)

BEGIN;

-- 1. Drop existing constraints
ALTER TABLE public.ocr_propietarios_anteriores 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_anteriores_pkey CASCADE;

ALTER TABLE public.ocr_propietarios_anteriores 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_anteriores_propietario_id_fkey CASCADE;

-- 2. Modify columns
ALTER TABLE public.ocr_propietarios_anteriores 
DROP COLUMN IF EXISTS propietario_id;

-- 3. Add new ID column and make it PK
ALTER TABLE public.ocr_propietarios_anteriores 
ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid();

-- Set the new PK
ALTER TABLE public.ocr_propietarios_anteriores 
ADD PRIMARY KEY (id);

-- 4. Ensure dv_id constraint
ALTER TABLE public.ocr_propietarios_anteriores 
DROP CONSTRAINT IF EXISTS ocr_dv_propietarios_anteriores_dv_id_fkey;

ALTER TABLE public.ocr_propietarios_anteriores 
ADD CONSTRAINT ocr_propietarios_anteriores_dv_id_fkey 
FOREIGN KEY (dv_id) REFERENCES public.ocr_dominio_vigente(id) ON DELETE CASCADE;

COMMIT;
