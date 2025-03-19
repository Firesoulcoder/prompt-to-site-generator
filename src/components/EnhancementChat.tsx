
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { enhanceWebsite } from '@/services/WebsiteGeneratorService';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

interface EnhancementChatProps {
  htmlContent: string;
  onEnhance: (newHtml: string) => void;
}

const EnhancementChat: React.FC<EnhancementChatProps> = ({ htmlContent, onEnhance }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleEnhance = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Enhancement prompt required",
        description: "Please enter what you'd like to improve",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      const enhancedHtml = await enhanceWebsite(htmlContent, prompt);
      onEnhance(enhancedHtml);
      toast({
        title: "Enhancement applied",
        description: "Your website has been updated with the requested changes",
      });
      setPrompt('');
    } catch (error: any) {
      toast({
        title: "Enhancement failed",
        description: error.message || "There was a problem updating your website",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Enhance Your Website</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Describe what you'd like to change or add to your website..."
          className="min-h-20"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleEnhance} 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Apply Enhancement
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnhancementChat;
