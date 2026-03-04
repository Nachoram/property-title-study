-- Migration: Create ocr_plano_subdivision_sag_cbr table
-- Date: 2026-02-26
-- Description: Creates the ocr_plano_subdivision_sag_cbr table with the standardized OCR schema.

BEGIN;

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.ocr_plano_subdivision_sag_cbr (
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
ALTER TABLE public.ocr_plano_subdivision_sag_cbr ADD CONSTRAINT ocr_plano_sub_sag_cbr_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);

-- 3. Enable RLS
ALTER TABLE public.ocr_plano_subdivision_sag_cbr ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users can view their own ocr_plano_subdivision_sag_cbr" ON public.ocr_plano_subdivision_sag_cbr FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_plano_subdivision_sag_cbr" ON public.ocr_plano_subdivision_sag_cbr FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_plano_subdivision_sag_cbr" ON public.ocr_plano_subdivision_sag_cbr FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_plano_subdivision_sag_cbr" ON public.ocr_plano_subdivision_sag_cbr FOR DELETE USING (auth.uid() = user_id);

-- 5. Permissions
GRANT ALL ON public.ocr_plano_subdivision_sag_cbr TO authenticated;
GRANT ALL ON public.ocr_plano_subdivision_sag_cbr TO service_role;

COMMIT;
