-- Migration: Add tracking columns to additional OCR tables

BEGIN;

CREATE OR REPLACE FUNCTION add_tracking_columns_extras(tbl text) RETURNS void AS $$
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
END;
$$ LANGUAGE plpgsql;

SELECT add_tracking_columns_extras('ocr_cip');
SELECT add_tracking_columns_extras('ocr_reglamento_copropiedad');
SELECT add_tracking_columns_extras('ocr_rural_sag');
SELECT add_tracking_columns_extras('ocr_no_expropiacion_serviu');

DROP FUNCTION add_tracking_columns_extras(text);

COMMIT;
