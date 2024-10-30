{/* import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function extractGradeParameters(text: string) {
  try {
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
    const response = await result.response;
    const text = response.text();
    
    try {
      const parameters = JSON.parse(text);
      return parameters.map((p: any) => ({
        ...p,
        entries: Number(p.entries),
        weight: Number(p.weight),
        grades: []
      }));
    } catch (e) {
      throw new Error("Failed to parse Gemini response");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
*/}