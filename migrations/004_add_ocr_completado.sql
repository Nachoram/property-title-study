-- Migration to add completado column to all OCR tables
DO $$ 
DECLARE 
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name LIKE 'ocr_%'
    LOOP
        -- Agregar columna completado si no existe
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = t AND column_name = 'completado') THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN completado boolean DEFAULT false', t);
        END IF;
    END LOOP;
END $$;
