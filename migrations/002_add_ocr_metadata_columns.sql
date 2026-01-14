-- Migration to add OCR metadata columns to all OCR tables
DO $$ 
DECLARE 
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name LIKE 'ocr_%'
    LOOP
        -- Agregar columna porcentaje_manuscrito si no existe
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = t AND column_name = 'porcentaje_manuscrito') THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN porcentaje_manuscrito numeric DEFAULT 0', t);
        END IF;

        -- Agregar columna riesgo_fraude si no existe
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = t AND column_name = 'riesgo_fraude') THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN riesgo_fraude text DEFAULT ''Bajo''', t);
        END IF;

        -- Agregar columna verificado si no existe
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = t AND column_name = 'verificado') THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN verificado boolean DEFAULT false', t);
        END IF;
    END LOOP;
END $$;
