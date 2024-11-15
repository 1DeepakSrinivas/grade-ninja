{/* "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { Parameter } from "./GradeCalculator";

interface SyllabusUploadProps {
  onUpload: (parameters: Parameter[]) => void;
}

export function SyllabusUpload({ onUpload }: SyllabusUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/process-syllabus", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process syllabus");
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      onUpload(data.parameters);
    } catch (error) {
      console.error("Error processing syllabus:", error);
      setError("Failed to process syllabus. Please try again or enter parameters manually.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold">Have a syllabus?</h2>
        <p className="text-sm text-muted-foreground">
          Upload your course syllabus and we&apos;ll automatically extract the grade parameters
        </p>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => document.getElementById("syllabus-upload")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isLoading ? "Processing..." : "Upload Syllabus"}
          </Button>
          <input
            id="syllabus-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>
    </Card>
  );
}
  */}
