
import { createClient } from '@supabase/supabase-js';

// These are public keys
const supabaseUrl = 'https://supabase.lovable.dev';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTl9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WebsiteProject = {
  id: string;
  created_at: string;
  user_id: string;
  prompt: string;
  html_content: string;
  title: string;
};
