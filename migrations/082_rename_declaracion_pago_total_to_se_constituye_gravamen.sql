-- Migration 082: Rename declaracion_pago_total to se_constituye_gravamen
-- Description: Renames the recently added column to better reflect its purpose.

ALTER TABLE public.ocr_escritura_cv 
RENAME COLUMN declaracion_pago_total TO se_constituye_gravamen;

COMMENT ON COLUMN public.ocr_escritura_cv.se_constituye_gravamen IS 'Indica si se constituye un gravamen en la escritura de compraventa.';
