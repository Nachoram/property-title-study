-- Migration: Create estudio_documentos_aislados
-- Created at: 2026-02-05
-- Description: Table to store detailed analysis of isolated documents in a study.

CREATE TABLE IF NOT EXISTS public.estudio_documentos_aislados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudio_id UUID REFERENCES public.estudios_titulos(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    
    tipo_documento TEXT,
    estado_revision TEXT,
    texto_hallazgo TEXT,
    analisis_detalle TEXT,
    institucion TEXT,
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_est_doc_aislados_estudio_id ON public.estudio_documentos_aislados(estudio_id);
CREATE INDEX IF NOT EXISTS idx_est_doc_aislados_user_id ON public.estudio_documentos_aislados(user_id);

-- Enable RLS
ALTER TABLE public.estudio_documentos_aislados ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own documentos aislados"
    ON public.estudio_documentos_aislados
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documentos aislados"
    ON public.estudio_documentos_aislados
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documentos aislados"
    ON public.estudio_documentos_aislados
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documentos aislados"
    ON public.estudio_documentos_aislados
    FOR DELETE
    USING (auth.uid() = user_id);

-- Permissions
GRANT ALL ON public.estudio_documentos_aislados TO authenticated;
GRANT ALL ON public.estudio_documentos_aislados TO service_role;
