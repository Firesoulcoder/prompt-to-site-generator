
import React from 'react';
import { WebsiteProject } from '@/lib/supabase';
import ProjectCard from './ProjectCard';
import { Loader2 } from 'lucide-react';

interface ProjectsListProps {
  projects: WebsiteProject[];
  loading: boolean;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">No projects yet</h3>
        <p className="text-muted-foreground mt-2">Create your first website with a prompt!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsList;
