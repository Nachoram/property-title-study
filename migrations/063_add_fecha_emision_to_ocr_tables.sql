-- Migration 063: Add fecha_emision column to all OCR tables
-- This standardizes the emission date column across all OCR-extracted documents.

DO $$
DECLARE
    t TEXT;
    tables TEXT[] := ARRAY[
        'ocr_dominio_vigente',
        'ocr_gp',
        'ocr_avaluo_fiscal',
        'ocr_recepcion_final',
        'ocr_posesion_efectiva',
        'ocr_gasto_comun',
        'ocr_escritura_constitucion_aporte',
        'ocr_escritura_cv',
        'ocr_cedula_identidad',
        'ocr_inscripcion_herencia',
        'ocr_constitucion_sociedad',
        'ocr_plano_copropiedad',
        'ocr_asignacion_roles',
        'ocr_impuesto_herencia',
        'ocr_inscripcion_anterior',
        'ocr_nacimiento',
        'ocr_informe_no_matrimonio',
        'ocr_matrimonio',
        'ocr_rural_sag',
        'ocr_cesion_derechos_hereditario',
        'ocr_estatutos_sociales',
        'ocr_poderes',
        'ocr_vigencia_poderes',
        'ocr_inscripcion_comercio',
        'ocr_directorio',
        'ocr_donacion',
        'ocr_expropiacion_municipal',
        'ocr_no_expropiacion_serviu',
        'ocr_inscripcion_servidumbre',
        'ocr_certificado_numero',
        'ocr_deuda_contribuciones',
        'ocr_solteria',
        'ocr_reglamento_copropiedad',
        'ocr_cip'
    ];
BEGIN
    FOREACH t IN ARRAY tables
    LOOP
        -- Check if table exists before trying to alter it
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = t) THEN
            -- Add fecha_emision if it doesn't exist
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t AND column_name = 'fecha_emision') THEN
                EXECUTE format('ALTER TABLE public.%I ADD COLUMN fecha_emision TEXT', t);
            END IF;
        END IF;
    END LOOP;
END $$;
