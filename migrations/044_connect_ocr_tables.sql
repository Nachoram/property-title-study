-- Migration 044: Connect OCR Tables to System
-- This migration adds missing Foreign Key constraints and updates the storage upload trigger

-- 1. Add Foreign Key constraints to OCR tables
DO $$ 
BEGIN
    -- ocr_inscripcion_herencia
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_inscripcion_herencia_estudio_id_fkey') THEN
        ALTER TABLE public.ocr_inscripcion_herencia ADD CONSTRAINT ocr_inscripcion_herencia_estudio_id_fkey FOREIGN KEY (estudio_id) REFERENCES public.estudios_titulos(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_inscripcion_herencia_user_id_fkey') THEN
        ALTER TABLE public.ocr_inscripcion_herencia ADD CONSTRAINT ocr_inscripcion_herencia_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
    END IF;

    -- ocr_constitucion_sociedad
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_constitucion_sociedad_estudio_id_fkey') THEN
        ALTER TABLE public.ocr_constitucion_sociedad ADD CONSTRAINT ocr_constitucion_sociedad_estudio_id_fkey FOREIGN KEY (estudio_id) REFERENCES public.estudios_titulos(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_constitucion_sociedad_user_id_fkey') THEN
        ALTER TABLE public.ocr_constitucion_sociedad ADD CONSTRAINT ocr_constitucion_sociedad_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
    END IF;

    -- ocr_plano_copropiedad
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_plano_copropiedad_estudio_id_fkey') THEN
        ALTER TABLE public.ocr_plano_copropiedad ADD CONSTRAINT ocr_plano_copropiedad_estudio_id_fkey FOREIGN KEY (estudio_id) REFERENCES public.estudios_titulos(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_plano_copropiedad_user_id_fkey') THEN
        ALTER TABLE public.ocr_plano_copropiedad ADD CONSTRAINT ocr_plano_copropiedad_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
    END IF;

    -- ocr_asignacion_roles
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_asignacion_roles_estudio_id_fkey') THEN
        ALTER TABLE public.ocr_asignacion_roles ADD CONSTRAINT ocr_asignacion_roles_estudio_id_fkey FOREIGN KEY (estudio_id) REFERENCES public.estudios_titulos(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_asignacion_roles_user_id_fkey') THEN
        ALTER TABLE public.ocr_asignacion_roles ADD CONSTRAINT ocr_asignacion_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
    END IF;

    -- ocr_impuesto_herencia
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_impuesto_herencia_estudio_id_fkey') THEN
        ALTER TABLE public.ocr_impuesto_herencia ADD CONSTRAINT ocr_impuesto_herencia_estudio_id_fkey FOREIGN KEY (estudio_id) REFERENCES public.estudios_titulos(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_impuesto_herencia_user_id_fkey') THEN
        ALTER TABLE public.ocr_impuesto_herencia ADD CONSTRAINT ocr_impuesto_herencia_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
    END IF;

    -- ocr_inscripcion_anterior
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_inscripcion_anterior_estudio_id_fkey') THEN
        ALTER TABLE public.ocr_inscripcion_anterior ADD CONSTRAINT ocr_inscripcion_anterior_estudio_id_fkey FOREIGN KEY (estudio_id) REFERENCES public.estudios_titulos(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ocr_inscripcion_anterior_user_id_fkey') THEN
        ALTER TABLE public.ocr_inscripcion_anterior ADD CONSTRAINT ocr_inscripcion_anterior_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
    END IF;
END $$;

-- 2. Update handle_storage_upload trigger function
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
  v_estudio_id uuid;
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
    -- Special case: might be 'inscripcion_anterior'
    IF v_filename ILIKE '%anterior%' THEN
      v_table_name := 'ocr_inscripcion_anterior';
    ELSE
      v_table_name := 'ocr_dominio_vigente';
    END IF;
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
    -- Special case: might be 'impuesto_herencia' or 'inscripcion_herencia'
    IF v_filename ILIKE '%impuesto%' THEN
      v_table_name := 'ocr_impuesto_herencia';
    ELSE
      v_table_name := 'ocr_inscripcion_herencia';
    END IF;
  ELSIF v_filename ILIKE '%constitucion_sociedad%' OR v_filename ILIKE '%escritura_constitucion%' THEN
    v_table_name := 'ocr_constitucion_sociedad';
  ELSIF v_filename ILIKE '%asignacion_roles%' THEN
    v_table_name := 'ocr_asignacion_roles';
  ELSE
    INSERT INTO public.debug_logs (message) VALUES ('No matching table found for file: ' || v_filename);
    RETURN NEW;
  END IF;

  -- 1. Lookup user_id and estudio_id from estudios_titulos
  SELECT user_id, id INTO v_user_id, v_estudio_id 
  FROM public.estudios_titulos 
  WHERE numero_operacion = v_numero_operacion;

  -- 2. Detect fase from solicitud_documentos
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

  -- 3. Insert into OCR table
  -- Note: We check if columns exist dynamically in case some tables don't have them yet
  -- but our migration ensures these 6 DO have them.
  v_query := format('INSERT INTO public.%I (numero_operacion, documento_url, user_id, estudio_id, fase) VALUES (%L, %L, %L, %L, %L)', 
                    v_table_name, v_numero_operacion, v_public_url, v_user_id, v_estudio_id, v_fase);
                     
  BEGIN
    EXECUTE v_query;
  EXCEPTION WHEN OTHERS THEN
    -- Fallback for tables that might not have all columns yet (though migration addresses most)
    INSERT INTO public.debug_logs (message) VALUES ('Error inserting into ' || v_table_name || ': ' || SQLERRM || '. Trying fallback.');
    
    v_query := format('INSERT INTO public.%I (numero_operacion, documento_url, user_id) VALUES (%L, %L, %L)', 
                      v_table_name, v_numero_operacion, v_public_url, v_user_id);
    EXECUTE v_query;
  END;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  INSERT INTO public.debug_logs (message) VALUES ('Error in handle_storage_upload: ' || SQLERRM);
  RETURN NEW;
END;
$$;
