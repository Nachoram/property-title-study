-- RPC Function to get all documents for an operation (Simplified to only use solicitud_documentos)
CREATE OR REPLACE FUNCTION public.get_operation_documents(p_numero_operacion text, p_fase integer DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_results jsonb := '[]'::jsonb;
  v_rows jsonb;
  v_estudio_id text;
BEGIN
  -- 0. Get the canonical estudio_id for this operation
  SELECT id INTO v_estudio_id FROM public.estudios_titulos WHERE numero_operacion = p_numero_operacion;

  -- 1. Gather ONLY from solicitud_documentos
  -- We include dbType (mapping to tipo_documento) for frontend compatibility
  SELECT jsonb_agg(jsonb_build_object(
    'table', 'solicitud_documentos', 
    'id', id, 
    'url', documento_url, 
    'fase', fase,
    'enviado', COALESCE(enviado, FALSE),
    'estudio_id', estudio_id,
    'dbType', tipo_documento
  )) 
  INTO v_rows
  FROM solicitud_documentos 
  WHERE operacion_id = p_numero_operacion 
    AND documento_url IS NOT NULL 
    AND estado = 'Completado'
    AND (p_fase IS NULL OR fase = p_fase)
    AND (v_estudio_id IS NULL OR estudio_id = v_estudio_id);
    
  IF v_rows IS NOT NULL THEN
    v_results := v_rows;
  END IF;

  RETURN v_results;
END;
$$;
