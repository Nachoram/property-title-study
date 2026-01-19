-- Migration 033: Fix Phase 3 Submission and Trigger Logic
-- 1. Update handle_storage_upload to detect fase from solicitud_documentos
-- 2. Refine get_operation_documents to be more robust with phases

CREATE OR REPLACE FUNCTION public.handle_storage_upload()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_bucket_id text;
  v_name text;
  v_parts text[];
  v_numero_operacion text;
  v_filename text;
  v_table_name text;
  v_public_url text;
  v_query text;
  v_user_id uuid;
  v_fase integer := 2; -- Default to 2
BEGIN
  v_bucket_id := NEW.bucket_id;
  v_name := NEW.name; 

  -- Only process 'legal_documents' bucket
  IF v_bucket_id <> 'legal_documents' THEN
    RETURN NEW;
  END IF;

  -- Split path to get operation number and filename
  -- Format: [numero_operacion]/[filename]
  v_parts := string_to_array(v_name, '/');
  
  IF array_length(v_parts, 1) < 2 THEN
    RETURN NEW;
  END IF;

  v_numero_operacion := v_parts[1]; 
  v_filename := v_parts[array_length(v_parts, 1)]; 

  -- Determine table based on filename content
  IF v_filename ILIKE '%recepcion%' THEN
    v_table_name := 'ocr_recepcion_final';
  ELSIF v_filename ILIKE '%avaluo%' OR v_filename ILIKE '%fiscal%' THEN
    v_table_name := 'ocr_avaluo_fiscal';
  ELSIF v_filename ILIKE '%contribuciones%' THEN
    v_table_name := 'ocr_deuda_contribuciones';
  ELSIF v_filename ILIKE '%cip%' THEN
    v_table_name := 'ocr_cip';
  ELSIF v_filename ILIKE '%vigencia%' OR v_filename ILIKE '%dominio_vigente%' OR v_filename ILIKE '%inscripcion%' OR v_filename ILIKE '%titulo%' THEN
    v_table_name := 'ocr_dominio_vigente';
  ELSIF v_filename ILIKE '%expropiacion_muni%' THEN
    v_table_name := 'ocr_expropiacion_municipal';
  ELSIF v_filename ILIKE '%expropiacion_serviu%' THEN
    v_table_name := 'ocr_no_expropiacion_serviu';
  ELSIF v_filename ILIKE '%gravamenes%' OR v_filename ILIKE '%hipoteca%' OR v_filename ILIKE '%gp%' THEN
    v_table_name := 'ocr_gp'; 
  ELSIF v_filename ILIKE '%numero%' OR v_filename ILIKE '%certificado_numero%' THEN
    v_table_name := 'ocr_certificado_numero';
  ELSIF v_filename ILIKE '%posesion%' THEN
    v_table_name := 'ocr_posesion_efectiva';
  ELSIF v_filename ILIKE '%matrimonio%' THEN
    v_table_name := 'ocr_matrimonio';
  ELSIF v_filename ILIKE '%nacimiento%' THEN
    v_table_name := 'ocr_nacimiento';
  ELSIF v_filename ILIKE '%solteria%' THEN
    v_table_name := 'ocr_solteria';
  ELSIF v_filename ILIKE '%reglamento%' THEN
    v_table_name := 'ocr_reglamento_copropiedad';
  ELSIF v_filename ILIKE '%rural%' OR v_filename ILIKE '%sag%' THEN
    v_table_name := 'ocr_rural_sag';
  ELSIF v_filename ILIKE '%compraventa%' OR v_filename ILIKE '%escritura%' THEN
    v_table_name := 'ocr_escritura_cv';
  ELSIF v_filename ILIKE '%servidumbre%' THEN
    v_table_name := 'ocr_inscripcion_servidumbre';
  ELSIF v_filename ILIKE '%poderes%' THEN
    v_table_name := 'ocr_poderes';
  ELSIF v_filename ILIKE '%donacion%' THEN
    v_table_name := 'ocr_donacion';
  ELSIF v_filename ILIKE '%gasto_comun%' OR v_filename ILIKE '%gastos_comunes%' THEN
    v_table_name := 'ocr_gasto_comun';
  ELSIF v_filename ILIKE '%plano_copropiedad%' THEN
    v_table_name := 'ocr_plano_copropiedad';
  ELSIF v_filename ILIKE '%herencia%' THEN
    v_table_name := 'ocr_inscripcion_herencia';
  ELSE
    INSERT INTO public.debug_logs (message) VALUES ('No matching table found for file: ' || v_filename);
    RETURN NEW;
  END IF;

  -- 1. Lookup user_id and maybe study_id from estudios_titulos
  SELECT user_id INTO v_user_id 
  FROM public.estudios_titulos 
  WHERE numero_operacion = v_numero_operacion;

  -- 2. Detect fase from solicitud_documentos
  -- We look for a request with the same operacion_id where the name or type matches the filename pattern
  -- This is a bit heuristic but better than hardcoded 2.
  SELECT fase INTO v_fase
  FROM public.solicitud_documentos
  WHERE operacion_id = v_numero_operacion
    AND (
      v_filename ILIKE '%' || tipo_documento || '%'
      OR v_filename ILIKE '%' || replace(nombre_documento, ' ', '_') || '%'
    )
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_fase IS NULL THEN
    v_fase := 2; -- Fallback
  END IF;

  v_public_url := 'https://fxqzivgtwpuhnmgprzba.supabase.co/storage/v1/object/public/' || v_bucket_id || '/' || v_name;
  
  -- Log attempt
  INSERT INTO public.debug_logs (message) VALUES ('Inserting into ' || v_table_name || ' (Fase ' || v_fase || '): ' || v_filename);

  -- 3. Insert into OCR table with fase
  v_query := format('INSERT INTO public.%I (numero_operacion, documento_url, user_id, fase) VALUES (%L, %L, %L, %L)', 
                    v_table_name, v_numero_operacion, v_public_url, v_user_id, v_fase);
                    
  BEGIN
    EXECUTE v_query;
  EXCEPTION WHEN OTHERS THEN
    -- If 'fase' column doesn't exist, try without it
    IF SQLSTATE = '42703' THEN
       v_query := format('INSERT INTO public.%I (numero_operacion, documento_url, user_id) VALUES (%L, %L, %L)', 
                         v_table_name, v_numero_operacion, v_public_url, v_user_id);
       EXECUTE v_query;
    ELSE
       RAISE;
    END IF;
  END;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  INSERT INTO public.debug_logs (message) VALUES ('Error in handle_storage_upload: ' || SQLERRM);
  RETURN NEW;
END;
$$;

-- Refine RPC to be more strict with phases and check for column existence
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
        WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'numero_operacion'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = v_t AND (column_name = 'documento_url' OR column_name = 'document_url')
    ) THEN
        
        -- Handle both 'documento_url' and 'document_url'
        DECLARE
          v_url_col text := 'documento_url';
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'documento_url') THEN
            v_url_col := 'document_url';
          END IF;

          v_query := format('
              SELECT jsonb_agg(jsonb_build_object(''table'', %L, ''id'', id, ''url'', %I, ''fase'', %s)) 
              FROM %I 
              WHERE numero_operacion = %L AND %I IS NOT NULL', 
              v_t, v_url_col, 
              CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'fase') THEN 'fase' ELSE 'NULL' END,
              v_t, p_numero_operacion, v_url_col);
              
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
      v_query := format('SELECT jsonb_agg(jsonb_build_object(''table'', ''solicitud_documentos'', ''id'', id, ''url'', documento_url, ''fase'', fase)) FROM solicitud_documentos WHERE operacion_id = %L AND documento_url IS NOT NULL AND estado = ''Completado''', p_numero_operacion);
      
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
      ORDER BY val->>'url', CASE WHEN val->>'table' = 'solicitud_documentos' THEN 1 ELSE 0 END ASC
    ) t
  );
END;
$$;
