-- Migration 061: Add gravamenes columns to ocr_escritura_cv
-- Description: Adds columns to store encumbrance information detected in OCR.

ALTER TABLE public.ocr_escritura_cv
ADD COLUMN IF NOT EXISTS se_constituye_gravamen BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS tipos_gravamen_detectados JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS transcripcion_clausula_gravamen TEXT,
ADD COLUMN IF NOT EXISTS acreedor_o_beneficiario_gravamen TEXT;

COMMENT ON COLUMN public.ocr_escritura_cv.se_constituye_gravamen IS 'Indica si se constituye un gravamen en la escritura.';
COMMENT ON COLUMN public.ocr_escritura_cv.tipos_gravamen_detectados IS 'Tipos de gravámenes detectados (ej: SERVIDUMBRE, PROHIBICION).';
COMMENT ON COLUMN public.ocr_escritura_cv.transcripcion_clausula_gravamen IS 'Texto literal de la cláusula de gravamen.';
COMMENT ON COLUMN public.ocr_escritura_cv.acreedor_o_beneficiario_gravamen IS 'Acreedor o beneficiario del gravamen constituido.';
