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
    const { propertyType, inscriptionsCount } = formData;

    // MOMENTO 1: Documentos base del CBR y otros fijos
    let docs = [
        DOC_CATALOG.DOMINIO_VIGENTE,
        DOC_CATALOG.GP_30_ANOS,
        DOC_CATALOG.DEUDA_CONTRIBUCIONES,
        DOC_CATALOG.AVALUO_FISCAL,
        DOC_CATALOG.NO_EXPROPIACION_MUNI,
        DOC_CATALOG.NO_EXPROPIACION_SERVIU
    ];

    // Condicionales por tipo de propiedad
    const needsBuildingDocs = ['casa', 'departamento', 'bodega', 'estacionamiento', 'local_comercial'].includes(propertyType);
    if (needsBuildingDocs) {
        docs.push(DOC_CATALOG.NUMERO_MUNICIPAL);
        docs.push(DOC_CATALOG.RECEPCION_FINAL);
    }

    // Dinámicos: Una solicitud de inscripción por cada unidad indicada (si es > 1)
    // El Dominio Vigente (Momento 1) cuenta como la primera inscripción.
    // Si el usuario marcó más de 1, pedimos las copias de las inscripciones anteriores.
    const count = parseInt(inscriptionsCount) || 1;
    if (count > 1) {
        for (let i = 1; i < count; i++) {
            docs.push({
                ...DOC_CATALOG.INSCRIPCION_DOMINIO_ANTERIOR,
                id: `inscripcion_anterior_${i}`,
                label: `Copia Inscripción Anterior #${i} (CBR)`,
                description: `Documento que acredita la propiedad previo al título vigente #${i}.`
            });
        }
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
