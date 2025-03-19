
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PromptForm from '@/components/PromptForm';
import WebsitePreview from '@/components/WebsitePreview';
import EnhancementChat from '@/components/EnhancementChat';
import { Button } from '@/components/ui/button';
import { generateWebsite, saveProject } from '@/services/WebsiteGeneratorService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowRight, Download, RefreshCw, SaveIcon, Sparkles, Wand2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateWebsite = () => {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("prompt");
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
        setActiveTab("enhance");
        
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

  const handleEnhance = (enhancedHtml: string) => {
    setHtml(enhancedHtml);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <main className="flex-grow container py-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Create Your Dream Website</h1>
          
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
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="prompt" className="text-sm" data-state={activeTab === "prompt" ? "active" : ""}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate
                  </TabsTrigger>
                  <TabsTrigger value="enhance" className="text-sm" data-state={activeTab === "enhance" ? "active" : ""} disabled={!html}>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="prompt" className="mt-0">
                  <PromptForm onGenerate={handleGenerate} loading={loading} />
                </TabsContent>
                
                <TabsContent value="enhance" className="mt-0">
                  <EnhancementChat htmlContent={html} onEnhance={handleEnhance} />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-3">
              {html ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleDownload} disabled={isSaving || loading}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving || loading} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
                        <SaveIcon className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Project'}
                      </Button>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <WebsitePreview htmlContent={html} />
                  </div>
                </>
              ) : (
                <div className="h-96 md:h-[600px] flex items-center justify-center border border-dashed rounded-lg bg-white/50 backdrop-blur-sm shadow-sm dark:bg-gray-800/50">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Create Your Website</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      Enter a prompt describing your ideal website and let AI do the rest. You can then enhance it with additional prompts.
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
