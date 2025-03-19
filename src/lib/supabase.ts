
import { supabase } from '@/integrations/supabase/client';

export type WebsiteProject = {
  id: string;
  created_at: string;
  user_id: string;
  prompt: string;
  html_content: string;
  title: string;
};

// Helper to check if Supabase is available
export async function isSupabaseAvailable(): Promise<boolean> {
  try {
    const { error } = await supabase.from('website_projects').select('count', { count: 'exact', head: true });
    return !error;
  } catch (e) {
    return false;
  }
}
