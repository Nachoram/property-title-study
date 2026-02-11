-- Migration: Standardize all OCR tables
-- Date: 2026-02-11
-- Description: Updates all tables starting with 'ocr_' to retain only whitelisted columns
--              and adds three standard JSONB columns: texto_estructurado, analisis_integridad, extraccion_datos.

DO $$
DECLARE
    r RECORD;
    t text;
BEGIN
    -- 1. Add new standard columns to all OCR tables if they don't exist
    FOR t IN
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name LIKE 'ocr_%'
    LOOP
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS texto_estructurado JSONB DEFAULT NULL';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS analisis_integridad JSONB DEFAULT NULL';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS extraccion_datos JSONB DEFAULT NULL';
    END LOOP;

    -- 2. Drop all columns EXCEPT the whitelisted ones
    -- Whitelist: id, user_id, estudio_id, documento_url, numero_operacion, nombre_documento_ocr,
    --            texto_estructurado, analisis_integridad, extraccion_datos.
    -- NOTICE: 'created_at' and 'updated_at' are deliberately excluded and accepted to be dropped based on user request.
    FOR r IN
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name LIKE 'ocr_%'
          AND column_name NOT IN (
              'id', 
              'user_id', 
              'estudio_id', 
              'documento_url', 
              'numero_operacion', 
              'nombre_documento_ocr',
              'texto_estructurado', 
              'analisis_integridad', 
              'extraccion_datos'
          )
    LOOP
        -- Using CASCADE to drop dependent objects (like views or constraints involving these columns)
        EXECUTE 'ALTER TABLE ' || quote_ident(r.table_name) || ' DROP COLUMN IF EXISTS ' || quote_ident(r.column_name) || ' CASCADE';
    END LOOP;
END $$;
