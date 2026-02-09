-- Migration 066: Standardize OCR schema with integrity analysis and extraction metadata
-- This adds common columns to all OCR extraction tables for consistent auditing.

DO $$
DECLARE
    t TEXT;
    tables TEXT[] := ARRAY[
        'ocr_dominio_vigente',
        'ocr_gp',
        'ocr_inscripcion_herencia',
        'ocr_inscripcion_comercio',
        'ocr_posesion_efectiva',
        'ocr_rural_sag',
        'ocr_vigencia_poderes',
        'ocr_constitucion_sociedad',
        'ocr_escritura_cv',
        'ocr_estatutos_sociales',
        'ocr_deuda_contribuciones',
        'ocr_expropiacion_municipal',
        'ocr_gasto_comun',
        'ocr_impuesto_herencia',
        'ocr_informe_no_matrimonio',
        'ocr_matrimonio',
        'ocr_nacimiento',
        'ocr_no_expropiacion_serviu',
        'ocr_plano_copropiedad',
        'ocr_poderes',
        'ocr_recepcion_final',
        'ocr_reglamento_copropiedad',
        'ocr_asignacion_roles',
        'ocr_avaluo_fiscal',
        'ocr_cedula_identidad',
        'ocr_certificado_numero',
        'ocr_cesion_derechos_hereditario',
        'ocr_cip',
        'ocr_directorio'
    ];
BEGIN
    FOREACH t IN ARRAY tables
    LOOP
        -- porcentaje_manuscrito (NUMERIC)
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = t AND column_name = 'porcentaje_manuscrito'
        ) THEN
            EXECUTE format('ALTER TABLE public.%I ADD COLUMN porcentaje_manuscrito NUMERIC;', t);
        END IF;

        -- corresponde_a_propiedad_en_estudio (BOOLEAN)
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = t AND column_name = 'corresponde_a_propiedad_en_estudio'
        ) THEN
            EXECUTE format('ALTER TABLE public.%I ADD COLUMN corresponde_a_propiedad_en_estudio BOOLEAN;', t);
        END IF;

        -- riesgo_fraude (TEXT)
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = t AND column_name = 'riesgo_fraude'
        ) THEN
            EXECUTE format('ALTER TABLE public.%I ADD COLUMN riesgo_fraude TEXT;', t);
        END IF;

        -- institucion_emisora (TEXT)
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = t AND column_name = 'institucion_emisora'
        ) THEN
            EXECUTE format('ALTER TABLE public.%I ADD COLUMN institucion_emisora TEXT;', t);
        END IF;
    END LOOP;
END;
$$;
