-- Migración para añadir nuevas columnas a ocr_certificado_numero
ALTER TABLE ocr_certificado_numero
ADD COLUMN IF NOT EXISTS autoridad_municipal TEXT,
ADD COLUMN IF NOT EXISTS identificacion_tributaria TEXT,
ADD COLUMN IF NOT EXISTS datos_expediente TEXT;
