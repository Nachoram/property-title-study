-- Migración para añadir la columna direccion_asignada a ocr_certificado_numero
ALTER TABLE ocr_certificado_numero
ADD COLUMN IF NOT EXISTS direccion_asignada TEXT;
