-- Create inquiries table for contact form submissions
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (anyone can submit a contact form)
CREATE POLICY "Anyone can submit an inquiry" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- No SELECT policy - inquiries are write-only from the public