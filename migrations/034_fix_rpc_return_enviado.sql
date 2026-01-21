-- Migration 034: Fix get_operation_documents to return 'enviado' field
-- This fixes the bug where documents are re-sent because the frontend can't track their status.

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
  FOR v_t IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name LIKE 'ocr_%'
  LOOP
    -- Check if mandatory columns exist
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = v_t AND (column_name = 'numero_operacion' OR column_name = 'operacion_id')
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = v_t AND (column_name = 'documento_url' OR column_name = 'document_url')
    ) THEN
        
        -- Handle column variations
        DECLARE
          v_url_col text;
          v_op_col text;
        BEGIN
          SELECT column_name INTO v_url_col FROM information_schema.columns WHERE table_schema = 'public' AND table_name = v_t AND column_name IN ('documento_url', 'document_url') LIMIT 1;
          SELECT column_name INTO v_op_col FROM information_schema.columns WHERE table_schema = 'public' AND table_name = v_t AND column_name IN ('numero_operacion', 'operacion_id') LIMIT 1;

          v_query := format('
              SELECT jsonb_agg(jsonb_build_object(
                ''table'', %L, 
                ''id'', id, 
                ''url'', %I, 
                ''fase'', %s,
                ''enviado'', COALESCE(enviado, FALSE)
              )) 
              FROM %I 
              WHERE %I = %L AND %I IS NOT NULL', 
              v_t, v_url_col, 
              CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'fase') THEN 'fase' ELSE 'NULL' END,
              v_t, v_op_col, p_numero_operacion, v_url_col);
              
          IF p_fase IS NOT NULL THEN
              IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'fase') THEN
                  v_query := v_query || format(' AND fase = %L', p_fase);
              ELSE
                  -- If no fase column, we assume it's fase 2 for OCR tables
                  IF p_fase != 2 THEN
                    v_query := NULL;
                  END IF;
              END IF;
          END IF;

          IF v_query IS NOT NULL THEN
            BEGIN
                EXECUTE v_query INTO v_rows;
                IF v_rows IS NOT NULL THEN
                    v_results := v_results || v_rows;
                END IF;
            EXCEPTION WHEN OTHERS THEN
                RAISE NOTICE 'Error querying table %: %', v_t, SQLERRM;
            END;
          END IF;
        END;
    END IF;
  END LOOP;

  -- 2. Gather from solicitud_documentos
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'solicitud_documentos') THEN
      v_query := format('
        SELECT jsonb_agg(jsonb_build_object(
          ''table'', ''solicitud_documentos'', 
          ''id'', id, 
          ''url'', documento_url, 
          ''fase'', fase,
          ''enviado'', COALESCE(enviado, FALSE)
        )) 
        FROM solicitud_documentos 
        WHERE operacion_id = %L AND documento_url IS NOT NULL AND estado = ''Completado''', 
        p_numero_operacion);
      
      IF p_fase IS NOT NULL THEN
          v_query := v_query || format(' AND fase = %L', p_fase);
      END IF;

      EXECUTE v_query INTO v_rows;
      
      IF v_rows IS NOT NULL THEN
        v_results := v_results || v_rows;
      END IF;
  END IF;

  -- 3. De-duplicate based on URL
  IF v_results = '[]'::jsonb THEN
    RETURN '[]'::jsonb;
  END IF;

  RETURN (
    SELECT jsonb_agg(elem)
    FROM (
      SELECT DISTINCT ON (val->>'url') val as elem
      FROM jsonb_array_elements(v_results) val
      ORDER BY val->>'url', CASE WHEN val->>'table' = 'solicitud_documentos' THEN 1 ELSE 0 END ASC, id DESC
    ) t
  );
END;
$$;
