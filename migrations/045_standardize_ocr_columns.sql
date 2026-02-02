-- Migration 045: Standardize OCR Column Names
-- Add numero_operacion to tables that currently only use operacion_id

DO $$
BEGIN
    -- ocr_inscripcion_herencia
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_inscripcion_herencia' AND column_name = 'numero_operacion') THEN
        ALTER TABLE public.ocr_inscripcion_herencia ADD COLUMN numero_operacion TEXT;
        UPDATE public.ocr_inscripcion_herencia SET numero_operacion = operacion_id WHERE numero_operacion IS NULL;
    END IF;

    -- ocr_constitucion_sociedad
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_constitucion_sociedad' AND column_name = 'numero_operacion') THEN
        ALTER TABLE public.ocr_constitucion_sociedad ADD COLUMN numero_operacion TEXT;
        UPDATE public.ocr_constitucion_sociedad SET numero_operacion = operacion_id WHERE numero_operacion IS NULL;
    END IF;

    -- ocr_plano_copropiedad
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_plano_copropiedad' AND column_name = 'numero_operacion') THEN
        ALTER TABLE public.ocr_plano_copropiedad ADD COLUMN numero_operacion TEXT;
        UPDATE public.ocr_plano_copropiedad SET numero_operacion = operacion_id WHERE numero_operacion IS NULL;
    END IF;

    -- ocr_asignacion_roles
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_asignacion_roles' AND column_name = 'numero_operacion') THEN
        ALTER TABLE public.ocr_asignacion_roles ADD COLUMN numero_operacion TEXT;
        UPDATE public.ocr_asignacion_roles SET numero_operacion = operacion_id WHERE numero_operacion IS NULL;
    END IF;

    -- ocr_impuesto_herencia
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_impuesto_herencia' AND column_name = 'numero_operacion') THEN
        ALTER TABLE public.ocr_impuesto_herencia ADD COLUMN numero_operacion TEXT;
        UPDATE public.ocr_impuesto_herencia SET numero_operacion = operacion_id WHERE numero_operacion IS NULL;
    END IF;

    -- ocr_inscripcion_anterior
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_inscripcion_anterior' AND column_name = 'numero_operacion') THEN
        ALTER TABLE public.ocr_inscripcion_anterior ADD COLUMN numero_operacion TEXT;
        UPDATE public.ocr_inscripcion_anterior SET numero_operacion = operacion_id WHERE numero_operacion IS NULL;
    END IF;
END $$;
