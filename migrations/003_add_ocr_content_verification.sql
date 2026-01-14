-- Migration to add verificacion_titulo_contenido column to all OCR tables
DO $$ 
DECLARE 
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name LIKE 'ocr_%'
    LOOP
        -- Agregar columna verificacion_titulo_contenido si no existe
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = t AND column_name = 'verificacion_titulo_contenido') THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN verificacion_titulo_contenido text', t);
        END IF;
    END LOOP;
END $$;
