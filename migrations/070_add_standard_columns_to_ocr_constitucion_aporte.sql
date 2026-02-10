-- Migration 070: Add traceability and quality columns to ocr_escritura_constitucion_aporte
-- Adds porcentaje_manuscrito, corresponde_a_propiedad_en_estudio, riesgo_fraude and institucion_emisora

ALTER TABLE ocr_escritura_constitucion_aporte 
ADD COLUMN IF NOT EXISTS porcentaje_manuscrito NUMERIC,
ADD COLUMN IF NOT EXISTS corresponde_a_propiedad_en_estudio BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS riesgo_fraude TEXT,
ADD COLUMN IF NOT EXISTS institucion_emisora TEXT;

COMMENT ON COLUMN ocr_escritura_constitucion_aporte.porcentaje_manuscrito IS 'Porcentaje de texto manuscrito detectado en el documento';
COMMENT ON COLUMN ocr_escritura_constitucion_aporte.corresponde_a_propiedad_en_estudio IS 'Indica si el documento corresponde efectivamente a la propiedad analizada';
COMMENT ON COLUMN ocr_escritura_constitucion_aporte.riesgo_fraude IS 'Evaluación del riesgo de fraude detectado (Bajo, Medio, Alto)';
COMMENT ON COLUMN ocr_escritura_constitucion_aporte.institucion_emisora IS 'Nombre de la notaría o institución que emite el documento';
