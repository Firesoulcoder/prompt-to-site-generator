
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
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userProjects = await getUserProjects(user.id);
        setProjects(userProjects);
      } catch (error: any) {
        toast({
          title: "Error fetching projects",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

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

          <ProjectsList projects={projects} loading={loading} />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
