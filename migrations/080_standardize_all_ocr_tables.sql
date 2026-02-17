-- Migration: Standardize all OCR tables (REFINED)
-- Date: 2026-02-11
-- Description: Ensures all OCR tables have the 9 standard columns and NO others.

DO $$
DECLARE
    r RECORD;
    t text;
    col text;
    whitelisted_cols text[] := ARRAY[
        'id', 'user_id', 'estudio_id', 'documento_url', 'numero_operacion', 
        'nombre_documento_ocr', 'texto_estructurado', 'analisis_integridad', 'extraccion_datos'
    ];
BEGIN
    -- 1. Ensure all whitelisted columns exist in all OCR tables
    FOR t IN
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name LIKE 'ocr_%'
    LOOP
        -- Add missing columns with appropriate types
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid()';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS user_id UUID';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS estudio_id UUID';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS documento_url TEXT';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS numero_operacion TEXT';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS texto_estructurado JSONB DEFAULT NULL';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS analisis_integridad JSONB DEFAULT NULL';
        EXECUTE 'ALTER TABLE ' || quote_ident(t) || ' ADD COLUMN IF NOT EXISTS extraccion_datos JSONB DEFAULT NULL';
    END LOOP;

    -- 2. Drop all columns EXCEPT the whitelisted ones
    FOR r IN
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name LIKE 'ocr_%'
          AND column_name NOT IN (
              'id', 'user_id', 'estudio_id', 'documento_url', 'numero_operacion', 
              'nombre_documento_ocr', 'texto_estructurado', 'analisis_integridad', 'extraccion_datos'
          )
    LOOP
        EXECUTE 'ALTER TABLE ' || quote_ident(r.table_name) || ' DROP COLUMN IF EXISTS ' || quote_ident(r.column_name) || ' CASCADE';
    END LOOP;
END $$;
