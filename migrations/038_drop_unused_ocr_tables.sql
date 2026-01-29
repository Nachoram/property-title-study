-- Migration: Drop unused OCR detail tables
-- User requested deletion of several tables that are no longer needed.

DROP TABLE IF EXISTS public.ocr_propietarios_actuales CASCADE;
DROP TABLE IF EXISTS public.ocr_propietarios_anteriores CASCADE;
DROP TABLE IF EXISTS public.ocr_poderes_mandantes CASCADE;
DROP TABLE IF EXISTS public.ocr_poderes_mandatarios CASCADE;
DROP TABLE IF EXISTS public.ocr_donacion_donantes CASCADE;
DROP TABLE IF EXISTS public.ocr_donacion_donatarios CASCADE;
DROP TABLE IF EXISTS public.ocr_directorio_directores CASCADE;
DROP TABLE IF EXISTS public.ocr_directorio_representantes CASCADE;
