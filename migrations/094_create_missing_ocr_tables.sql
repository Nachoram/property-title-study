-- Migration: Create missing OCR tables
-- Date: 2026-02-23
-- Description: Creates 6 new OCR tables following the standardized schema.

BEGIN;

-- 1. Create tables
CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_especial_herencia (
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

CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_embargo (
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

CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_arrendamiento (
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

CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_reglamento_copropiedad (
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

CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_usufructo (
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

CREATE TABLE IF NOT EXISTS public.ocr_inscripcion_hipoteca (
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

-- 2. Foreign Key constraints for numero_operacion (as seen in existing schema)
ALTER TABLE public.ocr_inscripcion_especial_herencia ADD CONSTRAINT ocr_insc_esp_her_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_inscripcion_embargo ADD CONSTRAINT ocr_insc_emb_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_inscripcion_arrendamiento ADD CONSTRAINT ocr_insc_arr_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_inscripcion_reglamento_copropiedad ADD CONSTRAINT ocr_insc_reg_cop_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_inscripcion_usufructo ADD CONSTRAINT ocr_insc_usu_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);
ALTER TABLE public.ocr_inscripcion_hipoteca ADD CONSTRAINT ocr_insc_hip_num_op_fkey FOREIGN KEY (numero_operacion) REFERENCES public.estudios_titulos(numero_operacion);

-- 3. Enable RLS
ALTER TABLE public.ocr_inscripcion_especial_herencia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_inscripcion_embargo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_inscripcion_arrendamiento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_inscripcion_reglamento_copropiedad ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_inscripcion_usufructo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_inscripcion_hipoteca ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users can view their own ocr_inscripcion_especial_herencia" ON public.ocr_inscripcion_especial_herencia FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_inscripcion_especial_herencia" ON public.ocr_inscripcion_especial_herencia FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_inscripcion_especial_herencia" ON public.ocr_inscripcion_especial_herencia FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_inscripcion_especial_herencia" ON public.ocr_inscripcion_especial_herencia FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_inscripcion_embargo" ON public.ocr_inscripcion_embargo FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_inscripcion_embargo" ON public.ocr_inscripcion_embargo FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_inscripcion_embargo" ON public.ocr_inscripcion_embargo FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_inscripcion_embargo" ON public.ocr_inscripcion_embargo FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_inscripcion_arrendamiento" ON public.ocr_inscripcion_arrendamiento FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_inscripcion_arrendamiento" ON public.ocr_inscripcion_arrendamiento FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_inscripcion_arrendamiento" ON public.ocr_inscripcion_arrendamiento FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_inscripcion_arrendamiento" ON public.ocr_inscripcion_arrendamiento FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_inscripcion_reglamento_copropiedad" ON public.ocr_inscripcion_reglamento_copropiedad FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_inscripcion_reglamento_copropiedad" ON public.ocr_inscripcion_reglamento_copropiedad FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_inscripcion_reglamento_copropiedad" ON public.ocr_inscripcion_reglamento_copropiedad FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_inscripcion_reglamento_copropiedad" ON public.ocr_inscripcion_reglamento_copropiedad FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_inscripcion_usufructo" ON public.ocr_inscripcion_usufructo FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_inscripcion_usufructo" ON public.ocr_inscripcion_usufructo FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_inscripcion_usufructo" ON public.ocr_inscripcion_usufructo FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_inscripcion_usufructo" ON public.ocr_inscripcion_usufructo FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ocr_inscripcion_hipoteca" ON public.ocr_inscripcion_hipoteca FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ocr_inscripcion_hipoteca" ON public.ocr_inscripcion_hipoteca FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ocr_inscripcion_hipoteca" ON public.ocr_inscripcion_hipoteca FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ocr_inscripcion_hipoteca" ON public.ocr_inscripcion_hipoteca FOR DELETE USING (auth.uid() = user_id);

-- 5. Permissions
GRANT ALL ON public.ocr_inscripcion_especial_herencia TO authenticated;
GRANT ALL ON public.ocr_inscripcion_especial_herencia TO service_role;
GRANT ALL ON public.ocr_inscripcion_embargo TO authenticated;
GRANT ALL ON public.ocr_inscripcion_embargo TO service_role;
GRANT ALL ON public.ocr_inscripcion_arrendamiento TO authenticated;
GRANT ALL ON public.ocr_inscripcion_arrendamiento TO service_role;
GRANT ALL ON public.ocr_inscripcion_reglamento_copropiedad TO authenticated;
GRANT ALL ON public.ocr_inscripcion_reglamento_copropiedad TO service_role;
GRANT ALL ON public.ocr_inscripcion_usufructo TO authenticated;
GRANT ALL ON public.ocr_inscripcion_usufructo TO service_role;
GRANT ALL ON public.ocr_inscripcion_hipoteca TO authenticated;
GRANT ALL ON public.ocr_inscripcion_hipoteca TO service_role;

COMMIT;
