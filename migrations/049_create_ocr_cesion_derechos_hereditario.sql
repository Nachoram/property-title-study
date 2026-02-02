CREATE TABLE IF NOT EXISTS public.ocr_cesion_derechos_hereditario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudio_id UUID REFERENCES public.estudios_titulos(id),
    user_id UUID REFERENCES auth.users(id),
    doc_id_origen UUID,
    numero_operacion TEXT,
    documento_url TEXT,
    doc_table TEXT,
    nombre_propiedad TEXT,
    
    -- Identificacion Escritura
    notaria TEXT,
    fecha_otorgamiento TEXT,
    repertorio TEXT,
    
    -- Partes Comparecientes
    partes_comparecientes JSONB,
    
    -- Datos Herencia
    causante_nombre TEXT,
    pe_fojas TEXT,
    pe_numero TEXT,
    pe_anio TEXT,
    pe_cbr TEXT,
    ieh_fojas TEXT,
    ieh_numero TEXT,
    ieh_anio TEXT,
    ieh_cbr TEXT,
    
    -- Objeto Cesion
    tipo_cesion TEXT,
    direccion_inmueble TEXT,
    
    -- Datos Negocio
    precio_cesion TEXT,
    forma_pago TEXT,
    declaracion_pago_total BOOLEAN,
    
    -- Traceability
    verificado BOOLEAN DEFAULT FALSE,
    completado BOOLEAN DEFAULT FALSE,
    enviado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ocr_cesion_dh_op_id ON public.ocr_cesion_derechos_hereditario(numero_operacion);
CREATE INDEX IF NOT EXISTS idx_ocr_cesion_dh_user_id ON public.ocr_cesion_derechos_hereditario(user_id);
CREATE INDEX IF NOT EXISTS idx_ocr_cesion_dh_estudio_id ON public.ocr_cesion_derechos_hereditario(estudio_id);
CREATE INDEX IF NOT EXISTS idx_ocr_cesion_dh_doc_id ON public.ocr_cesion_derechos_hereditario(doc_id_origen);

-- RLS
ALTER TABLE public.ocr_cesion_derechos_hereditario ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ocr_cesion_derechos_hereditario"
    ON public.ocr_cesion_derechos_hereditario
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ocr_cesion_derechos_hereditario"
    ON public.ocr_cesion_derechos_hereditario
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ocr_cesion_derechos_hereditario"
    ON public.ocr_cesion_derechos_hereditario
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.ocr_cesion_derechos_hereditario TO authenticated;
GRANT ALL ON public.ocr_cesion_derechos_hereditario TO service_role;
