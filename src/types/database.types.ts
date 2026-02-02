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
            debug_logs: {
                Row: {
                    created_at: string | null
                    id: number
                    message: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: number
                    message?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: number
                    message?: string | null
                }
                Relationships: []
            }
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
                Relationships: []
            }
            ocr_asignacion_roles: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_asignacion_roles_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_avaluo_fiscal: {
                Row: {
                    anio_vigencia: string | null
                    avaluo_exento: string | null
                    avaluo_total: string | null
                    completado: boolean | null
                    comuna: string | null
                    created_at: string | null
                    direccion: string | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    numero_operacion: string | null
                    numero_rol: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    anio_vigencia?: string | null
                    avaluo_exento?: string | null
                    avaluo_total?: string | null
                    completado?: boolean | null
                    comuna?: string | null
                    created_at?: string | null
                    direccion?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    numero_operacion?: string | null
                    numero_rol?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    anio_vigencia?: string | null
                    avaluo_exento?: string | null
                    avaluo_total?: string | null
                    completado?: boolean | null
                    comuna?: string | null
                    created_at?: string | null
                    direccion?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    numero_operacion?: string | null
                    numero_rol?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_avaluo_fiscal_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_cedula_identidad: {
                Row: {
                    apellidos: string | null
                    completado: boolean | null
                    created_at: string | null
                    documento_url: string | null
                    enviado: boolean | null
                    estado_procesamiento: string | null
                    estudio_id: string | null
                    fecha_vencimiento: string | null
                    id: string
                    nacionalidad: string | null
                    nombres: string | null
                    numero_operacion: string | null
                    numero_serie: string | null
                    rut: string | null
                    tipo_documento: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    apellidos?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estado_procesamiento?: string | null
                    estudio_id?: string | null
                    fecha_vencimiento?: string | null
                    id?: string
                    nacionalidad?: string | null
                    nombres?: string | null
                    numero_operacion?: string | null
                    numero_serie?: string | null
                    rut?: string | null
                    tipo_documento?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    apellidos?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estado_procesamiento?: string | null
                    estudio_id?: string | null
                    fecha_vencimiento?: string | null
                    id?: string
                    nacionalidad?: string | null
                    nombres?: string | null
                    numero_operacion?: string | null
                    numero_serie?: string | null
                    rut?: string | null
                    tipo_documento?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_cedula_identidad_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_cert_matrimonio: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_cert_matrimonio_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_certificado_numero_informaciones: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_certificado_numero_informaciones_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_cesion_derechos_hereditario: {
                Row: {
                    causante_nombre: string | null
                    completado: boolean | null
                    created_at: string | null
                    declaracion_pago_total: boolean | null
                    direccion_inmueble: string | null
                    doc_id_origen: string | null
                    doc_table: string | null
                    documento_url: string | null
                    enviado: boolean | null
                    estudio_id: string | null
                    fecha_otorgamiento: string | null
                    id: string
                    ieh_anio: string | null
                    ieh_cbr: string | null
                    ieh_fojas: string | null
                    ieh_numero: string | null
                    nombre_propiedad: string | null
                    notaria: string | null
                    numero_operacion: string | null
                    partes_comparecientes: Json | null
                    pe_anio: string | null
                    pe_cbr: string | null
                    pe_fojas: string | null
                    pe_numero: string | null
                    precio_cesion: string | null
                    forma_pago: string | null
                    repertorio: string | null
                    tipo_cesion: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    causante_nombre?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    declaracion_pago_total?: boolean | null
                    direccion_inmueble?: string | null
                    doc_id_origen?: string | null
                    doc_table?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    fecha_otorgamiento?: string | null
                    id?: string
                    ieh_anio?: string | null
                    ieh_cbr?: string | null
                    ieh_fojas?: string | null
                    ieh_numero?: string | null
                    nombre_propiedad?: string | null
                    notaria?: string | null
                    numero_operacion?: string | null
                    partes_comparecientes?: Json | null
                    pe_anio?: string | null
                    pe_cbr?: string | null
                    pe_fojas?: string | null
                    pe_numero?: string | null
                    precio_cesion?: string | null
                    forma_pago?: string | null
                    repertorio?: string | null
                    tipo_cesion?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    causante_nombre?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    declaracion_pago_total?: boolean | null
                    direccion_inmueble?: string | null
                    doc_id_origen?: string | null
                    doc_table?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    fecha_otorgamiento?: string | null
                    id?: string
                    ieh_anio?: string | null
                    ieh_cbr?: string | null
                    ieh_fojas?: string | null
                    ieh_numero?: string | null
                    nombre_propiedad?: string | null
                    notaria?: string | null
                    numero_operacion?: string | null
                    partes_comparecientes?: Json | null
                    pe_anio?: string | null
                    pe_cbr?: string | null
                    pe_fojas?: string | null
                    pe_numero?: string | null
                    precio_cesion?: string | null
                    forma_pago?: string | null
                    repertorio?: string | null
                    tipo_cesion?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_cesion_derechos_hereditario_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_constitucion_sociedad: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_constitucion_sociedad_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_deuda_contibuciones: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_deuda_contibuciones_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_deuda_contribucones: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_deuda_contribucones_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_directorio: {
                Row: {
                    cargos_designados: Json | null
                    completado: boolean | null
                    created_at: string | null
                    doc_id_origen: string | null
                    document_url: string | null
                    enviado: boolean | null
                    estudio_id: string | null
                    fase: number | null
                    fecha_acta: string | null
                    fecha_escritura: string | null
                    fecha_sesion_directorio: string | null
                    id: string
                    limitaciones_texto: string | null
                    notaria: string | null
                    numero_operacion: string | null
                    poderes_conferidos: Json | null
                    porcentaje_manuscrito: number | null
                    puede_autocontratar: boolean | null
                    puede_hipotecar: boolean | null
                    puede_percibir: boolean | null
                    puede_vender: boolean | null
                    razon_social: string | null
                    repertorio: string | null
                    riesgo_fraude: string | null
                    rut: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificacion_titulo_contenido: string | null
                    verificado: boolean | null
                    vigencia_hasta: string | null
                }
                Insert: {
                    cargos_designados?: Json | null
                    completado?: boolean | null
                    created_at?: string | null
                    doc_id_origen?: string | null
                    document_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_acta?: string | null
                    fecha_escritura?: string | null
                    fecha_sesion_directorio?: string | null
                    id?: string
                    limitaciones_texto?: string | null
                    notaria?: string | null
                    numero_operacion?: string | null
                    poderes_conferidos?: Json | null
                    porcentaje_manuscrito?: number | null
                    puede_autocontratar?: boolean | null
                    puede_hipotecar?: boolean | null
                    puede_percibir?: boolean | null
                    puede_vender?: boolean | null
                    razon_social?: string | null
                    repertorio?: string | null
                    riesgo_fraude?: string | null
                    rut?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                    vigencia_hasta?: string | null
                }
                Update: {
                    cargos_designados?: Json | null
                    completado?: boolean | null
                    created_at?: string | null
                    doc_id_origen?: string | null
                    document_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_acta?: string | null
                    fecha_escritura?: string | null
                    fecha_sesion_directorio?: string | null
                    id?: string
                    limitaciones_texto?: string | null
                    notaria?: string | null
                    numero_operacion?: string | null
                    poderes_conferidos?: Json | null
                    porcentaje_manuscrito?: number | null
                    puede_autocontratar?: boolean | null
                    puede_hipotecar?: boolean | null
                    puede_percibir?: boolean | null
                    puede_vender?: boolean | null
                    razon_social?: string | null
                    repertorio?: string | null
                    riesgo_fraude?: string | null
                    rut?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                    vigencia_hasta?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_directorio_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_dominio_vigente: {
                Row: {
                    anio: number | null
                    cbr: string | null
                    completado: boolean | null
                    content_hash: string | null
                    created_at: string | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    fojas: string | null
                    id: string
                    nombre_archivo: string | null
                    numero: string | null
                    operacion_id: string | null
                    raw_text: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    anio?: number | null
                    cbr?: string | null
                    completado?: boolean | null
                    content_hash?: string | null
                    created_at?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fojas?: string | null
                    id?: string
                    nombre_archivo?: string | null
                    numero?: string | null
                    operacion_id?: string | null
                    raw_text?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    anio?: number | null
                    cbr?: string | null
                    completado?: boolean | null
                    content_hash?: string | null
                    created_at?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fojas?: string | null
                    id?: string
                    nombre_archivo?: string | null
                    numero?: string | null
                    operacion_id?: string | null
                    raw_text?: string | null
                    user_id?: string | null
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
                ]
            }
            ocr_escritura_cv: {
                Row: {
                    completado: boolean | null
                    declaracion_pago_total: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    renuncia_accion_resolutoria: boolean | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    declaracion_pago_total?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    renuncia_accion_resolutoria?: boolean | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    declaracion_pago_total?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    renuncia_accion_resolutoria?: boolean | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_escritura_cv_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_estatutos_sociales: {
                Row: {
                    autoriza_delegar: boolean | null
                    clausula_texto: string | null
                    codigo_verificacion_cve: string | null
                    completado: boolean | null
                    created_at: string | null
                    doc_table: string | null
                    documento_url: string | null
                    duracion_sociedad: string | null
                    enviado: boolean | null
                    es_empresa_en_un_dia: boolean | null
                    estudio_id: string | null
                    fase: number | null
                    fecha_emision_documento: string | null
                    forma_ejercicio: string | null
                    id: string
                    nombre_propiedad: string | null
                    numero_atencion: string | null
                    numero_operacion: string | null
                    puede_autocontratar: boolean | null
                    puede_hipotecar: boolean | null
                    puede_representar_cbr: boolean | null
                    puede_vender_enajenar: boolean | null
                    razon_social: string | null
                    representantes: Json | null
                    rut_sociedad: string | null
                    tipo_administracion: string | null
                    tipo_sociedad: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    autoriza_delegar?: boolean | null
                    clausula_texto?: string | null
                    codigo_verificacion_cve?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    doc_table?: string | null
                    documento_url?: string | null
                    duracion_sociedad?: string | null
                    enviado?: boolean | null
                    es_empresa_en_un_dia?: boolean | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision_documento?: string | null
                    forma_ejercicio?: string | null
                    id?: string
                    nombre_propiedad?: string | null
                    numero_atencion?: string | null
                    numero_operacion?: string | null
                    puede_autocontratar?: boolean | null
                    puede_hipotecar?: boolean | null
                    puede_representar_cbr?: boolean | null
                    puede_vender_enajenar?: boolean | null
                    razon_social?: string | null
                    representantes?: Json | null
                    rut_sociedad?: string | null
                    tipo_administracion?: string | null
                    tipo_sociedad?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    autoriza_delegar?: boolean | null
                    clausula_texto?: string | null
                    codigo_verificacion_cve?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    doc_table?: string | null
                    documento_url?: string | null
                    duracion_sociedad?: string | null
                    enviado?: boolean | null
                    es_empresa_en_un_dia?: boolean | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision_documento?: string | null
                    forma_ejercicio?: string | null
                    id?: string
                    nombre_propiedad?: string | null
                    numero_atencion?: string | null
                    numero_operacion?: string | null
                    puede_autocontratar?: boolean | null
                    puede_hipotecar?: boolean | null
                    puede_representar_cbr?: boolean | null
                    puede_vender_enajenar?: boolean | null
                    razon_social?: string | null
                    representantes?: Json | null
                    rut_sociedad?: string | null
                    tipo_administracion?: string | null
                    tipo_sociedad?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_estatutos_sociales_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_gasto_comun: {
                Row: {
                    banco: string | null
                    completado: boolean | null
                    created_at: string | null
                    documento_url: string | null
                    email_contacto: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    nombre_condominio: string | null
                    numero_cuenta: string | null
                    operacion_id: string | null
                    periodo_cobro: string | null
                    porcentaje_manuscrito: number | null
                    resumen_situacion: string | null
                    riesgo_fraude: string | null
                    rut_comunidad: string | null
                    total_gasto_comun: string | null
                    unidades_con_morosidad: Json | null
                    updated_at: string | null
                    user_id: string | null
                    verificacion_titulo_contenido: boolean | null
                    verificado: boolean | null
                }
                Insert: {
                    banco?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    email_contacto?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    nombre_condominio?: string | null
                    numero_cuenta?: string | null
                    operacion_id?: string | null
                    periodo_cobro?: string | null
                    porcentaje_manuscrito?: number | null
                    resumen_situacion?: string | null
                    riesgo_fraude?: string | null
                    rut_comunidad?: string | null
                    total_gasto_comun?: string | null
                    unidades_con_morosidad?: Json | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificacion_titulo_contenido?: boolean | null
                    verificado?: boolean | null
                }
                Update: {
                    banco?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    email_contacto?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    nombre_condominio?: string | null
                    numero_cuenta?: string | null
                    operacion_id?: string | null
                    periodo_cobro?: string | null
                    porcentaje_manuscrito?: number | null
                    resumen_situacion?: string | null
                    riesgo_fraude?: string | null
                    rut_comunidad?: string | null
                    total_gasto_comun?: string | null
                    unidades_con_morosidad?: Json | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificacion_titulo_contenido?: boolean | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_gasto_comun_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
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
                    detalles_hipotecas: Json | null
                    detalles_prohibiciones: Json | null
                    doc_id_origen: string | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    fecha_emision_certificado: string | null
                    fojas: string | null
                    glosa_hipoteca: string | null
                    gravamenes: Json | null
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
                    tiene_hipotecas: boolean | null
                    tiene_prohibiciones: boolean | null
                    titulares_citados: Json | null
                    user_id: string | null
                    verificacion_titulo_contenido: string | null
                    verificado: boolean | null
                }
                Insert: {
                    acreedor_nombre?: string | null
                    anio?: number | null
                    cbr?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    detalles_hipotecas?: Json | null
                    detalles_prohibiciones?: Json | null
                    doc_id_origen?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision_certificado?: string | null
                    fojas?: string | null
                    glosa_hipoteca?: string | null
                    gravamenes?: Json | null
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
                    tiene_hipotecas?: boolean | null
                    tiene_prohibiciones?: boolean | null
                    titulares_citados?: Json | null
                    user_id?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    acreedor_nombre?: string | null
                    anio?: number | null
                    cbr?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    detalles_hipotecas?: Json | null
                    detalles_prohibiciones?: Json | null
                    doc_id_origen?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
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
                    tiene_hipotecas?: boolean | null
                    tiene_prohibiciones?: boolean | null
                    titulares_citados?: Json | null
                    user_id?: string | null
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
                ]
            }
            ocr_impuesto_herencia: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_impuesto_herencia_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_informe_no_matrimonio: {
                Row: {
                    codigo_folio_repertorio: string | null
                    completado: boolean | null
                    created_at: string | null
                    documento_url: string | null
                    enviado: boolean | null
                    estado_civil_declarado: string | null
                    estudio_id: string | null
                    fecha_emision: string | null
                    id: string
                    institucion_emisora: string | null
                    nombre_completo: string | null
                    numero_operacion: string | null
                    observacion_texto: string | null
                    run: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    codigo_folio_repertorio?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estado_civil_declarado?: string | null
                    estudio_id?: string | null
                    fecha_emision?: string | null
                    id?: string
                    institucion_emisora?: string | null
                    nombre_completo?: string | null
                    numero_operacion?: string | null
                    observacion_texto?: string | null
                    run?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    codigo_folio_repertorio?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estado_civil_declarado?: string | null
                    estudio_id?: string | null
                    fecha_emision?: string | null
                    id?: string
                    institucion_emisora?: string | null
                    nombre_completo?: string | null
                    numero_operacion?: string | null
                    observacion_texto?: string | null
                    run?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_informe_no_matrimonio_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_inscripcion_anterior: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_inscripcion_anterior_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_inscripcion_herencia: {
                Row: {
                    causante_nombre: string | null
                    causante_rut: string | null
                    completado: boolean | null
                    documento_url: string | null
                    especial_herencia_anio: number | null
                    especial_herencia_fojas: string | null
                    especial_herencia_numero: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    nuevos_duenos: Json | null
                    operacion_id: string | null
                    posesion_efectiva_anio: number | null
                    posesion_efectiva_fojas: string | null
                    posesion_efectiva_numero: string | null
                    propiedad_comuna: string | null
                    propiedad_deslindes: string | null
                    propiedad_direccion: string | null
                    propiedad_rol_avaluo: string | null
                    propiedad_titulo_anterior: string | null
                    resolucion_fecha: string | null
                    resolucion_numero: string | null
                    resolucion_servicio_emisor: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    causante_nombre?: string | null
                    causante_rut?: string | null
                    completado?: boolean | null
                    documento_url?: string | null
                    especial_herencia_anio?: number | null
                    especial_herencia_fojas?: string | null
                    especial_herencia_numero?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    nuevos_duenos?: Json | null
                    operacion_id?: string | null
                    posesion_efectiva_anio?: number | null
                    posesion_efectiva_fojas?: string | null
                    posesion_efectiva_numero?: string | null
                    propiedad_comuna?: string | null
                    propiedad_deslindes?: string | null
                    propiedad_direccion?: string | null
                    propiedad_rol_avaluo?: string | null
                    propiedad_titulo_anterior?: string | null
                    resolucion_fecha?: string | null
                    resolucion_numero?: string | null
                    resolucion_servicio_emisor?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    causante_nombre?: string | null
                    causante_rut?: string | null
                    completado?: boolean | null
                    documento_url?: string | null
                    especial_herencia_anio?: number | null
                    especial_herencia_fojas?: string | null
                    especial_herencia_numero?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    nuevos_duenos?: Json | null
                    operacion_id?: string | null
                    posesion_efectiva_anio?: number | null
                    posesion_efectiva_fojas?: string | null
                    posesion_efectiva_numero?: string | null
                    propiedad_comuna?: string | null
                    propiedad_deslindes?: string | null
                    propiedad_direccion?: string | null
                    propiedad_rol_avaluo?: string | null
                    propiedad_titulo_anterior?: string | null
                    resolucion_fecha?: string | null
                    resolucion_numero?: string | null
                    resolucion_servicio_emisor?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_inscripcion_herencia_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_matrimonio: {
                Row: {
                    anio_inscripcion: string | null
                    circunscripcion: string | null
                    completado: boolean | null
                    contrayente_1_nombre: string | null
                    contrayente_2_nombre: string | null
                    conyuges: Json | null
                    created_at: string | null
                    documento_url: string | null
                    enviado: boolean | null
                    estado_matrimonio: string | null
                    estudio_id: string | null
                    fase: number | null
                    fecha_emision: string | null
                    fecha_matrimonio: string | null
                    id: string
                    nombre_archivo: string | null
                    numero_inscripcion: string | null
                    numero_operacion: string | null
                    operacion_id: string | null
                    regimen_vigente: string | null
                    requiere_autorizacion_conyuge_venta: boolean | null
                    subinscripciones: Json | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    anio_inscripcion?: string | null
                    circunscripcion?: string | null
                    completado?: boolean | null
                    contrayente_1_nombre?: string | null
                    contrayente_2_nombre?: string | null
                    conyuges?: Json | null
                    created_at?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estado_matrimonio?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision?: string | null
                    fecha_matrimonio?: string | null
                    id?: string
                    nombre_archivo?: string | null
                    numero_inscripcion?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    regimen_vigente?: string | null
                    requiere_autorizacion_conyuge_venta?: boolean | null
                    subinscripciones?: Json | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    anio_inscripcion?: string | null
                    circunscripcion?: string | null
                    completado?: boolean | null
                    contrayente_1_nombre?: string | null
                    contrayente_2_nombre?: string | null
                    conyuges?: Json | null
                    created_at?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estado_matrimonio?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision?: string | null
                    fecha_matrimonio?: string | null
                    id?: string
                    nombre_archivo?: string | null
                    numero_inscripcion?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    regimen_vigente?: string | null
                    requiere_autorizacion_conyuge_venta?: boolean | null
                    subinscripciones?: Json | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_matrimonio_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_nacimiento: {
                Row: {
                    anotaciones_marginales: string | null
                    completado: boolean | null
                    created_at: string | null
                    datos_registro: string | null
                    documento_url: string | null
                    enviado: boolean | null
                    estudio_id: string | null
                    fecha_emision: string | null
                    fecha_nacimiento: string | null
                    id: string
                    madre_nombre: string | null
                    nombre_inscrito: string | null
                    numero_operacion: string | null
                    padre_nombre: string | null
                    rut_inscrito: string | null
                    rut_madre: string | null
                    rut_padre: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    anotaciones_marginales?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    datos_registro?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    fecha_emision?: string | null
                    fecha_nacimiento?: string | null
                    id?: string
                    madre_nombre?: string | null
                    nombre_inscrito?: string | null
                    numero_operacion?: string | null
                    padre_nombre?: string | null
                    rut_inscrito?: string | null
                    rut_madre?: string | null
                    rut_padre?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    anotaciones_marginales?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    datos_registro?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    fecha_emision?: string | null
                    fecha_nacimiento?: string | null
                    id?: string
                    madre_nombre?: string | null
                    nombre_inscrito?: string | null
                    numero_operacion?: string | null
                    padre_nombre?: string | null
                    rut_inscrito?: string | null
                    rut_madre?: string | null
                    rut_padre?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_nacimiento_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_plano_copropiedad: {
                Row: {
                    completado: boolean | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    nombre_archivo: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    nombre_archivo?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_plano_copropiedad_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_poderes: {
                Row: {
                    clasificacion_poder: string | null
                    completado: boolean | null
                    created_at: string | null
                    doc_id_origen: string | null
                    document_url: string | null
                    documento_url: string | null
                    enviado: boolean | null
                    estado: string | null
                    estudio_id: string | null
                    facultades: Json | null
                    fase: number | null
                    fecha_escritura: string | null
                    forma_actuacion_mandatarios: string | null
                    id: string
                    inmueble_anio: string | null
                    inmueble_comuna: string | null
                    inmueble_conservador: string | null
                    inmueble_deslindes: string | null
                    inmueble_direccion: string | null
                    inmueble_fojas: string | null
                    inmueble_numero: string | null
                    mandantes: Json | null
                    mandatarios: Json | null
                    nombre_archivo: string | null
                    notaria: string | null
                    numero_operacion: string | null
                    operacion_id: string | null
                    porcentaje_manuscrito: number | null
                    puede_autocontratar: boolean | null
                    puede_hipotecar: boolean | null
                    puede_percibir: boolean | null
                    puede_vender: boolean | null
                    raw_text: string | null
                    repertorio: string | null
                    riesgo_fraude: string | null
                    tipo_poder: string | null
                    user_id: string | null
                    verificacion_titulo_contenido: string | null
                    verificado: boolean | null
                    vigencia_ref: string | null
                    vigencia_texto: string | null
                }
                Insert: {
                    clasificacion_poder?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    doc_id_origen?: string | null
                    document_url?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estado?: string | null
                    estudio_id?: string | null
                    facultades?: Json | null
                    fase?: number | null
                    fecha_escritura?: string | null
                    forma_actuacion_mandatarios?: string | null
                    id?: string
                    inmueble_anio?: string | null
                    inmueble_comuna?: string | null
                    inmueble_conservador?: string | null
                    inmueble_deslindes?: string | null
                    inmueble_direccion?: string | null
                    inmueble_fojas?: string | null
                    inmueble_numero?: string | null
                    mandantes?: Json | null
                    mandatarios?: Json | null
                    nombre_archivo?: string | null
                    notaria?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    porcentaje_manuscrito?: number | null
                    puede_autocontratar?: boolean | null
                    puede_hipotecar?: boolean | null
                    puede_percibir?: boolean | null
                    puede_vender?: boolean | null
                    raw_text?: string | null
                    repertorio?: string | null
                    riesgo_fraude?: string | null
                    tipo_poder?: string | null
                    user_id?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                    vigencia_ref?: string | null
                    vigencia_texto?: string | null
                }
                Update: {
                    clasificacion_poder?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    doc_id_origen?: string | null
                    document_url?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estado?: string | null
                    estudio_id?: string | null
                    facultades?: Json | null
                    fase?: number | null
                    fecha_escritura?: string | null
                    forma_actuacion_mandatarios?: string | null
                    id?: string
                    inmueble_anio?: string | null
                    inmueble_comuna?: string | null
                    inmueble_conservador?: string | null
                    inmueble_deslindes?: string | null
                    inmueble_direccion?: string | null
                    inmueble_fojas?: string | null
                    inmueble_numero?: string | null
                    mandantes?: Json | null
                    mandatarios?: Json | null
                    nombre_archivo?: string | null
                    notaria?: string | null
                    numero_operacion?: string | null
                    operacion_id?: string | null
                    porcentaje_manuscrito?: number | null
                    puede_autocontratar?: boolean | null
                    puede_hipotecar?: boolean | null
                    puede_percibir?: boolean | null
                    puede_vender?: boolean | null
                    raw_text?: string | null
                    repertorio?: string | null
                    riesgo_fraude?: string | null
                    tipo_poder?: string | null
                    user_id?: string | null
                    verificacion_titulo_contenido?: string | null
                    verificado?: boolean | null
                    vigencia_ref?: string | null
                    vigencia_texto?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_poderes_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_posesion_efectiva: {
                Row: {
                    autoridad_emisora: string | null
                    causante_fecha_defuncion: string | null
                    causante_nombre: string | null
                    causante_rut: string | null
                    causante_ultimo_domicilio: string | null
                    cesion_derechos_hereditarios: string | null
                    completado: boolean | null
                    doc_id_origen: string | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    fecha_resolucion: string | null
                    id: string
                    inventario_bienes_raices: Json | null
                    lista_herederos: Json | null
                    nombre_archivo: string | null
                    numero_operacion: string | null
                    numero_resolucion: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    autoridad_emisora?: string | null
                    causante_fecha_defuncion?: string | null
                    causante_nombre?: string | null
                    causante_rut?: string | null
                    causante_ultimo_domicilio?: string | null
                    cesion_derechos_hereditarios?: string | null
                    completado?: boolean | null
                    doc_id_origen?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_resolucion?: string | null
                    id?: string
                    inventario_bienes_raices?: Json | null
                    lista_herederos?: Json | null
                    nombre_archivo?: string | null
                    numero_operacion?: string | null
                    numero_resolucion?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    autoridad_emisora?: string | null
                    causante_fecha_defuncion?: string | null
                    causante_nombre?: string | null
                    causante_rut?: string | null
                    causante_ultimo_domicilio?: string | null
                    cesion_derechos_hereditarios?: string | null
                    completado?: boolean | null
                    doc_id_origen?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_resolucion?: string | null
                    id?: string
                    inventario_bienes_raices?: Json | null
                    lista_herederos?: Json | null
                    nombre_archivo?: string | null
                    numero_operacion?: string | null
                    numero_resolucion?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_posesion_efectiva_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_recepcion_final: {
                Row: {
                    completado: boolean | null
                    created_at: string | null
                    destino_principal: string | null
                    documento_url: string | null
                    estado: string | null
                    estudio_id: string | null
                    fase: number | null
                    fecha_resolucion: string | null
                    id: string
                    nombre_archivo: string | null
                    numero_operacion: string | null
                    numero_resolucion: string | null
                    operacion_id: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    completado?: boolean | null
                    created_at?: string | null
                    destino_principal?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_resolucion?: string | null
                    id?: string
                    nombre_archivo?: string | null
                    numero_operacion?: string | null
                    numero_resolucion?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    completado?: boolean | null
                    created_at?: string | null
                    destino_principal?: string | null
                    documento_url?: string | null
                    estado?: string | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_resolucion?: string | null
                    id?: string
                    nombre_archivo?: string | null
                    numero_operacion?: string | null
                    numero_resolucion?: string | null
                    operacion_id?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_recepcion_final_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_rural_sag: {
                Row: {
                    advertencias_legales: Json | null
                    completado: boolean | null
                    comuna: string | null
                    conservador: string | null
                    created_at: string | null
                    cumple_normativa: boolean | null
                    documento_url: string | null
                    enviado: boolean | null
                    estudio_id: string | null
                    fecha_emision: string | null
                    fojas: string | null
                    id: string
                    nombre_predio: string | null
                    numero: string | null
                    numero_certificado: string | null
                    numero_operacion: string | null
                    oficina_sag: string | null
                    propietario: string | null
                    rol_avaluo: string | null
                    anio: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    advertencias_legales?: Json | null
                    completado?: boolean | null
                    comuna?: string | null
                    conservador?: string | null
                    created_at?: string | null
                    cumple_normativa?: boolean | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    fecha_emision?: string | null
                    fojas?: string | null
                    id?: string
                    nombre_predio?: string | null
                    numero?: string | null
                    numero_certificado?: string | null
                    numero_operacion?: string | null
                    oficina_sag?: string | null
                    propietario?: string | null
                    rol_avaluo?: string | null
                    anio?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    advertencias_legales?: Json | null
                    completado?: boolean | null
                    comuna?: string | null
                    conservador?: string | null
                    created_at?: string | null
                    cumple_normativa?: boolean | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    fecha_emision?: string | null
                    fojas?: string | null
                    id?: string
                    nombre_predio?: string | null
                    numero?: string | null
                    numero_certificado?: string | null
                    numero_operacion?: string | null
                    oficina_sag?: string | null
                    propietario?: string | null
                    rol_avaluo?: string | null
                    anio?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_rural_sag_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_vigencia_poderes: {
                Row: {
                    apoderados_mencionados: Json | null
                    codigo_verificacion: string | null
                    completado: boolean | null
                    created_at: string | null
                    doc_table: string | null
                    documento_url: string | null
                    enviado: boolean | null
                    es_vigente: boolean | null
                    estudio_id: string | null
                    fase: number | null
                    fecha_emision: string | null
                    id: string
                    institucion_emisora: string | null
                    nombre_propiedad: string | null
                    numero_certificado: string | null
                    numero_operacion: string | null
                    razon_social: string | null
                    registro_referencia: string | null
                    tiene_notas_marginales: boolean | null
                    texto_certificacion: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    apoderados_mencionados?: Json | null
                    codigo_verificacion?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    doc_table?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    es_vigente?: boolean | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision?: string | null
                    id?: string
                    institucion_emisora?: string | null
                    nombre_propiedad?: string | null
                    numero_certificado?: string | null
                    numero_operacion?: string | null
                    razon_social?: string | null
                    registro_referencia?: string | null
                    tiene_notas_marginales?: boolean | null
                    texto_certificacion?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    apoderados_mencionados?: Json | null
                    codigo_verificacion?: string | null
                    completado?: boolean | null
                    created_at?: string | null
                    doc_table?: string | null
                    documento_url?: string | null
                    enviado?: boolean | null
                    es_vigente?: boolean | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision?: string | null
                    id?: string
                    institucion_emisora?: string | null
                    nombre_propiedad?: string | null
                    numero_certificado?: string | null
                    numero_operacion?: string | null
                    razon_social?: string | null
                    registro_referencia?: string | null
                    tiene_notas_marginales?: boolean | null
                    texto_certificacion?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_vigencia_poderes_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_inscripcion_comercio: {
                Row: {
                    administracion_extractada: string | null
                    anio: string | null
                    capital_social: string | null
                    completado: boolean | null
                    conservador: string | null
                    created_at: string | null
                    doc_table: string | null
                    documento_url: string | null
                    duracion_pactada: string | null
                    enviado: boolean | null
                    es_vigente_segun_certificado: boolean | null
                    estudio_id: string | null
                    fase: number | null
                    fecha_emision_copia: string | null
                    fojas: string | null
                    id: string
                    nombre_propiedad: string | null
                    numero: string | null
                    numero_operacion: string | null
                    razon_social: string | null
                    resumen_acuerdos: string | null
                    socios_constituyentes_o_modificadores: Json | null
                    texto_notas_marginales: string | null
                    tiene_notas_marginales: boolean | null
                    tipo_acto_juridico: string | null
                    updated_at: string | null
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    administracion_extractada?: string | null
                    anio?: string | null
                    capital_social?: string | null
                    completado?: boolean | null
                    conservador?: string | null
                    created_at?: string | null
                    doc_table?: string | null
                    documento_url?: string | null
                    duracion_pactada?: string | null
                    enviado?: boolean | null
                    es_vigente_segun_certificado?: boolean | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision_copia?: string | null
                    fojas?: string | null
                    id?: string
                    nombre_propiedad?: string | null
                    numero?: string | null
                    numero_operacion?: string | null
                    razon_social?: string | null
                    resumen_acuerdos?: string | null
                    socios_constituyentes_o_modificadores?: Json | null
                    texto_notas_marginales?: string | null
                    tiene_notas_marginales?: boolean | null
                    tipo_acto_juridico?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    administracion_extractada?: string | null
                    anio?: string | null
                    capital_social?: string | null
                    completado?: boolean | null
                    conservador?: string | null
                    created_at?: string | null
                    doc_table?: string | null
                    documento_url?: string | null
                    duracion_pactada?: string | null
                    enviado?: boolean | null
                    es_vigente_segun_certificado?: boolean | null
                    estudio_id?: string | null
                    fase?: number | null
                    fecha_emision_copia?: string | null
                    fojas?: string | null
                    id?: string
                    nombre_propiedad?: string | null
                    numero?: string | null
                    numero_operacion?: string | null
                    razon_social?: string | null
                    resumen_acuerdos?: string | null
                    socios_constituyentes_o_modificadores?: Json | null
                    texto_notas_marginales?: string | null
                    tiene_notas_marginales?: boolean | null
                    tipo_acto_juridico?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_inscripcion_comercio_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    full_name: string | null
                    id: string
                    role: string | null
                }
                Insert: {
                    full_name?: string | null
                    id: string
                    role?: string | null
                }
                Update: {
                    full_name?: string | null
                    id?: string
                    role?: string | null
                }
                Relationships: []
            }
            solicitud_documentos: {
                Row: {
                    doc_entidad: string | null
                    doc_fecha: string | null
                    doc_id_origen: string | null
                    doc_plano: string | null
                    doc_repertorio: string | null
                    doc_resolucion: string | null
                    doc_rol: string | null
                    doc_tipo: string | null
                    documento_url: string | null
                    estudio_id: string | null
                    id: string
                    nombre_documento: string
                    operacion_id: string | null
                    propiedad_anio: string | null
                    propiedad_comuna: string | null
                    propiedad_fojas: string | null
                    propiedad_numero: string | null
                    repetido: boolean | null
                    rol_persona: string | null
                    status: string | null
                    tipo_documento: string
                    user_id: string | null
                    notaria_documento: string | null
                }
                Insert: {
                    doc_entidad?: string | null
                    doc_fecha?: string | null
                    doc_id_origen?: string | null
                    doc_plano?: string | null
                    doc_repertorio?: string | null
                    doc_resolucion?: string | null
                    doc_rol?: string | null
                    doc_tipo?: string | null
                    documento_url?: string | null
                    estudio_id?: string | null
                    id?: string
                    nombre_documento: string
                    operacion_id?: string | null
                    propiedad_anio?: string | null
                    propiedad_comuna?: string | null
                    propiedad_fojas?: string | null
                    propiedad_numero?: string | null
                    repetido?: boolean | null
                    rol_persona?: string | null
                    status?: string | null
                    tipo_documento: string
                    user_id?: string | null
                    notaria_documento?: string | null
                }
                Update: {
                    doc_entidad?: string | null
                    doc_fecha?: string | null
                    doc_id_origen?: string | null
                    doc_plano?: string | null
                    doc_repertorio?: string | null
                    doc_resolucion?: string | null
                    doc_rol?: string | null
                    doc_tipo?: string | null
                    documento_url?: string | null
                    estudio_id?: string | null
                    id?: string
                    nombre_documento?: string
                    operacion_id?: string | null
                    propiedad_anio?: string | null
                    propiedad_comuna?: string | null
                    propiedad_fojas?: string | null
                    propiedad_numero?: string | null
                    repetido?: boolean | null
                    rol_persona?: string | null
                    status?: string | null
                    tipo_documento?: string
                    user_id?: string | null
                    notaria_documento?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "solicitud_documentos_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
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
                    p_estudio_id: string
                }
                Returns: Json
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

type PublicSchema = Database["public"]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
    }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
