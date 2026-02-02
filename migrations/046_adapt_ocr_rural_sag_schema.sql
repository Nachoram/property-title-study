-- Migration 046: Adapt ocr_rural_sag schema to detailed extraction
-- Adds columns to support the new JSON structure from the OCR output

ALTER TABLE ocr_rural_sag 
ADD COLUMN IF NOT EXISTS numero_certificado TEXT,
ADD COLUMN IF NOT EXISTS fecha_emision TEXT,
ADD COLUMN IF NOT EXISTS oficina_sag TEXT,
ADD COLUMN IF NOT EXISTS nombre_predio TEXT,
ADD COLUMN IF NOT EXISTS rol_avaluo TEXT,
ADD COLUMN IF NOT EXISTS comuna TEXT,
ADD COLUMN IF NOT EXISTS propietario TEXT,
ADD COLUMN IF NOT EXISTS fojas TEXT,
ADD COLUMN IF NOT EXISTS numero TEXT,
ADD COLUMN IF NOT EXISTS anio INTEGER,
ADD COLUMN IF NOT EXISTS conservador TEXT,
ADD COLUMN IF NOT EXISTS cumple_normativa BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS advertencias_legales JSONB DEFAULT '[]'::jsonb;

-- Optional: Map existing data
UPDATE ocr_rural_sag 
SET 
    numero_certificado = COALESCE(numero_certificado, resolucion_sag),
    fecha_emision = COALESCE(fecha_emision, fecha_aprobacion)
WHERE numero_certificado IS NULL OR fecha_emision IS NULL;
