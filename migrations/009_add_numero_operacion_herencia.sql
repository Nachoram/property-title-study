-- Migration: Add numero_operacion to ocr_causante and ocr_heredero
BEGIN;

-- 1. Add column to ocr_causante
ALTER TABLE IF EXISTS public.ocr_causante 
ADD COLUMN IF NOT EXISTS numero_operacion TEXT;

-- 2. Add column to ocr_heredero
ALTER TABLE IF EXISTS public.ocr_heredero 
ADD COLUMN IF NOT EXISTS numero_operacion TEXT;

-- 3. Create indexes for performance (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_ocr_causante_num_op ON public.ocr_causante(numero_operacion);
CREATE INDEX IF NOT EXISTS idx_ocr_heredero_num_op ON public.ocr_heredero(numero_operacion);

COMMIT;
