-- Migration 095: Add boolean columns to ocr_gp table
-- Added columns to store specific findings extracted via OCR.

ALTER TABLE public.ocr_gp
ADD COLUMN IF NOT EXISTS tiene_hipotecas boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_servidumbres boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_usufructos_uso_habitacion boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_reglamento_copropiedad boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_censos boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_embargos boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_medidas_precautorias boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_prohibiciones_voluntarias boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_prohibiciones_legales_serviu boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_interdicciones boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tiene_litigios boolean DEFAULT false;

-- Add comments for the new columns
COMMENT ON COLUMN public.ocr_gp.tiene_hipotecas IS 'Indica si el documento menciona hipotecas';
COMMENT ON COLUMN public.ocr_gp.tiene_servidumbres IS 'Indica si el documento menciona servidumbres';
COMMENT ON COLUMN public.ocr_gp.tiene_usufructos_uso_habitacion IS 'Indica si el documento menciona usufructos, uso o habitación';
COMMENT ON COLUMN public.ocr_gp.tiene_reglamento_copropiedad IS 'Indica si el documento menciona reglamento de copropiedad';
COMMENT ON COLUMN public.ocr_gp.tiene_censos IS 'Indica si el documento menciona censos';
COMMENT ON COLUMN public.ocr_gp.tiene_embargos IS 'Indica si el documento menciona embargos';
COMMENT ON COLUMN public.ocr_gp.tiene_medidas_precautorias IS 'Indica si el documento menciona medidas precautorias';
COMMENT ON COLUMN public.ocr_gp.tiene_prohibiciones_voluntarias IS 'Indica si el documento menciona prohibiciones voluntarias';
COMMENT ON COLUMN public.ocr_gp.tiene_prohibiciones_legales_serviu IS 'Indica si el documento menciona prohibiciones legales de SERVIU';
COMMENT ON COLUMN public.ocr_gp.tiene_interdicciones IS 'Indica si el documento menciona interdicciones';
COMMENT ON COLUMN public.ocr_gp.tiene_litigios IS 'Indica si el documento menciona litigios';
