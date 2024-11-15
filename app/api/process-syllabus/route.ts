//import { NextResponse } from "next/server";
//import { extractGradeParameters } from "../../../lib/gemini";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const text = await file.text(); // Read the file content as text
    console.log("File content:", text); // Log the content for debugging

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
