-- Migration 047: Adapt ocr_poderes schema to detailed extraction
-- Adds columns to support the new JSON structure from the OCR output

ALTER TABLE ocr_poderes 
ADD COLUMN IF NOT EXISTS repertorio TEXT,
ADD COLUMN IF NOT EXISTS clasificacion_poder TEXT,
ADD COLUMN IF NOT EXISTS mandantes JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS mandatarios JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS forma_actuacion_mandatarios TEXT,
ADD COLUMN IF NOT EXISTS inmueble_direccion TEXT,
ADD COLUMN IF NOT EXISTS inmueble_comuna TEXT,
ADD COLUMN IF NOT EXISTS inmueble_fojas TEXT,
ADD COLUMN IF NOT EXISTS inmueble_numero TEXT,
ADD COLUMN IF NOT EXISTS inmueble_anio TEXT,
ADD COLUMN IF NOT EXISTS inmueble_conservador TEXT,
ADD COLUMN IF NOT EXISTS inmueble_deslindes TEXT,
ADD COLUMN IF NOT EXISTS puede_vender BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS puede_percibir BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS puede_hipotecar BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS puede_autocontratar BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS vigencia_texto TEXT;

-- Optional: Map existing data
UPDATE ocr_poderes 
SET 
    clasificacion_poder = COALESCE(clasificacion_poder, tipo_poder),
    vigencia_texto = COALESCE(vigencia_texto, vigencia_ref)
WHERE clasificacion_poder IS NULL OR vigencia_texto IS NULL;
