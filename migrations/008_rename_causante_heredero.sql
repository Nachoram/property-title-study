-- Migration: Rename causante and heredero to ocr_causante and ocr_heredero
BEGIN;

-- 1. Rename causante table
ALTER TABLE IF EXISTS public.causante RENAME TO ocr_causante;

-- 2. Rename heredero table
ALTER TABLE IF EXISTS public.heredero RENAME TO ocr_heredero;

-- 3. Rename policies for ocr_causante
ALTER POLICY "Users can delete own causante" ON public.ocr_causante RENAME TO "Users can delete own ocr_causante";
ALTER POLICY "Users can insert own causante" ON public.ocr_causante RENAME TO "Users can insert own ocr_causante";
ALTER POLICY "Users can update own causante" ON public.ocr_causante RENAME TO "Users can update own ocr_causante";
ALTER POLICY "Users can view own causante" ON public.ocr_causante RENAME TO "Users can view own ocr_causante";

-- 4. Rename policies for ocr_heredero
ALTER POLICY "Users can delete own heredero" ON public.ocr_heredero RENAME TO "Users can delete own ocr_heredero";
ALTER POLICY "Users can insert own heredero" ON public.ocr_heredero RENAME TO "Users can insert own ocr_heredero";
ALTER POLICY "Users can update own heredero" ON public.ocr_heredero RENAME TO "Users can update own ocr_heredero";
ALTER POLICY "Users can view own heredero" ON public.ocr_heredero RENAME TO "Users can view own ocr_heredero";

COMMIT;
