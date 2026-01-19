# Documentación de la Base de Datos - Property Title Study

Este documento describe la estructura, relaciones y lógica de la base de datos utilizada en la plataforma de estudio de títulos.

## Arquitectura General

La base de datos está construida sobre **PostgreSQL** y alojada en **Supabase**. Utiliza un esquema relacional con extensiones para UUID y JSONB.

## Tablas Principales

### `estudios_titulos`
Es el núcleo del sistema. Almacena la configuración inicial de cada estudio de títulos.
- **`id`**: UUID único.
- **`numero_operacion`**: Identificador de negocio (único).
- **`estado`**: Ciclo de vida del estudio (`En Configuración`, `En Revisión`, `Completado`).
- **`detalle_transacciones`**: Campo JSONB que detalla las transacciones históricas de la propiedad.
- **`tipo_propiedad`**: Clasificación (Casa, Departamento, Parcela, etc.).

### `profiles`
Almacena la información extendida de los usuarios autenticados.
- Relacionada con `auth.users` mediante el ID.

### `solicitud_documentos`
Gestiona los documentos requeridos y cargados para cada operación.
- **`documento_url`**: Enlace público al archivo en Supabase Storage.
- **`tipo_documento`**: Categoría del archivo.

## Sistema de Tablas OCR

Para permitir la extracción de datos estructurados, cada tipo de documento tiene una tabla dedicada con prefijo `ocr_`. Todas comparten columnas de trazabilidad estándar:
- `estudio_id`, `operacion_id`, `documento_url`, `nombre_archivo`, `user_id`, `estado`.

**Tablas incluidas:**
- `ocr_dominio_vigente` (Inscripciones de dominio)
- `ocr_gp` (Gravámenes y Prohibiciones)
- `ocr_avaluo_fiscal`
- `ocr_deuda_contribuciones`
- `ocr_recepcion_final`
- `ocr_matrimonio`, `ocr_nacimiento`, `ocr_solteria`
- `ocr_poderes`, `ocr_donacion`, `ocr_herencia`

## Lógica y Automatización

### Triggers de Storage
Existe un trigger (`on_storage_upload`) que se activa cuando se sube un archivo al bucket `legal_documents`. 
1. Analiza el nombre del archivo.
2. Identifica la tabla `ocr_` correspondiente mediante patrones de texto (ej: `%recepcion%` -> `ocr_recepcion_final`).
3. Inserta automáticamente un registro en la tabla con la URL pública y el ID del usuario.

### RPC (Remote Procedure Calls)
- **`get_operation_documents`**: Función que recorre todas las tablas OCR y devuelve un arreglo consolidado de documentos para una operación específica.

## Seguridad (RLS)
Todas las tablas tienen habilitado **Row Level Security (RLS)**, asegurando que los usuarios solo puedan acceder a los datos de sus propias operaciones.
