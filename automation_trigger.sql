-- Function to handle new file uploads in storage
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

  -- Only process 'legal_documents' bucket
  IF v_bucket_id <> 'legal_documents' THEN
    RETURN NEW;
  END IF;

  -- Split path to get operation number and filename
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
  ELSE
    INSERT INTO public.debug_logs (message) VALUES ('No matching table found for file: ' || v_filename);
    RETURN NEW;
  END IF;

  -- 1. Lookup user_id from estudios_titulos
  SELECT user_id INTO v_user_id 
  FROM public.estudios_titulos 
  WHERE numero_operacion = v_numero_operacion;

  -- Fallback if not found (optional, or log warning)
  IF v_user_id IS NULL THEN
      INSERT INTO public.debug_logs (message) VALUES ('Warning: user_id not found for operation ' || v_numero_operacion);
      -- We can still proceed if the table allows NULL user_id, 
      -- or we can try to get it from NEW.owner if that was populated (often it is the auth.uid())
      v_user_id := NEW.owner; 
  END IF;

  v_public_url := 'https://fxqzivgtwpuhmhwprzba.supabase.co/storage/v1/object/public/' || v_bucket_id || '/' || v_name;
  
  -- Log attempt
  INSERT INTO public.debug_logs (message) VALUES ('Inserting into ' || v_table_name || ' : ' || v_filename || ' User: ' || COALESCE(v_user_id::text, 'NULL'));

  -- 2. Insert with user_id
  v_query := format('INSERT INTO public.%I (numero_operacion, document_url, user_id) VALUES (%L, %L, %L)', 
                    v_table_name, v_numero_operacion, v_public_url, v_user_id);
                    
  EXECUTE v_query;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  INSERT INTO public.debug_logs (message) VALUES ('Error in handle_storage_upload: ' || SQLERRM);
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS on_storage_upload ON storage.objects;

CREATE TRIGGER on_storage_upload
AFTER INSERT ON storage.objects
FOR EACH ROW
EXECUTE FUNCTION public.handle_storage_upload();
