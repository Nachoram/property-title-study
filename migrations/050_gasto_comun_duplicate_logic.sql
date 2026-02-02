-- Migration: Add deduplication logic for Certificado de Deuda de Gastos Comunes
BEGIN;

CREATE OR REPLACE FUNCTION public.check_duplicate_solicitud_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Initialize as false by default (or keep current if we don't find a duplicate)
    NEW.repetido := FALSE;

    -- Check for duplicates within the same operation (operacion_id)
    IF EXISTS (
        SELECT 1 
        FROM public.solicitud_documentos
        WHERE operacion_id = NEW.operacion_id
          AND id != NEW.id -- Exclude itself on updates
          AND (
            -- Condition 1: Mismo nombre documento Y mismo rut_persona
            (
                NEW.nombre_documento IS NOT NULL AND NEW.nombre_documento != '' AND
                NEW.rut_persona IS NOT NULL AND NEW.rut_persona != '' AND
                nombre_documento = NEW.nombre_documento AND 
                rut_persona = NEW.rut_persona
            )
            OR
            -- Condition 2: Mismo doc_repertorio
            (
                NEW.doc_repertorio IS NOT NULL AND NEW.doc_repertorio != '' AND
                doc_repertorio = NEW.doc_repertorio
            )
            OR
            -- Condition 3: Misma foja, numero y año
            (
                NEW.propiedad_fojas IS NOT NULL AND NEW.propiedad_fojas != '' AND
                NEW.propiedad_numero IS NOT NULL AND NEW.propiedad_numero != '' AND
                NEW.propiedad_anio IS NOT NULL AND NEW.propiedad_anio != '' AND
                propiedad_fojas = NEW.propiedad_fojas AND 
                propiedad_numero = NEW.propiedad_numero AND 
                propiedad_anio = NEW.propiedad_anio
            )
            OR
            -- Condition 4: Mismo nombre documento Y misma fecha
            (
                NEW.nombre_documento IS NOT NULL AND NEW.nombre_documento != '' AND
                NEW.doc_fecha IS NOT NULL AND
                nombre_documento = NEW.nombre_documento AND 
                doc_fecha = NEW.doc_fecha
            )
            OR
            -- Condition 5: Mismo número de plano (basado en dígitos, min 2)
            (
                NEW.doc_plano IS NOT NULL AND NEW.doc_plano != '' AND
                LENGTH(regexp_replace(NEW.doc_plano, '[^0-9]', '', 'g')) >= 2 AND
                regexp_replace(doc_plano, '[^0-9]', '', 'g') = regexp_replace(NEW.doc_plano, '[^0-9]', '', 'g')
            )
            OR
            -- Condition 6: Certificado de Deuda de Gastos Comunes (solo uno por operación)
            (
                NEW.nombre_documento = 'Certificado de Deuda de Gastos Comunes' AND
                nombre_documento = NEW.nombre_documento
            )
          )
    ) THEN
        NEW.repetido := TRUE;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMIT;
