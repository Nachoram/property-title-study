CREATE TABLE IF NOT EXISTS public.ocr_cedula_identidad (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    user_id UUID REFERENCES auth.users(id),
    numero_operacion TEXT,
    documento_url TEXT,
    rut TEXT,
    nombres TEXT,
    apellidos TEXT,
    nacionalidad TEXT,
    numero_serie TEXT,
    fecha_vencimiento TEXT,
    tipo_documento TEXT,
    estado_procesamiento TEXT,
    verificado BOOLEAN DEFAULT FALSE,
    completado BOOLEAN DEFAULT FALSE,
    enviado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ocr_cedula_identidad_op_id ON public.ocr_cedula_identidad(numero_operacion);
CREATE INDEX IF NOT EXISTS idx_ocr_cedula_identidad_user_id ON public.ocr_cedula_identidad(user_id);
CREATE INDEX IF NOT EXISTS idx_ocr_cedula_identidad_doc_url ON public.ocr_cedula_identidad(documento_url);
CREATE INDEX IF NOT EXISTS idx_ocr_cedula_identidad_estudio_id ON public.ocr_cedula_identidad(estudio_id);

-- RLS
ALTER TABLE public.ocr_cedula_identidad ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ocr_cedula_identidad"
    ON public.ocr_cedula_identidad
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ocr_cedula_identidad"
    ON public.ocr_cedula_identidad
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ocr_cedula_identidad"
    ON public.ocr_cedula_identidad
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.ocr_cedula_identidad TO authenticated;
GRANT ALL ON public.ocr_cedula_identidad TO service_role;
