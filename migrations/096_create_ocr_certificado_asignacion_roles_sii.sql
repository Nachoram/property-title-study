-- Migration: Create ocr_certificado_asignacion_roles_sii table
-- Date: 2026-02-25
-- Description: Creates the ocr_certificado_asignacion_roles_sii table following the standardized schema.

BEGIN;

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.ocr_certificado_asignacion_roles_sii (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    documento_url TEXT,
    numero_operacion TEXT,
    nombre_documento_ocr TEXT DEFAULT 'Certificado de Asignación de Roles SII',
    texto_estructurado JSONB DEFAULT NULL,
    analisis_integridad JSONB DEFAULT NULL,
    extraccion_datos JSONB DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Foreign Key constraints for numero_operacion
ALTER TABLE public.ocr_certificado_asignacion_roles_sii 
ADD CONSTRAINT ocr_cert_asig_roles_sii_num_op_fkey 
FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);

-- 3. Enable RLS
ALTER TABLE public.ocr_certificado_asignacion_roles_sii ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users can view their own ocr_cert_asig_roles_sii" 
ON public.ocr_certificado_asignacion_roles_sii FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ocr_cert_asig_roles_sii" 
ON public.ocr_certificado_asignacion_roles_sii FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ocr_cert_asig_roles_sii" 
ON public.ocr_certificado_asignacion_roles_sii FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ocr_cert_asig_roles_sii" 
ON public.ocr_certificado_asignacion_roles_sii FOR DELETE 
USING (auth.uid() = user_id);

-- 5. Permissions
GRANT ALL ON public.ocr_certificado_asignacion_roles_sii TO authenticated;
GRANT ALL ON public.ocr_certificado_asignacion_roles_sii TO service_role;

-- 6. Add comment for documentation
COMMENT ON TABLE public.ocr_certificado_asignacion_roles_sii IS 'Almacena los datos extraídos del Certificado de Asignación de Roles del SII';

COMMIT;
