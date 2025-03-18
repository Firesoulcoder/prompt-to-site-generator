
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface WebsitePreviewProps {
  htmlContent: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && htmlContent) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
    }
  }, [htmlContent]);

  return (
    <Card className="w-full overflow-hidden border shadow-md">
      <div className="w-full h-96 md:h-[600px] relative">
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
