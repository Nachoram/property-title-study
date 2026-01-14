-- Migration to fix OCR numeric and integer columns that often receive unstructured text
-- This prevents issues when OCR results return currency symbols, dots, or descriptive text

BEGIN;

-- 1. Money/Amount columns
ALTER TABLE public.ocr_deuda_contribuciones 
ALTER COLUMN monto_total_pesos TYPE text USING monto_total_pesos::text;

ALTER TABLE public.ocr_avaluo_fiscal 
ALTER COLUMN avaluo_total TYPE text USING avaluo_total::text,
ALTER COLUMN exento TYPE text USING exento::text,
ALTER COLUMN evaluo_afecto TYPE text USING evaluo_afecto::text;

ALTER TABLE public.ocr_gp 
ALTER COLUMN monto_gravamen TYPE text USING monto_gravamen::text;

-- 2. Area/Surface columns
ALTER TABLE public.ocr_recepcion_final 
ALTER COLUMN superficie_total_m2 TYPE text USING superficie_total_m2::text;

ALTER TABLE public.ocr_rural_sag 
ALTER COLUMN superficie_lote TYPE text USING superficie_lote::text;

-- 3. Year columns
ALTER TABLE public.ocr_inscripcion_servidumbre 
ALTER COLUMN anio TYPE text USING anio::text;

ALTER TABLE public.ocr_gp_30_anos 
ALTER COLUMN anio TYPE text USING anio::text;

ALTER TABLE public.ocr_gp 
ALTER COLUMN anio TYPE text USING anio::text;

ALTER TABLE public.ocr_reglamento_copropiedad 
ALTER COLUMN anio_inscripcion TYPE text USING anio_inscripcion::text;

-- ocr_dominio_vigente has columns: anio, titulo_anterior_anio
ALTER TABLE public.ocr_dominio_vigente 
ALTER COLUMN anio TYPE text USING anio::text,
ALTER COLUMN titulo_anterior_anio TYPE text USING titulo_anterior_anio::text;

COMMIT;
