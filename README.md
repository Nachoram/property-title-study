# Property Title Study

Plataforma inteligente para la gestión y estudio de títulos de propiedad.

## Documentación Técnica

Para facilitar el entendimiento y desarrollo del proyecto, se ha generado documentación detallada en las siguientes áreas:

- [**Guía de Base de Datos**](./docs/DATABASE.md): Descripción del esquema, tablas OCR y automatizaciones mediante triggers.
- [**Funcionamiento de la Plataforma**](./docs/PLATFORM.md): Flujos de trabajo, stack tecnológico y componentes principales.

## Tecnologías Utilizadas

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Automatización**: Triggers de base de datos y RPCs personalizadas

## Configuración Local

1. Clona el repositorio.
2. Instala las dependencias: `npm install`.
3. Configura las variables de entorno en un archivo `.env` (Supabase URL y Anon Key).
4. Ejecuta el servidor de desarrollo: `npm run dev`.
