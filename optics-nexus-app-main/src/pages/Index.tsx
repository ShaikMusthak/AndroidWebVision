import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { ImagePreview } from "@/components/ImagePreview";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const { toast } = useToast();

  const handleImageSelect = async (file: File) => {
    try {
      setIsProcessing(true);
      setProgress(0);
      setStatus("Loading image...");
      
      const imageUrl = URL.createObjectURL(file);
      setOriginalImage(imageUrl);
      setProcessedImage(null);

      setStatus("Loading AI model...");
      const imageElement = await loadImage(file);
      
      setStatus("Removing background...");
      const resultBlob = await removeBackground(imageElement, setProgress);
      
      const resultUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(resultUrl);
      
      toast({
        title: "Success!",
        description: "Background removed successfully",
      });
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setStatus("");
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "background-removed.png";
    link.click();
  };

  const handleReset = () => {
    if (originalImage) URL.revokeObjectURL(originalImage);
    if (processedImage) URL.revokeObjectURL(processedImage);
    setOriginalImage(null);
    setProcessedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Background Removal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
            Remove Backgrounds Instantly
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload any image and let our AI remove the background in seconds. 
            Works entirely in your browser - fast, secure, and free.
          </p>
        </header>

        {/* Main Content */}
        <main className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {!originalImage ? (
            <ImageUploader onImageSelect={handleImageSelect} disabled={isProcessing} />
          ) : isProcessing ? (
            <ProcessingStatus progress={progress} status={status} />
          ) : (
            <ImagePreview
              originalUrl={originalImage}
              processedUrl={processedImage}
              onReset={handleReset}
              onDownload={handleDownload}
            />
          )}
        </main>

        {/* Features */}
        <section className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Process images in seconds using WebGPU acceleration
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2">100% Private</h3>
            <p className="text-sm text-muted-foreground">
              All processing happens in your browser - no uploads
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">Works Everywhere</h3>
            <p className="text-sm text-muted-foreground">
              Desktop, mobile, Android - runs on any device
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
