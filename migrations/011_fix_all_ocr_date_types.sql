-- Migration to fix all remaining OCR date columns to TEXT type
-- This prevents issues when OCR results return unstructured or partial date data (e.g., just "2021")

BEGIN;

-- ocr_donacion
ALTER TABLE public.ocr_donacion 
ALTER COLUMN fecha_escritura TYPE text USING fecha_escritura::text;

-- ocr_gp_30_anos
ALTER TABLE public.ocr_gp_30_anos 
ALTER COLUMN fecha_emision TYPE text USING fecha_emision::text;

-- ocr_poderes
ALTER TABLE public.ocr_poderes 
ALTER COLUMN fecha_escritura TYPE text USING fecha_escritura::text;

-- ocr_directorio
ALTER TABLE public.ocr_directorio 
ALTER COLUMN fecha_acta TYPE text USING fecha_acta::text,
ALTER COLUMN vigencia_hasta TYPE text USING vigencia_hasta::text;

-- ocr_matrimonio
ALTER TABLE public.ocr_matrimonio 
ALTER COLUMN fecha_matrimonio TYPE text USING fecha_matrimonio::text;

-- ocr_nacimiento
ALTER TABLE public.ocr_nacimiento 
ALTER COLUMN fecha_nacimiento TYPE text USING fecha_nacimiento::text;

-- ocr_solteria
ALTER TABLE public.ocr_solteria 
ALTER COLUMN fecha_declaracion TYPE text USING fecha_declaracion::text;

-- ocr_recepcion_final
ALTER TABLE public.ocr_recepcion_final 
ALTER COLUMN fecha_emision TYPE text USING fecha_emision::text;

-- ocr_rural_sag
ALTER TABLE public.ocr_rural_sag 
ALTER COLUMN fecha_aprobacion TYPE text USING fecha_aprobacion::text;

-- ocr_dominio_vigente
ALTER TABLE public.ocr_dominio_vigente 
ALTER COLUMN fecha_inscripcion TYPE text USING fecha_inscripcion::text;

COMMIT;
