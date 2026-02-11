-- Migration: Create ocr_escritura_reciliacion
-- Date: 2026-02-11
-- Description: Creates the ocr_escritura_reciliacion table with standardized OCR columns.

CREATE TABLE IF NOT EXISTS public.ocr_escritura_reciliacion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    documento_url TEXT,
    numero_operacion TEXT,
    nombre_documento_ocr TEXT,
    texto_estructurado JSONB DEFAULT NULL,
    analisis_integridad JSONB DEFAULT NULL,
    extraccion_datos JSONB DEFAULT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ocr_escritura_reciliacion_op_id ON public.ocr_escritura_reciliacion(numero_operacion);
CREATE INDEX IF NOT EXISTS idx_ocr_escritura_reciliacion_user_id ON public.ocr_escritura_reciliacion(user_id);
CREATE INDEX IF NOT EXISTS idx_ocr_escritura_reciliacion_estudio_id ON public.ocr_escritura_reciliacion(estudio_id);

-- RLS
ALTER TABLE public.ocr_escritura_reciliacion ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ocr_escritura_reciliacion"
    ON public.ocr_escritura_reciliacion
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ocr_escritura_reciliacion"
    ON public.ocr_escritura_reciliacion
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ocr_escritura_reciliacion"
    ON public.ocr_escritura_reciliacion
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ocr_escritura_reciliacion"
    ON public.ocr_escritura_reciliacion
    FOR DELETE
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.ocr_escritura_reciliacion TO authenticated;
GRANT ALL ON public.ocr_escritura_reciliacion TO service_role;
