CREATE TABLE IF NOT EXISTS public.ocr_Escritura_Constitucion_aporte (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_operacion TEXT,
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    user_id UUID REFERENCES auth.users(id),
    documento_url TEXT,
    fase INTEGER DEFAULT 3,
    fecha_escritura TEXT,
    notaria TEXT,
    repertorio TEXT,
    sociedad_adquirente JSONB,
    malla_societaria JSONB,
    identificacion_aportante_naturaleza JSONB,
    naturaleza_acto TEXT,
    organo_administracion TEXT,
    forma_actuacion TEXT,
    administradores_designados JSONB,
    facultad_vender BOOLEAN,
    facultad_hipotecar BOOLEAN,
    facultad_enajenar BOOLEAN,
    individualizacion_aporte JSONB,
    lista_inmuebles_aportados JSONB,
    analisis_validez JSONB,
    verificado BOOLEAN DEFAULT FALSE,
    completado BOOLEAN DEFAULT FALSE,
    enviado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ocr_escritura_constitucion_aporte_op_id ON public.ocr_Escritura_Constitucion_aporte(numero_operacion);
CREATE INDEX IF NOT EXISTS idx_ocr_escritura_constitucion_aporte_user_id ON public.ocr_Escritura_Constitucion_aporte(user_id);
CREATE INDEX IF NOT EXISTS idx_ocr_escritura_constitucion_aporte_doc_url ON public.ocr_Escritura_Constitucion_aporte(documento_url);

-- RLS
ALTER TABLE public.ocr_Escritura_Constitucion_aporte ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents"
    ON public.ocr_Escritura_Constitucion_aporte
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
    ON public.ocr_Escritura_Constitucion_aporte
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
    ON public.ocr_Escritura_Constitucion_aporte
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.ocr_Escritura_Constitucion_aporte TO authenticated;
GRANT ALL ON public.ocr_Escritura_Constitucion_aporte TO service_role;
