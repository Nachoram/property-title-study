-- Add missing storage policies for legal_documents bucket
-- This ensures that users can upload, update, and delete files in the legal_documents bucket

-- Drop existing policies to avoid conflicts if we want to redefine them
-- DROP POLICY IF EXISTS "Allow public select" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;

-- Ensure UPDATE policy exists for upsert to work
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Allow public updates'
    ) THEN
        CREATE POLICY "Allow public updates"
        ON storage.objects FOR UPDATE
        TO public
        USING (bucket_id = 'legal_documents')
        WITH CHECK (bucket_id = 'legal_documents');
    END IF;
END $$;

-- Ensure DELETE policy exists
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Allow public deletes'
    ) THEN
        CREATE POLICY "Allow public deletes"
        ON storage.objects FOR DELETE
        TO public
        USING (bucket_id = 'legal_documents');
    END IF;
END $$;

-- Ensure INSERT policy is definitely there and permissive
-- (We saw it was there, but let's make sure it covers everything)
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Allow public uploads'
    ) THEN
        CREATE POLICY "Allow public uploads"
        ON storage.objects FOR INSERT
        TO public
        WITH CHECK (bucket_id = 'legal_documents');
    END IF;
END $$;
