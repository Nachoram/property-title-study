-- Migration: Refactor ocr_gp_30_anos for new JSON schema
BEGIN;

-- 1. Remove obsolete columns
ALTER TABLE public.ocr_gp_30_anos DROP COLUMN IF EXISTS lista_gravamenes;
ALTER TABLE public.ocr_gp_30_anos DROP COLUMN IF EXISTS lista_prohibiciones;
ALTER TABLE public.ocr_gp_30_anos DROP COLUMN IF EXISTS fecha_emision;

-- 2. Add new columns
ALTER TABLE public.ocr_gp_30_anos ADD COLUMN IF NOT EXISTS titulares_citados JSONB;
ALTER TABLE public.ocr_gp_30_anos ADD COLUMN IF NOT EXISTS nombre_propiedad_citada TEXT;
ALTER TABLE public.ocr_gp_30_anos ADD COLUMN IF NOT EXISTS gravamenes JSONB;
ALTER TABLE public.ocr_gp_30_anos ADD COLUMN IF NOT EXISTS prohibiciones JSONB;
ALTER TABLE public.ocr_gp_30_anos ADD COLUMN IF NOT EXISTS cbr TEXT;
ALTER TABLE public.ocr_gp_30_anos ADD COLUMN IF NOT EXISTS fecha_emision_certificado TEXT;

-- 3. Modify existing columns for consistency and schema match
-- Convert id to text
ALTER TABLE public.ocr_gp_30_anos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.ocr_gp_30_anos ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.ocr_gp_30_anos ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;

-- Convert anio to integer (user JSON shows it as numeric)
ALTER TABLE public.ocr_gp_30_anos ALTER COLUMN anio TYPE INTEGER USING (anio::integer);

COMMIT;
