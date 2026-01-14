export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            ocr_propietarios_actuales: {
                Row: {
                    completado: boolean | null
                    doc_id_origen: string | null
                    dv_id: string
                    estado_civil: string | null
                    forma_adquisicion: string | null
                    id: string
                    nombre_completo: string | null
                    personeria: string | null
                    porcentaje_manuscrito: number | null
                    porcentaje_propiedad: number | null
                    razon_social: string | null
                    representante_legal: string | null
                    riesgo_fraude: string | null
                    rut: string | null
                    tipo_persona: string | null
                    verificacion_titulo_contenido: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    doc_id_origen?: string | null
                    dv_id: string
                    estado_civil?: string | null
                    forma_adquisicion?: string | null
                    id?: string
                    nombre_completo?: string | null
                    personeria?: string | null
                    porcentaje_manuscrito?: number | null
                    porcentaje_propiedad?: number | null
                    razon_social?: string | null
                    representante_legal?: string | null
                    riesgo_fraude?: string | null
                    rut?: string | null
                    tipo_persona?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    doc_id_origen?: string | null
                    dv_id?: string
                    estado_civil?: string | null
                    forma_adquisicion?: string | null
                    id?: string
                    nombre_completo?: string | null
                    personeria?: string | null
                    porcentaje_manuscrito?: number | null
                    porcentaje_propiedad?: number | null
                    razon_social?: string | null
                    representante_legal?: string | null
                    riesgo_fraude?: string | null
                    rut?: string | null
                    tipo_persona?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_propietarios_actuales_dv_id_fkey"
                        columns: ["dv_id"]
                        isOneToOne: false
                        referencedRelation: "ocr_dominio_vigente"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_propietarios_anteriores: {
                Row: {
                    completado: boolean | null
                    doc_id_origen: string | null
                    dv_id: string
                    estado_civil: string | null
                    forma_adquisicion: string | null
                    id: string
                    nombre_completo: string | null
                    personeria: string | null
                    porcentaje_manuscrito: number | null
                    porcentaje_propiedad: number | null
                    razon_social: string | null
                    representante_legal: string | null
                    riesgo_fraude: string | null
                    rut: string | null
                    tipo_persona: string | null
                    verificacion_titulo_contenido: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    doc_id_origen?: string | null
                    dv_id: string
                    estado_civil?: string | null
                    forma_adquisicion?: string | null
                    id?: string
                    nombre_completo?: string | null
                    personeria?: string | null
                    porcentaje_manuscrito?: number | null
                    porcentaje_propiedad?: number | null
                    razon_social?: string | null
                    representante_legal?: string | null
                    riesgo_fraude?: string | null
                    rut?: string | null
                    tipo_persona?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    doc_id_origen?: string | null
                    dv_id?: string
                    estado_civil?: string | null
                    forma_adquisicion?: string | null
                    id?: string
                    nombre_completo?: string | null
                    personeria?: string | null
                    porcentaje_manuscrito?: number | null
                    porcentaje_propiedad?: number | null
                    razon_social?: string | null
                    representante_legal?: string | null
                    riesgo_fraude?: string | null
                    rut?: string | null
                    tipo_persona?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_propietarios_anteriores_dv_id_fkey"
                        columns: ["dv_id"]
                        isOneToOne: false
                        referencedRelation: "ocr_dominio_vigente"
                        referencedColumns: ["id"]
                    },
                ]
            }
            solicitud_documentos: {
                Row: {
                    id: string
                    user_id: string
                    estudio_id: string | null
                    created_at: string | null
                    updated_at: string | null
                    propiedad_anio: string | null
                    es_opcional: boolean | null
                    doc_id_origen: string | null
                    subido: boolean | null
                    detalle: string | null
                    operacion_id: string | null
                    origen_solicitud: string | null
                    propiedad_fojas: string | null
                    propiedad_numero: string | null
                    rol_persona: string | null
                    propiedad_comuna: string | null
                    nombre_documento: string | null
                    nombre_persona: string | null
                    rut_persona: string | null
                    estado: string | null
                    documento_url: string | null
                    detalle_origen: string | null
                }
                Insert: {
                    id?: string
                    user_id?: string
                    estudio_id?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                    propiedad_anio?: string | null
                    es_opcional?: boolean | null
                    doc_id_origen?: string | null
                    subido?: boolean | null
                    detalle?: string | null
                    operacion_id?: string | null
                    origen_solicitud?: string | null
                    propiedad_fojas?: string | null
                    propiedad_numero?: string | null
                    rol_persona?: string | null
                    propiedad_comuna?: string | null
                    nombre_documento?: string | null
                    nombre_persona?: string | null
                    rut_persona?: string | null
                    estado?: string | null
                    documento_url?: string | null
                    detalle_origen?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    estudio_id?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                    propiedad_anio?: string | null
                    es_opcional?: boolean | null
                    doc_id_origen?: string | null
                    subido?: boolean | null
                    detalle?: string | null
                    operacion_id?: string | null
                    origen_solicitud?: string | null
                    propiedad_fojas?: string | null
                    propiedad_numero?: string | null
                    rol_persona?: string | null
                    propiedad_comuna?: string | null
                    nombre_documento?: string | null
                    nombre_persona?: string | null
                    rut_persona?: string | null
                    estado?: string | null
                    documento_url?: string | null
                    detalle_origen?: string | null
                }
                Relationships: []
            }
            ocr_gp_30_anos: {
                Row: {
                    id: string
                    user_id: string
                    numero_operacion: string | null
                    raw_text: string | null
                    document_url: string | null
                    litis: boolean | null
                    created_at: string | null
                    fojas: string | null
                    numero: string | null
                    anio: number | null
                    comuna: string | null
                    hay_hipotecas: boolean | null
                    hay_prohibiciones: boolean | null
                    hay_reglamento: boolean | null
                    docs_requeridos_gp: Json | null
                    porcentaje_manuscrito: number | null
                    riesgo_fraude: string | null
                    verificado: boolean | null
                    verificacion_titulo_contenido: string | null
                    completado: boolean | null
                    doc_id_origen: string | null
                    titulares_citados: Json | null
                    nombre_propiedad_citada: string | null
                    gravamenes: Json | null
                    prohibiciones: Json | null
                    cbr: string | null
                    fecha_emision_certificado: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    numero_operacion?: string | null
                    raw_text?: string | null
                    document_url?: string | null
                    litis?: boolean | null
                    created_at?: string | null
                    fojas?: string | null
                    numero?: string | null
                    anio?: number | null
                    comuna?: string | null
                    hay_hipotecas?: boolean | null
                    hay_prohibiciones?: boolean | null
                    hay_reglamento?: boolean | null
                    docs_requeridos_gp?: Json | null
                    porcentaje_manuscrito?: number | null
                    riesgo_fraude?: string | null
                    verificado?: boolean | null
                    verificacion_titulo_contenido?: string | null
                    completado?: boolean | null
                    doc_id_origen?: string | null
                    titulares_citados?: Json | null
                    nombre_propiedad_citada?: string | null
                    gravamenes?: Json | null
                    prohibiciones?: Json | null
                    cbr?: string | null
                    fecha_emision_certificado?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    numero_operacion?: string | null
                    raw_text?: string | null
                    document_url?: string | null
                    litis?: boolean | null
                    created_at?: string | null
                    fojas?: string | null
                    numero?: string | null
                    anio?: number | null
                    comuna?: string | null
                    hay_hipotecas?: boolean | null
                    hay_prohibiciones?: boolean | null
                    hay_reglamento?: boolean | null
                    docs_requeridos_gp?: Json | null
                    porcentaje_manuscrito?: number | null
                    riesgo_fraude?: string | null
                    verificado?: boolean | null
                    verificacion_titulo_contenido?: string | null
                    completado?: boolean | null
                    doc_id_origen?: string | null
                    titulares_citados?: Json | null
                    nombre_propiedad_citada?: string | null
                    gravamenes?: Json | null
                    prohibiciones?: Json | null
                    cbr?: string | null
                    fecha_emision_certificado?: string | null
                }
                Relationships: []
            }
            ocr_no_expropiacion_serviu: {
                Row: {
                    id: string
                    user_id: string
                    estudio_id: string | null
                    operacion_id: string | null
                    documento_url: string | null
                    nombre_archivo: string | null
                    estado: string | null
                    numero_operacion: string | null
                    raw_text: string | null
                    document_url: string | null
                    institucion_emisora: string | null
                    rol_avaluo: string | null
                    numero_certificado: string | null
                    fecha_emision: string | null
                    direccion: string | null
                    comuna: string | null
                    afecto_expropiacion: string | null
                    estado_legal: string | null
                    texto_literal: string | null
                    entidad_expropiadora: string | null
                    nombre_solicitante: string | null
                    porcentaje_manuscrito: number | null
                    riesgo_fraude: string | null
                    verificado: boolean | null
                    completado: boolean | null
                    verificacion_titulo_contenido: string | null
                    doc_id_origen: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    estudio_id?: string | null
                    operacion_id?: string | null
                    documento_url?: string | null
                    nombre_archivo?: string | null
                    estado?: string | null
                    numero_operacion?: string | null
                    raw_text?: string | null
                    document_url?: string | null
                    institucion_emisora?: string | null
                    rol_avaluo?: string | null
                    numero_certificado?: string | null
                    fecha_emision?: string | null
                    direccion?: string | null
                    comuna?: string | null
                    afecto_expropiacion?: string | null
                    estado_legal?: string | null
                    texto_literal?: string | null
                    entidad_expropiadora?: string | null
                    nombre_solicitante?: string | null
                    porcentaje_manuscrito?: number | null
                    riesgo_fraude?: string | null
                    verificado?: boolean | null
                    completado?: boolean | null
                    verificacion_titulo_contenido?: string | null
                    doc_id_origen?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    estudio_id?: string | null
                    operacion_id?: string | null
                    documento_url?: string | null
                    nombre_archivo?: string | null
                    estado?: string | null
                    numero_operacion?: string | null
                    raw_text?: string | null
                    document_url?: string | null
                    institucion_emisora?: string | null
                    rol_avaluo?: string | null
                    numero_certificado?: string | null
                    fecha_emision?: string | null
                    direccion?: string | null
                    comuna?: string | null
                    afecto_expropiacion?: string | null
                    estado_legal?: string | null
                    texto_literal?: string | null
                    entidad_expropiadora?: string | null
                    nombre_solicitante?: string | null
                    porcentaje_manuscrito?: number | null
                    riesgo_fraude?: string | null
                    verificado?: boolean | null
                    completado?: boolean | null
                    verificacion_titulo_contenido?: string | null
                    doc_id_origen?: string | null
                    created_at?: string | null
                }
                Relationships: []
            }
            ocr_expropiacion_municipal: {
                Row: {
                    id: string
                    user_id: string | null
                    estudio_id: string | null
                    operacion_id: string | null
                    documento_url: string | null
                    nombre_archivo: string | null
                    estado: string | null
                    numero_operacion: string | null
                    raw_text: string | null
                    document_url: string | null
                    municipalidad: string | null
                    unidad: string | null
                    numero_certificado: string | null
                    fecha_emision: string | null
                    numero_solicitud: string | null
                    calle_camino: string | null
                    numero_domiciliario: string | null
                    lote_o_sitio: string | null
                    rol_avaluo: string | null
                    poblacion_villa: string | null
                    estado_afectacion: string | null
                    texto_literal_hallazgo: string | null
                    funcionario_responsable: string | null
                    porcentaje_manuscrito: number | null
                    riesgo_fraude: string | null
                    verificado: boolean | null
                    completado: boolean | null
                    verificacion_titulo_contenido: string | null
                    doc_id_origen: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    estudio_id?: string | null
                    operacion_id?: string | null
                    documento_url?: string | null
                    nombre_archivo?: string | null
                    estado?: string | null
                    numero_operacion?: string | null
                    raw_text?: string | null
                    document_url?: string | null
                    municipalidad?: string | null
                    unidad?: string | null
                    numero_certificado?: string | null
                    fecha_emision?: string | null
                    numero_solicitud?: string | null
                    calle_camino?: string | null
                    numero_domiciliario?: string | null
                    lote_o_sitio?: string | null
                    rol_avaluo?: string | null
                    poblacion_villa?: string | null
                    estado_afectacion?: string | null
                    texto_literal_hallazgo?: string | null
                    funcionario_responsable?: string | null
                    porcentaje_manuscrito?: number | null
                    riesgo_fraude?: string | null
                    verificado?: boolean | null
                    completado?: boolean | null
                    verificacion_titulo_contenido?: string | null
                    doc_id_origen?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    estudio_id?: string | null
                    operacion_id?: string | null
                    documento_url?: string | null
                    nombre_archivo?: string | null
                    estado?: string | null
                    numero_operacion?: string | null
                    raw_text?: string | null
                    document_url?: string | null
                    municipalidad?: string | null
                    unidad?: string | null
                    numero_certificado?: string | null
                    fecha_emision?: string | null
                    numero_solicitud?: string | null
                    calle_camino?: string | null
                    numero_domiciliario?: string | null
                    lote_o_sitio?: string | null
                    rol_avaluo?: string | null
                    poblacion_villa?: string | null
                    estado_afectacion?: string | null
                    texto_literal_hallazgo?: string | null
                    funcionario_responsable?: string | null
                    porcentaje_manuscrito?: number | null
                    riesgo_fraude?: string | null
                    verificado?: boolean | null
                    completado?: boolean | null
                    verificacion_titulo_contenido?: string | null
                    doc_id_origen?: string | null
                    created_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
