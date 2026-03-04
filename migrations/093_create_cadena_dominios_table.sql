-- Migration 093: Create cadena_dominios table
-- Created at: 2026-02-19T12:28:52Z

CREATE TABLE IF NOT EXISTS public.cadena_dominios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    estudio_id UUID REFERENCES public.estudios_titulos(id) ON DELETE CASCADE,
    numero_operacion TEXT,
    indice_cadena INTEGER,
    causante_identificado TEXT,
    timestamp_estudio TIMESTAMPTZ,
    resumen_cadena TEXT,
    datos_correctos TEXT,
    reparo_no_correcto TEXT,
    reparo_no_exibicion JSONB,
    reparo_vigencia TEXT,
    reparo_defuncion TEXT,
    alerta_adulteracion TEXT,
    reparo_porecentage_munuscrita TEXT,
    referencia_inscripcion_anterior TEXT,
    auditoria_detalle JSONB,
    hallazgos JSONB,
    conclusion_feliu TEXT,
    documentos_faltantes JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cadena_dominios ENABLE ROW LEVEL SECURITY;

-- Add RLS Policies
CREATE POLICY "Users can view their own cadena_dominios" 
    ON public.cadena_dominios FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cadena_dominios" 
    ON public.cadena_dominios FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cadena_dominios" 
    ON public.cadena_dominios FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cadena_dominios" 
    ON public.cadena_dominios FOR DELETE 
    USING (auth.uid() = user_id);

-- Add comment explaining origin
COMMENT ON TABLE public.cadena_dominios IS 'Tabla que guarda el esquema de la cadena de dominios y hallazgos del estudio de títulos.';
