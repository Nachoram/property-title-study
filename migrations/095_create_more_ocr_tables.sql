-- Migration: Create more OCR tables (Batch 2)
-- Date: 2026-02-23
-- Description: Creates 6 additional OCR tables following the standardized schema.

BEGIN;

-- 1. Create tables
CREATE TABLE IF NOT EXISTS public.ocr_escritura_aporte_capital (
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

CREATE TABLE IF NOT EXISTS public.ocr_sentencia_adjudicacion_remate (
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

CREATE TABLE IF NOT EXISTS public.ocr_escritura_permuta (
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

CREATE TABLE IF NOT EXISTS public.ocr_escritura_adjudicacion_particion_herencia (
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

CREATE TABLE IF NOT EXISTS public.ocr_sentencia_donacion (
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

CREATE TABLE IF NOT EXISTS public.ocr_certificado_informacion_esprevias (
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

-- 2. Foreign Key constraints for numero_operacion
ALTER TABLE public.ocr_escritura_aporte_capital ADD CONSTRAINT ocr_esc_ap_cap_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_sentencia_adjudicacion_remate ADD CONSTRAINT ocr_sent_adj_rem_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_escritura_permuta ADD CONSTRAINT ocr_esc_perm_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_escritura_adjudicacion_particion_herencia ADD CONSTRAINT ocr_esc_adj_part_her_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_sentencia_donacion ADD CONSTRAINT ocr_sent_don_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_certificado_informacion_esprevias ADD CONSTRAINT ocr_cert_inf_esprev_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);

-- 3. Enable RLS
ALTER TABLE public.ocr_escritura_aporte_capital ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_sentencia_adjudicacion_remate ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_escritura_permuta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_escritura_adjudicacion_particion_herencia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_sentencia_donacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_certificado_informacion_esprevias ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users can view their own ocr_escritura_aporte_capital" ON public.ocr_escritura_aporte_capital FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_escritura_aporte_capital" ON public.ocr_escritura_aporte_capital FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_escritura_aporte_capital" ON public.ocr_escritura_aporte_capital FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_escritura_aporte_capital" ON public.ocr_escritura_aporte_capital FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_sentencia_adjudicacion_remate" ON public.ocr_sentencia_adjudicacion_remate FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_sentencia_adjudicacion_remate" ON public.ocr_sentencia_adjudicacion_remate FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_sentencia_adjudicacion_remate" ON public.ocr_sentencia_adjudicacion_remate FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_sentencia_adjudicacion_remate" ON public.ocr_sentencia_adjudicacion_remate FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_escritura_permuta" ON public.ocr_escritura_permuta FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_escritura_permuta" ON public.ocr_escritura_permuta FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_escritura_permuta" ON public.ocr_escritura_permuta FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_escritura_permuta" ON public.ocr_escritura_permuta FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_escritura_adjudicacion_particion_herencia" ON public.ocr_escritura_adjudicacion_particion_herencia FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_escritura_adjudicacion_particion_herencia" ON public.ocr_escritura_adjudicacion_particion_herencia FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_escritura_adjudicacion_particion_herencia" ON public.ocr_escritura_adjudicacion_particion_herencia FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_escritura_adjudicacion_particion_herencia" ON public.ocr_escritura_adjudicacion_particion_herencia FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_sentencia_donacion" ON public.ocr_sentencia_donacion FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_sentencia_donacion" ON public.ocr_sentencia_donacion FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_sentencia_donacion" ON public.ocr_sentencia_donacion FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_sentencia_donacion" ON public.ocr_sentencia_donacion FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_certificado_informacion_esprevias" ON public.ocr_certificado_informacion_esprevias FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_certificado_informacion_esprevias" ON public.ocr_certificado_informacion_esprevias FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_certificado_informacion_esprevias" ON public.ocr_certificado_informacion_esprevias FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_certificado_informacion_esprevias" ON public.ocr_certificado_informacion_esprevias FOR DELETE USING (auth.uid() = user_id);

-- 5. Permissions
GRANT ALL ON public.ocr_escritura_aporte_capital TO authenticated;
GRANT ALL ON public.ocr_escritura_aporte_capital TO service_role;
GRANT ALL ON public.ocr_sentencia_adjudicacion_remate TO authenticated;
GRANT ALL ON public.ocr_sentencia_adjudicacion_remate TO service_role;
GRANT ALL ON public.ocr_escritura_permuta TO authenticated;
GRANT ALL ON public.ocr_escritura_permuta TO service_role;
GRANT ALL ON public.ocr_escritura_adjudicacion_particion_herencia TO authenticated;
GRANT ALL ON public.ocr_escritura_adjudicacion_particion_herencia TO service_role;
GRANT ALL ON public.ocr_sentencia_donacion TO authenticated;
GRANT ALL ON public.ocr_sentencia_donacion TO service_role;
GRANT ALL ON public.ocr_certificado_informacion_esprevias TO authenticated;
GRANT ALL ON public.ocr_certificado_informacion_esprevias TO service_role;

COMMIT;
