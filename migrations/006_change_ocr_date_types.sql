-- Migration to change price and date columns to text for OCR tables
DO $$ 
BEGIN
    -- Tabla ocr_escritura_cv
    ALTER TABLE public.ocr_escritura_cv 
    ALTER COLUMN fecha_escritura TYPE text USING fecha_escritura::text;
    
    ALTER TABLE public.ocr_escritura_cv 
    ALTER COLUMN precio_monto TYPE text USING precio_monto::text;

    -- Otras tablas OCR que podrían tener el mismo problema
    -- ocr_avaluo_fiscal (avaluo_total, exento, evalue_afecto son numeric)
    -- Si el usuario intenta guardar "$1.234" en una columna numérica, fallará.
    -- Por ahora solo modificamos la que falló (escritura_cv).
END $$;
