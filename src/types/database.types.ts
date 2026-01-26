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
            ocr_Escritura_Constitucion_aporte: {
                Row: {
                    administradores_designados: Json | null
                    analisis_validez: Json | null
                    completado: boolean | null
                    created_at: string
                    documento_url: string | null
                    enviado: boolean | null
                    estudio_id: string | null
                    facultad_enajenar: boolean | null
                    facultad_hipotecar: boolean | null
                    facultad_vender: boolean | null
                    fase: number | null
                    fecha_escritura: string | null
                    forma_actuacion: string | null
                    id: string
                    identificacion_aportante_naturaleza: Json | null
                    individualizacion_aporte: Json | null
                    lista_inmuebles_aportados: Json | null
                    malla_societaria: Json | null
                    naturaleza_acto: string | null
                    notaria: string | null
                    numero_operacion: string | null
                    organo_administracion: string | null
                    repertorio: string | null
                    sociedad_adquirente: Json | null
                    updated_at: string
                    user_id: string | null
                    verificado: boolean | null
                }
                Insert: {
                    administradores_designados?: Json | null
                    analisis_validez?: Json | null
                    completado?: boolean | null
                    created_at?: string
                    documento_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    facultad_enajenar?: boolean | null
                    facultad_hipotecar?: boolean | null
                    facultad_vender?: boolean | null
                    fase?: number | null
                    fecha_escritura?: string | null
                    forma_actuacion?: string | null
                    id?: string
                    identificacion_aportante_naturaleza?: Json | null
                    individualizacion_aporte?: Json | null
                    lista_inmuebles_aportados?: Json | null
                    malla_societaria?: Json | null
                    naturaleza_acto?: string | null
                    notaria?: string | null
                    numero_operacion?: string | null
                    organo_administracion?: string | null
                    repertorio?: string | null
                    sociedad_adquirente?: Json | null
                    updated_at?: string
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Update: {
                    administradores_designados?: Json | null
                    analisis_validez?: Json | null
                    completado?: boolean | null
                    created_at?: string
                    documento_url?: string | null
                    enviado?: boolean | null
                    estudio_id?: string | null
                    facultad_enajenar?: boolean | null
                    facultad_hipotecar?: boolean | null
                    facultad_vender?: boolean | null
                    fase?: number | null
                    fecha_escritura?: string | null
                    forma_actuacion?: string | null
                    id?: string
                    identificacion_aportante_naturaleza?: Json | null
                    individualizacion_aporte?: Json | null
                    lista_inmuebles_aportados?: Json | null
                    malla_societaria?: Json | null
                    naturaleza_acto?: string | null
                    notaria?: string | null
                    numero_operacion?: string | null
                    organo_administracion?: string | null
                    repertorio?: string | null
                    sociedad_adquirente?: Json | null
                    updated_at?: string
                    user_id?: string | null
                    verificado?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ocr_Escritura_Constitucion_aporte_estudio_id_fkey"
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
                        foreignKeyName: "ocr_escritura_cv_estudio_id_fkey"
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
            ocr_no_expropiacion_muni: {
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
                        foreignKeyName: "ocr_no_expropiacion_muni_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_no_expropiacion_serviu: {
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
                        foreignKeyName: "ocr_no_expropiacion_serviu_estudio_id_fkey"
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
            ocr_recepcion_final: {
                Row: {
                    completado: boolean | null
                    destino_principal: string | null
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
                    destino_principal?: string | null
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
                    destino_principal?: string | null
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
                        foreignKeyName: "ocr_recepcion_final_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ocr_reglamento_copropiedad: {
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
                        foreignKeyName: "ocr_reglamento_copropiedad_estudio_id_fkey"
                        columns: ["estudio_id"]
                        isOneToOne: false
                        referencedRelation: "estudios_titulos"
                        referencedColumns: ["id"]
                    },
                ]
            }
            solicitud_documentos: {
                Row: {
                    created_at: string | null
                    destino_url: string | null
                    doc_entidad: string | null
                    doc_fecha: string | null
                    doc_id_origen: string | null
                    doc_plano: string | null
                    doc_repertorio: string | null
                    doc_resolucion: string | null
                    doc_rol: string | null
                    doc_tipo: string | null
                    documento_nombre: string
                    estudio_id: string | null
                    fase: number | null
                    id: string
                    id_referencia: number | null
                    propiedad_anio: number | null
                    propiedad_comuna: string | null
                    propiedad_fojas: string | null
                    propiedad_numero: string | null
                    rol_persona: string | null
                    solicitud_estado: string | null
                    solicitud_id: string | null
                    tipo_documento: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    destino_url?: string | null
                    doc_entidad?: string | null
                    doc_fecha?: string | null
                    doc_id_origen?: string | null
                    doc_plano?: string | null
                    doc_repertorio?: string | null
                    doc_resolucion?: string | null
                    doc_rol?: string | null
                    doc_tipo?: string | null
                    documento_nombre: string
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    id_referencia?: number | null
                    propiedad_anio?: number | null
                    propiedad_comuna?: string | null
                    propiedad_fojas?: string | null
                    propiedad_numero?: string | null
                    rol_persona?: string | null
                    solicitud_estado?: string | null
                    solicitud_id?: string | null
                    tipo_documento: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    destino_url?: string | null
                    doc_entidad?: string | null
                    doc_fecha?: string | null
                    doc_id_origen?: string | null
                    doc_plano?: string | null
                    doc_repertorio?: string | null
                    doc_resolucion?: string | null
                    doc_rol?: string | null
                    doc_tipo?: string | null
                    documento_nombre?: string
                    estudio_id?: string | null
                    fase?: number | null
                    id?: string
                    id_referencia?: number | null
                    propiedad_anio?: number | null
                    propiedad_comuna?: string | null
                    propiedad_fojas?: string | null
                    propiedad_numero?: string | null
                    rol_persona?: string | null
                    solicitud_estado?: string | null
                    solicitud_id?: string | null
                    tipo_documento?: string
                    updated_at?: string | null
                    user_id?: string | null
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
                    p_operacion_id: string
                    p_fase?: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

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
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
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
