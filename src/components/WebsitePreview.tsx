
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface WebsitePreviewProps {
  htmlContent: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionIssue, setConnectionIssue] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const loadPreview = () => {
    setLoading(true);
    setError(null);
    setConnectionIssue(false);
    
    try {
      // Clear previous blob URL if exists
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        setBlobUrl(null);
      }
      
      if (iframeRef.current && htmlContent) {
        console.log("HTML content length:", htmlContent.length);
        
        // Remove any ```html markdown wrappers if present
        let cleanHtml = htmlContent;
        if (cleanHtml.startsWith('```html')) {
          cleanHtml = cleanHtml.replace(/^```html\n/, '').replace(/```$/, '');
        } else if (cleanHtml.startsWith('```')) {
          cleanHtml = cleanHtml.replace(/^```\n/, '').replace(/```$/, '');
        }
        
        // Ensure proper DOCTYPE for React content
        if (!cleanHtml.includes('<!DOCTYPE html>')) {
          cleanHtml = '<!DOCTYPE html>\n' + cleanHtml;
        }
        
        // Create a blob URL
        const blob = new Blob([cleanHtml], { type: 'text/html' });
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        
        const iframe = iframeRef.current;
        iframe.src = newBlobUrl;
        
        // Handle iframe load events
        iframe.onload = () => {
          setLoading(false);
        };
        
        // Set a timeout in case the onload event doesn't fire
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } catch (err: any) {
      console.error('Error rendering preview:', err);
      
      // Check if it's a network/connection issue
      if (err.message?.includes('network') || 
          err.message?.includes('connection') ||
          err.message?.includes('DNS') ||
          err.message?.includes('cross-origin') ||
          err.name === 'NetworkError') {
        setConnectionIssue(true);
      }
      
      setError(err.message || 'Failed to load preview');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check general connectivity
    if (!navigator.onLine) {
      setConnectionIssue(true);
    }
    
    if (htmlContent) {
      loadPreview();
    } else {
      setLoading(false);
    }
    
    // Clean up function to handle blob URL when component unmounts
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [htmlContent]);

  const handleReload = () => {
    loadPreview();
  };

  if (!htmlContent) {
    return (
      <Card className="w-full overflow-hidden border shadow-md">
        <div className="w-full h-96 md:h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <p className="text-muted-foreground">No content to preview</p>
        </div>
      </Card>
    );
  }

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
        
        {connectionIssue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-6">
            <Alert variant="destructive" className="max-w-md mb-4">
              <WifiOff className="h-4 w-4 mr-2" />
              <AlertTitle>Connection Issue Detected</AlertTitle>
              <AlertDescription>
                There appears to be a problem connecting to our services. This could be due to network connectivity or our servers may be temporarily unavailable.
              </AlertDescription>
            </Alert>
            
            <p className="text-sm text-muted-foreground mb-4">The preview will still work, but saving your projects may not be available right now.</p>
            
            <Button onClick={handleReload} variant="outline" className="gap-2">
              <Wifi className="h-4 w-4" />
              Check Connection
            </Button>
          </div>
        )}
        
        {error && !connectionIssue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-6">
            <Alert variant="destructive" className="max-w-md mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertTitle>Error Loading Preview</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
            
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
