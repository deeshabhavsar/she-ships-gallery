export { supabase } from "@/integrations/supabase/client";

export type Project = {
  id: string;
  builder_name: string;
  project_name: string;
  description: string;
  project_link: string;
  tags: string[];
  avatar_url: string | null;
  screenshot_url: string | null;
  linkedin_url: string | null;
  created_at: string;
};

export type Feedback = {
  id: string;
  project_id: string;
  message: string;
  created_at: string;
};
