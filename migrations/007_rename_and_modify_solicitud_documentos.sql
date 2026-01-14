-- Migration: Rename and modify solicitud_fase3 to solicitud_documentos
BEGIN;

-- 1. Rename table
ALTER TABLE IF EXISTS public.solicitud_fase3 RENAME TO solicitud_documentos;

-- 2. Rename columns
-- Note: Re-running this migration might fail if columns are already renamed.
-- Usually migrations are run once.
ALTER TABLE public.solicitud_documentos RENAME COLUMN operacion_id TO estudio_id;
ALTER TABLE public.solicitud_documentos RENAME COLUMN numero_operacion TO operacion_id;
ALTER TABLE public.solicitud_documentos RENAME COLUMN tipo_documento TO nombre_documento;
ALTER TABLE public.solicitud_documentos RENAME COLUMN motivo TO detalle;

-- 3. Add new columns
ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS es_opcional BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS rol_persona TEXT,
ADD COLUMN IF NOT EXISTS doc_id_origen UUID,
ADD COLUMN IF NOT EXISTS subido BOOLEAN DEFAULT false;

-- 4. Update Policy Name
ALTER POLICY "Users can only access their own Phase 3 requests" ON public.solicitud_documentos 
RENAME TO "Users can only access their own documents requests";

COMMIT;
