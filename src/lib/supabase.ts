
import { createClient } from '@supabase/supabase-js';

// These are public keys
const supabaseUrl = 'https://supabase.lovable.dev';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTl9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Create client with auto-retry and timeout settings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  global: {
    fetch: (...args) => {
      return fetch(...args).catch(err => {
        console.error('Supabase fetch error:', err);
        throw new Error('Connection to Supabase failed. Please check your network connection.');
      });
    },
  },
});

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
