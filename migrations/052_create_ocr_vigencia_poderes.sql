-- Migration: Create ocr_vigencia_poderes
-- Created at: 2026-02-02
-- Description: Table to store OCR results from "Certificado de Vigencia de Poderes" documents.

CREATE TABLE IF NOT EXISTS public.ocr_vigencia_poderes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    user_id UUID REFERENCES auth.users(id),
    
    -- Operation Context
    numero_operacion TEXT,
    documento_url TEXT,
    doc_table TEXT,
    nombre_propiedad TEXT,
    fase INTEGER,
    
    -- datos_certificado
    institucion_emisora TEXT,
    fecha_emision TEXT,
    codigo_verificacion TEXT,
    numero_certificado TEXT,
    
    -- identificacion_sociedad
    razon_social TEXT,
    registro_referencia TEXT,
    
    -- estado_vigencia
    es_vigente BOOLEAN DEFAULT FALSE,
    tiene_notas_marginales BOOLEAN DEFAULT FALSE,
    texto_certificacion TEXT,
    
    -- apoderados_mencionados
    apoderados_mencionados JSONB, -- Array of {nombre_completo}
    
    -- Traceability
    verificado BOOLEAN DEFAULT FALSE,
    completado BOOLEAN DEFAULT FALSE,
    enviado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance and lookup
CREATE INDEX IF NOT EXISTS idx_ocr_vigencia_poderes_op_id ON public.ocr_vigencia_poderes(numero_operacion);
CREATE INDEX IF NOT EXISTS idx_ocr_vigencia_poderes_user_id ON public.ocr_vigencia_poderes(user_id);
CREATE INDEX IF NOT EXISTS idx_ocr_vigencia_poderes_estudio_id ON public.ocr_vigencia_poderes(estudio_id);

-- Enable RLS
ALTER TABLE public.ocr_vigencia_poderes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own ocr_vigencia_poderes"
    ON public.ocr_vigencia_poderes
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ocr_vigencia_poderes"
    ON public.ocr_vigencia_poderes
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ocr_vigencia_poderes"
    ON public.ocr_vigencia_poderes
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ocr_vigencia_poderes"
    ON public.ocr_vigencia_poderes
    FOR DELETE
    USING (auth.uid() = user_id);

-- Permissions
GRANT ALL ON public.ocr_vigencia_poderes TO authenticated;
GRANT ALL ON public.ocr_vigencia_poderes TO service_role;
