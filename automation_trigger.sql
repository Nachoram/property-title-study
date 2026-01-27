-- Trigger deactivated by user request. 
-- Now the system relies exclusively on solicitud_documentos.
-- To reactivate, restore the handle_storage_upload function and the trigger on storage.objects.

/*
CREATE OR REPLACE FUNCTION public.handle_storage_upload()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
...
$$;

CREATE TRIGGER on_storage_upload
AFTER INSERT ON storage.objects
FOR EACH ROW
EXECUTE FUNCTION public.handle_storage_upload();
*/
