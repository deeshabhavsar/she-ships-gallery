
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  builder_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT NOT NULL,
  project_link TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  avatar_url TEXT,
  screenshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view projects
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);

-- Anyone can insert projects (no auth required)
CREATE POLICY "Anyone can submit projects" ON public.projects FOR INSERT WITH CHECK (true);

-- Storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('screenshots', 'screenshots', true);

-- Storage policies - anyone can upload and view
CREATE POLICY "Anyone can view avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Anyone can upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Anyone can view screenshots" ON storage.objects FOR SELECT USING (bucket_id = 'screenshots');
CREATE POLICY "Anyone can upload screenshots" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'screenshots');
