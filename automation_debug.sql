-- Updated Function with user_id lookup
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
BEGIN
  v_bucket_id := NEW.bucket_id;
  v_name := NEW.name; 

  -- Debug log
  INSERT INTO public.debug_logs (message) VALUES ('Trigger fired. Bucket: ' || v_bucket_id || ', Name: ' || v_name);

  IF v_bucket_id <> 'legal_documents' THEN
    RETURN NEW;
  END IF;

  v_parts := string_to_array(v_name, '/');
  
  IF array_length(v_parts, 1) < 2 THEN
    RETURN NEW;
  END IF;

  v_numero_operacion := v_parts[1]; 
  v_filename := v_parts[array_length(v_parts, 1)]; 

  -- Determine table
  IF v_filename ILIKE '%recepcion%' THEN
    v_table_name := 'ocr_recepcion_final';
  ELSIF v_filename ILIKE '%avaluo%' OR v_filename ILIKE '%fiscal%' THEN
    v_table_name := 'ocr_avaluo_fiscal';
  ELSIF v_filename ILIKE '%contribuciones%' THEN
    v_table_name := 'ocr_deuda_contribuciones';
  ELSIF v_filename ILIKE '%cip%' THEN
    v_table_name := 'ocr_cip';
  ELSIF v_filename ILIKE '%vigencia%' OR v_filename ILIKE '%dominio_vigente%' THEN
    v_table_name := 'ocr_dominio_vigente';
  ELSIF v_filename ILIKE '%expropiacion_muni%' THEN
    v_table_name := 'ocr_expropiacion_municipal';
  ELSIF v_filename ILIKE '%expropiacion_serviu%' THEN
    v_table_name := 'ocr_no_expropiacion_serviu';
  ELSIF v_filename ILIKE '%gravamenes%' OR v_filename ILIKE '%hipoteca%' OR v_filename ILIKE '%gp%' THEN
    v_table_name := 'ocr_gp'; 
  ELSIF v_filename ILIKE '%inscripciones%' OR v_filename ILIKE '%inscripcion_dominio%' THEN
    v_table_name := 'ocr_inscripcion_dominio';
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
  ELSE
    INSERT INTO public.debug_logs (message) VALUES ('No mapping found for: ' || v_filename);
    RETURN NEW;
  END IF;

  -- Lookup user_id
  SELECT user_id INTO v_user_id 
  FROM public.estudios_titulos 
  WHERE numero_operacion = v_numero_operacion;

  -- Use NEW.owner as fallback if available, or fail gracefully
  IF v_user_id IS NULL THEN
      IF NEW.owner IS NOT NULL THEN
         v_user_id := NEW.owner;
      ELSE
         INSERT INTO public.debug_logs (message) VALUES ('Could not find user_id for op: ' || v_numero_operacion);
         -- Raise notice to be visible in logs
         RAISE NOTICE 'No user_id found for operation %', v_numero_operacion;
         RETURN NEW; 
      END IF;
  END IF;

  v_public_url := 'https://fxqzivgtwpuhmhwprzba.supabase.co/storage/v1/object/public/' || v_bucket_id || '/' || v_name;

  INSERT INTO public.debug_logs (message) VALUES ('Inserting into ' || v_table_name || ' for user ' || v_user_id);

  -- Insert with user_id
  v_query := format('INSERT INTO public.%I (numero_operacion, document_url, user_id) VALUES (%L, %L, %L)', 
                    v_table_name, v_numero_operacion, v_public_url, v_user_id);
                    
  EXECUTE v_query;

  INSERT INTO public.debug_logs (message) VALUES ('Success');

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  INSERT INTO public.debug_logs (message) VALUES ('Exception: ' || SQLERRM);
  RAISE NOTICE 'Error in handle_storage_upload: %', SQLERRM;
  RETURN NEW;
END;
$$;
