
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PromptForm from '@/components/PromptForm';
import WebsitePreview from '@/components/WebsitePreview';
import { Button } from '@/components/ui/button';
import { generateWebsite, saveProject } from '@/services/WebsiteGeneratorService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowRight, Download, RefreshCw, SaveIcon } from 'lucide-react';

const CreateWebsite = () => {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerate = async (newPrompt: string, newTitle: string) => {
    try {
      setLoading(true);
      setError(null);
      setPrompt(newPrompt);
      setTitle(newTitle);
      
      console.log('Generating website with prompt:', newPrompt);
      const generatedHtml = await generateWebsite(newPrompt);
      
      if (generatedHtml) {
        setHtml(generatedHtml);
        console.log('Website generated successfully');
        
        toast({
          title: "Website generated!",
          description: "Your website has been generated successfully.",
        });
      } else {
        throw new Error('Failed to generate website content');
      }
    } catch (error: any) {
      console.error('Error in website generation:', error);
      setError(error.message || 'An unexpected error occurred');
      
      toast({
        title: "Generation failed",
        description: error.message || 'Please try again later',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (prompt && title) {
      handleGenerate(prompt, title);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      setError(null);
      const projectId = await saveProject(user.id, prompt, html, title);
      
      toast({
        title: "Project saved!",
        description: "Your website has been saved successfully.",
      });
      
      navigate(`/project/${projectId}`);
    } catch (error: any) {
      console.error('Error saving project:', error);
      setError(error.message || 'Failed to save project');
      
      toast({
        title: "Save failed",
        description: error.message || 'Please try again later',
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Website HTML file has been downloaded.",
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <h1 className="text-3xl font-bold mb-6">Create Website</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry} 
                  className="ml-2 mt-2"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <PromptForm onGenerate={handleGenerate} loading={loading} />
            </div>
            
            <div className="lg:col-span-2">
              {html ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleDownload} disabled={isSaving || loading}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving || loading} className="bg-brand-indigo hover:bg-brand-indigo/90">
                        <SaveIcon className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Project'}
                      </Button>
                    </div>
                  </div>
                  <WebsitePreview htmlContent={html} />
                </>
              ) : (
                <div className="h-96 md:h-[600px] flex items-center justify-center border border-dashed rounded-lg bg-muted/20">
                  <div className="text-center p-8">
                    <h3 className="text-xl font-medium mb-2">No preview yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Enter a prompt and generate your website to see a preview here
                    </p>
                    <ArrowRight className="h-8 w-8 text-muted-foreground/50 mx-auto transform -rotate-90" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CreateWebsite;
