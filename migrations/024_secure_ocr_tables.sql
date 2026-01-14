-- Migration: Enable RLS and add policies for new OCR tables

BEGIN;

CREATE OR REPLACE FUNCTION secure_ocr_table(tbl text) RETURNS void AS $$
BEGIN
    -- Enable RLS
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);

    -- Create Policy if not exists (checking by name convention policy_<table_name>)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = tbl AND policyname = format('policy_%s', tbl)) THEN
        EXECUTE format('CREATE POLICY "policy_%s" ON %I FOR ALL USING (auth.uid() = user_id)', tbl, tbl);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Secure the newly created/touched tables
SELECT secure_ocr_table('ocr_plano_copropiedad');
SELECT secure_ocr_table('ocr_asignacion_roles');
SELECT secure_ocr_table('ocr_inscripcion_anterior');
SELECT secure_ocr_table('ocr_impuesto_herencia');
SELECT secure_ocr_table('ocr_inscripcion_herencia');
SELECT secure_ocr_table('ocr_constitucion_sociedad');
SELECT secure_ocr_table('ocr_cip');
SELECT secure_ocr_table('ocr_reglamento_copropiedad');
SELECT secure_ocr_table('ocr_rural_sag');
SELECT secure_ocr_table('ocr_no_expropiacion_serviu');
SELECT secure_ocr_table('ocr_posesion_efectiva');
SELECT secure_ocr_table('ocr_certificado_numero');
SELECT secure_ocr_table('ocr_recepcion_final');
SELECT secure_ocr_table('ocr_expropiacion_municipal');
SELECT secure_ocr_table('ocr_deuda_contribuciones');
SELECT secure_ocr_table('ocr_avaluo_fiscal');
SELECT secure_ocr_table('ocr_escritura_cv');

DROP FUNCTION secure_ocr_table(text);

COMMIT;
