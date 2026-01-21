-- Migration 031: Add 'enviado' column for status tracking
-- This allows us to track which documents have already been sent to the webhook.

DO $$ 
DECLARE 
    t_name TEXT;
BEGIN 
    -- 1. Add to solicitud_documentos
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'solicitud_documentos' AND column_name = 'enviado') THEN
        ALTER TABLE public.solicitud_documentos ADD COLUMN enviado BOOLEAN DEFAULT FALSE;
    END IF;

    -- 2. Add to all OCR tables
    FOR t_name IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_name LIKE 'ocr_%'
    LOOP
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t_name AND column_name = 'enviado') THEN
            EXECUTE format('ALTER TABLE public.%I ADD COLUMN enviado BOOLEAN DEFAULT FALSE', t_name);
        END IF;
    END LOOP;
END $$;

-- 3. Update get_operation_documents RPC to include 'enviado'
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
    -- Check if columns exist in this specific table
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'operacion_id'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'documento_url'
    ) THEN
        
        -- Select documents, including 'enviado'
        v_query := format('
            SELECT jsonb_agg(jsonb_build_object(
                ''table'', %L, 
                ''id'', id, 
                ''url'', documento_url, 
                ''fase'', fase,
                ''enviado'', COALESCE(enviado, FALSE)
            )) 
            FROM %I 
            WHERE operacion_id = %L AND documento_url IS NOT NULL', 
            v_t, v_t, p_numero_operacion);
            
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
        WHERE operacion_id = %L AND documento_url IS NOT NULL', 
        p_numero_operacion);
      
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
