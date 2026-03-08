import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  builder_name: string;
  project_name: string;
  description: string;
  project_link: string;
  tags: string[];
  avatar_url: string | null;
  screenshot_url: string | null;
  created_at: string;
};
