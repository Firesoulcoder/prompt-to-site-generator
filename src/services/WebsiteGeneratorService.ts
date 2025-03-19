
import { supabase } from '@/integrations/supabase/client';
import { WebsiteProject } from '@/lib/supabase';

const API_KEY = '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';
const SITE_URL = window.location.origin;
const SITE_NAME = 'Prompt2Site Generator';

export async function generateWebsite(prompt: string): Promise<string> {
  try {
    console.log('Generating website with prompt:', prompt);
    
    const fullPrompt = `Generate a complete, standalone HTML file for a website based on this description: "${prompt}". 
    The HTML should include embedded CSS and JS. Make it responsive, modern, and visually appealing.
    Don't include any placeholders or TODOs. Return ONLY the complete, valid HTML code.`;

    console.log('Sending request to OpenRouter API...');
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "anthropic/claude-3-opus:free",
        "messages": [
          {
            "role": "user",
            "content": fullPrompt
          }
        ],
        "max_tokens": 4000
      })
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error response:', errorData);
      throw new Error(errorData.error?.message || `Failed to generate website: HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response data:', data); // Log the entire response for debugging
    
    // Check if the response has the expected structure
    if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.warn('Unexpected API response format, using fallback HTML');
      return getFallbackHTML(prompt);
    }
    
    // Check if the first choice exists and has a message with content
    if (!data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.warn('Missing content in API response, using fallback HTML');
      return getFallbackHTML(prompt);
    }
    
    console.log('Response received, content length:', data.choices[0].message.content.length);
    
    // If the content is empty or very short, return fallback HTML
    if (data.choices[0].message.content.trim().length < 100) {
      console.warn('Very short content received, returning fallback HTML');
      return getFallbackHTML(prompt);
    }
    
    // Clean up the HTML content to remove markdown code blocks if present
    let htmlContent = data.choices[0].message.content.trim();
    
    // Check if the content starts with markdown code block identifiers and remove them
    if (htmlContent.startsWith('```html')) {
      htmlContent = htmlContent.replace(/^```html\n/, '').replace(/```$/, '');
    } else if (htmlContent.startsWith('```')) {
      htmlContent = htmlContent.replace(/^```\n/, '').replace(/```$/, '');
    }
    
    // Ensure it has proper DOCTYPE
    if (!htmlContent.includes('<!DOCTYPE html>')) {
      htmlContent = '<!DOCTYPE html>\n' + htmlContent;
    }
    
    return htmlContent;
  } catch (error: any) {
    console.error('Error generating website:', error);
    // Return fallback HTML in case of any error
    return getFallbackHTML(prompt);
  }
}

// Fallback HTML in case the API fails
function getFallbackHTML(prompt: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      color: #333;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
    }
    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    header {
      text-align: center;
      padding: 2rem 0;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }
    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }
    .content {
      background-color: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    footer {
      text-align: center;
      margin-top: 2rem;
      padding: 1rem 0;
      color: #718096;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Your Website</h1>
      <p>Based on: "${prompt}"</p>
    </header>
    <div class="content">
      <p>This is a placeholder website. The AI generation service is temporarily unavailable. Your website would be based on your description: "${prompt}"</p>
      <p>Please try again later or contact support if the issue persists.</p>
    </div>
    <footer>
      <p>Generated by Prompt2Site</p>
    </footer>
  </div>
</body>
</html>
  `;
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
    
    // Generate a fake project ID for offline mode
    const fakeId = 'offline-' + Math.random().toString(36).substring(2, 15);
    
    // Try to save to localStorage as a fallback
    try {
      const offlineProjects = JSON.parse(localStorage.getItem('offlineProjects') || '[]');
      const newProject = {
        id: fakeId,
        user_id: userId,
        prompt,
        html_content: htmlContent,
        title,
        created_at: new Date().toISOString()
      };
      offlineProjects.push(newProject);
      localStorage.setItem('offlineProjects', JSON.stringify(offlineProjects));
    } catch (e) {
      console.error('Failed to save offline:', e);
    }
    
    // Return the fake ID so the app can continue
    return fakeId;
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
    
    // Try to get from localStorage as a fallback
    try {
      const offlineProjects = JSON.parse(localStorage.getItem('offlineProjects') || '[]');
      return offlineProjects.filter((p: any) => p.user_id === userId) as WebsiteProject[];
    } catch (e) {
      console.error('Failed to get offline projects:', e);
      return []; // Return empty array as last resort
    }
  }
}

export async function getProjectById(projectId: string): Promise<WebsiteProject> {
  try {
    // Check if it's an offline project
    if (projectId.startsWith('offline-')) {
      const offlineProjects = JSON.parse(localStorage.getItem('offlineProjects') || '[]');
      const project = offlineProjects.find((p: any) => p.id === projectId);
      if (project) return project as WebsiteProject;
      throw new Error('Offline project not found');
    }
    
    // Otherwise, try Supabase
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

// New function to enhance website with AI
export async function enhanceWebsite(
  htmlContent: string, 
  enhancementPrompt: string
): Promise<string> {
  try {
    console.log('Enhancing website with prompt:', enhancementPrompt);
    
    const fullPrompt = `I have this HTML website:
    
${htmlContent.substring(0, 1000)}...

Please enhance it based on this instruction: "${enhancementPrompt}".
Return ONLY the complete, modified HTML code.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "anthropic/claude-3-opus:free",
        "messages": [
          {
            "role": "user",
            "content": fullPrompt
          }
        ],
        "max_tokens": 4000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Failed to enhance website: HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('API Enhancement Response data:', data); // Log the entire response for debugging
    
    // Check if the response has the expected structure
    if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      throw new Error('Unexpected API response format');
    }
    
    // Check if the first choice exists and has a message with content
    if (!data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Missing content in API response');
    }
    
    let enhancedHtml = data.choices[0].message.content.trim();
    
    if (enhancedHtml.startsWith('```html')) {
      enhancedHtml = enhancedHtml.replace(/^```html\n/, '').replace(/```$/, '');
    } else if (enhancedHtml.startsWith('```')) {
      enhancedHtml = enhancedHtml.replace(/^```\n/, '').replace(/```$/, '');
    }
    
    // If the enhanced content is too short, return the original
    if (enhancedHtml.length < 100) {
      throw new Error('Enhanced content too short, likely invalid');
    }
    
    // Ensure it has proper DOCTYPE
    if (!enhancedHtml.includes('<!DOCTYPE html>')) {
      enhancedHtml = '<!DOCTYPE html>\n' + enhancedHtml;
    }
    
    return enhancedHtml;
  } catch (error: any) {
    console.error('Error enhancing website:', error);
    throw new Error(error.message || 'Failed to enhance website');
  }
}
