-- Migration: Create ocr_estatutos_sociales
-- Created at: 2026-02-02
-- Description: Table to store OCR results from social statutes documents (Estatutos Sociales).

CREATE TABLE IF NOT EXISTS public.ocr_estatutos_sociales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    user_id UUID REFERENCES auth.users(id),
    
    -- Operation Context
    numero_operacion TEXT,
    documento_url TEXT,
    doc_table TEXT,
    nombre_propiedad TEXT,
    fase INTEGER,
    
    -- identificacion_sociedad
    razon_social TEXT,
    rut_sociedad TEXT,
    tipo_sociedad TEXT,
    es_empresa_en_un_dia BOOLEAN DEFAULT FALSE,
    
    -- datos_empresa_en_un_dia
    codigo_verificacion_cve TEXT,
    fecha_emision_documento TEXT,
    numero_atencion TEXT,
    
    -- administracion
    tipo_administracion TEXT,
    representantes JSONB, -- Array of {nombre, rut, cargo}
    forma_ejercicio TEXT,
    
    -- facultades_inmobiliarias
    puede_vender_enajenar BOOLEAN DEFAULT FALSE,
    puede_hipotecar BOOLEAN DEFAULT FALSE,
    puede_autocontratar BOOLEAN DEFAULT FALSE,
    puede_representar_cbr BOOLEAN DEFAULT FALSE,
    
    -- delegacion
    autoriza_delegar BOOLEAN DEFAULT FALSE,
    clausula_texto TEXT,
    
    -- other
    duracion_sociedad TEXT,
    
    -- Traceability
    verificado BOOLEAN DEFAULT FALSE,
    completado BOOLEAN DEFAULT FALSE,
    enviado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance and lookup
CREATE INDEX IF NOT EXISTS idx_ocr_estatutos_op_id ON public.ocr_estatutos_sociales(numero_operacion);
CREATE INDEX IF NOT EXISTS idx_ocr_estatutos_user_id ON public.ocr_estatutos_sociales(user_id);
CREATE INDEX IF NOT EXISTS idx_ocr_estatutos_estudio_id ON public.ocr_estatutos_sociales(estudio_id);

-- Enable RLS
ALTER TABLE public.ocr_estatutos_sociales ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own ocr_estatutos_sociales"
    ON public.ocr_estatutos_sociales
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ocr_estatutos_sociales"
    ON public.ocr_estatutos_sociales
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ocr_estatutos_sociales"
    ON public.ocr_estatutos_sociales
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ocr_estatutos_sociales"
    ON public.ocr_estatutos_sociales
    FOR DELETE
    USING (auth.uid() = user_id);

-- Permissions
GRANT ALL ON public.ocr_estatutos_sociales TO authenticated;
GRANT ALL ON public.ocr_estatutos_sociales TO service_role;
