"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Steps } from "@/components/Steps";
import { ParameterInput } from "@/components/ParameterInput";
import { DetailsInput } from "@/components/DetailsInput";
import { GradeOutput } from "@/components/GradeOutput";
import { SyllabusUpload } from "@/components/SyllabusUpload";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export type Parameter = {
  name: string;
  entries: number;
  weight: number;
  grades: number[];
};

export function GradeCalculator() {
  const [step, setStep] = useState(1);
  const [parameters, setParameters] = useState<Parameter[]>([]);

  const handleParametersSubmit = (count: number) => {
    const newParameters = Array(count).fill(null).map(() => ({
      name: "",
      entries: 0,
      weight: 0,
      grades: [],
    }));
    setParameters(newParameters);
    setStep(2);
  };

  const handleDetailsSubmit = (updatedParameters: Parameter[]) => {
    setParameters(updatedParameters);
    setStep(3);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setStep(1);
    setParameters([]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">GradeNinja</h1>
        <p className="text-muted-foreground">
          Calculate your final grade by entering your course parameters and grades
        </p>
      </div>

      <Steps currentStep={step} />

      <Card className="p-6">
        <div className="space-y-6">
          {step > 1 && (
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-8"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          )}

          {step === 1 && (
            <ParameterInput onSubmit={handleParametersSubmit} />
          )}
          {step === 2 && (
            <DetailsInput 
              parameters={parameters}
              onSubmit={handleDetailsSubmit}
            />
          )}
          {step === 3 && (
            <GradeOutput 
              parameters={parameters}
              onReset={handleReset}
            />
          )}
        </div>
      </Card>
          
      <p> Coming Soon! WIP</p>
      {step === 1 && (
        <SyllabusUpload 
          onUpload={(extractedParameters) => {
            setParameters(extractedParameters);
            setStep(2);
          }}
        />
      )}
    </div>
  );
}