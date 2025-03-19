
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WebsiteProject } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Maximize2 } from 'lucide-react';

interface ProjectCardProps {
  project: WebsiteProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const createdDate = new Date(project.created_at).toLocaleDateString();
  
  // Truncate prompt if too long
  const truncatedPrompt = project.prompt.length > 100 
    ? `${project.prompt.substring(0, 100)}...` 
    : project.prompt;

  // Generate a random gradient for the card header
  const gradients = [
    'from-blue-500 to-indigo-500',
    'from-indigo-500 to-purple-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-red-500',
    'from-red-500 to-orange-500',
    'from-orange-500 to-yellow-500',
    'from-green-500 to-teal-500',
    'from-teal-500 to-cyan-500',
    'from-cyan-500 to-blue-500'
  ];
  
  // Use the project ID to deterministically pick a gradient
  const gradientIndex = parseInt(project.id.replace(/[^0-9]/g, '').substring(0, 2) || '0') % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-200 dark:border-gray-700 group">
      <CardHeader className={`p-4 bg-gradient-to-r ${gradient} text-white`}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
            <div className="flex items-center gap-2 mt-1 text-xs text-white/80">
              <Calendar className="h-3 w-3" />
              <span>{createdDate}</span>
            </div>
          </div>
          <Badge variant="outline" className="font-normal bg-white/20 text-white border-white/40">
            Website
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300">
          {truncatedPrompt}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link to={`/project/${project.id}`}>
          <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400 transition-colors">
            <Maximize2 className="h-4 w-4 mr-2" />
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
