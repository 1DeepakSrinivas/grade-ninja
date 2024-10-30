import { NextResponse } from "next/server";
import { extractGradeParameters } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const text = await file.text();
    const parameters = await extractGradeParameters(text);

    return NextResponse.json({ parameters });
  } catch (error) {
    console.error("Error processing syllabus:", error);
    return NextResponse.json(
      { error: "Failed to process syllabus" },
      { status: 500 }
    );
  }
}