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
      admin_google_tokens: {
        Row: {
          created_at: string | null
          id: string
          provider_access_token: string | null
          provider_refresh_token: string
          token_updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          provider_access_token?: string | null
          provider_refresh_token: string
          token_updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          provider_access_token?: string | null
          provider_refresh_token?: string
          token_updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      agenda_items: {
        Row: {
          agenda_id: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_completed: boolean | null
          order_index: number | null
          presenter: string | null
          title: string
        }
        Insert: {
          agenda_id?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_completed?: boolean | null
          order_index?: number | null
          presenter?: string | null
          title: string
        }
        Update: {
          agenda_id?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_completed?: boolean | null
          order_index?: number | null
          presenter?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "agenda_items_agenda_id_fkey"
            columns: ["agenda_id"]
            isOneToOne: false
            referencedRelation: "meeting_agendas"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          calendar_id: string | null
          created_at: string | null
          description: string | null
          end_time: string
          id: string
          is_all_day: boolean | null
          location: string | null
          meeting_link: string | null
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          calendar_id?: string | null
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: string
          is_all_day?: boolean | null
          location?: string | null
          meeting_link?: string | null
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          calendar_id?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: string
          is_all_day?: boolean | null
          location?: string | null
          meeting_link?: string | null
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_calendar_id_fkey"
            columns: ["calendar_id"]
            isOneToOne: false
            referencedRelation: "calendars"
            referencedColumns: ["id"]
          },
        ]
      }
      calendars: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          name: string
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
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
      meeting_agendas: {
        Row: {
          created_at: string | null
          description: string | null
          event_id: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_id?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_id?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_agendas_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "calendar_events"
            referencedColumns: ["id"]
          },
        ]
      }
      ocr_asignacion_roles: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_cedula_identidad: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      ocr_cesion_derechos_hereditario: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_constitucion_sociedad: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_directorio: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          naturaleza_acto: string | null
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          naturaleza_acto?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          naturaleza_acto?: string | null
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_donacion: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
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
      ocr_escritura_arrendamiento: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ocr_escritura_arrendamiento_estudio_id_fkey"
            columns: ["estudio_id"]
            isOneToOne: false
            referencedRelation: "estudios_titulos"
            referencedColumns: ["id"]
          },
        ]
      }
      ocr_escritura_constitucion_aporte: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          se_constituye_gravamen: boolean | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          se_constituye_gravamen?: boolean | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          se_constituye_gravamen?: boolean | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_escritura_reciliacion: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ocr_escritura_reciliacion_estudio_id_fkey"
            columns: ["estudio_id"]
            isOneToOne: false
            referencedRelation: "estudios_titulos"
            referencedColumns: ["id"]
          },
        ]
      }
      ocr_escritura_saneamiento: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ocr_escritura_saneamiento_estudio_id_fkey"
            columns: ["estudio_id"]
            isOneToOne: false
            referencedRelation: "estudios_titulos"
            referencedColumns: ["id"]
          },
        ]
      }
      ocr_estatutos_sociales: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      ocr_gasto_comun: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
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
      ocr_inscripcion_posesion_efectiva: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_matrimonio: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_plano_copropiedad: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
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
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_posesion_efectiva: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      ocr_recepcion_final: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_reglamento_copropiedad: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_rural_sag: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id: string
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      ocr_vigencia_poderes: {
        Row: {
          analisis_integridad: Json | null
          documento_url: string | null
          estudio_id: string | null
          extraccion_datos: Json | null
          id: string
          nombre_documento_ocr: string | null
          numero_operacion: string | null
          texto_estructurado: Json | null
          user_id: string | null
        }
        Insert: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
        }
        Update: {
          analisis_integridad?: Json | null
          documento_url?: string | null
          estudio_id?: string | null
          extraccion_datos?: Json | null
          id?: string
          nombre_documento_ocr?: string | null
          numero_operacion?: string | null
          texto_estructurado?: Json | null
          user_id?: string | null
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
