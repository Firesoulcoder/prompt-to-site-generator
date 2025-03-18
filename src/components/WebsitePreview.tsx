
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface WebsitePreviewProps {
  htmlContent: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPreview = () => {
    setLoading(true);
    setError(null);
    
    try {
      if (iframeRef.current && htmlContent) {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(htmlContent);
          iframeDoc.close();
          
          // Handle iframe load events
          iframe.onload = () => {
            setLoading(false);
          };
          
          // Set a timeout in case the onload event doesn't fire
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } else {
          throw new Error('Could not access iframe document');
        }
      }
    } catch (err: any) {
      console.error('Error rendering preview:', err);
      setError(err.message || 'Failed to load preview');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreview();
  }, [htmlContent]);

  const handleReload = () => {
    loadPreview();
  };

  return (
    <Card className="w-full overflow-hidden border shadow-md">
      <div className="w-full h-96 md:h-[600px] relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Skeleton className="w-full h-full absolute" />
            <div className="text-center">
              <div className="animate-spin mb-4">
                <RefreshCw className="h-8 w-8 mx-auto" />
              </div>
              <p>Loading preview...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-6">
            <p className="text-destructive mb-4">Error: {error}</p>
            <Button onClick={handleReload} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reload Preview
            </Button>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          title="Website Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      </div>
    </Card>
  );
};

export default WebsitePreview;
