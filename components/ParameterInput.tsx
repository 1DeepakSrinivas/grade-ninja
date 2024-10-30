"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ParameterInputProps {
  onSubmit: (count: number) => void;
}

export function ParameterInput({ onSubmit }: ParameterInputProps) {
  const [count, setCount] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count > 0) {
      onSubmit(count);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="parameter-count">
          How many grade categories do you have?
        </Label>
        <Input
          id="parameter-count"
          type="number"
          min="1"
          max="10"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 0)}
          className="max-w-xs"
        />
        <p className="text-sm text-muted-foreground">
          Enter the number of different grade components (e.g., Assignments, Quizzes, Exams)
        </p>
      </div>

      <Button type="submit" disabled={count < 1}>
        Continue
      </Button>
    </form>
  );
}