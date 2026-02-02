-- Migration 045: Adapt ocr_matrimonio schema to detailed extraction
-- Adds columns to support the new JSON structure from the OCR output

ALTER TABLE ocr_matrimonio 
ADD COLUMN IF NOT EXISTS circunscripcion TEXT,
ADD COLUMN IF NOT EXISTS numero_inscripcion TEXT,
ADD COLUMN IF NOT EXISTS anio_inscripcion INTEGER,
ADD COLUMN IF NOT EXISTS fecha_emision TEXT,
ADD COLUMN IF NOT EXISTS conyuges JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS subinscripciones JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS regimen_vigente TEXT,
ADD COLUMN IF NOT EXISTS estado_matrimonio TEXT,
ADD COLUMN IF NOT EXISTS requiere_autorizacion_conyuge_venta BOOLEAN DEFAULT false;

-- Optional: Map existing data if any (though usually these are fresh extractions)
UPDATE ocr_matrimonio 
SET 
    regimen_vigente = COALESCE(regimen_vigente, regimen_patrimonial),
    subinscripciones = COALESCE(subinscripciones, anotaciones_marginales)
WHERE regimen_vigente IS NULL OR subinscripciones IS NULL OR subinscripciones = '[]'::jsonb;
