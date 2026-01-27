-- Migration: Add estudio_id to OCR tables and update existing rows
DO $$ 
DECLARE 
    t_name TEXT;
BEGIN 
    -- 1. Add estudio_id column to OCR tables if missing
    FOR t_name IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_name LIKE 'ocr_%'
    LOOP
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t_name AND column_name = 'estudio_id') THEN
            EXECUTE format('ALTER TABLE public.%I ADD COLUMN estudio_id UUID REFERENCES public.estudios_titulos(id) ON DELETE CASCADE', t_name);
        END IF;
    END LOOP;

    -- 2. Backfill estudio_id from estudios_titulos based on operacion_id
    FOR t_name IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_name LIKE 'ocr_%'
    LOOP
        -- Check if table has either operacion_id or numero_operacion
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t_name AND column_name IN ('operacion_id', 'numero_operacion')) THEN
            DECLARE
                v_op_col TEXT;
            BEGIN
                SELECT column_name INTO v_op_col FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t_name AND column_name IN ('operacion_id', 'numero_operacion') LIMIT 1;
                
                EXECUTE format('
                    UPDATE public.%I t
                    SET estudio_id = e.id
                    FROM public.estudios_titulos e
                    WHERE t.%I = e.numero_operacion
                      AND t.estudio_id IS NULL', t_name, v_op_col);
            END;
        END IF;
    END LOOP;
END $$;
