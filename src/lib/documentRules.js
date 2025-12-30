import {
    FileText,
    ShieldCheck,
    FileCheck,
    Landmark,
    Building,
    Scroll,
    Map,
    Scale,
    CircleDollarSign
} from 'lucide-react';

/* 
  CATÁLOGO MAESTRO DE DOCUMENTOS
  Define todos los tipos de documentos posibles con sus propiedades base.
*/
const DOC_CATALOG = {
    // --- Básicos (CBR / Municipal / Tesorería) ---
    DOMINIO_VIGENTE: {
        id: 'dominio_vigente',
        label: 'Certificado de Dominio Vigente',
        description: 'Copia autorizada con vigencia al día (CBR).',
        icon: FileCheck,
        category: 'legal'
    },
    GP_30_ANOS: {
        id: 'gp_30_anos',
        label: 'Certificado de Hipotecas y Gravámenes (GP)',
        description: 'Revisión de 30 años. Indispensable litis y prohibiciones.',
        icon: ShieldCheck,
        alert: 'Revisión obligatoria de 30 años',
        category: 'legal'
    },
    DEUDA_CONTRIBUCIONES: {
        id: 'deuda_contribuciones',
        label: 'Certificado de Deuda de Contribuciones',
        description: 'Emitido por Tesorería General de la República.',
        icon: Landmark,
        category: 'municipal'
    },
    AVALUO_FISCAL: {
        id: 'avaluo_fiscal',
        label: 'Certificado de Avalúo Fiscal Detallado',
        description: 'SII. Debe indicar características del terreno y construcción.',
        icon: FileText,
        category: 'municipal'
    },
    NO_EXPROPIACION_MUNI: {
        id: 'no_expropiacion_muni',
        label: 'Certificado No Expropiación Municipal',
        description: 'Dirección de Obras Municipales.',
        icon: Map,
        category: 'municipal'
    },
    NO_EXPROPIACION_SERVIU: {
        id: 'no_expropiacion_serviu',
        label: 'Certificado No Expropiación SERVIU',
        description: 'Servicio de Vivienda y Urbanismo.',
        icon: Map,
        category: 'municipal'
    },
    NUMERO_MUNICIPAL: {
        id: 'numero_municipal',
        label: 'Certificado de Número',
        description: 'DOM. Acredita la dirección oficial de la propiedad.',
        icon: Map,
        category: 'municipal'
    },

    // --- Técnicos / Urbanísticos ---
    CIP: {
        id: 'cip',
        label: 'Certificado de Informaciones Previas (CIP)',
        description: 'Normativa urbanística y constructibilidad.',
        icon: Map,
        category: 'especial'
    },
    RECEPCION_FINAL: {
        id: 'recepcion_final',
        label: 'Certificado de Recepción Final',
        description: 'Acredita que la construcción está regularizada.',
        icon: Building,
        category: 'especial'
    },
    REGLAMENTO_COPROPIEDAD: {
        id: 'reglamento_copropiedad',
        label: 'Reglamento de Copropiedad Inscrito',
        description: 'Copia de archivo del CBR o escritura pública.',
        icon: Scroll,
        category: 'especial'
    },
    PLANO_COPROPIEDAD: {
        id: 'plano_copropiedad',
        label: 'Plano de Copropiedad',
        description: 'Plano archivado en el CBR con el polígono de la unidad.',
        icon: Map,
        category: 'especial'
    },

    // --- Rurales ---
    PLANO_SAG: {
        id: 'plano_sag',
        label: 'Plano SAG Aprobado',
        description: 'Plano de subdivisión agrícola certificado.',
        icon: Map,
        category: 'especial'
    },
    ASIGNACION_ROLES: {
        id: 'asignacion_roles',
        label: 'Certificado Asignación de Roles',
        description: 'SII. Para loteos nuevos.',
        icon: FileText,
        category: 'especial'
    },

    // --- Transacciones (Dinámicos) ---
    ESCRITURA_COMPRAVENTA: {
        id: 'escritura_cv',
        label: 'Escritura Pública de Compraventa',
        description: 'Título fundante de la adquisición.',
        icon: Scroll,
        category: 'titulos'
    },
    INSCRIPCION_DOMINIO_ANTERIOR: {
        id: 'inscripcion_anterior',
        label: 'Copia de Inscripción (CBR)',
        description: 'Inscripción de fojas, número y año correspondiente al título.',
        icon: FileText,
        category: 'titulos'
    },
    POSESION_EFECTIVA: {
        id: 'posesion_efectiva',
        label: 'Resolución Posesión Efectiva',
        description: 'Registro Civil o Auto Judicial.',
        icon: Scale,
        category: 'titulos'
    },
    IMPUESTO_HERENCIA: {
        id: 'impuesto_herencia',
        label: 'Pago Impuesto a la Herencia',
        description: 'O certificado de exención del SII.',
        icon: CircleDollarSign,
        category: 'titulos'
    },
    INSCRIPCION_ESPECIAL_HERENCIA: {
        id: 'inscripcion_herencia',
        label: 'Inscripción Especial de Herencia',
        description: 'CBR. A nombre de la sucesión.',
        icon: FileText,
        category: 'titulos'
    },
    CONSTITUCION_SOCIEDAD: {
        id: 'constitucion_sociedad',
        label: 'Constitución de Sociedad',
        description: 'Verificar personería jurídica en la fecha del acto.',
        icon: Building,
        category: 'especial'
    },
    VIGENCIA_PODERES: {
        id: 'vigencia_poderes',
        label: 'Vigencia de Poderes',
        description: 'Acredita facultades del representante.',
        icon: ShieldCheck,
        category: 'especial'
    },

    // --- Gravámenes ---
    ESCRITURA_SERVIDUMBRE: {
        id: 'constitucion_servidumbre',
        label: 'Escritura de Servidumbre',
        description: 'Activa o pasiva. Título constitutivo.',
        icon: Scroll,
        category: 'especial'
    }
};


/**
 * MOTOR DE REGLAS - GENERADOR DE LISTA DE DOCUMENTOS
 * @param {Object} formData - Los datos capturados en el Paso 1
 * @returns {Array} Lista de documentos requeridos
 */
export function generateRequiredDocuments(formData) {
    const { propertyType, hasReglamento, hasServidumbre, transactionsDetails } = formData;

    // 1. Array base (siempre requeridos)
    let docs = [
        DOC_CATALOG.DOMINIO_VIGENTE,
        DOC_CATALOG.GP_30_ANOS,
        DOC_CATALOG.NO_EXPROPIACION_MUNI,
        DOC_CATALOG.NO_EXPROPIACION_SERVIU,
        DOC_CATALOG.DEUDA_CONTRIBUCIONES,
        DOC_CATALOG.AVALUO_FISCAL
    ];

    // 2. Reglas por Tipo de Propiedad

    // -- Casas y Sitios Urbanos
    if (propertyType === 'casa' || propertyType === 'sitio_eriazo' || propertyType === 'local_comercial') {
        docs.push(DOC_CATALOG.NUMERO_MUNICIPAL);
        docs.push(DOC_CATALOG.CIP);
    }

    if (propertyType === 'casa' || propertyType === 'local_comercial') {
        docs.push(DOC_CATALOG.RECEPCION_FINAL);
    }

    // -- Copropiedad (Departamentos, Bodegas, etc.)
    const isCopropiedad = ['departamento', 'bodega', 'estacionamiento'].includes(propertyType);
    if (isCopropiedad || hasReglamento === true) {
        docs.push(DOC_CATALOG.REGLAMENTO_COPROPIEDAD);
        docs.push(DOC_CATALOG.PLANO_COPROPIEDAD);
    }

    // -- Parcelas
    if (propertyType === 'parcela') {
        docs.push(DOC_CATALOG.PLANO_SAG);
        docs.push(DOC_CATALOG.ASIGNACION_ROLES);
        docs.push(DOC_CATALOG.CIP); // También es útil para ver usos de suelo rural
    }

    // 3. Reglas por Condiciones Especiales
    if (hasServidumbre === true) {
        docs.push(DOC_CATALOG.ESCRITURA_SERVIDUMBRE);
        // Podríamos pedir planos también
    }

    // 4. Reglas por Cadenas de Título (Transacciones)
    // Iteramos sobre las transacciones declaradas para pedir antecedentes específicos
    if (transactionsDetails && transactionsDetails.length > 0) {
        transactionsDetails.forEach((tx, index) => {
            const txNum = index + 1;
            const type = tx.type;

            // Manual date formatting (YYYY-MM-DD -> DD-MM-YYYY)
            let dateStr = '';
            if (tx.date && typeof tx.date === 'string') {
                const parts = tx.date.split('-');
                if (parts.length === 3) {
                    dateStr = ` (${parts[2]}-${parts[1]}-${parts[0]})`;
                }
            }

            // Para todos los títulos, pedir la escritura e inscripción
            // Usamos copias del objeto para modificar el label con el número de transacción

            const titLabel = `Título ${txNum}`;

            if (type === 'compraventa' || type === 'permuta' || type === 'donacion' || type === 'aporte_capital') {
                docs.push({
                    ...DOC_CATALOG.ESCRITURA_COMPRAVENTA,
                    id: `tx_${txNum}_escritura`,
                    label: `Escritura ${titLabel} - ${typeNames(type)}${dateStr}`,
                    description: 'Copia de la escritura pública constitutiva.',
                    alert: `Transacción N° ${txNum}`
                });

                docs.push({
                    ...DOC_CATALOG.INSCRIPCION_DOMINIO_ANTERIOR,
                    id: `tx_${txNum}_inscripcion`,
                    label: `Inscripción ${titLabel}${dateStr}`,
                    alert: `Transacción N° ${txNum}`
                });
            }

            // Reglas específicas: Herencia
            if (type === 'herencia') {
                docs.push({
                    ...DOC_CATALOG.POSESION_EFECTIVA,
                    id: `tx_${txNum}_posesion`,
                    label: `Posesión Efectiva ${titLabel}${dateStr}`,
                    alert: 'Sucesión por causa de muerte'
                });
                docs.push({
                    ...DOC_CATALOG.INSCRIPCION_ESPECIAL_HERENCIA,
                    id: `tx_${txNum}_especial_herencia`,
                    label: `Inscripción Especial Herencia ${titLabel}${dateStr}`
                });
                docs.push({
                    ...DOC_CATALOG.IMPUESTO_HERENCIA,
                    id: `tx_${txNum}_impuesto`,
                    label: `Impuesto Herencia ${titLabel}${dateStr}`
                });
            }

            // Reglas específicas: Personas Jurídicas involucradas (Aporte Capital o Compraventas complejas)
            if (type === 'aporte_capital') {
                docs.push({
                    ...DOC_CATALOG.CONSTITUCION_SOCIEDAD,
                    id: `tx_${txNum}_sociedad`,
                    label: `Constitución Sociedad ${titLabel}${dateStr}`,
                    alert: 'Verificar existencia legal'
                });
            }
        });
    }

    return docs;
}

// Helper para nombres bonitos
function typeNames(key) {
    const map = {
        compraventa: 'Compraventa',
        donacion: 'Donación',
        permuta: 'Permuta',
        aporte_capital: 'Aporte Capital',
        herencia: 'Herencia'
    };
    return map[key] || key;
}
