
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsList from '@/components/ProjectsList';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { WebsiteProject } from '@/lib/supabase';
import { getUserProjects } from '@/services/WebsiteGeneratorService';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DatabaseIcon, PlusCircle, RefreshCw, WifiOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const { toast } = useToast();

  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setConnectionError(false);
      const userProjects = await getUserProjects(user.id);
      setProjects(userProjects);
    } catch (error: any) {
      setConnectionError(true);
      toast({
        title: "Error fetching projects",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user, toast]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Projects</h1>
              <p className="text-muted-foreground mt-1">
                Manage all your generated websites in one place
              </p>
            </div>
            <Link to="/create" className="mt-4 md:mt-0">
              <Button className="bg-brand-indigo hover:bg-brand-indigo/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Website
              </Button>
            </Link>
          </div>

          {connectionError && (
            <Alert variant="destructive" className="mb-6">
              <WifiOff className="h-4 w-4 mr-2" />
              <AlertTitle>Connection Issue</AlertTitle>
              <AlertDescription className="flex flex-col gap-2">
                <p>There was a problem connecting to our database. Your projects may not be fully loaded.</p>
                <Button variant="outline" size="sm" className="w-fit" onClick={fetchProjects}>
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {projects.length === 0 && !loading && !connectionError && (
            <Alert className="mb-6 border-brand-indigo/20 bg-brand-indigo/5">
              <DatabaseIcon className="h-4 w-4 mr-2 text-brand-indigo" />
              <AlertTitle>No Projects Yet</AlertTitle>
              <AlertDescription>
                <p className="mb-2">Start by creating your first website with a simple prompt!</p>
                <Link to="/create">
                  <Button size="sm" className="bg-brand-indigo hover:bg-brand-indigo/90">
                    <PlusCircle className="mr-2 h-3 w-3" />
                    Create Your First Website
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>
          )}

          <ProjectsList projects={projects} loading={loading} />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
