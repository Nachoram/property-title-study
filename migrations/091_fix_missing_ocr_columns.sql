-- Migration 091: Re-add naturaleza_acto to ocr_dominio_vigente
-- Description: Ensures the naturaleza_acto column exists after it was likely removed by a standardization script.

BEGIN;

ALTER TABLE public.ocr_dominio_vigente 
ADD COLUMN IF NOT EXISTS naturaleza_acto TEXT;

-- Also re-adding se_constituye_gravamen to ocr_escritura_cv if missing, as it's in the types but missing in DB
ALTER TABLE public.ocr_escritura_cv
ADD COLUMN IF NOT EXISTS se_constituye_gravamen BOOLEAN;

COMMIT;
