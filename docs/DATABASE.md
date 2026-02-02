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

#### `ocr_Escritura_Constitucion_aporte`
- `fecha_escritura`: TEXT. Fecha de la escritura pública.
- `notaria`: TEXT. Nombre de la notaría donde se otorgó.
- `repertorio`: TEXT. Número de repertorio de la escritura.
- `sociedad_adquirente`: JSONB con datos de la sociedad que adquiere.
- `malla_societaria`: JSONB (Array) con los socios y sus participaciones.
- `identificacion_aportante_naturaleza`: JSONB con datos del aportante y contexto.
- `naturaleza_acto`: TEXT (ej: DIVISION_DE_SOCIEDAD, APORTE_CAPITAL).
- `organo_administracion`, `forma_actuacion`: Detalles de la administración.
- `administradores_designados`: JSONB (Array) con nombres y ruts.
- `facultad_vender`, `facultad_hipotecar`, `facultad_enajenar`: Booleans indicando poderes clave.
- `individualizacion_aporte`: JSONB con la causa y valor total.
- `lista_inmuebles_aportados`: JSONB (Array) con el detalle de cada propiedad.
- `analisis_validez`: JSONB con verificaciones legales.

#### `ocr_escritura_cv` (Escritura de Compraventa)
- `notaria`, `fecha_escritura`, `repertorio`: Datos de otorgamiento.
- `precio_monto`, `precio_moneda`, `forma_pago`: Detalles económicos.
- `partes_comparecientes`: JSONB con datos de vendedores y compradores.
- `direccion_objeto`, `comuna_objeto`, `rol_avaluo`: Identificación de la propiedad.
- `deslindes`: Texto con los límites de la propiedad.
- `precio_venta_texto`: Transcripción del precio en palabras.
- `titulo_anterior`: Referencia a la inscripción previa.
- `declaracion_pago_total`: BOOLEAN. Indica si el precio está totalmente pagado.
- `renuncia_accion_resolutoria`: BOOLEAN. Indica si las partes renuncian a resolver el contrato por no pago.

#### `ocr_cedula_identidad` (Cédula de Identidad)
- `rut`, `nombres`, `apellidos`: Datos de identificación de la persona.
- `nacionalidad`: País de origen o nacionalidad.
- `numero_serie`: Número de serie del documento físico.
- `fecha_vencimiento`: Fecha de expiración del documento.
- `tipo_documento`: Tipo de documento (ej: Cédula de Identidad).
- `estado_procesamiento`: Estado de la extracción OCR (ej: Completado).

#### `ocr_inscripcion_herencia`
- `causante_nombre`, `causante_rut`: Datos del titular fallecido.
- `posesion_efectiva_fojas`, `posesion_efectiva_numero`, `posesion_efectiva_anio`: Datos de la inscripción de PE.
- `especial_herencia_fojas`, `especial_herencia_numero`, `especial_herencia_anio`: Datos de la inscripción de herencia.
- `nuevos_duenos`: JSONB con la lista de herederos que inscriben.
- `propiedad_direccion`, `propiedad_comuna`, `propiedad_rol_avaluo`: Datos de la propiedad heredada.

#### `ocr_constitucion_sociedad`
- `nombre_archivo`, `documento_url`: Trazabilidad.
- `fase`, `numero_operacion`: Contexto de la operación.

#### `ocr_plano_copropiedad`
- `nombre_archivo`, `documento_url`: Trazabilidad.
- `fase`, `numero_operacion`: Contexto de la operación.

#### `ocr_asignacion_roles`
- `nombre_archivo`, `documento_url`: Trazabilidad.
- `fase`, `numero_operacion`: Contexto de la operación.

#### `ocr_impuesto_herencia`
- `nombre_archivo`, `documento_url`: Trazabilidad.
- `fase`, `numero_operacion`: Contexto de la operación.

#### `ocr_inscripcion_anterior`
- `nombre_archivo`, `documento_url`: Trazabilidad.
- `fase`, `numero_operacion`: Contexto de la operación.

#### `ocr_nacimiento`
- `nombre_inscrito`, `rut_inscrito`: Datos del titular del documento.
- `fecha_nacimiento`: Fecha de ocurrencia.
- `padre_nombre`, `rut_padre`: Datos identificatorios del padre.
- `madre_nombre`, `rut_madre`: Datos identificatorios de la madre.
- `anotaciones_marginales`: Texto extraído de notas al margen.
- `fecha_emision`: Fecha en la que se emitió el certificado.
- `datos_registro`: Información sobre la oficina, año y número de registro.

#### `ocr_informe_no_matrimonio`
- `nombre_completo`, `run`: Datos de identidad del titular.
- `fecha_emision`, `institucion_emisora`, `codigo_folio_repertorio`: Metadatos del certificado.
- `estado_civil_declarado`: Resultado de la búsqueda (ej: NO REGISTRA MATRIMONIO).
- `observacion_texto`: Párrafo legal descriptivo del informe.

#### `ocr_matrimonio`
- `circunscripcion`: Oficina del Registro Civil donde se inscribió.
- `numero_inscripcion`, `anio_inscripcion`: Datos de la inscripción.
- `fecha_matrimonio`: Fecha de celebración del matrimonio.
- `fecha_emision`: Fecha de emisión del certificado.
- `conyuges`: JSONB con nombre, RUN y rol (CONYUGE_1, CONYUGE_2).
- `subinscripciones`: JSONB con eventos marginales (separación de bienes, divorcio, etc.).
- `regimen_vigente`: Régimen patrimonial actual.
- `estado_matrimonio`: Estado legal del vínculo (ej: VIGENTE).
- `requiere_autorizacion_conyuge_venta`: BOOLEAN que indica si se requiere firma del cónyuge para vender.
- `contrayente_1_nombre`, `contrayente_2_nombre`: Nombres de los contrayentes (legacy).

#### `ocr_rural_sag`
- `numero_certificado`: Número de la certificación emitida por el SAG (ej: 3689/2022).
- `fecha_emision`: Fecha de emisión del certificado.
- `oficina_sag`: Oficina regional del SAG que emite el documento.
- `nombre_predio`: Nombre del predio o lote.
- `rol_avaluo`: Número de rol de avalúo fiscal.
- `comuna`: Comuna donde se ubica el predio.
- `propietario`: Nombre del propietario al momento de la certificación.
- `fojas`, `numero`, `anio`: Datos de la inscripción de dominio en el CBR.
- `conservador`: Conservador de Bienes Raíces correspondiente.
- `cumple_normativa`: BOOLEAN. Indica si el predio cumple con el D.L. 3.516.
- `advertencias_legales`: JSONB. Lista de observaciones y advertencias del SAG.

#### `ocr_cesion_derechos_hereditario`
- `notaria`, `fecha_otorgamiento`, `repertorio`: Datos de la escritura de cesión.
- `partes_comparecientes`: JSONB. Arreglo con Cedentes, Cesionarios y Autorizantes.
- `causante_nombre`: Nombre de las personas fallecidas de cuya herencia se ceden derechos.
- `pe_fojas`, `pe_numero`, `pe_anio`, `pe_cbr`: Datos de la inscripción de Posesión Efectiva.
- `ieh_fojas`, `ieh_numero`, `ieh_anio`, `ieh_cbr`: Datos de la Inscripción Especial de Herencia.
- `tipo_cesion`, `direccion_inmueble`: Detalles sobre el objeto de la cesión.
- `precio_cesion`, `forma_pago`, `declaracion_pago_total`: Detalles del negocio jurídico.

#### `ocr_estatutos_sociales`
- `razon_social`, `rut_sociedad`, `tipo_sociedad`, `es_empresa_en_un_dia`: Identificación de la sociedad.
- `codigo_verificacion_cve`, `fecha_emision_documento`, `numero_atencion`: Datos específicos de Empresa en un Día.
- `tipo_administracion`, `representantes`, `forma_ejercicio`: Detalles de la administración y representantes (JSONB).
- `puede_vender_enajenar`, `puede_hipotecar`, `puede_autocontratar`, `puede_representar_cbr`: Facultades inmobiliarias clave (Booleans).
- `autoriza_delegar`, `clausula_texto`: Poder de delegación y texto de la cláusula.
- `duracion_sociedad`: Vigencia de la sociedad.

#### `ocr_poderes`
- `notaria`, `fecha_escritura`, `repertorio`: Identificación de la escritura del poder.
- `clasificacion_poder`: Tipo de poder (ESPECIAL, GENERAL, etc.).
- `mandantes`, `mandatarios`: JSONB con los datos de las partes (Nombre, RUT, etc.).
- `forma_actuacion_mandatarios`: Cómo deben actuar (INDIVIDUAL, CONJUNTA, etc.).
- `inmueble_direccion`, `inmueble_comuna`, `inmueble_fojas`, `inmueble_numero`, `inmueble_anio`, `inmueble_conservador`: Datos del inmueble específico si aplica.
- `inmueble_deslindes`: Texto con los límites de la propiedad.
- `puede_vender`, `puede_percibir`, `puede_hipotecar`, `puede_autocontratar`: Booleans con facultades clave.
- `vigencia_texto`: Texto explicativo sobre la vigencia del poder.

#### `ocr_vigencia_poderes`
- `institucion_emisora`, `fecha_emision`, `codigo_verificacion`, `numero_certificado`: Datos de identificación del certificado.
- `razon_social`, `registro_referencia`: Identificación de la sociedad y su registro.
- `es_vigente`, `tiene_notas_marginales`: Estados de vigencia y observaciones.
- `texto_certificacion`: Transcripción del texto de vigencia.
- `apoderados_mencionados`: JSONB. Arreglo con los nombres de los apoderados.

#### `ocr_inscripcion_comercio`
- `conservador`, `fojas`, `numero`, `anio`, `fecha_emision_copia`: Datos registrales de la inscripción.
- `razon_social`: Nombre de la sociedad.
- `tipo_acto_juridico`, `resumen_acuerdos`, `administracion_extractada`, `socios_constituyentes_o_modificadores`, `capital_social`, `duracion_pactada`: Detalles de los acuerdos inscritos (JSONB para socios).
- `es_vigente_segun_certificado`, `tiene_notas_marginales`, `texto_notas_marginales`: Información de vigencia y subinscripciones.

#### `ocr_directorio`
- `notaria`, `fecha_escritura`, `repertorio`, `fecha_sesion_directorio`: Datos de identificación del acta de directorio.
- `razon_social`, `rut`: Datos de la sociedad.
- `cargos_designados`: JSONB con los cargos y nombres de las personas designadas.
- `poderes_conferidos`: JSONB con los apoderados, formas de actuación y limitaciones.
- `puede_vender`, `puede_hipotecar`, `puede_percibir`, `puede_autocontratar`: Facultades inmobiliarias clave.
- `limitaciones_texto`: Descripción textual de las limitaciones encontradas.


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



### Validación de Duplicados (`check_duplicate_solicitud_trigger`)
Este es un **Trigger** de PostgreSQL ejecutado `BEFORE INSERT OR UPDATE` en `solicitud_documentos`.

**Lógica de Ejecución:**
Marca el flag `repetido = TRUE` si encuentra otro documento en la misma operación que cumpla alguna de estas condiciones:
1. Mismo nombre de documento y mismo RUT de persona.
2. Mismo número de repertorio.
3. Mismas coordenadas de inscripción: Fojas, Número y Año.
4. Mismo nombre de documento y misma fecha.
5. Mismo número de plano (comparando solo dígitos, mínimo 2).

### Agregador de Documentos (`get_operation_documents`)
Esta es una **Función RPC** que permite al frontend obtener un resumen de todos los documentos cargados en una operación sin tener que consultar 20 tablas una por una. Retorna un JSON consolidado.

---

## 4. Seguridad y RLS

Para asegurar que los datos sean privados, se aplican políticas de **Row Level Security**:
- **Política de Selección**: `auth.uid() = user_id`. Los usuarios solo "ven" lo que ellos mismos crearon o lo que pertenece a sus operaciones.
- **Política de Inserción**: Solo usuarios autenticados pueden insertar.
