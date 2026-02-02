-- Migration to remove doc_id_origen from ocr_cedula_identidad
ALTER TABLE public.ocr_cedula_identidad DROP COLUMN IF EXISTS doc_id_origen;
