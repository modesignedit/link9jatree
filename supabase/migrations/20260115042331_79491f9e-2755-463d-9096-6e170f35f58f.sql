-- Add custom styling columns to social_links table
ALTER TABLE public.social_links 
ADD COLUMN custom_color text,
ADD COLUMN custom_icon text,
ADD COLUMN animation text DEFAULT 'none';