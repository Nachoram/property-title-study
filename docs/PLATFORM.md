# Documentación de la Plataforma - Property Title Study

Este documento explica cómo funciona la plataforma desde el punto de vista técnico y de flujo de usuario.

## Stack Tecnológico

- **Frontend**: React.js con Vite.
- **Estilos**: Tailwind CSS para un diseño moderno y responsivo.
- **Backend-as-a-Service**: Supabase (Auth, Database, Storage).
- **Iconografía**: Lucide-react.

## Flujo de Trabajo

### 1. Configuración del Estudio (Paso 1)
El usuario inicia un nuevo estudio ingresando el número de operación y configurando las características de la propiedad (tipo, si tiene reglamento de copropiedad, servidumbres, etc.).
- Los datos se guardan en la tabla `estudios_titulos`.

### 2. Gestión de Documentos (Pasos 2 y 3)
Dependiendo de la configuración inicial, el sistema genera dinámicamente una lista de documentos requeridos.
- **Carga Inteligente**: Al subir un archivo, el frontend lo guarda en Supabase Storage. Un trigger de base de datos intercepta la subida y crea el registro correspondiente en la tabla OCR adecuada.
- **Validación**: El usuario puede ver el estado de carga de cada documento en tiempo real.

### 3. Revisión y Análisis
Una vez cargados los antecedentes base, el usuario envía el estudio a revisión.
- Se invoca una **Edge Function** de Supabase (`send-to-revision`) o se activa un Webhook (n8n) para procesar los documentos.
- El estado de la operación cambia a "En Revisión".

## Componentes Clave

- **`StudyPage.jsx`**: El componente más complejo, maneja el wizard de 3 pasos, la lógica de carga de archivos y la integración con las RPCs de Supabase.
- **`Dashboard.jsx`**: Vista principal donde el usuario gestiona sus estudios activos, con filtros por estado y tipo de propiedad.
- **`AuthContext.jsx`**: Gestiona la sesión del usuario y protege las rutas mediante `PrivateRoute`.

## Integración con Servicios Externos

La plataforma está diseñada para integrarse con herramientas de automatización como **n8n**. Al finalizar la carga de documentos, se puede disparar un análisis OCR automatizado para poblar los campos detallados de las tablas `ocr_`.

## Seguridad

La plataforma utiliza **Supabase Auth** para la autenticación. Cada petición a la base de datos incluye el token JWT del usuario, permitiendo que las políticas RLS filtren la información por `user_id`.
