-- Migration: Complete OCR tables coverage and tracking columns

BEGIN;

CREATE OR REPLACE FUNCTION add_tracking_columns_final(tbl text) RETURNS void AS $$
BEGIN
    -- estudio_id
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = tbl AND column_name = 'estudio_id') THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN estudio_id UUID', tbl);
    END IF;

    -- operacion_id
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = tbl AND column_name = 'operacion_id') THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN operacion_id TEXT', tbl);
    END IF;

    -- documento_url
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

    -- user_id (Adding this consistently as we missed it in some early ones)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = tbl AND column_name = 'user_id') THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN user_id UUID', tbl);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 1. Create missing tables
CREATE TABLE IF NOT EXISTS public.ocr_plano_copropiedad (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_asignacion_roles (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_anterior (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_impuesto_herencia (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_herencia (id UUID PRIMARY KEY DEFAULT gen_random_uuid());
CREATE TABLE IF NOT EXISTS public.ocr_constitucion_sociedad (id UUID PRIMARY KEY DEFAULT gen_random_uuid());

-- 2. Update existing tables
SELECT add_tracking_columns_final('ocr_inscripcion_servidumbre');
SELECT add_tracking_columns_final('ocr_poderes');

-- 3. Update new tables
SELECT add_tracking_columns_final('ocr_plano_copropiedad');
SELECT add_tracking_columns_final('ocr_asignacion_roles');
SELECT add_tracking_columns_final('ocr_inscripcion_anterior');
SELECT add_tracking_columns_final('ocr_impuesto_herencia');
SELECT add_tracking_columns_final('ocr_inscripcion_herencia');
SELECT add_tracking_columns_final('ocr_constitucion_sociedad');

DROP FUNCTION add_tracking_columns_final(text);

COMMIT;
