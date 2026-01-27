-- Migration to add notaria_documento column to solicitud_documentos
ALTER TABLE public.solicitud_documentos 
ADD COLUMN IF NOT EXISTS notaria_documento TEXT;

-- Comment to describe the new column
COMMENT ON COLUMN public.solicitud_documentos.notaria_documento IS 'Nombre de la notaría asociada al documento';
