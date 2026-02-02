-- Migration: Create ocr_inscripcion_comercio
-- Created at: 2026-02-02
-- Description: Table to store OCR results from Commerce Registry inscriptions (Inscripción de Comercio).

CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_comercio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    user_id UUID REFERENCES auth.users(id),
    
    -- Operation Context
    numero_operacion TEXT,
    documento_url TEXT,
    doc_table TEXT,
    nombre_propiedad TEXT,
    fase INTEGER,
    
    -- datos_registrales
    conservador TEXT,
    fojas TEXT,
    numero TEXT,
    anio TEXT,
    fecha_emision_copia TEXT,
    
    -- identificacion_sociedad
    razon_social TEXT,
    
    -- detalle_acuerdos_inscritos
    tipo_acto_juridico TEXT,
    resumen_acuerdos TEXT,
    administracion_extractada TEXT,
    socios_constituyentes_o_modificadores JSONB, -- Array of strings
    capital_social TEXT,
    duracion_pactada TEXT,
    
    -- estado_vigencia
    es_vigente_segun_certificado BOOLEAN DEFAULT FALSE,
    tiene_notas_marginales BOOLEAN DEFAULT FALSE,
    texto_notas_marginales TEXT,
    
    -- Traceability
    verificado BOOLEAN DEFAULT FALSE,
    completado BOOLEAN DEFAULT FALSE,
    enviado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance and lookup
CREATE INDEX IF NOT EXISTS idx_ocr_insc_comercio_op_id ON public.ocr_inscripcion_comercio(numero_operacion);
CREATE INDEX IF NOT EXISTS idx_ocr_insc_comercio_user_id ON public.ocr_inscripcion_comercio(user_id);
CREATE INDEX IF NOT EXISTS idx_ocr_insc_comercio_estudio_id ON public.ocr_inscripcion_comercio(estudio_id);

-- Enable RLS
ALTER TABLE public.ocr_inscripcion_comercio ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own ocr_inscripcion_comercio"
    ON public.ocr_inscripcion_comercio
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ocr_inscripcion_comercio"
    ON public.ocr_inscripcion_comercio
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ocr_inscripcion_comercio"
    ON public.ocr_inscripcion_comercio
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ocr_inscripcion_comercio"
    ON public.ocr_inscripcion_comercio
    FOR DELETE
    USING (auth.uid() = user_id);

-- Permissions
GRANT ALL ON public.ocr_inscripcion_comercio TO authenticated;
GRANT ALL ON public.ocr_inscripcion_comercio TO service_role;
