-- Migration 068: Modify ocr_dominio_vigente schema to include detailed legal analysis
-- Description: Adds columns for detailed registration, property, and ownership data to match the new OCR schema.

BEGIN;

ALTER TABLE public.ocr_dominio_vigente 
ADD COLUMN IF NOT EXISTS cbr TEXT,
ADD COLUMN IF NOT EXISTS es_vigente BOOLEAN,
ADD COLUMN IF NOT EXISTS fecha_certificacion TEXT,
ADD COLUMN IF NOT EXISTS tipo_documento_vigencia TEXT,
ADD COLUMN IF NOT EXISTS inmueble_direccion TEXT,
ADD COLUMN IF NOT EXISTS inmueble_comuna TEXT,
ADD COLUMN IF NOT EXISTS inmueble_rol_avaluo TEXT,
ADD COLUMN IF NOT EXISTS inmueble_deslindes_texto TEXT,
ADD COLUMN IF NOT EXISTS titulo_fundante JSONB,
ADD COLUMN IF NOT EXISTS titulos_anteriores JSONB,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Note: fojas, numero, anio, propietarios_actuales, propietarios_anteriores, and notas_marginales already exist.

COMMIT;
