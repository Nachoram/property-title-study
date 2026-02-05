-- Migration 057: Add nombre_documento_ocr column to all OCR tables

-- ocr_donacion
ALTER TABLE IF EXISTS public.ocr_donacion ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Donaciones';
UPDATE public.ocr_donacion SET nombre_documento_ocr = 'Certificado de Donaciones' WHERE nombre_documento_ocr IS NULL;

-- ocr_cedula_identidad
ALTER TABLE IF EXISTS public.ocr_cedula_identidad ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Cédula de Identidad';
UPDATE public.ocr_cedula_identidad SET nombre_documento_ocr = 'Cédula de Identidad' WHERE nombre_documento_ocr IS NULL;

-- ocr_vigencia_poderes
ALTER TABLE IF EXISTS public.ocr_vigencia_poderes ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Vigencia de Poderes';
UPDATE public.ocr_vigencia_poderes SET nombre_documento_ocr = 'Certificado de Vigencia de Poderes' WHERE nombre_documento_ocr IS NULL;

-- ocr_constitucion_sociedad
ALTER TABLE IF EXISTS public.ocr_constitucion_sociedad ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Constitución de Sociedad';
UPDATE public.ocr_constitucion_sociedad SET nombre_documento_ocr = 'Constitución de Sociedad' WHERE nombre_documento_ocr IS NULL;

-- ocr_informe_no_matrimonio
ALTER TABLE IF EXISTS public.ocr_informe_no_matrimonio ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Informe de No Matrimonio';
UPDATE public.ocr_informe_no_matrimonio SET nombre_documento_ocr = 'Informe de No Matrimonio' WHERE nombre_documento_ocr IS NULL;

-- ocr_inscripcion_comercio
ALTER TABLE IF EXISTS public.ocr_inscripcion_comercio ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Inscripción en el Registro de Comercio';
UPDATE public.ocr_inscripcion_comercio SET nombre_documento_ocr = 'Inscripción en el Registro de Comercio' WHERE nombre_documento_ocr IS NULL;

-- ocr_expropiacion_municipal
ALTER TABLE IF EXISTS public.ocr_expropiacion_municipal ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de No Expropiación Municipal';
UPDATE public.ocr_expropiacion_municipal SET nombre_documento_ocr = 'Certificado de No Expropiación Municipal' WHERE nombre_documento_ocr IS NULL;

-- ocr_no_expropiacion_serviu
ALTER TABLE IF EXISTS public.ocr_no_expropiacion_serviu ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de No Expropiación SERVIU';
UPDATE public.ocr_no_expropiacion_serviu SET nombre_documento_ocr = 'Certificado de No Expropiación SERVIU' WHERE nombre_documento_ocr IS NULL;

-- ocr_posesion_efectiva
ALTER TABLE IF EXISTS public.ocr_posesion_efectiva ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Podeción Efectiva';
UPDATE public.ocr_posesion_efectiva SET nombre_documento_ocr = 'Posesión Efectiva' WHERE nombre_documento_ocr IS NULL;

-- ocr_inscripcion_herencia
ALTER TABLE IF EXISTS public.ocr_inscripcion_herencia ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Inscripción Especial de Herencia';
UPDATE public.ocr_inscripcion_herencia SET nombre_documento_ocr = 'Inscripción Especial de Herencia' WHERE nombre_documento_ocr IS NULL;

-- ocr_cesion_derechos_hereditario
ALTER TABLE IF EXISTS public.ocr_cesion_derechos_hereditario ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Escritura de Cesión de Derechos Hereditarios';
UPDATE public.ocr_cesion_derechos_hereditario SET nombre_documento_ocr = 'Escritura de Cesión de Derechos Hereditarios' WHERE nombre_documento_ocr IS NULL;

-- ocr_gasto_comun
ALTER TABLE IF EXISTS public.ocr_gasto_comun ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Gasto Común';
UPDATE public.ocr_gasto_comun SET nombre_documento_ocr = 'Certificado de Gasto Común' WHERE nombre_documento_ocr IS NULL;

-- ocr_inscripcion_servidumbre
ALTER TABLE IF EXISTS public.ocr_inscripcion_servidumbre ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Inscripción de Servidumbre';
UPDATE public.ocr_inscripcion_servidumbre SET nombre_documento_ocr = 'Inscripción de Servidumbre' WHERE nombre_documento_ocr IS NULL;

-- ocr_escritura_cv
ALTER TABLE IF EXISTS public.ocr_escritura_cv ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Escritura de Compraventa';
UPDATE public.ocr_escritura_cv SET nombre_documento_ocr = 'Escritura de Compraventa' WHERE nombre_documento_ocr IS NULL;

-- ocr_dominio_vigente
ALTER TABLE IF EXISTS public.ocr_dominio_vigente ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Inscripción de Dominio con Vigencia';
UPDATE public.ocr_dominio_vigente SET nombre_documento_ocr = 'Inscripción de Dominio con Vigencia' WHERE nombre_documento_ocr IS NULL;

-- ocr_poderes
ALTER TABLE IF EXISTS public.ocr_poderes ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Escritura de Poder';
UPDATE public.ocr_poderes SET nombre_documento_ocr = 'Escritura de Poder' WHERE nombre_documento_ocr IS NULL;

-- ocr_certificado_numero
ALTER TABLE IF EXISTS public.ocr_certificado_numero ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Número';
UPDATE public.ocr_certificado_numero SET nombre_documento_ocr = 'Certificado de Número' WHERE nombre_documento_ocr IS NULL;

-- ocr_directorio
ALTER TABLE IF EXISTS public.ocr_directorio ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Acta de Directorio';
UPDATE public.ocr_directorio SET nombre_documento_ocr = 'Acta de Directorio' WHERE nombre_documento_ocr IS NULL;

-- ocr_deuda_contribuciones
ALTER TABLE IF EXISTS public.ocr_deuda_contribuciones ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Deuda de Contribuciones';
UPDATE public.ocr_deuda_contribuciones SET nombre_documento_ocr = 'Certificado de Deuda de Contribuciones' WHERE nombre_documento_ocr IS NULL;

-- ocr_avaluo_fiscal
ALTER TABLE IF EXISTS public.ocr_avaluo_fiscal ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Avalúo Fiscal';
UPDATE public.ocr_avaluo_fiscal SET nombre_documento_ocr = 'Certificado de Avalúo Fiscal' WHERE nombre_documento_ocr IS NULL;

-- ocr_solteria
ALTER TABLE IF EXISTS public.ocr_solteria ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Soltería';
UPDATE public.ocr_solteria SET nombre_documento_ocr = 'Certificado de Soltería' WHERE nombre_documento_ocr IS NULL;

-- ocr_reglamento_copropiedad
ALTER TABLE IF EXISTS public.ocr_reglamento_copropiedad ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Reglamento de Copropiedad';
UPDATE public.ocr_reglamento_copropiedad SET nombre_documento_ocr = 'Reglamento de Copropiedad' WHERE nombre_documento_ocr IS NULL;

-- ocr_cip
ALTER TABLE IF EXISTS public.ocr_cip ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Informaciones Previas (CIP)';
UPDATE public.ocr_cip SET nombre_documento_ocr = 'Certificado de Informaciones Previas (CIP)' WHERE nombre_documento_ocr IS NULL;

-- ocr_gp
ALTER TABLE IF EXISTS public.ocr_gp ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Gravámenes y Prohibiciones';
UPDATE public.ocr_gp SET nombre_documento_ocr = 'Certificado de Gravámenes y Prohibiciones' WHERE nombre_documento_ocr IS NULL;

-- ocr_recepcion_final
ALTER TABLE IF EXISTS public.ocr_recepcion_final ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Recepción Final';
UPDATE public.ocr_recepcion_final SET nombre_documento_ocr = 'Certificado de Recepción Final' WHERE nombre_documento_ocr IS NULL;

-- ocr_inscripcion_anterior
ALTER TABLE IF EXISTS public.ocr_inscripcion_anterior ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Inscripción de Dominio Anterior';
UPDATE public.ocr_inscripcion_anterior SET nombre_documento_ocr = 'Inscripción de Dominio Anterior' WHERE nombre_documento_ocr IS NULL;

-- ocr_plano_copropiedad
ALTER TABLE IF EXISTS public.ocr_plano_copropiedad ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Plano de Copropiedad';
UPDATE public.ocr_plano_copropiedad SET nombre_documento_ocr = 'Plano de Copropiedad' WHERE nombre_documento_ocr IS NULL;

-- ocr_asignacion_roles
ALTER TABLE IF EXISTS public.ocr_asignacion_roles ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Asignación de Roles';
UPDATE public.ocr_asignacion_roles SET nombre_documento_ocr = 'Certificado de Asignación de Roles' WHERE nombre_documento_ocr IS NULL;

-- ocr_matrimonio
ALTER TABLE IF EXISTS public.ocr_matrimonio ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Matrimonio';
UPDATE public.ocr_matrimonio SET nombre_documento_ocr = 'Certificado de Matrimonio' WHERE nombre_documento_ocr IS NULL;

-- ocr_nacimiento
ALTER TABLE IF EXISTS public.ocr_nacimiento ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Nacimiento';
UPDATE public.ocr_nacimiento SET nombre_documento_ocr = 'Certificado de Nacimiento' WHERE nombre_documento_ocr IS NULL;

-- ocr_escritura_constitucion_aporte
ALTER TABLE IF EXISTS public.ocr_escritura_constitucion_aporte ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Escritura de Constitución y Aporte';
UPDATE public.ocr_escritura_constitucion_aporte SET nombre_documento_ocr = 'Escritura de Constitución y Aporte' WHERE nombre_documento_ocr IS NULL;

-- ocr_estatutos_sociales
ALTER TABLE IF EXISTS public.ocr_estatutos_sociales ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Estatutos Sociales';
UPDATE public.ocr_estatutos_sociales SET nombre_documento_ocr = 'Estatutos Sociales' WHERE nombre_documento_ocr IS NULL;

-- ocr_impuesto_herencia
ALTER TABLE IF EXISTS public.ocr_impuesto_herencia ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado de Pago de Impuesto a la Herencia';
UPDATE public.ocr_impuesto_herencia SET nombre_documento_ocr = 'Certificado de Pago de Impuesto a la Herencia' WHERE nombre_documento_ocr IS NULL;

-- ocr_rural_sag
ALTER TABLE IF EXISTS public.ocr_rural_sag ADD COLUMN IF NOT EXISTS nombre_documento_ocr TEXT DEFAULT 'Certificado SAG (Propiedad Rural)';
UPDATE public.ocr_rural_sag SET nombre_documento_ocr = 'Certificado SAG (Propiedad Rural)' WHERE nombre_documento_ocr IS NULL;
