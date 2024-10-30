"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { Parameter } from "./GradeCalculator";

interface DetailsInputProps {
  parameters: Parameter[];
  onSubmit: (parameters: Parameter[]) => void;
}

export function DetailsInput({ parameters, onSubmit }: DetailsInputProps) {
  const [localParameters, setLocalParameters] = useState<Parameter[]>(parameters);
  const [error, setError] = useState<string>("");

  const handleChange = (index: number, field: keyof Parameter, value: any) => {
    const updated = [...localParameters];
    updated[index] = { ...updated[index], [field]: value };
    setLocalParameters(updated);
    setError("");
  };

  const validateParameters = () => {
    // Validate names
    if (localParameters.some((p) => !p.name.trim())) {
      setError("All categories must have names");
      return false;
    }

    // Check for duplicate names
    const names = localParameters.map((p) => p.name.trim().toLowerCase());
    if (new Set(names).size !== names.length) {
      setError("Category names must be unique");
      return false;
    }

    // Validate weights
    const totalWeight = localParameters.reduce((sum, param) => sum + param.weight, 0);
    if (totalWeight !== 100) {
      setError(`Total weight must equal 100% (current: ${totalWeight}%)`);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateParameters()) return;
    onSubmit(localParameters);
  };

  const isValid = localParameters.every(
    (p) => p.name && p.entries > 0 && p.weight > 0
  );

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Grade Categories</h2>
        <p className="text-sm text-muted-foreground">
          Enter details for each grade category. The total weight must equal 100%.
        </p>
      </div>

      {localParameters.map((parameter, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg bg-card">
          <div className="space-y-2">
            <Label htmlFor={`name-${index}`}>Category Name</Label>
            <Input
              id={`name-${index}`}
              value={parameter.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="e.g., Quizzes, Midterm, Final Exam"
              className="max-w-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`entries-${index}`}>Number of Entries</Label>
              <Input
                id={`entries-${index}`}
                type="number"
                min="1"
                value={parameter.entries}
                onChange={(e) => 
                  handleChange(index, "entries", parseInt(e.target.value) || 0)
                }
              />
              <p className="text-xs text-muted-foreground">
                How many {parameter.name.toLowerCase() || "items"} are there?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`weight-${index}`}>Weight (%)</Label>
              <Input
                id={`weight-${index}`}
                type="number"
                min="0"
                max="100"
                value={parameter.weight}
                onChange={(e) => 
                  handleChange(index, "weight", parseInt(e.target.value) || 0)
                }
              />
              <p className="text-xs text-muted-foreground">
                Percentage of final grade
              </p>
            </div>
          </div>
        </div>
      ))}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button 
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full sm:w-auto"
      >
        Continue
      </Button>
    </div>
  );
}
