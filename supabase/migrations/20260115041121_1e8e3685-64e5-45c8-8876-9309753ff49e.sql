-- Add background_effects column to store user animation preferences
ALTER TABLE public.profiles 
ADD COLUMN background_effects jsonb DEFAULT '{"particles": false, "orbs": true, "gradientMorph": false, "shimmer": false}'::jsonb;