-- Migration: Fix UUID syntax errors in solicitud_documentos
-- 1. Remove FK constraint
-- 2. Convert id, estudio_id, and doc_id_origen to TEXT
-- 3. Update types

BEGIN;

-- 1. Drop constraints and policies that might depend on these columns
ALTER TABLE public.solicitud_documentos DROP CONSTRAINT IF EXISTS solicitud_fase3_operacion_id_fkey CASCADE;
DROP POLICY IF EXISTS "Users can only access their own documents requests" ON public.solicitud_documentos;

-- 2. Modify column types
-- Convert id to text
ALTER TABLE public.solicitud_documentos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.solicitud_documentos ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.solicitud_documentos ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;

-- Convert estudio_id to text
ALTER TABLE public.solicitud_documentos ALTER COLUMN estudio_id TYPE TEXT;

-- Convert doc_id_origen to text
ALTER TABLE public.solicitud_documentos ALTER COLUMN doc_id_origen TYPE TEXT;

-- 3. Restore Policy
CREATE POLICY "Users can only access their own documents requests" ON public.solicitud_documentos
FOR ALL USING (auth.uid() = user_id);

COMMIT;
