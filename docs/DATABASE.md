# Documentación Detallada de la Base de Datos - Property Title Study

Este documento proporciona una explicación exhaustiva de cada tabla, sus columnas y la lógica de datos detrás de la plataforma.

## 1. Tablas de Gestión y Negocio

### `estudios_titulos`
Esta tabla representa la entidad principal de un estudio. Cada fila es un proceso de estudio de títulos para una propiedad específica.

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único y llave primaria. |
| `numero_operacion` | TEXT | Código único de la operación (ej: "OP-2024-001"). |
| `tipo_propiedad` | TEXT | Clasificación de la propiedad (Casa, Depto, Parcela, Oficina). |
| `finalidad_estudio` | TEXT | Objetivo del estudio (Venta, Hipoteca, Estudio Preventivo). |
| `tiene_servidumbre` | BOOLEAN | Indica si la propiedad tiene servidumbres activas. |
| `tiene_reglamento` | BOOLEAN | Indica si está sujeta a la Ley de Copropiedad. |
| `cantidad_transacciones` | INTEGER | Número de transferencias previas que deben analizarse (por defecto 0). |
| `detalle_transacciones` | JSONB | Arreglo de objetos que detallan año, fojas y número de cada transferencia. |
| `estado` | TEXT | Estado del flujo: `En Configuración`, `En Revisión`, `Completado`. |
| `nombre_propiedad` | TEXT | Nombre descriptivo o dirección corta de la propiedad. |
| `titulo_vigente` | TEXT | Tipo de título actual (Compraventa, Adjudicación, etc.). |
| `user_id` | UUID | Referencia al usuario que creó el estudio (`auth.users`). |
| `created_at` | TIMESTAMPTZ | Fecha de creación del registro. |
| `updated_at` | TIMESTAMPTZ | Fecha de la última modificación. |

---

### `solicitud_documentos`
Gestiona la lista de documentos que el sistema "pide" al usuario para completar el estudio.

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único. |
| `estudio_id` | UUID | Relación con la tabla `estudios_titulos`. |
| `operacion_id` | TEXT | Copia del número de operación para consultas rápidas. |
| `tipo_documento` | TEXT | Alias interno (ej: `dominio_vigente`, `gp_30_anos`). |
| `nombre_documento` | TEXT | Nombre legible para el usuario (ej: "Inscripción con Vigencia"). |
| `documento_url` | TEXT | Enlace al archivo subido en Supabase Storage. |
| `status` | TEXT | Estado del documento: `Pendiente`, `Completado`, `Rechazado`. |
| `propiedad_fojas` | TEXT | Fojas de la inscripción asociada a este documento específico. |
| `propiedad_numero` | TEXT | Número de la inscripción. |
| `propiedad_anio` | TEXT | Año de la inscripción. |
| `propiedad_comuna` | TEXT | Comuna o CBR correspondiente. |
| `doc_id_origen` | UUID | UUID del documento de origen si aplica. |
| `rol_persona` | TEXT | Rol de la persona asociada (ej: PROPIEDAD). |
| `doc_tipo` | TEXT | Tipo interno (ej: JUDICIAL, PLANO, INSCRIPCION). |
| `doc_entidad` | TEXT | Entidad emisora del documento. |
| `doc_fecha` | DATE | Fecha de emisión o registro. |
| `doc_repertorio` | TEXT | Número de repertorio si aplica. |
| `doc_resolucion` | TEXT | Número de resolución si aplica. |
| `doc_rol` | TEXT | Número de rol si aplica. |
| `doc_plano` | TEXT | Número de plano si aplica. |
| `notaria_documento` | TEXT | Nombre de la notaría asociada al documento. |
| `repetido` | BOOLEAN | Flag que indica si el documento es un duplicado de otro existente. |
| `user_id` | UUID | Usuario que subió el documento. |

---

### `profiles`
Información de perfil del sistema.

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Mismo ID que en `auth.users`. |
| `full_name` | TEXT | Nombre completo del usuario. |
| `role` | TEXT | Rol dentro de la plataforma (Analista, Cliente). |

---

## 2. Tablas OCR (Extracción de Datos)

El sistema utiliza tablas específicas para cada tipo de documento para almacenar los datos extraídos mediante IA/OCR. 

**ACTUALIZACIÓN IMPORTANTE:** A partir de la migración `080`, todas las tablas `ocr_` han sido estandarizadas y simplificadas. Se eliminaron las columnas específicas de cada tipo de documento y se reemplazaron por una estructura genérica basada en JSONB.

### Columnas Estandarizadas en TODAS las tablas `ocr_`

Todas las tablas `ocr_` (ej: `ocr_dominio_vigente`, `ocr_gp`, `ocr_escritura_cv`, etc.) tienen **EXACTAMENTE** las siguientes columnas:

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único del registro. |
| `user_id` | UUID | Usuario propietario del documento. |
| `estudio_id` | UUID | ID del estudio asociado. |
| `documento_url` | TEXT | URL del documento en Storage. |
| `numero_operacion` | TEXT | Identificador de la operación. |
| `nombre_documento_ocr` | TEXT | Nombre del archivo o tipo de documento. |
| `texto_estructurado` | JSONB | Objeto JSON con toda la información extraída del documento (estructura flexible). |
| `analisis_integridad` | JSONB | Objeto JSON con el análisis de integridad y validaciones del documento. |
| `extraccion_datos` | JSONB | Objeto JSON con los datos clave extraídos para uso programático. |

Ya **NO** existen columnas específicas como `fojas`, `numero`, `anio`, `comuna`, `gravamenes`, etc. en el nivel raíz de la tabla. Toda esa información ahora reside dentro de `texto_estructurado` o `extraccion_datos`.

### Tablas OCR Afectadas

- `ocr_asignacion_roles`
- `ocr_avaluo_fiscal`
- `ocr_cedula_identidad`
- `ocr_certificado_numero`
- `ocr_cesion_derechos_hereditario`
- `ocr_cip`
- `ocr_constitucion_sociedad`
- `ocr_deuda_contribuciones`
- `ocr_directorio`
- `ocr_dominio_vigente` (Incluye columna adicional: `naturaleza_acto`)
- `ocr_donacion`
- `ocr_escritura_constitucion_aporte`
- `ocr_escritura_cv` (Incluye columna adicional: `se_constituye_gravamen`)
- `ocr_escritura_reciliacion`
- `ocr_escritura_saneamiento`
- `ocr_escritura_arrendamiento`
- `ocr_estatutos_sociales`
- `ocr_expropiacion_municipal`
- `ocr_gasto_comun`
- `ocr_gp`
- `ocr_impuesto_herencia`
- `ocr_informe_no_matrimonio`
- `ocr_inscripcion_comercio`
- `ocr_inscripcion_herencia`
- `ocr_inscripcion_servidumbre`
- `ocr_matrimonio`
- `ocr_nacimiento`
- `ocr_no_expropiacion_serviu`
- `ocr_plano_copropiedad`
- `ocr_poderes`
- `ocr_posesion_efectiva`
- `ocr_recepcion_final`
- `ocr_reglamento_copropiedad`
- `ocr_rural_sag`
- `ocr_vigencia_poderes`

---

## 3. Automatización y Triggers

### Automatización de Carga (`handle_storage_upload`)
Este es un **Trigger** de PostgreSQL que se ejecuta `AFTER INSERT` en la tabla `storage.objects` (donde Supabase guarda los archivos).
(Nota: Este trigger puede requerir ajustes si dependía de columnas específicas que han sido eliminadas).

### Validación de Duplicados (`check_duplicate_solicitud_trigger`)
Este es un **Trigger** de PostgreSQL ejecutado `BEFORE INSERT OR UPDATE` en `solicitud_documentos`.

### Agregador de Documentos (`get_operation_documents`)
Esta es una **Función RPC** que permite al frontend obtener un resumen de todos los documentos cargados en una operación. Retorna un JSON consolidado.

---

## 4. Seguridad y RLS

Para asegurar que los datos sean privados, se aplican políticas de **Row Level Security**:
- **Política de Selección**: `auth.uid() = user_id`. Los usuarios solo "ven" lo que ellos mismos crearon o lo que pertenece a sus operaciones.
- **Política de Inserción**: Solo usuarios autenticados pueden insertar.
