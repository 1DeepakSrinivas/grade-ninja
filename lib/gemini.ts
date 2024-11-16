{/*
  import { GoogleGenerativeAI } from "@google/generative-ai";

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  interface GradeParameter {
    name: string;
    entries: number;
    weight: number;
    grades: any[];  // You can replace `any` with a specific type if you know the structure of `grades`
  }

  export async function extractGradeParameters(text: string) {
    try {
      console.log("Extracting grade parameters from text:", text); // Log received text
  
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
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
  
      const result = await model.generateContent(prompt);
      const responseText = result.response.text;
  
      if (!responseText) {
        console.error("No response from the Gemini model.");
        throw new Error("No response from the Gemini model.");
      }
  
      const parameters = JSON.parse(responseText);
      return parameters.map((p: any) => ({
        ...p,
        entries: Number(p.entries),
        weight: Number(p.weight),
        grades: []
      }));
    } catch (error) {
      console.error("Failed to extract grade parameters:", error);
      throw new Error("Failed to process syllabus");
    }
  }
  
*/}