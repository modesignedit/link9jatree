-- Add background customization fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN background_type TEXT DEFAULT 'gradient' CHECK (background_type IN ('gradient', 'solid', 'image')),
ADD COLUMN background_value TEXT DEFAULT 'aurora',
ADD COLUMN background_image_url TEXT;