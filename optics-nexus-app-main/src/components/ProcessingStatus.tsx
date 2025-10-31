import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface ProcessingStatusProps {
  progress: number;
  status: string;
}

export const ProcessingStatus = ({ progress, status }: ProcessingStatusProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <p className="text-sm font-medium">{status}</p>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};
