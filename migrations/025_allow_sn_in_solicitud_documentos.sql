-- Migration 025: Alter columns in solicitud_documentos to allow 'S/N' (TEXT)
-- This fixes the "invalid input syntax for type integer: 'S/N'" error.

-- Change propiedad_anio to TEXT
ALTER TABLE public.solicitud_documentos
ALTER COLUMN propiedad_anio TYPE TEXT USING propiedad_anio::TEXT;

-- Change propiedad_numero to TEXT (if not already)
ALTER TABLE public.solicitud_documentos
ALTER COLUMN propiedad_numero TYPE TEXT USING propiedad_numero::TEXT;

-- Change propiedad_fojas to TEXT (if not already)
ALTER TABLE public.solicitud_documentos
ALTER COLUMN propiedad_fojas TYPE TEXT USING propiedad_fojas::TEXT;
