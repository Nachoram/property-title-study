-- Migration 069: Modify ocr_poderes to use an array for specific properties
-- Removes individual inmueble columns and replaces them with a single JSONB array column

ALTER TABLE ocr_poderes
DROP COLUMN IF EXISTS inmueble_direccion,
DROP COLUMN IF EXISTS inmueble_comuna,
DROP COLUMN IF EXISTS inmueble_fojas,
DROP COLUMN IF EXISTS inmueble_numero,
DROP COLUMN IF EXISTS inmueble_anio,
DROP COLUMN IF EXISTS inmueble_conservador,
DROP COLUMN IF EXISTS inmueble_deslindes;

ALTER TABLE ocr_poderes
ADD COLUMN IF NOT EXISTS inmueble_especifico JSONB DEFAULT '[]'::jsonb;

-- Update existing records to initialize the array if needed (though dropping columns already did most of the work)
COMMENT ON COLUMN ocr_poderes.inmueble_especifico IS 'Arreglo de objetos con los datos de los inmuebles específicos asociados al poder';
