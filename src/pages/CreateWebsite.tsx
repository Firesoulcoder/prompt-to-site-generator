
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
import { ArrowRight, Download, SaveIcon } from 'lucide-react';

const CreateWebsite = () => {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerate = async (newPrompt: string, newTitle: string) => {
    try {
      setLoading(true);
      setPrompt(newPrompt);
      setTitle(newTitle);
      
      const generatedHtml = await generateWebsite(newPrompt);
      setHtml(generatedHtml);
      
      toast({
        title: "Website generated!",
        description: "Your website has been generated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      const projectId = await saveProject(user.id, prompt, html, title);
      
      toast({
        title: "Project saved!",
        description: "Your website has been saved successfully.",
      });
      
      navigate(`/project/${projectId}`);
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message,
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
                      <Button variant="outline" onClick={handleDownload} disabled={isSaving}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving} className="bg-brand-indigo hover:bg-brand-indigo/90">
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
