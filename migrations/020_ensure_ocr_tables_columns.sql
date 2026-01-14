-- Migration: Ensure all OCR tables have necessary tracking columns
-- This ensures we can link uploaded documents to the study and operation

BEGIN;

-- Helper function to add columns if they don't exist
CREATE OR REPLACE FUNCTION add_tracking_columns(tbl text) RETURNS void AS $$
BEGIN
    -- estudio_id (link to estudios_titulos)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = tbl AND column_name = 'estudio_id') THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN estudio_id UUID', tbl);
    END IF;

    -- operacion_id (text link)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = tbl AND column_name = 'operacion_id') THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN operacion_id TEXT', tbl);
    END IF;

    -- documento_url (storage url)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = tbl AND column_name = 'documento_url') THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN documento_url TEXT', tbl);
    END IF;

    -- nombre_archivo
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = tbl AND column_name = 'nombre_archivo') THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN nombre_archivo TEXT', tbl);
    END IF;

     -- estado
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = tbl AND column_name = 'estado') THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN estado TEXT DEFAULT ''Pendiente''', tbl);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 1. Ensure tables exist (create basic structure if missing for some reason)
CREATE TABLE IF NOT EXISTS public.ocr_dominio_vigente (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_gp_30_anos (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text); -- Note: ID is text per recent changes
CREATE TABLE IF NOT EXISTS public.ocr_escritura_cv (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_deuda_contribuciones (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_avaluo_fiscal (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_recepcion_final (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_certificado_numero (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_expropiacion_municipal (id UUID PRIMARY KEY DEFAULT gen_random_uuid());

-- 2. Add columns to each table
SELECT add_tracking_columns('ocr_dominio_vigente');
SELECT add_tracking_columns('ocr_gp_30_anos');
SELECT add_tracking_columns('ocr_escritura_cv');
SELECT add_tracking_columns('ocr_deuda_contribuciones');
SELECT add_tracking_columns('ocr_avaluo_fiscal');
SELECT add_tracking_columns('ocr_recepcion_final');
SELECT add_tracking_columns('ocr_certificado_numero');
SELECT add_tracking_columns('ocr_expropiacion_municipal');

-- 3. Clean up helper
DROP FUNCTION add_tracking_columns(text);

COMMIT;
