"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RefreshCw } from 'lucide-react';
import type { Parameter } from "./GradeCalculator";

interface GradeOutputProps {
  parameters: Parameter[];
  onReset: () => void;
}

export function GradeOutput({ parameters, onReset }: GradeOutputProps) {
  const [grades, setGrades] = useState<Record<string, number[]>>(
    parameters.reduce(
      (acc, param) => ({
        ...acc,
        [param.name]: Array(param.entries).fill(0),
      }),
      {}
    )
  );

  const [letterGrades] = useState([
    { min: 90, grade: 'A' },
    { min: 80, grade: 'B' },
    { min: 70, grade: 'C' },
    { min: 60, grade: 'D' },
    { min: 0, grade: 'F' },
  ]);

  const calculateFinalGrade = useMemo(() => {
    let totalWeight = 0;
    let weightedSum = 0;

    parameters.forEach((param) => {
      const paramGrades = grades[param.name];
      const average = paramGrades.reduce((a, b) => a + b, 0) / paramGrades.length;
      weightedSum += (average * param.weight) / 100;
      totalWeight += param.weight;
    });

    return totalWeight === 100 ? weightedSum : 0;
  }, [parameters, grades]);

  const getLetterGrade = (score: number) => {
    const grade = letterGrades.find((g) => score >= g.min);
    return grade ? grade.grade : 'F';
  };

  const handleGradeChange = (category: string, index: number, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

    const newGrades = { ...grades };
    newGrades[category][index] = numValue;
    setGrades(newGrades);
  };

  const finalGrade = calculateFinalGrade;
  const letterGrade = getLetterGrade(finalGrade);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {parameters.map((param) => (
          <Card key={param.name} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-semibold text-lg">{param.name}</h3>
                <div className="text-right">
                  <div className="font-medium">Weight: {param.weight}%</div>
                  <div className="text-sm text-muted-foreground">
                    Average: {(
                      grades[param.name].reduce((a, b) => a + b, 0) / param.entries
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: param.entries }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`${param.name}-${index}`} className="text-sm">
                      {param.entries === 1 ? param.name : `${param.name} ${index + 1}`}
                    </Label>
                    <Input
                      id={`${param.name}-${index}`}
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={grades[param.name][index]}
                      onChange={(e) =>
                        handleGradeChange(param.name, index, e.target.value)
                      }
                      className="text-right"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Final Grade</h2>
          <div className="text-4xl font-bold">{finalGrade.toFixed(2)}%</div>
          <div className="text-3xl font-semibold">Letter Grade: {letterGrade}</div>
          <Button onClick={onReset} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
      </Card>
    </div>
  );
}

