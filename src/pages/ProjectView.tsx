
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WebsitePreview from '@/components/WebsitePreview';
import EnhancementChat from '@/components/EnhancementChat';
import { Button } from '@/components/ui/button';
import { getProjectById, saveProject } from '@/services/WebsiteGeneratorService';
import { WebsiteProject } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ArrowLeft, Download, Edit, Loader2, Save, Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';

const ProjectView = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<WebsiteProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentHtml, setCurrentHtml] = useState<string>('');
  const [hasChanges, setHasChanges] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const projectData = await getProjectById(id);
        setProject(projectData);
        setCurrentHtml(projectData.html_content);
      } catch (error: any) {
        toast({
          title: "Error fetching project",
          description: error.message,
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, toast, navigate]);

  const handleDownload = () => {
    if (!project) return;
    
    const blob = new Blob([currentHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}.html`;
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
    setCurrentHtml(enhancedHtml);
    setHasChanges(true);
  };
  
  const handleSaveChanges = async () => {
    if (!project || !user) return;
    
    try {
      setSaving(true);
      await saveProject(user.id, project.prompt, currentHtml, project.title);
      
      // Update the project object with new HTML
      setProject({
        ...project,
        html_content: currentHtml
      });
      
      setHasChanges(false);
      
      toast({
        title: "Changes saved!",
        description: "Your enhanced website has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message || "There was a problem saving your changes",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <Navbar />
          <main className="flex-grow container py-8 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  if (!project) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container py-8">
            <p>Project not found.</p>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="flex items-center mb-6 gap-4 justify-between">
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            {hasChanges && (
              <Button onClick={handleSaveChanges} disabled={saving} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90">
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="details" className="text-sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="enhance" className="text-sm">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-0">
                  <Card>
                    <CardContent className="pt-6">
                      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{project.title}</h1>
                      
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Created On</h3>
                        <p>{new Date(project.created_at).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Prompt</h3>
                        <p className="text-sm">{project.prompt}</p>
                      </div>
                      
                      <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
                        <Download className="mr-2 h-4 w-4" />
                        Download HTML
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="enhance" className="mt-0">
                  <EnhancementChat htmlContent={currentHtml} onEnhance={handleEnhance} />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <WebsitePreview htmlContent={currentHtml} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ProjectView;
