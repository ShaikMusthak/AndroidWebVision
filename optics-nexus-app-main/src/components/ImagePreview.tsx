import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";

interface ImagePreviewProps {
  originalUrl: string;
  processedUrl: string | null;
  onReset: () => void;
  onDownload: () => void;
}

export const ImagePreview = ({
  originalUrl,
  processedUrl,
  onReset,
  onDownload,
}: ImagePreviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Original</h3>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border">
            <img
              src={originalUrl}
              alt="Original"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {processedUrl && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Background Removed
            </h3>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border"
                 style={{
                   backgroundImage: 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--muted-foreground) / 0.1) 0% 50%)',
                   backgroundSize: '20px 20px',
                   backgroundPosition: '0 0, 10px 10px'
                 }}>
              <img
                src={processedUrl}
                alt="Processed"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {processedUrl && (
        <div className="flex gap-3 justify-center">
          <Button onClick={onDownload} size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            Download Result
          </Button>
          <Button onClick={onReset} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Try Another
          </Button>
        </div>
      )}
    </div>
  );
};
