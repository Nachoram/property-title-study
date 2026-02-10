-- Migration 071: Remove unused columns from ocr_escritura_constitucion_aporte
-- Removes facultad_vender, facultad_hipotecar, facultad_enajenar, and individualizacion_aporte

ALTER TABLE ocr_escritura_constitucion_aporte 
DROP COLUMN IF EXISTS facultad_vender,
DROP COLUMN IF EXISTS facultad_hipotecar,
DROP COLUMN IF EXISTS facultad_enajenar,
DROP COLUMN IF EXISTS individualizacion_aporte;
