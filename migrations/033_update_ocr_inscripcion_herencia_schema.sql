-- Migration 033: Update ocr_inscripcion_herencia table to match requested schema

-- Description: This migration adds columns to the ocr_inscripcion_herencia table
-- to store parsed data from the "Inscripción Especial de Herencia" document.

ALTER TABLE ocr_inscripcion_herencia
ADD COLUMN IF NOT EXISTS resolucion_numero TEXT,
ADD COLUMN IF NOT EXISTS resolucion_fecha TEXT,
ADD COLUMN IF NOT EXISTS resolucion_servicio_emisor TEXT,
ADD COLUMN IF NOT EXISTS causante_nombre TEXT,
ADD COLUMN IF NOT EXISTS causante_rut TEXT,
ADD COLUMN IF NOT EXISTS posesion_efectiva_fojas TEXT,
ADD COLUMN IF NOT EXISTS posesion_efectiva_numero TEXT,
ADD COLUMN IF NOT EXISTS posesion_efectiva_anio INTEGER,
ADD COLUMN IF NOT EXISTS especial_herencia_fojas TEXT,
ADD COLUMN IF NOT EXISTS especial_herencia_numero TEXT,
ADD COLUMN IF NOT EXISTS especial_herencia_anio INTEGER,
ADD COLUMN IF NOT EXISTS propiedad_direccion TEXT,
ADD COLUMN IF NOT EXISTS propiedad_comuna TEXT,
ADD COLUMN IF NOT EXISTS propiedad_rol_avaluo TEXT,
ADD COLUMN IF NOT EXISTS propiedad_deslindes TEXT,
ADD COLUMN IF NOT EXISTS propiedad_titulo_anterior TEXT,
ADD COLUMN IF NOT EXISTS nuevos_duenos JSONB;

-- Comment on columns for clarity
COMMENT ON COLUMN ocr_inscripcion_herencia.resolucion_numero IS 'Número de la resolución de origen';
COMMENT ON COLUMN ocr_inscripcion_herencia.resolucion_fecha IS 'Fecha de la resolución de origen';
COMMENT ON COLUMN ocr_inscripcion_herencia.resolucion_servicio_emisor IS 'Servicio emisor de la resolución';
COMMENT ON COLUMN ocr_inscripcion_herencia.causante_nombre IS 'Nombre del causante';
COMMENT ON COLUMN ocr_inscripcion_herencia.causante_rut IS 'RUT del causante';
COMMENT ON COLUMN ocr_inscripcion_herencia.posesion_efectiva_fojas IS 'Fojas de la inscripción de posesión efectiva';
COMMENT ON COLUMN ocr_inscripcion_herencia.posesion_efectiva_numero IS 'Número de la inscripción de posesión efectiva';
COMMENT ON COLUMN ocr_inscripcion_herencia.posesion_efectiva_anio IS 'Año de la inscripción de posesión efectiva';
COMMENT ON COLUMN ocr_inscripcion_herencia.especial_herencia_fojas IS 'Fojas de la inscripción especial de herencia';
COMMENT ON COLUMN ocr_inscripcion_herencia.especial_herencia_numero IS 'Número de la inscripción especial de herencia';
COMMENT ON COLUMN ocr_inscripcion_herencia.especial_herencia_anio IS 'Año de la inscripción especial de herencia';
COMMENT ON COLUMN ocr_inscripcion_herencia.propiedad_direccion IS 'Dirección de la propiedad (calle y número)';
COMMENT ON COLUMN ocr_inscripcion_herencia.propiedad_comuna IS 'Comuna de la propiedad';
COMMENT ON COLUMN ocr_inscripcion_herencia.propiedad_rol_avaluo IS 'Rol de avalúo de la propiedad';
COMMENT ON COLUMN ocr_inscripcion_herencia.propiedad_deslindes IS 'Deslindes resumidos de la propiedad';
COMMENT ON COLUMN ocr_inscripcion_herencia.propiedad_titulo_anterior IS 'Título anterior de la propiedad';
COMMENT ON COLUMN ocr_inscripcion_herencia.nuevos_duenos IS 'Lista de nuevos dueños en formato JSON';
