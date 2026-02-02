-- Migration 048: Create ocr_informe_no_matrimonio
-- This table stores extracted data from marriage-free reports (soltería)

CREATE TABLE IF NOT EXISTS public.ocr_informe_no_matrimonio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudio_id UUID REFERENCES public.estudios_titulos(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    numero_operacion TEXT,
    documento_url TEXT,
    nombre_archivo TEXT,
    fase INTEGER DEFAULT 3,
    estado TEXT DEFAULT 'Iniciado',
    verificado BOOLEAN DEFAULT FALSE,
    completado BOOLEAN DEFAULT FALSE,
    enviado BOOLEAN DEFAULT FALSE,
    doc_id_origen UUID,
    
    -- Document specific fields
    nombre_completo TEXT,
    run TEXT,
    fecha_emision TEXT,
    institucion_emisora TEXT,
    codigo_folio_repertorio TEXT,
    estado_civil_declarado TEXT,
    observacion_texto TEXT,
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ocr_informe_no_matrimonio ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own marriage-free reports"
ON public.ocr_informe_no_matrimonio
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ocr_informe_no_matrimonio_updated_at
    BEFORE UPDATE ON public.ocr_informe_no_matrimonio
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
