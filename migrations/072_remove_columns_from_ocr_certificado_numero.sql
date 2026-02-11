-- Migración: Eliminar columnas redundantes de ocr_certificado_numero
-- Descripción: Limpieza de esquema solicitada por el usuario.

ALTER TABLE public.ocr_certificado_numero
DROP COLUMN IF EXISTS enviado,
DROP COLUMN IF EXISTS municipalidad,
DROP COLUMN IF EXISTS unidad_municipal,
DROP COLUMN IF EXISTS nombre_calle,
DROP COLUMN IF EXISTS numero_oficial,
DROP COLUMN IF EXISTS unidad_interior,
DROP COLUMN IF EXISTS conjunto_habitacional,
DROP COLUMN IF EXISTS entre_calles,
DROP COLUMN IF EXISTS acera,
DROP COLUMN IF EXISTS rol_avaluo,
DROP COLUMN IF EXISTS sitio_loteo,
DROP COLUMN IF EXISTS numero_solicitud;
