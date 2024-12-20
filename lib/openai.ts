import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

interface GradeParameter {
  name: string;
  entries: number;
  weight: number;
}

export async function extractGradeParameters(text: string): Promise<GradeParameter[]> {
  try {
    console.log("Extracting grade parameters from text:", text); // Log received text

    const prompt = `
      Extract grade parameters from the following syllabus text. Return a JSON array of objects with the following structure:
      [
        {
          "name": "Category name (e.g., Assignments, Quizzes)",
          "entries": "Number of items in this category",
          "weight": "Percentage weight in final grade (0-100)"
        }
      ]
      
      Only include graded components that contribute to the final grade.
      Ensure weights sum to 100.
      
      Syllabus text:
      ${text}
    `;

    const { text: responseText } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    });

    if (!responseText) {
      console.error("No response from the OpenAI model.");
      throw new Error("No response from the OpenAI model.");
    }

    const parameters = JSON.parse(responseText);
    return parameters.map((p: any) => ({
      name: p.name,
      entries: Number(p.entries),
      weight: Number(p.weight),
    }));
  } catch (error) {
    console.error("Failed to extract grade parameters:", error);
    throw new Error("Failed to process syllabus");
  }
}

