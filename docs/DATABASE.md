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

El sistema utiliza tablas específicas para cada tipo de documento para almacenar los datos extraídos mediante IA/OCR. Todas las tablas `ocr_` contienen un set de **Columnas de Trazabilidad Comunes**:

- `estudio_id`, `operacion_id`, `documento_url`, `nombre_archivo`, `user_id`, `estado`.

### Tablas Específicas y sus Columnas Extra:

#### `ocr_dominio_vigente`
- `fojas`, `numero`, `anio`: Datos de inscripción en el CBR.
- `comuna`: Ubicación de la propiedad.
- `cbr`: Conservador de Bienes Raíces correspondiente.
- `titulares`: Nombres de los dueños actuales.
- `deslindes`: Descripción de límites de la propiedad.

#### `ocr_gp` (Gravámenes y Prohibiciones)
- `tipo_gp`: Indica si es de Hipotecas o de Interdicciones.
- `gravamenes`: Texto o JSON con las hipotecas encontradas.
- `prohibiciones`: Texto o JSON con los embargos o prohibiciones.
- `titulares_citados`: Personas mencionadas en el certificado.

#### `ocr_avaluo_fiscal`
- `numero_rol`: Rol de avalúo (ej: 1234-56).
- `avaluo_total`: Valor fiscal de la propiedad.
- `direccion`: Dirección registrada en el SII.

#### `ocr_recepcion_final`
- `numero_resolucion`: Número del certificado municipal.
- `fecha_resolucion`: Fecha de emisión.
- `destino_principal`: Uso autorizado (Habitacional, Comercial).

#### `ocr_posesion_efectiva`
- `causante_nombre`, `causante_rut`: Datos del fallecido.
- `causante_fecha_defuncion`, `causante_ultimo_domicilio`: Información adicional del fallecido.
- `numero_resolucion`, `fecha_resolucion`: Datos de la resolución administrativa.
- `autoridad_emisora`: Quién emite la posesión efectiva.
- `lista_herederos`: JSONB con nombre, rut y parentesco de los herederos.
- `inventario_bienes_raices`: JSONB con el detalle de propiedades heredadas.
- `cesion_derechos_hereditarios`: Información sobre si existen cesiones.
- `completado`, `verificado`: Flags de control de proceso.

#### `ocr_gasto_comun`
- `nombre_condominio`: Nombre de la comunidad o edificio.
- `periodo_cobro`: Mes/Año correspondiente al gasto.
- `total_gasto_comun`: Monto total a pagar.
- `banco`, `numero_cuenta`, `rut_comunidad`, `email_contacto`: Datos para el pago.
- `unidades_con_morosidad`: JSONB con el detalle de deudas por unidad.
- `resumen_situacion`: Análisis textual de la deuda de la comunidad.

---

## 3. Automatización y Triggers

### Automatización de Carga (`handle_storage_upload`)
Este es un **Trigger** de PostgreSQL que se ejecuta `AFTER INSERT` en la tabla `storage.objects` (donde Supabase guarda los archivos).

**Lógica de Ejecución:**
1. Detecta si el archivo se subió al bucket `legal_documents`.
2. Extrae el `operacion_id` de la ruta del archivo (ej: `OP-001/archivo.pdf` -> `OP-001`).
3. Busca palabras clave en el nombre del archivo para decidir en qué tabla `ocr_` insertar:
   - Si contiene "vigencia" -> inserta en `ocr_dominio_vigente`.
   - Si contiene "hipoteca" o "gp" -> inserta en `ocr_gp`.
   - Si contiene "rol" o "avaluo" -> inserta en `ocr_avaluo_fiscal`.
4. Obtiene el `user_id` y genera la `public_url`.
5. Ejecuta un `INSERT` dinámico en la tabla correspondiente.

### Agregador de Documentos (`get_operation_documents`)
Esta es una **Función RPC** que permite al frontend obtener un resumen de todos los documentos cargados en una operación sin tener que consultar 20 tablas una por una. Retorna un JSON consolidado.

---

## 4. Seguridad y RLS

Para asegurar que los datos sean privados, se aplican políticas de **Row Level Security**:
- **Política de Selección**: `auth.uid() = user_id`. Los usuarios solo "ven" lo que ellos mismos crearon o lo que pertenece a sus operaciones.
- **Política de Inserción**: Solo usuarios autenticados pueden insertar.
