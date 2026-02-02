-- Migration: Modify ocr_directorio schema
-- Created at: 2026-02-02
-- Description: Overhaul ocr_directorio table to include Board Meeting details, designees, and powers.

BEGIN;

-- Add new columns if they don't exist
ALTER TABLE public.ocr_directorio 
ADD COLUMN IF NOT EXISTS notaria TEXT,
ADD COLUMN IF NOT EXISTS fecha_escritura TEXT,
ADD COLUMN IF NOT EXISTS repertorio TEXT,
ADD COLUMN IF NOT EXISTS fecha_sesion_directorio TEXT,
ADD COLUMN IF NOT EXISTS razon_social TEXT,
ADD COLUMN IF NOT EXISTS rut TEXT,
ADD COLUMN IF NOT EXISTS cargos_designados JSONB,
ADD COLUMN IF NOT EXISTS poderes_conferidos JSONB,
ADD COLUMN IF NOT EXISTS puede_vender BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS puede_hipotecar BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS puede_percibir BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS puede_autocontratar BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS limitaciones_texto TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Note: We keep old columns like entidad_nombre, rut_entidad, fecha_acta for backward compatibility 
-- or we could drop them if explicitly asked. For now, we just add the new structure.

COMMIT;
