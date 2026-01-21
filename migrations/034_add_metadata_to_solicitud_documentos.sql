-- Migration to add metadata columns to solicitud_documentos based on user schema request
-- No existing columns are deleted.

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS doc_id_origen UUID;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS rol_persona TEXT;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS doc_tipo TEXT;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS doc_entidad TEXT;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS doc_fecha DATE;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS doc_repertorio TEXT;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS doc_resolucion TEXT;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS doc_rol TEXT;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS doc_plano TEXT;

ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS propiedad_comuna TEXT;

-- Comments to describe the new columns
COMMENT ON COLUMN public.solicitud_documentos.doc_id_origen IS 'UUID del documento de origen si aplica';
COMMENT ON COLUMN public.solicitud_documentos.rol_persona IS 'Rol de la persona asociada (ej: PROPIEDAD)';
COMMENT ON COLUMN public.solicitud_documentos.doc_tipo IS 'Tipo interno del documento (ej: JUDICIAL, PLANO, INSCRIPCION)';
COMMENT ON COLUMN public.solicitud_documentos.doc_entidad IS 'Entidad emisora del documento';
COMMENT ON COLUMN public.solicitud_documentos.doc_fecha IS 'Fecha de emisión o registro del documento';
COMMENT ON COLUMN public.solicitud_documentos.doc_repertorio IS 'Número de repertorio si aplica';
COMMENT ON COLUMN public.solicitud_documentos.doc_resolucion IS 'Número de resolución si aplica';
COMMENT ON COLUMN public.solicitud_documentos.doc_rol IS 'Número de rol si aplica';
COMMENT ON COLUMN public.solicitud_documentos.doc_plano IS 'Número de plano si aplica';
COMMENT ON COLUMN public.solicitud_documentos.propiedad_comuna IS 'Comuna del Conservador de Bienes Raíces o ubicación';
