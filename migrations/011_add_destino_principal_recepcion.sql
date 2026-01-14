-- Migration 011: Add destino_principal to ocr_recepcion_final
ALTER TABLE public.ocr_recepcion_final 
ADD COLUMN destino_principal TEXT;
