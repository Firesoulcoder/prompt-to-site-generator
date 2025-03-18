
import { supabase } from '@/lib/supabase';
import { WebsiteProject } from '@/lib/supabase';

const API_KEY = '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';
const SITE_URL = window.location.origin;
const SITE_NAME = 'Prompt2Site Generator';

export async function generateWebsite(prompt: string): Promise<string> {
  try {
    const fullPrompt = `Generate a complete, standalone HTML file for a website based on this description: "${prompt}". 
    The HTML should include embedded CSS and JS. Make it responsive, modern, and visually appealing.
    Don't include any placeholders or TODOs. Return ONLY the complete, valid HTML code.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1:free",
        "messages": [
          {
            "role": "user",
            "content": fullPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate website');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error('Error generating website:', error);
    throw new Error(error.message || 'Failed to generate website');
  }
}

export async function saveProject(
  userId: string, 
  prompt: string, 
  htmlContent: string, 
  title: string
): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('website_projects')
      .insert([
        { user_id: userId, prompt, html_content: htmlContent, title }
      ])
      .select();

    if (error) throw error;
    return data[0].id;
  } catch (error: any) {
    console.error('Error saving project:', error);
    throw new Error(error.message || 'Failed to save project');
  }
}

export async function getUserProjects(userId: string): Promise<WebsiteProject[]> {
  try {
    const { data, error } = await supabase
      .from('website_projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as WebsiteProject[];
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    throw new Error(error.message || 'Failed to fetch projects');
  }
}

export async function getProjectById(projectId: string): Promise<WebsiteProject> {
  try {
    const { data, error } = await supabase
      .from('website_projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) throw error;
    return data as WebsiteProject;
  } catch (error: any) {
    console.error('Error fetching project:', error);
    throw new Error(error.message || 'Failed to fetch project');
  }
}
