-- Migration: Create batch 3 of OCR tables
-- Date: 2026-02-23
-- Description: Creates 6 additional OCR tables with a standardized schema.

BEGIN;

-- 1. Create tables
CREATE TABLE IF NOT EXISTS public.ocr_certificado_inscripcion_interdiccion (
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

CREATE TABLE IF NOT EXISTS public.ocr_sentencia_interdiccion (
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

CREATE TABLE IF NOT EXISTS public.ocr_escritura_hipoteca (
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

CREATE TABLE IF NOT EXISTS public.ocr_escritura_usufructo (
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

CREATE TABLE IF NOT EXISTS public.ocr_escritura_servidumbre (
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

CREATE TABLE IF NOT EXISTS public.ocr_resolucion_embargo (
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
ALTER TABLE public.ocr_certificado_inscripcion_interdiccion ADD CONSTRAINT ocr_cert_insc_int_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_sentencia_interdiccion ADD CONSTRAINT ocr_sent_int_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_escritura_hipoteca ADD CONSTRAINT ocr_esc_hip_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_escritura_usufructo ADD CONSTRAINT ocr_esc_usu_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_escritura_servidumbre ADD CONSTRAINT ocr_esc_serv_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_resolucion_embargo ADD CONSTRAINT ocr_res_emb_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);

-- 3. Enable RLS
ALTER TABLE public.ocr_certificado_inscripcion_interdiccion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_sentencia_interdiccion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_escritura_hipoteca ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_escritura_usufructo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_escritura_servidumbre ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_resolucion_embargo ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users can view their own ocr_certificado_inscripcion_interdiccion" ON public.ocr_certificado_inscripcion_interdiccion FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_certificado_inscripcion_interdiccion" ON public.ocr_certificado_inscripcion_interdiccion FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_certificado_inscripcion_interdiccion" ON public.ocr_certificado_inscripcion_interdiccion FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_certificado_inscripcion_interdiccion" ON public.ocr_certificado_inscripcion_interdiccion FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_sentencia_interdiccion" ON public.ocr_sentencia_interdiccion FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_sentencia_interdiccion" ON public.ocr_sentencia_interdiccion FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_sentencia_interdiccion" ON public.ocr_sentencia_interdiccion FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_sentencia_interdiccion" ON public.ocr_sentencia_interdiccion FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_escritura_hipoteca" ON public.ocr_escritura_hipoteca FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_escritura_hipoteca" ON public.ocr_escritura_hipoteca FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_escritura_hipoteca" ON public.ocr_escritura_hipoteca FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_escritura_hipoteca" ON public.ocr_escritura_hipoteca FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_escritura_usufructo" ON public.ocr_escritura_usufructo FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_escritura_usufructo" ON public.ocr_escritura_usufructo FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_escritura_usufructo" ON public.ocr_escritura_usufructo FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_escritura_usufructo" ON public.ocr_escritura_usufructo FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_escritura_servidumbre" ON public.ocr_escritura_servidumbre FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_escritura_servidumbre" ON public.ocr_escritura_servidumbre FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_escritura_servidumbre" ON public.ocr_escritura_servidumbre FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_escritura_servidumbre" ON public.ocr_escritura_servidumbre FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_resolucion_embargo" ON public.ocr_resolucion_embargo FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_resolucion_embargo" ON public.ocr_resolucion_embargo FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_resolucion_embargo" ON public.ocr_resolucion_embargo FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_resolucion_embargo" ON public.ocr_resolucion_embargo FOR DELETE USING (auth.uid() = user_id);

-- 5. Permissions
GRANT ALL ON public.ocr_certificado_inscripcion_interdiccion TO authenticated;
GRANT ALL ON public.ocr_certificado_inscripcion_interdiccion TO service_role;
GRANT ALL ON public.ocr_sentencia_interdiccion TO authenticated;
GRANT ALL ON public.ocr_sentencia_interdiccion TO service_role;
GRANT ALL ON public.ocr_escritura_hipoteca TO authenticated;
GRANT ALL ON public.ocr_escritura_hipoteca TO service_role;
GRANT ALL ON public.ocr_escritura_usufructo TO authenticated;
GRANT ALL ON public.ocr_escritura_usufructo TO service_role;
GRANT ALL ON public.ocr_escritura_servidumbre TO authenticated;
GRANT ALL ON public.ocr_escritura_servidumbre TO service_role;
GRANT ALL ON public.ocr_resolucion_embargo TO authenticated;
GRANT ALL ON public.ocr_resolucion_embargo TO service_role;

COMMIT;
