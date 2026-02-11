-- Migration 081: Add declaracion_pago_total to ocr_escritura_cv
-- Description: Adds a boolean column to indicate if the total payment declaration exists in the deed.

ALTER TABLE public.ocr_escritura_cv
ADD COLUMN IF NOT EXISTS declaracion_pago_total BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN public.ocr_escritura_cv.declaracion_pago_total IS 'Indica si existe una declaración de pago total en la escritura de compraventa.';
