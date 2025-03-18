
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WebsitePreview from '@/components/WebsitePreview';
import { Button } from '@/components/ui/button';
import { getProjectById } from '@/services/WebsiteGeneratorService';
import { WebsiteProject } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProjectView = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<WebsiteProject | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const projectData = await getProjectById(id);
        setProject(projectData);
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
    
    const blob = new Blob([project.html_content], { type: 'text/html' });
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

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col">
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="flex items-center mb-6 gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Created On</h3>
                    <p>{new Date(project.created_at).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Prompt</h3>
                    <p className="text-sm">{project.prompt}</p>
                  </div>
                  
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download HTML
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <WebsitePreview htmlContent={project.html_content} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ProjectView;
