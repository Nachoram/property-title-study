-- RPC Function to get all documents for an operation
CREATE OR REPLACE FUNCTION public.get_operation_documents(p_numero_operacion text)
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
    'ocr_donacion'
  ];
  v_t text;
  v_rows jsonb;
  v_query text;
BEGIN
  FOREACH v_t IN ARRAY v_tables LOOP
    -- Check if table exists to avoid errors if some don't exist yet
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = v_t) THEN
        -- Standardized query using operacion_id and documento_url
        v_query := format('
            SELECT jsonb_agg(jsonb_build_object(''table'', %L, ''id'', id, ''url'', documento_url)) 
            FROM %I 
            WHERE operacion_id = %L AND documento_url IS NOT NULL', 
            v_t, v_t, p_numero_operacion);
            
        BEGIN
            EXECUTE v_query INTO v_rows;
            IF v_rows IS NOT NULL THEN
                v_results := v_results || v_rows;
            END IF;
        EXCEPTION WHEN OTHERS THEN
            -- Log error and continue with other tables
            RAISE NOTICE 'Error querying table %: %', v_t, SQLERRM;
        END;
    END IF;
  END LOOP;

  -- Add solicitud_documentos
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'solicitud_documentos') THEN
      EXECUTE format('SELECT jsonb_agg(jsonb_build_object(''table'', ''solicitud_documentos'', ''id'', id, ''url'', documento_url)) FROM solicitud_documentos WHERE operacion_id = %L AND documento_url IS NOT NULL', p_numero_operacion)
      INTO v_rows;
      
      IF v_rows IS NOT NULL THEN
        v_results := v_results || v_rows;
      END IF;
  END IF;
  
  RETURN v_results;
END;
$$;
