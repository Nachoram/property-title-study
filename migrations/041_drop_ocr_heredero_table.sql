-- Migration: Drop unused ocr_heredero table
-- User requested deletion of the ocr_heredero detail table.
-- Succession data is now managed within JSONB columns in ocr_posesion_efectiva.

DROP TABLE IF EXISTS public.ocr_heredero CASCADE;
