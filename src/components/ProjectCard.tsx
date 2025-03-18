
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WebsiteProject } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { Calendar, Maximize2 } from 'lucide-react';

interface ProjectCardProps {
  project: WebsiteProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const createdDate = new Date(project.created_at).toLocaleDateString();
  
  // Truncate prompt if too long
  const truncatedPrompt = project.prompt.length > 100 
    ? `${project.prompt.substring(0, 100)}...` 
    : project.prompt;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{createdDate}</span>
            </div>
          </div>
          <Badge variant="outline" className="font-normal">
            Project
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardDescription className="line-clamp-3">
          {truncatedPrompt}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link to={`/project/${project.id}`}>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4 mr-2" />
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
