-- Migration: Rename ocr_inscripcion_hipoteca to ocr_gp and update schema
BEGIN;

-- 1. Rename table
ALTER TABLE IF EXISTS public.ocr_inscripcion_hipoteca RENAME TO ocr_gp;

-- 2. Add new columns for the requested schema
ALTER TABLE public.ocr_gp 
ADD COLUMN IF NOT EXISTS nombre_propiedad TEXT,
ADD COLUMN IF NOT EXISTS propietarios JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS tiene_hipotecas BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS detalles_hipotecas JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS tiene_prohibiciones BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS detalles_prohibiciones JSONB DEFAULT '[]'::jsonb;

-- 3. Update Policy Name
ALTER POLICY "policy_ocr_inscripcion_hipoteca" ON public.ocr_gp 
RENAME TO "policy_ocr_gp";

COMMIT;
