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
  created_at: string;
};
