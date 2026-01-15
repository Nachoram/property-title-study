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
            estudios_titulos: {
                Row: {
                    cantidad_transacciones: number | null
                    created_at: string | null
                    detalle_transacciones: Json | null
                    estado: string | null
                    finalidad_estudio: string
                    id: string
                    nombre_propiedad: string | null
                    numero_operacion: string
                    tiene_reglamento: boolean | null
                    tiene_servidumbre: boolean | null
                    tipo_propiedad: string
                    titulo_vigente: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    cantidad_transacciones?: number | null
                    created_at?: string | null
                    detalle_transacciones?: Json | null
                    estado?: string | null
                    finalidad_estudio: string
                    id?: string
                    nombre_propiedad?: string | null
                    numero_operacion: string
                    tiene_reglamento?: boolean | null
                    tiene_servidumbre?: boolean | null
                    tipo_propiedad: string
                    titulo_vigente?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    cantidad_transacciones?: number | null
                    created_at?: string | null
                    detalle_transacciones?: Json | null
                    estado?: string | null
                    finalidad_estudio?: string
                    id?: string
                    nombre_propiedad?: string | null
                    numero_operacion?: string
                    tiene_reglamento?: boolean | null
                    tiene_servidumbre?: boolean | null
                    tipo_propiedad?: string
                    titulo_vigente?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "estudios_titulos_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_gp: {
                Row: {
                    acreedor_nombre: string | null
                    anio: number | null
                    cbr: string | null
                    completado: boolean | null
                    created_at: string | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fecha_emision_certificado: string | null
                    fojas: string | null
                    glosa_hipoteca: string | null
                    gravamenes: Json | null
                    hay_hipotecas: boolean | null
                    hay_prohibiciones: boolean | null
                    hay_reglamento: boolean | null
                    id: string
                    moneda: string | null
                    monto_gravamen: string | null
                    nombre_archivo: string | null
                    nombre_propiedad: string | null
                    nombre_propiedad_citada: string | null
                    numero: string | null
                    numero_operacion: string | null
                    operacion_id: string | null
                    porcentaje_manuscrito: number | null
                    prohibiciones: Json | null
                    propietarios: Json | null
                    raw_text: string | null
                    riesgo_fraude: string | null
                    titulares_citados: Json | null
                    user_id: string
                    verificacion_titulo_contenido: string | null
                    verificado: boolean | null
                }
                Insert: {
                    acreedor_nombre?: string | null
                    anio?: number | null
                    cbr?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fecha_emision_certificado?: string | null
                    fojas?: string | null
                    glosa_hipoteca?: string | null
                    gravamenes?: Json | null
                    hay_hipotecas?: boolean | null
                    hay_prohibiciones?: boolean | null
                    hay_reglamento?: boolean | null
                    id?: string
                    moneda?: string | null
                    monto_gravamen?: string | null
                    nombre_archivo?: string | null
                    nombre_propiedad?: string | null
                    nombre_propiedad_citada?: string | null
                    numero?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    porcentaje_manuscrito?: number | null
                    prohibiciones?: Json | null
                    propietarios?: Json | null
                    raw_text?: string | null
                    riesgo_fraude?: string | null
                    titulares_citados?: Json | null
                    user_id: string
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    acreedor_nombre?: string | null
                    anio?: number | null
                    cbr?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fecha_emision_certificado?: string | null
                    fojas?: string | null
                    glosa_hipoteca?: string | null
                    gravamenes?: Json | null
                    hay_hipotecas?: boolean | null
                    hay_prohibiciones?: boolean | null
                    hay_reglamento?: boolean | null
                    id?: string
                    moneda?: string | null
                    monto_gravamen?: string | null
                    nombre_archivo?: string | null
                    nombre_propiedad?: string | null
                    nombre_propiedad_citada?: string | null
                    numero?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    porcentaje_manuscrito?: number | null
                    prohibiciones?: Json | null
                    propietarios?: Json | null
                    raw_text?: string | null
                    riesgo_fraude?: string | null
                    titulares_citados?: Json | null
                    user_id?: string
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_gp_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "ocr_gp_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_dominio_vigente: {
                Row: {
                    anio: number | null
                    cbr: string | null
                    completado: boolean | null
                    created_at: string | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fecha_inscripcion: string | null
                    fojas: string | null
                    id: string
                    nombre_archivo: string | null
                    nombre_comuna: string | null
                    nombre_propiedad: string | null
                    numero: string | null
                    numero_operacion: string | null
                    operacion_id: string | null
                    porcentaje_manuscrito: number | null
                    raw_text: string | null
                    riesgo_fraude: string | null
                    user_id: string
                    verificacion_titulo_contenido: string | null
                    verificado: boolean | null
                }
                Insert: {
                    anio?: number | null
                    cbr?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fecha_inscripcion?: string | null
                    fojas?: string | null
                    id?: string
                    nombre_archivo?: string | null
                    nombre_comuna?: string | null
                    nombre_propiedad?: string | null
                    numero?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    porcentaje_manuscrito?: number | null
                    raw_text?: string | null
                    riesgo_fraude?: string | null
                    user_id: string
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    anio?: number | null
                    cbr?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fecha_inscripcion?: string | null
                    fojas?: string | null
                    id?: string
                    nombre_archivo?: string | null
                    nombre_comuna?: string | null
                    nombre_propiedad?: string | null
                    numero?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    porcentaje_manuscrito?: number | null
                    raw_text?: string | null
                    riesgo_fraude?: string | null
                    user_id?: string
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_dominio_vigente_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "ocr_dominio_vigente_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    created_at: string | null
                    email: string | null
                    id: string
                    nombre: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    nombre?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    nombre?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            solicitud_documentos: {
                Row: {
                    created_at: string | null
                    detalle: string | null
                    detalle_origen: string | null
                    doc_id_origen: string | null
                    documento_url: string | null
                    es_opcional: boolean | null
                    estado: string | null
                    estudio_id: string | null
                    id: string
                    nombre_documento: string | null
                    nombre_persona: string | null
                    numero_operacion: string | null
                    operacion_id: string | null
                    origen_solicitud: string | null
                    propiedad_anio: string | null
                    propiedad_comuna: string | null
                    propiedad_fojas: string | null
                    propiedad_numero: string | null
                    rol_persona: string | null
                    rut_persona: string | null
                    subido: boolean | null
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string | null
                    detalle?: string | null
                    detalle_origen?: string | null
                    doc_id_origen?: string | null
                    documento_url?: string | null
                    es_opcional?: boolean | null
                    estado?: string | null
                    estudio_id?: string | null
                    id?: string
                    nombre_documento?: string | null
                    nombre_persona?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    origen_solicitud?: string | null
                    propiedad_anio?: string | null
                    propiedad_comuna?: string | null
                    propiedad_fojas?: string | null
                    propiedad_numero?: string | null
                    rol_persona?: string | null
                    rut_persona?: string | null
                    subido?: boolean | null
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string | null
                    detalle?: string | null
                    detalle_origen?: string | null
                    doc_id_origen?: string | null
                    documento_url?: string | null
                    es_opcional?: boolean | null
                    estado?: string | null
                    estudio_id?: string | null
                    id?: string
                    nombre_documento?: string | null
                    nombre_persona?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    origen_solicitud?: string | null
                    propiedad_anio?: string | null
                    propiedad_comuna?: string | null
                    propiedad_fojas?: string | null
                    propiedad_numero?: string | null
                    rol_persona?: string | null
                    rut_persona?: string | null
                    subido?: boolean | null
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "solicitud_documentos_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "solicitud_documentos_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_operation_documents: {
                Args: {
                    p_numero_operacion: string
                }
                Returns: {
                    id: string
                    nombre_documento: string
                    documento_url: string
                    created_at: string
                    tipo_documento: string
                }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
