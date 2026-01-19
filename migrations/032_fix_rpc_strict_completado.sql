-- Migration 032: Fix RPC to strictly require 'Completado' status for solicitud_documentos
-- This ensures that 'Pendiente' documents (even if they have a URL) are not sent.

CREATE OR REPLACE FUNCTION public.get_operation_documents(p_numero_operacion text, p_fase integer DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_results jsonb := '[]'::jsonb;
  v_t text;
  v_rows jsonb;
  v_query text;
BEGIN
  -- 1. Dynamically gather from ALL tables starting with 'ocr_'
  -- NOTE: ocr_ tables often stay in 'Pendiente' status in the current logic, so we DO NOT filter by status 'Completado' here.
  FOR v_t IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name LIKE 'ocr_%'
  LOOP
    -- Check if columns exist in this specific table
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'operacion_id'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'documento_url'
    ) THEN
        
        v_query := format('
            SELECT jsonb_agg(jsonb_build_object(''table'', %L, ''id'', id, ''url'', documento_url, ''fase'', fase)) 
            FROM %I 
            WHERE operacion_id = %L AND documento_url IS NOT NULL', 
            v_t, v_t, p_numero_operacion);
            
        IF p_fase IS NOT NULL THEN
            -- Check if 'fase' column exists before filtering
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'fase') THEN
                v_query := v_query || format(' AND fase = %L', p_fase);
            END IF;
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

  -- 2. Gather from solicitud_documentos
  -- FIX: Strict filter for 'Completado'. Eliminates 'No Aplica' and 'Pendiente'.
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'solicitud_documentos') THEN
      v_query := format('SELECT jsonb_agg(jsonb_build_object(''table'', ''solicitud_documentos'', ''id'', id, ''url'', documento_url, ''fase'', fase)) FROM solicitud_documentos WHERE operacion_id = %L AND documento_url IS NOT NULL AND estado = ''Completado''', p_numero_operacion);
      
      IF p_fase IS NOT NULL THEN
          v_query := v_query || format(' AND fase = %L', p_fase);
      END IF;

      EXECUTE v_query INTO v_rows;
      
      IF v_rows IS NOT NULL THEN
        v_results := v_results || v_rows;
      END IF;
  END IF;

  -- 3. De-duplicate based on URL, prioritizing OCR tables over 'solicitud_documentos'
  IF v_results = '[]'::jsonb THEN
    RETURN '[]'::jsonb;
  END IF;

  RETURN (
    SELECT jsonb_agg(elem)
    FROM (
      SELECT DISTINCT ON (val->>'url') val as elem
      FROM jsonb_array_elements(v_results) val
      ORDER BY val->>'url', CASE WHEN val->>'table' = 'solicitud_documentos' THEN 1 ELSE 0 END ASC
    ) t
  );
END;
$$;
