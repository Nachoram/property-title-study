-- Migration to update ocr_escritura_cv schema
DO $$ 
BEGIN
    -- Partes Comparecientes
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_escritura_cv' AND column_name = 'partes_comparecientes') THEN
        ALTER TABLE public.ocr_escritura_cv ADD COLUMN partes_comparecientes jsonb DEFAULT '[]'::jsonb;
    END IF;

    -- Inmueble
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_escritura_cv' AND column_name = 'direccion_objeto') THEN
        ALTER TABLE public.ocr_escritura_cv ADD COLUMN direccion_objeto text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_escritura_cv' AND column_name = 'comuna_objeto') THEN
        ALTER TABLE public.ocr_escritura_cv ADD COLUMN comuna_objeto text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_escritura_cv' AND column_name = 'rol_avaluo') THEN
        ALTER TABLE public.ocr_escritura_cv ADD COLUMN rol_avaluo text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_escritura_cv' AND column_name = 'deslindes') THEN
        ALTER TABLE public.ocr_escritura_cv ADD COLUMN deslindes text;
    END IF;

    -- Datos del Negocio
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_escritura_cv' AND column_name = 'precio_venta_texto') THEN
        ALTER TABLE public.ocr_escritura_cv ADD COLUMN precio_venta_texto text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ocr_escritura_cv' AND column_name = 'titulo_anterior') THEN
        ALTER TABLE public.ocr_escritura_cv ADD COLUMN titulo_anterior text;
    END IF;
END $$;
