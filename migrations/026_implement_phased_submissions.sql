-- Migration 026: Implement Phased Submissions
-- Adds 'fase' column to all OCR tables and updates the aggregation RPC

-- 1. Add 'fase' column to OCR tables
DO $$ 
DECLARE 
    t text;
    tables text[] := ARRAY[
        'ocr_recepcion_final', 'ocr_avaluo_fiscal', 'ocr_deuda_contribuciones', 
        'ocr_cip', 'ocr_dominio_vigente', 'ocr_expropiacion_municipal', 
        'ocr_no_expropiacion_serviu', 'ocr_gp', 'ocr_inscripcion_servidumbre', 
        'ocr_certificado_numero', 'ocr_posesion_efectiva', 'ocr_matrimonio', 
        'ocr_nacimiento', 'ocr_solteria', 'ocr_reglamento_copropiedad', 
        'ocr_rural_sag', 'ocr_escritura_cv', 'ocr_poderes', 'ocr_donacion',
        'ocr_plano_copropiedad', 'ocr_asignacion_roles', 'ocr_inscripcion_anterior',
        'ocr_impuesto_herencia', 'ocr_inscripcion_herencia', 'ocr_constitucion_sociedad',
        'ocr_causante', 'ocr_heredero'
    ];
BEGIN 
    FOREACH t IN ARRAY tables LOOP
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = t) THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS fase INTEGER DEFAULT 2', t);
        END IF;
    END LOOP;
END $$;

-- 2. Add 'fase' column to solicitud_documentos (Defaulting to 3 as it's mostly for Stage 3)
ALTER TABLE solicitud_documentos ADD COLUMN IF NOT EXISTS fase INTEGER DEFAULT 3;

-- 3. Update the RPC function to filter by fase
CREATE OR REPLACE FUNCTION public.get_operation_documents(p_numero_operacion text, p_fase integer DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_results jsonb := '[]'::jsonb;
  v_tables text[] := ARRAY[
    'ocr_recepcion_final', 
    'ocr_avaluo_fiscal', 
    'ocr_deuda_contribuciones', 
    'ocr_cip', 
    'ocr_dominio_vigente', 
    'ocr_expropiacion_municipal', 
    'ocr_no_expropiacion_serviu', 
    'ocr_gp',
    'ocr_inscripcion_servidumbre', 
    'ocr_certificado_numero', 
    'ocr_posesion_efectiva', 
    'ocr_matrimonio', 
    'ocr_nacimiento', 
    'ocr_solteria', 
    'ocr_reglamento_copropiedad', 
    'ocr_rural_sag', 
    'ocr_escritura_cv',
    'ocr_poderes',
    'ocr_donacion',
    'ocr_plano_copropiedad',
    'ocr_asignacion_roles',
    'ocr_inscripcion_anterior',
    'ocr_impuesto_herencia',
    'ocr_inscripcion_herencia',
    'ocr_constitucion_sociedad'
  ];
  v_t text;
  v_rows jsonb;
  v_query text;
BEGIN
  FOREACH v_t IN ARRAY v_tables LOOP
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = v_t) THEN
        -- Add phase filter if p_fase is provided
        v_query := format('
            SELECT jsonb_agg(jsonb_build_object(''table'', %L, ''id'', id, ''url'', documento_url, ''fase'', fase)) 
            FROM %I 
            WHERE operacion_id = %L AND documento_url IS NOT NULL', 
            v_t, v_t, p_numero_operacion);
            
        IF p_fase IS NOT NULL THEN
            v_query := v_query || format(' AND fase = %L', p_fase);
        END IF;

        BEGIN
            EXECUTE v_query INTO v_rows;
            IF v_rows IS NOT NULL THEN
                v_results := v_results || v_rows;
            END IF;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Error querying table %: %', v_t, SQLERRM;
        END;
    END IF;
  END LOOP;

  -- Add solicitud_documentos with fase filter
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'solicitud_documentos') THEN
      v_query := format('SELECT jsonb_agg(jsonb_build_object(''table'', ''solicitud_documentos'', ''id'', id, ''url'', documento_url, ''fase'', fase)) FROM solicitud_documentos WHERE operacion_id = %L AND documento_url IS NOT NULL', p_numero_operacion);
      
      IF p_fase IS NOT NULL THEN
          v_query := v_query || format(' AND fase = %L', p_fase);
      END IF;

      EXECUTE v_query INTO v_rows;
      
      IF v_rows IS NOT NULL THEN
        v_results := v_results || v_rows;
      END IF;
  END IF;
  
  RETURN v_results;
END;
$$;
