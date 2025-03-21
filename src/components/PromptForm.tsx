
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PromptFormProps {
  onGenerate: (prompt: string, title: string) => void;
  loading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onGenerate, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: "Prompt is required",
        description: "Please enter a description for your website",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Title is required",
        description: "Please enter a title for your project",
        variant: "destructive",
      });
      return;
    }

    // Start progress animation
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 500);

    // Call the onGenerate function
    onGenerate(prompt, title);
    
    // Reset progress when loading is done
    const checkLoading = setInterval(() => {
      if (!loading) {
        clearInterval(interval);
        clearInterval(checkLoading);
        setProgress(100);
        setTimeout(() => setProgress(0), 500);
      }
    }, 1000);
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create Your Website</CardTitle>
          <CardDescription>
            Describe the website you want to create and our AI will generate it for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Project Title
            </label>
            <Input
              id="title"
              placeholder="Enter a title for your project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Describe Your Website
            </label>
            <Textarea
              id="prompt"
              placeholder="E.g., Create a modern portfolio website for a photographer with a gallery section, about page, and contact form..."
              className="min-h-32 resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
          </div>
          
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating website...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-gradient-to-r from-brand-blue to-brand-indigo hover:opacity-90 transition-all"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Website
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PromptForm;
