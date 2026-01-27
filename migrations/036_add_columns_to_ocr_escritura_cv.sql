-- Migration to add declaracion_pago_total and renuncia_accion_resolutoria to ocr_escritura_cv
ALTER TABLE public.ocr_escritura_cv
ADD COLUMN IF NOT EXISTS declaracion_pago_total BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS renuncia_accion_resolutoria BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN public.ocr_escritura_cv.declaracion_pago_total IS 'Indica si existe una declaración de pago total del precio en la escritura.';
COMMENT ON COLUMN public.ocr_escritura_cv.renuncia_accion_resolutoria IS 'Indica si existe renuncia a la acción resolutoria en la escritura.';
