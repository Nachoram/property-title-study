-- Migration: Create ocr_certificado_defuncion table
-- Date: 2026-02-24
-- Description: Creates the ocr_certificado_defuncion table with the standardized OCR schema.

BEGIN;

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.ocr_certificado_defuncion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    documento_url TEXT,
    numero_operacion TEXT,
    nombre_documento_ocr TEXT,
    texto_estructurado JSONB DEFAULT NULL,
    analisis_integridad JSONB DEFAULT NULL,
    extraccion_datos JSONB DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Foreign Key constraint for numero_operacion
ALTER TABLE public.ocr_certificado_defuncion ADD CONSTRAINT ocr_cert_def_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);

-- 3. Enable RLS
ALTER TABLE public.ocr_certificado_defuncion ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users can view their own ocr_certificado_defuncion" ON public.ocr_certificado_defuncion FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_certificado_defuncion" ON public.ocr_certificado_defuncion FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_certificado_defuncion" ON public.ocr_certificado_defuncion FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_certificado_defuncion" ON public.ocr_certificado_defuncion FOR DELETE USING (auth.uid() = user_id);

-- 5. Permissions
GRANT ALL ON public.ocr_certificado_defuncion TO authenticated;
GRANT ALL ON public.ocr_certificado_defuncion TO service_role;

COMMIT;
