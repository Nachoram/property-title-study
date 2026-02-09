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
      estudio_documentos_aislados: {
        Row: {
          analisis_detalle: string | null
          created_at: string | null
          estado_revision: string | null
          estudio_id: string | null
          id: string
          institucion: string | null
          texto_hallazgo: string | null
          tipo_documento: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analisis_detalle?: string | null
          created_at?: string | null
          estado_revision?: string | null
          estudio_id?: string | null
          id?: string
          institucion?: string | null
          texto_hallazgo?: string | null
          tipo_documento?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analisis_detalle?: string | null
          created_at?: string | null
          estado_revision?: string | null
          estudio_id?: string | null
          id?: string
          institucion?: string | null
          texto_hallazgo?: string | null
          tipo_documento?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estudio_documentos_aislados_estudio_id_fkey"
            columns: ["estudio_id"]
            isOneToOne: false
            referencedRelation: "estudios_titulos"
            referencedColumns: ["id"]
          },
        ]
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
          corresponde_a_propiedad_en_estudio: boolean | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          operacion_id: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          user_id: string | null
        }
        Insert: {
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
        }
        Update: {
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
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
          avaluo_total: string | null
          completado: boolean | null
          comuna: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          destino_bien_raiz: string | null
          direccion_propiedad: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          evaluo_afecto: string | null
          exento: string | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          periodo_aplicable: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          rol: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          avaluo_total?: string | null
          completado?: boolean | null
          comuna?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          destino_bien_raiz?: string | null
          direccion_propiedad?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          evaluo_afecto?: string | null
          exento?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          periodo_aplicable?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          avaluo_total?: string | null
          completado?: boolean | null
          comuna?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          destino_bien_raiz?: string | null
          direccion_propiedad?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          evaluo_afecto?: string | null
          exento?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          periodo_aplicable?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_cedula_identidad: {
        Row: {
          apellidos: string | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          documento_url: string | null
          enviado: boolean | null
          estudio_id: string | null
          fecha_emision: string | null
          fecha_vencimiento: string | null
          id: string
          institucion_emisora: string | null
          nacionalidad: string | null
          nombre_documento_ocr: string | null
          nombres: string | null
          numero_operacion: string | null
          numero_serie: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          rut: string | null
          updated_at: string | null
          user_id: string | null
          verificado: boolean | null
        }
        Insert: {
          apellidos?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_vencimiento?: string | null
          id?: string
          institucion_emisora?: string | null
          nacionalidad?: string | null
          nombre_documento_ocr?: string | null
          nombres?: string | null
          numero_operacion?: string | null
          numero_serie?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rut?: string | null
          updated_at?: string | null
          user_id?: string | null
          verificado?: boolean | null
        }
        Update: {
          apellidos?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_vencimiento?: string | null
          id?: string
          institucion_emisora?: string | null
          nacionalidad?: string | null
          nombre_documento_ocr?: string | null
          nombres?: string | null
          numero_operacion?: string | null
          numero_serie?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rut?: string | null
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
      ocr_certificado_numero: {
        Row: {
          acera: string | null
          completado: boolean | null
          conjunto_habitacional: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string
          documento_url: string | null
          entre_calles: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          municipalidad: string | null
          nombre_calle: string | null
          nombre_documento_ocr: string | null
          numero_oficial: string | null
          numero_operacion: string | null
          numero_solicitud: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          rol_avaluo: string | null
          sitio_loteo: string | null
          unidad_interior: string | null
          unidad_municipal: string | null
          user_id: string | null
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          acera?: string | null
          completado?: boolean | null
          conjunto_habitacional?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string
          documento_url?: string | null
          entre_calles?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          municipalidad?: string | null
          nombre_calle?: string | null
          nombre_documento_ocr?: string | null
          numero_oficial?: string | null
          numero_operacion?: string | null
          numero_solicitud?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          sitio_loteo?: string | null
          unidad_interior?: string | null
          unidad_municipal?: string | null
          user_id?: string | null
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          acera?: string | null
          completado?: boolean | null
          conjunto_habitacional?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string
          documento_url?: string | null
          entre_calles?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          municipalidad?: string | null
          nombre_calle?: string | null
          nombre_documento_ocr?: string | null
          numero_oficial?: string | null
          numero_operacion?: string | null
          numero_solicitud?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          sitio_loteo?: string | null
          unidad_interior?: string | null
          unidad_municipal?: string | null
          user_id?: string | null
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_cesion_derechos_hereditario: {
        Row: {
          causante_nombre: string | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          declaracion_pago_total: boolean | null
          direccion_inmueble: string | null
          doc_table: string | null
          documento_url: string | null
          enviado: boolean | null
          estudio_id: string | null
          fecha_emision: string | null
          fecha_otorgamiento: string | null
          forma_pago: string | null
          id: string
          ieh_anio: string | null
          ieh_cbr: string | null
          ieh_fojas: string | null
          ieh_numero: string | null
          institucion_emisora: string | null
          nombre_documento_ocr: string | null
          nombre_propiedad: string | null
          notaria: string | null
          numero_operacion: string | null
          partes_comparecientes: Json | null
          pe_anio: string | null
          pe_cbr: string | null
          pe_fojas: string | null
          pe_numero: string | null
          porcentaje_manuscrito: number | null
          precio_cesion: string | null
          repertorio: string | null
          riesgo_fraude: string | null
          tipo_cesion: string | null
          updated_at: string | null
          user_id: string | null
          verificado: boolean | null
        }
        Insert: {
          causante_nombre?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          declaracion_pago_total?: boolean | null
          direccion_inmueble?: string | null
          doc_table?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_otorgamiento?: string | null
          forma_pago?: string | null
          id?: string
          ieh_anio?: string | null
          ieh_cbr?: string | null
          ieh_fojas?: string | null
          ieh_numero?: string | null
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          partes_comparecientes?: Json | null
          pe_anio?: string | null
          pe_cbr?: string | null
          pe_fojas?: string | null
          pe_numero?: string | null
          porcentaje_manuscrito?: number | null
          precio_cesion?: string | null
          repertorio?: string | null
          riesgo_fraude?: string | null
          tipo_cesion?: string | null
          updated_at?: string | null
          user_id?: string | null
          verificado?: boolean | null
        }
        Update: {
          causante_nombre?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          declaracion_pago_total?: boolean | null
          direccion_inmueble?: string | null
          doc_table?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_otorgamiento?: string | null
          forma_pago?: string | null
          id?: string
          ieh_anio?: string | null
          ieh_cbr?: string | null
          ieh_fojas?: string | null
          ieh_numero?: string | null
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          partes_comparecientes?: Json | null
          pe_anio?: string | null
          pe_cbr?: string | null
          pe_fojas?: string | null
          pe_numero?: string | null
          porcentaje_manuscrito?: number | null
          precio_cesion?: string | null
          repertorio?: string | null
          riesgo_fraude?: string | null
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
      ocr_cip: {
        Row: {
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          densidad_maxima: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          linea_edificacion: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          user_id: string
          usos_permitidos: string | null
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
          zona_urbanistica: string | null
        }
        Insert: {
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          densidad_maxima?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          linea_edificacion?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id: string
          usos_permitidos?: string | null
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
          zona_urbanistica?: string | null
        }
        Update: {
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          densidad_maxima?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          linea_edificacion?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string
          usos_permitidos?: string | null
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
          zona_urbanistica?: string | null
        }
        Relationships: []
      }
      ocr_constitucion_sociedad: {
        Row: {
          corresponde_a_propiedad_en_estudio: boolean | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fase: number | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          operacion_id: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          user_id: string | null
        }
        Insert: {
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
        }
        Update: {
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
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
      ocr_deuda_contribuciones: {
        Row: {
          completado: boolean | null
          comuna: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          monto_total_pesos: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          rol_propiedad: string | null
          situacion_tributaria: string | null
          texto_literal_tgr: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          completado?: boolean | null
          comuna?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          monto_total_pesos?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_propiedad?: string | null
          situacion_tributaria?: string | null
          texto_literal_tgr?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          completado?: boolean | null
          comuna?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          monto_total_pesos?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_propiedad?: string | null
          situacion_tributaria?: string | null
          texto_literal_tgr?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_directorio: {
        Row: {
          cargos_designados: Json | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          documentos_url: string | null
          entidad_nombre: string | null
          enviado: boolean | null
          estudio_id: string | null
          fecha_acta: string | null
          fecha_emision: string | null
          fecha_escritura: string | null
          fecha_sesion_directorio: string | null
          id: string
          institucion_emisora: string | null
          limitaciones_texto: string | null
          nombre_documento_ocr: string | null
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
          rut_entidad: string | null
          updated_at: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
          vigencia_hasta: string | null
        }
        Insert: {
          cargos_designados?: Json | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documentos_url?: string | null
          entidad_nombre?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_acta?: string | null
          fecha_emision?: string | null
          fecha_escritura?: string | null
          fecha_sesion_directorio?: string | null
          id?: string
          institucion_emisora?: string | null
          limitaciones_texto?: string | null
          nombre_documento_ocr?: string | null
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
          rut_entidad?: string | null
          updated_at?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
          vigencia_hasta?: string | null
        }
        Update: {
          cargos_designados?: Json | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documentos_url?: string | null
          entidad_nombre?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_acta?: string | null
          fecha_emision?: string | null
          fecha_escritura?: string | null
          fecha_sesion_directorio?: string | null
          id?: string
          institucion_emisora?: string | null
          limitaciones_texto?: string | null
          nombre_documento_ocr?: string | null
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
          rut_entidad?: string | null
          updated_at?: string | null
          user_id?: string
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
          anio: string | null
          cbr: string | null
          completado: boolean | null
          comuna: string | null
          conservador: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          deslindes_extracto: string | null
          documentacion_requerida_notas: Json | null
          documento_url: string | null
          enviado: boolean | null
          es_vigente: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_certificacion: string | null
          fecha_emision: string | null
          fecha_inscripcion: string | null
          fojas: string | null
          id: string
          inmueble_comuna: string | null
          inmueble_deslindes_texto: string | null
          inmueble_direccion: string | null
          inmueble_rol_avaluo: string | null
          institucion_emisora: string | null
          modo_adquisicion: string | null
          nombre_documento_ocr: string | null
          nombre_predio: string | null
          notas_marginales: Json | null
          numero: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          propietarios_actuales: Json | null
          propietarios_anteriores: Json | null
          raw_text: string | null
          riesgo_fraude: string | null
          tipo_documento_vigencia: string | null
          titulo_anterior_anio: string | null
          titulo_anterior_fojas: string | null
          titulo_anterior_numero: string | null
          titulo_anterior_ref: string | null
          titulo_fundante: Json | null
          titulo_origen: string | null
          titulos_anteriores: Json | null
          updated_at: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          anio?: string | null
          cbr?: string | null
          completado?: boolean | null
          comuna?: string | null
          conservador?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          deslindes_extracto?: string | null
          documentacion_requerida_notas?: Json | null
          documento_url?: string | null
          enviado?: boolean | null
          es_vigente?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_certificacion?: string | null
          fecha_emision?: string | null
          fecha_inscripcion?: string | null
          fojas?: string | null
          id?: string
          inmueble_comuna?: string | null
          inmueble_deslindes_texto?: string | null
          inmueble_direccion?: string | null
          inmueble_rol_avaluo?: string | null
          institucion_emisora?: string | null
          modo_adquisicion?: string | null
          nombre_documento_ocr?: string | null
          nombre_predio?: string | null
          notas_marginales?: Json | null
          numero?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          propietarios_actuales?: Json | null
          propietarios_anteriores?: Json | null
          raw_text?: string | null
          riesgo_fraude?: string | null
          tipo_documento_vigencia?: string | null
          titulo_anterior_anio?: string | null
          titulo_anterior_fojas?: string | null
          titulo_anterior_numero?: string | null
          titulo_anterior_ref?: string | null
          titulo_fundante?: Json | null
          titulo_origen?: string | null
          titulos_anteriores?: Json | null
          updated_at?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          anio?: string | null
          cbr?: string | null
          completado?: boolean | null
          comuna?: string | null
          conservador?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          deslindes_extracto?: string | null
          documentacion_requerida_notas?: Json | null
          documento_url?: string | null
          enviado?: boolean | null
          es_vigente?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_certificacion?: string | null
          fecha_emision?: string | null
          fecha_inscripcion?: string | null
          fojas?: string | null
          id?: string
          inmueble_comuna?: string | null
          inmueble_deslindes_texto?: string | null
          inmueble_direccion?: string | null
          inmueble_rol_avaluo?: string | null
          institucion_emisora?: string | null
          modo_adquisicion?: string | null
          nombre_documento_ocr?: string | null
          nombre_predio?: string | null
          notas_marginales?: Json | null
          numero?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          propietarios_actuales?: Json | null
          propietarios_anteriores?: Json | null
          raw_text?: string | null
          riesgo_fraude?: string | null
          tipo_documento_vigencia?: string | null
          titulo_anterior_anio?: string | null
          titulo_anterior_fojas?: string | null
          titulo_anterior_numero?: string | null
          titulo_anterior_ref?: string | null
          titulo_fundante?: Json | null
          titulo_origen?: string | null
          titulos_anteriores?: Json | null
          updated_at?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_donacion: {
        Row: {
          completado: boolean | null
          created_at: string | null
          doc_id_origen: string | null
          enviado: boolean | null
          estudio_id: string | null
          fecha_emision: string | null
          fecha_escritura: string | null
          id: string
          insinuacion: boolean | null
          nombre_documento_ocr: string | null
          notaria: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          completado?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_escritura?: string | null
          id?: string
          insinuacion?: boolean | null
          nombre_documento_ocr?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          completado?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_escritura?: string | null
          id?: string
          insinuacion?: boolean | null
          nombre_documento_ocr?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ocr_donacion_estudio_id_fkey"
            columns: ["estudio_id"]
            isOneToOne: false
            referencedRelation: "estudios_titulos"
            referencedColumns: ["id"]
          },
        ]
      }
      ocr_escritura_constitucion_aporte: {
        Row: {
          administradores_designados: Json | null
          analisis_validez: Json | null
          completado: boolean | null
          created_at: string | null
          documento_url: string | null
          enviado: boolean | null
          estudio_id: string | null
          facultad_enajenar: boolean | null
          facultad_hipotecar: boolean | null
          facultad_vender: boolean | null
          fecha_emision: string | null
          fecha_escritura: string | null
          forma_actuacion: string | null
          id: string
          identificacion_aportante_naturaleza: Json | null
          individualizacion_aporte: Json | null
          lista_inmuebles_aportados: Json | null
          malla_societaria: Json | null
          naturaleza_acto: string | null
          nombre_documento_ocr: string | null
          notaria: string | null
          numero_operacion: string | null
          organo_administracion: string | null
          repertorio: string | null
          sociedad_adquirente: Json | null
          updated_at: string | null
          user_id: string | null
          verificado: boolean | null
        }
        Insert: {
          administradores_designados?: Json | null
          analisis_validez?: Json | null
          completado?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          facultad_enajenar?: boolean | null
          facultad_hipotecar?: boolean | null
          facultad_vender?: boolean | null
          fecha_emision?: string | null
          fecha_escritura?: string | null
          forma_actuacion?: string | null
          id?: string
          identificacion_aportante_naturaleza?: Json | null
          individualizacion_aporte?: Json | null
          lista_inmuebles_aportados?: Json | null
          malla_societaria?: Json | null
          naturaleza_acto?: string | null
          nombre_documento_ocr?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          organo_administracion?: string | null
          repertorio?: string | null
          sociedad_adquirente?: Json | null
          updated_at?: string | null
          user_id?: string | null
          verificado?: boolean | null
        }
        Update: {
          administradores_designados?: Json | null
          analisis_validez?: Json | null
          completado?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          facultad_enajenar?: boolean | null
          facultad_hipotecar?: boolean | null
          facultad_vender?: boolean | null
          fecha_emision?: string | null
          fecha_escritura?: string | null
          forma_actuacion?: string | null
          id?: string
          identificacion_aportante_naturaleza?: Json | null
          individualizacion_aporte?: Json | null
          lista_inmuebles_aportados?: Json | null
          malla_societaria?: Json | null
          naturaleza_acto?: string | null
          nombre_documento_ocr?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          organo_administracion?: string | null
          repertorio?: string | null
          sociedad_adquirente?: Json | null
          updated_at?: string | null
          user_id?: string | null
          verificado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ocr_escritura_constitucion_aporte_estudio_id_fkey"
            columns: ["estudio_id"]
            isOneToOne: false
            referencedRelation: "estudios_titulos"
            referencedColumns: ["id"]
          },
        ]
      }
      ocr_escritura_cv: {
        Row: {
          acreedor_o_beneficiario_gravamen: string | null
          codigo_kardex: string | null
          completado: boolean | null
          comuna_objeto: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          declaracion_pago_total: boolean | null
          deslindes: string | null
          direccion_objeto: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          fecha_escritura: string | null
          forma_pago: string | null
          id: string
          institucion_emisora: string | null
          nombre_documento_ocr: string | null
          notaria: string | null
          numero_operacion: string | null
          partes_comparecientes: Json | null
          poderes_de_saneamiento: Json | null
          porcentaje_manuscrito: number | null
          precio_moneda: string | null
          precio_monto: string | null
          precio_venta_texto: string | null
          renuncia_accion_resolutoria: boolean | null
          repertorio: string | null
          riesgo_fraude: string | null
          rol_avaluo: string | null
          saneamientos_y_rectificaciones: Json | null
          se_constituye_gravamen: boolean | null
          tipos_gravamen_detectados: Json | null
          titulo_anterior: string | null
          transcripcion_clausula_gravamen: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          acreedor_o_beneficiario_gravamen?: string | null
          codigo_kardex?: string | null
          completado?: boolean | null
          comuna_objeto?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          declaracion_pago_total?: boolean | null
          deslindes?: string | null
          direccion_objeto?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_escritura?: string | null
          forma_pago?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          partes_comparecientes?: Json | null
          poderes_de_saneamiento?: Json | null
          porcentaje_manuscrito?: number | null
          precio_moneda?: string | null
          precio_monto?: string | null
          precio_venta_texto?: string | null
          renuncia_accion_resolutoria?: boolean | null
          repertorio?: string | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          saneamientos_y_rectificaciones?: Json | null
          se_constituye_gravamen?: boolean | null
          tipos_gravamen_detectados?: Json | null
          titulo_anterior?: string | null
          transcripcion_clausula_gravamen?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          acreedor_o_beneficiario_gravamen?: string | null
          codigo_kardex?: string | null
          completado?: boolean | null
          comuna_objeto?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          declaracion_pago_total?: boolean | null
          deslindes?: string | null
          direccion_objeto?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_escritura?: string | null
          forma_pago?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          partes_comparecientes?: Json | null
          poderes_de_saneamiento?: Json | null
          porcentaje_manuscrito?: number | null
          precio_moneda?: string | null
          precio_monto?: string | null
          precio_venta_texto?: string | null
          renuncia_accion_resolutoria?: boolean | null
          repertorio?: string | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          saneamientos_y_rectificaciones?: Json | null
          se_constituye_gravamen?: boolean | null
          tipos_gravamen_detectados?: Json | null
          titulo_anterior?: string | null
          transcripcion_clausula_gravamen?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_estatutos_sociales: {
        Row: {
          autoriza_delegar: boolean | null
          clausula_texto: string | null
          codigo_verificacion_cve: string | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          doc_table: string | null
          documento_url: string | null
          duracion_sociedad: string | null
          enviado: boolean | null
          es_empresa_en_un_dia: boolean | null
          estudio_id: string | null
          fase: number | null
          fecha_emision: string | null
          fecha_emision_documento: string | null
          forma_ejercicio: string | null
          id: string
          institucion_emisora: string | null
          nombre_documento_ocr: string | null
          nombre_propiedad: string | null
          numero_atencion: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          puede_autocontratar: boolean | null
          puede_hipotecar: boolean | null
          puede_representar_cbr: boolean | null
          puede_vender_enajenar: boolean | null
          razon_social: string | null
          representantes: Json | null
          riesgo_fraude: string | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_table?: string | null
          documento_url?: string | null
          duracion_sociedad?: string | null
          enviado?: boolean | null
          es_empresa_en_un_dia?: boolean | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          fecha_emision_documento?: string | null
          forma_ejercicio?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          numero_atencion?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          puede_autocontratar?: boolean | null
          puede_hipotecar?: boolean | null
          puede_representar_cbr?: boolean | null
          puede_vender_enajenar?: boolean | null
          razon_social?: string | null
          representantes?: Json | null
          riesgo_fraude?: string | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_table?: string | null
          documento_url?: string | null
          duracion_sociedad?: string | null
          enviado?: boolean | null
          es_empresa_en_un_dia?: boolean | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          fecha_emision_documento?: string | null
          forma_ejercicio?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          numero_atencion?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          puede_autocontratar?: boolean | null
          puede_hipotecar?: boolean | null
          puede_representar_cbr?: boolean | null
          puede_vender_enajenar?: boolean | null
          razon_social?: string | null
          representantes?: Json | null
          riesgo_fraude?: string | null
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
      ocr_expropiacion_municipal: {
        Row: {
          calle_camino: string | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estado_afectacion: string | null
          estudio_id: string | null
          fecha_emision: string | null
          funcionario_responsable: string | null
          id: string
          institucion_emisora: string | null
          lote_o_sitio: string | null
          municipalidad: string | null
          nombre_documento_ocr: string | null
          numero_certificado: string | null
          numero_domiciliario: string | null
          numero_operacion: string | null
          numero_solicitud: string | null
          poblacion_villa: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          rol_avaluo: string | null
          texto_literal_hallazgo: string | null
          unidad: string | null
          user_id: string | null
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          calle_camino?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estado_afectacion?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          funcionario_responsable?: string | null
          id?: string
          institucion_emisora?: string | null
          lote_o_sitio?: string | null
          municipalidad?: string | null
          nombre_documento_ocr?: string | null
          numero_certificado?: string | null
          numero_domiciliario?: string | null
          numero_operacion?: string | null
          numero_solicitud?: string | null
          poblacion_villa?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          texto_literal_hallazgo?: string | null
          unidad?: string | null
          user_id?: string | null
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          calle_camino?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estado_afectacion?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          funcionario_responsable?: string | null
          id?: string
          institucion_emisora?: string | null
          lote_o_sitio?: string | null
          municipalidad?: string | null
          nombre_documento_ocr?: string | null
          numero_certificado?: string | null
          numero_domiciliario?: string | null
          numero_operacion?: string | null
          numero_solicitud?: string | null
          poblacion_villa?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          texto_literal_hallazgo?: string | null
          unidad?: string | null
          user_id?: string | null
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_gasto_comun: {
        Row: {
          banco: string | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          documento_url: string | null
          email_contacto: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fase: number | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_condominio: string | null
          nombre_documento_ocr: string | null
          numero_cuenta: string | null
          numero_operacion: string | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          email_contacto?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_condominio?: string | null
          nombre_documento_ocr?: string | null
          numero_cuenta?: string | null
          numero_operacion?: string | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          email_contacto?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_condominio?: string | null
          nombre_documento_ocr?: string | null
          numero_cuenta?: string | null
          numero_operacion?: string | null
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
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          detalles_hipotecas: Json | null
          detalles_prohibiciones: Json | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          fecha_emision_certificado: string | null
          fojas: string | null
          glosa_hipoteca: string | null
          gravamenes: Json | null
          id: string
          institucion_emisora: string | null
          moneda: string | null
          monto_gravamen: string | null
          nombre_documento_ocr: string | null
          nombre_propiedad: string | null
          nombre_propiedad_citada: string | null
          numero: string | null
          numero_operacion: string | null
          operacion_id: string | null
          porcentaje_manuscrito: number | null
          prohibiciones: Json | null
          propietarios: Json | null
          riesgo_fraude: string | null
          tiene_hipotecas: boolean | null
          tiene_prohibiciones: boolean | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          detalles_hipotecas?: Json | null
          detalles_prohibiciones?: Json | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_emision_certificado?: string | null
          fojas?: string | null
          glosa_hipoteca?: string | null
          gravamenes?: Json | null
          id?: string
          institucion_emisora?: string | null
          moneda?: string | null
          monto_gravamen?: string | null
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          nombre_propiedad_citada?: string | null
          numero?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          prohibiciones?: Json | null
          propietarios?: Json | null
          riesgo_fraude?: string | null
          tiene_hipotecas?: boolean | null
          tiene_prohibiciones?: boolean | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          detalles_hipotecas?: Json | null
          detalles_prohibiciones?: Json | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_emision_certificado?: string | null
          fojas?: string | null
          glosa_hipoteca?: string | null
          gravamenes?: Json | null
          id?: string
          institucion_emisora?: string | null
          moneda?: string | null
          monto_gravamen?: string | null
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          nombre_propiedad_citada?: string | null
          numero?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          prohibiciones?: Json | null
          propietarios?: Json | null
          riesgo_fraude?: string | null
          tiene_hipotecas?: boolean | null
          tiene_prohibiciones?: boolean | null
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
        ]
      }
      ocr_impuesto_herencia: {
        Row: {
          corresponde_a_propiedad_en_estudio: boolean | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          operacion_id: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          user_id: string | null
        }
        Insert: {
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
        }
        Update: {
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
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
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          doc_id_origen: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estado_civil_declarado: string | null
          estudio_id: string | null
          fase: number | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_completo: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          observacion_texto: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          run: string | null
          updated_at: string | null
          user_id: string | null
          verificado: boolean | null
        }
        Insert: {
          codigo_folio_repertorio?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estado_civil_declarado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_completo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          observacion_texto?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          run?: string | null
          updated_at?: string | null
          user_id?: string | null
          verificado?: boolean | null
        }
        Update: {
          codigo_folio_repertorio?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estado_civil_declarado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_completo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          observacion_texto?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
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
      ocr_inscripcion_comercio: {
        Row: {
          administracion_extractada: string | null
          anio: string | null
          capital_social: string | null
          completado: boolean | null
          conservador: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          documento_url: string | null
          duracion_pactada: string | null
          enviado: boolean | null
          es_vigente_segun_certificado: boolean | null
          estudio_id: string | null
          fecha_emision: string | null
          fecha_emision_copia: string | null
          fojas: string | null
          id: string
          institucion_emisora: string | null
          nombre_documento_ocr: string | null
          nombre_propiedad: string | null
          numero: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          razon_social: string | null
          resumen_acuerdos: string | null
          riesgo_fraude: string | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          duracion_pactada?: string | null
          enviado?: boolean | null
          es_vigente_segun_certificado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_emision_copia?: string | null
          fojas?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          numero?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          razon_social?: string | null
          resumen_acuerdos?: string | null
          riesgo_fraude?: string | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          documento_url?: string | null
          duracion_pactada?: string | null
          enviado?: boolean | null
          es_vigente_segun_certificado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_emision_copia?: string | null
          fojas?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          numero?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          razon_social?: string | null
          resumen_acuerdos?: string | null
          riesgo_fraude?: string | null
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
      ocr_inscripcion_herencia: {
        Row: {
          causante_nombre: string | null
          causante_rut: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          documento_url: string | null
          enviado: boolean | null
          especial_herencia_anio: number | null
          especial_herencia_fojas: string | null
          especial_herencia_numero: string | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_documento_ocr: string | null
          nuevos_duenos: Json | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
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
          riesgo_fraude: string | null
          user_id: string | null
        }
        Insert: {
          causante_nombre?: string | null
          causante_rut?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          especial_herencia_anio?: number | null
          especial_herencia_fojas?: string | null
          especial_herencia_numero?: string | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          nuevos_duenos?: Json | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
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
          riesgo_fraude?: string | null
          user_id?: string | null
        }
        Update: {
          causante_nombre?: string | null
          causante_rut?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          especial_herencia_anio?: number | null
          especial_herencia_fojas?: string | null
          especial_herencia_numero?: string | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          nuevos_duenos?: Json | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
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
          riesgo_fraude?: string | null
          user_id?: string | null
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
      ocr_inscripcion_servidumbre: {
        Row: {
          anio: string | null
          cbr: string | null
          completado: boolean | null
          created_at: string | null
          doc_id_origen: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fase: number | null
          fecha_emision: string | null
          fojas: string | null
          glosa: string | null
          id: string
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          numero: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          tipo_servidumbre: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          anio?: string | null
          cbr?: string | null
          completado?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          fojas?: string | null
          glosa?: string | null
          id?: string
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          tipo_servidumbre?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          anio?: string | null
          cbr?: string | null
          completado?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          fojas?: string | null
          glosa?: string | null
          id?: string
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          tipo_servidumbre?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_matrimonio: {
        Row: {
          anio_inscripcion: number | null
          anotaciones_marginales: Json | null
          circunscripcion: string | null
          completado: boolean | null
          contrayente_1_nombre: string | null
          contrayente_2_nombre: string | null
          conyuges: Json | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          doc_id_origen: string | null
          document_url: string | null
          enviado: boolean | null
          estado_matrimonio: string | null
          estudio_id: string | null
          fecha_emision: string | null
          fecha_matrimonio: string | null
          id: string
          institucion_emisora: string | null
          nombre_documento_ocr: string | null
          numero_inscripcion: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          regimen_patrimonial: string | null
          regimen_vigente: string | null
          requiere_autorizacion_conyuge_venta: boolean | null
          riesgo_fraude: string | null
          subinscripciones: Json | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          anio_inscripcion?: number | null
          anotaciones_marginales?: Json | null
          circunscripcion?: string | null
          completado?: boolean | null
          contrayente_1_nombre?: string | null
          contrayente_2_nombre?: string | null
          conyuges?: Json | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          document_url?: string | null
          enviado?: boolean | null
          estado_matrimonio?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_matrimonio?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          numero_inscripcion?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          regimen_patrimonial?: string | null
          regimen_vigente?: string | null
          requiere_autorizacion_conyuge_venta?: boolean | null
          riesgo_fraude?: string | null
          subinscripciones?: Json | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          anio_inscripcion?: number | null
          anotaciones_marginales?: Json | null
          circunscripcion?: string | null
          completado?: boolean | null
          contrayente_1_nombre?: string | null
          contrayente_2_nombre?: string | null
          conyuges?: Json | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          document_url?: string | null
          enviado?: boolean | null
          estado_matrimonio?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_matrimonio?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_documento_ocr?: string | null
          numero_inscripcion?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          regimen_patrimonial?: string | null
          regimen_vigente?: string | null
          requiere_autorizacion_conyuge_venta?: boolean | null
          riesgo_fraude?: string | null
          subinscripciones?: Json | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
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
          anotaciones_marginales: Json | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          datos_registro: string | null
          documento_url: string | null
          enviado: boolean | null
          estudio_id: string | null
          fecha_emision: string | null
          fecha_nacimiento: string | null
          id: string
          institucion_emisora: string | null
          madre_nombre: string | null
          nombre_documento_ocr: string | null
          nombre_inscrito: string | null
          numero_operacion: string | null
          padre_nombre: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          rut_inscrito: string | null
          rut_madre: string | null
          rut_padre: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          anotaciones_marginales?: Json | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          datos_registro?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_nacimiento?: string | null
          id?: string
          institucion_emisora?: string | null
          madre_nombre?: string | null
          nombre_documento_ocr?: string | null
          nombre_inscrito?: string | null
          numero_operacion?: string | null
          padre_nombre?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rut_inscrito?: string | null
          rut_madre?: string | null
          rut_padre?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          anotaciones_marginales?: Json | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          datos_registro?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fecha_nacimiento?: string | null
          id?: string
          institucion_emisora?: string | null
          madre_nombre?: string | null
          nombre_documento_ocr?: string | null
          nombre_inscrito?: string | null
          numero_operacion?: string | null
          padre_nombre?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rut_inscrito?: string | null
          rut_madre?: string | null
          rut_padre?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
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
      ocr_no_expropiacion_serviu: {
        Row: {
          afecto_expropiacion: string | null
          completado: boolean | null
          comuna: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          direccion: string | null
          doc_id_origen: string | null
          documento_url: string | null
          entidad_expropiadora: string | null
          enviado: boolean | null
          estado: string | null
          estado_legal: string | null
          estudio_id: string | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          nombre_solicitante: string | null
          numero_certificado: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          rol_avaluo: string | null
          texto_literal: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          afecto_expropiacion?: string | null
          completado?: boolean | null
          comuna?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          direccion?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          entidad_expropiadora?: string | null
          enviado?: boolean | null
          estado?: string | null
          estado_legal?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          nombre_solicitante?: string | null
          numero_certificado?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          texto_literal?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          afecto_expropiacion?: string | null
          completado?: boolean | null
          comuna?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          direccion?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          entidad_expropiadora?: string | null
          enviado?: boolean | null
          estado?: string | null
          estado_legal?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          nombre_solicitante?: string | null
          numero_certificado?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          texto_literal?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_plano_copropiedad: {
        Row: {
          corresponde_a_propiedad_en_estudio: boolean | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fase: number | null
          fecha_emision: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          operacion_id: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          user_id: string | null
        }
        Insert: {
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
        }
        Update: {
          corresponde_a_propiedad_en_estudio?: boolean | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
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
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          doc_id_origen: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fase: number | null
          fecha_emision: string | null
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
          institucion_emisora: string | null
          mandantes: Json | null
          mandatarios: Json | null
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          notaria: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          puede_autocontratar: boolean | null
          puede_hipotecar: boolean | null
          puede_percibir: boolean | null
          puede_vender: boolean | null
          repertorio: string | null
          riesgo_fraude: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
          vigencia_texto: string | null
        }
        Insert: {
          clasificacion_poder?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
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
          institucion_emisora?: string | null
          mandantes?: Json | null
          mandatarios?: Json | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          puede_autocontratar?: boolean | null
          puede_hipotecar?: boolean | null
          puede_percibir?: boolean | null
          puede_vender?: boolean | null
          repertorio?: string | null
          riesgo_fraude?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
          vigencia_texto?: string | null
        }
        Update: {
          clasificacion_poder?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
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
          institucion_emisora?: string | null
          mandantes?: Json | null
          mandatarios?: Json | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          notaria?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          puede_autocontratar?: boolean | null
          puede_hipotecar?: boolean | null
          puede_percibir?: boolean | null
          puede_vender?: boolean | null
          repertorio?: string | null
          riesgo_fraude?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
          vigencia_texto?: string | null
        }
        Relationships: []
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
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fase: number | null
          fecha_emision: string | null
          fecha_resolucion: string | null
          id: string
          institucion_emisora: string | null
          inventario_bienes_raices: Json | null
          lista_herederos: Json | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          numero_resolucion: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          user_id: string | null
          verificacion_titulo_contenido: string | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          fecha_resolucion?: string | null
          id?: string
          institucion_emisora?: string | null
          inventario_bienes_raices?: Json | null
          lista_herederos?: Json | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          numero_resolucion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
          verificacion_titulo_contenido?: string | null
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
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fase?: number | null
          fecha_emision?: string | null
          fecha_resolucion?: string | null
          id?: string
          institucion_emisora?: string | null
          inventario_bienes_raices?: Json | null
          lista_herederos?: Json | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          numero_resolucion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          user_id?: string | null
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_recepcion_final: {
        Row: {
          acogido_copropiedad: boolean | null
          acogido_dfl2: boolean | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          destino_principal: string | null
          direccion: string | null
          doc_id_origen: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          historial_permisos: Json | null
          id: string
          institucion_emisora: string | null
          municipalidad: string | null
          nombre_documento_ocr: string | null
          numero_certificado: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          rol_avaluo: string | null
          superficie_total_m2: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          acogido_copropiedad?: boolean | null
          acogido_dfl2?: boolean | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          destino_principal?: string | null
          direccion?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          historial_permisos?: Json | null
          id?: string
          institucion_emisora?: string | null
          municipalidad?: string | null
          nombre_documento_ocr?: string | null
          numero_certificado?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          superficie_total_m2?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          acogido_copropiedad?: boolean | null
          acogido_dfl2?: boolean | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          destino_principal?: string | null
          direccion?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          historial_permisos?: Json | null
          id?: string
          institucion_emisora?: string | null
          municipalidad?: string | null
          nombre_documento_ocr?: string | null
          numero_certificado?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          superficie_total_m2?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_reglamento_copropiedad: {
        Row: {
          anio_inscripcion: string | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          doc_id_origen: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_emision: string | null
          fojas_inscripcion: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          numero_inscripcion: string | null
          numero_operacion: string | null
          operacion_id: string | null
          porcentaje_manuscrito: number | null
          riesgo_fraude: string | null
          unidades_total: number | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          anio_inscripcion?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fojas_inscripcion?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_inscripcion?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          unidades_total?: number | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          anio_inscripcion?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_emision?: string | null
          fojas_inscripcion?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          numero_inscripcion?: string | null
          numero_operacion?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          riesgo_fraude?: string | null
          unidades_total?: number | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_rural_sag: {
        Row: {
          advertencias_legales: Json | null
          anio: number | null
          completado: boolean | null
          comuna: string | null
          conservador: string | null
          corresponde_a_propiedad_en_estudio: boolean | null
          created_at: string | null
          cumple_normativa: boolean | null
          doc_id_origen: string | null
          documento_url: string | null
          enviado: boolean | null
          estado: string | null
          estudio_id: string | null
          fecha_aprobacion: string | null
          fecha_emision: string | null
          fojas: string | null
          id: string
          institucion_emisora: string | null
          nombre_archivo: string | null
          nombre_documento_ocr: string | null
          nombre_predio: string | null
          numero: string | null
          numero_certificado: string | null
          numero_operacion: string | null
          oficina_sag: string | null
          operacion_id: string | null
          porcentaje_manuscrito: number | null
          propietario: string | null
          resolucion_sag: string | null
          riesgo_fraude: string | null
          rol_avaluo: string | null
          rol_matriz: string | null
          superficie_lote: string | null
          user_id: string
          verificacion_titulo_contenido: string | null
          verificado: boolean | null
        }
        Insert: {
          advertencias_legales?: Json | null
          anio?: number | null
          completado?: boolean | null
          comuna?: string | null
          conservador?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          cumple_normativa?: boolean | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_aprobacion?: string | null
          fecha_emision?: string | null
          fojas?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          nombre_predio?: string | null
          numero?: string | null
          numero_certificado?: string | null
          numero_operacion?: string | null
          oficina_sag?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          propietario?: string | null
          resolucion_sag?: string | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          rol_matriz?: string | null
          superficie_lote?: string | null
          user_id: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Update: {
          advertencias_legales?: Json | null
          anio?: number | null
          completado?: boolean | null
          comuna?: string | null
          conservador?: string | null
          corresponde_a_propiedad_en_estudio?: boolean | null
          created_at?: string | null
          cumple_normativa?: boolean | null
          doc_id_origen?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          estado?: string | null
          estudio_id?: string | null
          fecha_aprobacion?: string | null
          fecha_emision?: string | null
          fojas?: string | null
          id?: string
          institucion_emisora?: string | null
          nombre_archivo?: string | null
          nombre_documento_ocr?: string | null
          nombre_predio?: string | null
          numero?: string | null
          numero_certificado?: string | null
          numero_operacion?: string | null
          oficina_sag?: string | null
          operacion_id?: string | null
          porcentaje_manuscrito?: number | null
          propietario?: string | null
          resolucion_sag?: string | null
          riesgo_fraude?: string | null
          rol_avaluo?: string | null
          rol_matriz?: string | null
          superficie_lote?: string | null
          user_id?: string
          verificacion_titulo_contenido?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
      ocr_vigencia_poderes: {
        Row: {
          apoderados_mencionados: Json | null
          codigo_verificacion: string | null
          completado: boolean | null
          corresponde_a_propiedad_en_estudio: boolean | null
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
          nombre_documento_ocr: string | null
          nombre_propiedad: string | null
          numero_certificado: string | null
          numero_operacion: string | null
          porcentaje_manuscrito: number | null
          razon_social: string | null
          registro_referencia: string | null
          riesgo_fraude: string | null
          texto_certificacion: string | null
          tiene_notas_marginales: boolean | null
          updated_at: string | null
          user_id: string | null
          verificado: boolean | null
        }
        Insert: {
          apoderados_mencionados?: Json | null
          codigo_verificacion?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
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
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          numero_certificado?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          razon_social?: string | null
          registro_referencia?: string | null
          riesgo_fraude?: string | null
          texto_certificacion?: string | null
          tiene_notas_marginales?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          verificado?: boolean | null
        }
        Update: {
          apoderados_mencionados?: Json | null
          codigo_verificacion?: string | null
          completado?: boolean | null
          corresponde_a_propiedad_en_estudio?: boolean | null
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
          nombre_documento_ocr?: string | null
          nombre_propiedad?: string | null
          numero_certificado?: string | null
          numero_operacion?: string | null
          porcentaje_manuscrito?: number | null
          razon_social?: string | null
          registro_referencia?: string | null
          riesgo_fraude?: string | null
          texto_certificacion?: string | null
          tiene_notas_marginales?: boolean | null
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
      profiles: {
        Row: {
          apellido: string | null
          created_at: string
          id: string
          nombre: string | null
          telefono: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          apellido?: string | null
          created_at?: string
          id?: string
          nombre?: string | null
          telefono?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          apellido?: string | null
          created_at?: string
          id?: string
          nombre?: string | null
          telefono?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      solicitud_documentos: {
        Row: {
          created_at: string | null
          detalle: string | null
          detalle_origen: string | null
          doc_entidad: string | null
          doc_fecha: string | null
          doc_id_origen: string | null
          doc_plano: string | null
          doc_repertorio: string | null
          doc_resolucion: string | null
          doc_rol: string | null
          doc_tipo: string | null
          documento_url: string | null
          enviado: boolean | null
          es_opcional: boolean | null
          estado: string | null
          estudio_id: string
          fase: number | null
          id: string
          nombre_documento: string
          nombre_persona: string | null
          notaria_documento: string | null
          operacion_id: string | null
          origen_solicitud: string | null
          propiedad_anio: string | null
          propiedad_comuna: string | null
          propiedad_fojas: string | null
          propiedad_numero: string | null
          repetido: boolean | null
          rol_persona: string | null
          rut_persona: string | null
          subido: boolean | null
          tipo_documento: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          detalle?: string | null
          detalle_origen?: string | null
          doc_entidad?: string | null
          doc_fecha?: string | null
          doc_id_origen?: string | null
          doc_plano?: string | null
          doc_repertorio?: string | null
          doc_resolucion?: string | null
          doc_rol?: string | null
          doc_tipo?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          es_opcional?: boolean | null
          estado?: string | null
          estudio_id: string
          fase?: number | null
          id?: string
          nombre_documento: string
          nombre_persona?: string | null
          notaria_documento?: string | null
          operacion_id?: string | null
          origen_solicitud?: string | null
          propiedad_anio?: string | null
          propiedad_comuna?: string | null
          propiedad_fojas?: string | null
          propiedad_numero?: string | null
          repetido?: boolean | null
          rol_persona?: string | null
          rut_persona?: string | null
          subido?: boolean | null
          tipo_documento?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          detalle?: string | null
          detalle_origen?: string | null
          doc_entidad?: string | null
          doc_fecha?: string | null
          doc_id_origen?: string | null
          doc_plano?: string | null
          doc_repertorio?: string | null
          doc_resolucion?: string | null
          doc_rol?: string | null
          doc_tipo?: string | null
          documento_url?: string | null
          enviado?: boolean | null
          es_opcional?: boolean | null
          estado?: string | null
          estudio_id?: string
          fase?: number | null
          id?: string
          nombre_documento?: string
          nombre_persona?: string | null
          notaria_documento?: string | null
          operacion_id?: string | null
          origen_solicitud?: string | null
          propiedad_anio?: string | null
          propiedad_comuna?: string | null
          propiedad_fojas?: string | null
          propiedad_numero?: string | null
          repetido?: boolean | null
          rol_persona?: string | null
          rut_persona?: string | null
          subido?: boolean | null
          tipo_documento?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_operation_documents: {
        Args: { p_fase?: number; p_numero_operacion: string }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
