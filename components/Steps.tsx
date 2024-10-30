"use client";

import { CheckCircle2, Circle, CircleDot } from "lucide-react";

interface StepsProps {
  currentStep: number;
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    "Enter Parameters",
    "Add Details",
    "Calculate Grade"
  ];

  return (
    <div className="flex justify-center items-center gap-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={step}
            className="flex items-center"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                {isCompleted ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : isActive ? (
                  <CircleDot className="h-6 w-6 text-primary" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <span
                className={`text-sm ${
                  isActive
                    ? "text-primary font-medium"
                    : isCompleted
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-px w-8 mx-2 ${
                  isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}