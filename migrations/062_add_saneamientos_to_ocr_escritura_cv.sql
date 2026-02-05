-- Migration 062: Add saneamientos columns to ocr_escritura_cv
-- Description: Adds columns to store title rectifications and powers granted for curing titles.

ALTER TABLE public.ocr_escritura_cv
ADD COLUMN IF NOT EXISTS saneamientos_y_rectificaciones JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS poderes_de_saneamiento JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.ocr_escritura_cv.saneamientos_y_rectificaciones IS 'Arreglo de objetos con hallazgos de saneamiento y sus datos de escritura.';
COMMENT ON COLUMN public.ocr_escritura_cv.poderes_de_saneamiento IS 'Arreglo de objetos con los mandantes, mandatarios y facultades de saneamiento.';
