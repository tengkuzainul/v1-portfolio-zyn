import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    // Get filename from the URL query parameter
    const filename = request.nextUrl.searchParams.get("filename");

    // Basic validation and security checks
    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Only allow specific file types (PDF in this case)
    if (!filename.endsWith(".pdf")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // IMPORTANT: Whitelist approach - only allow specific filenames
    const allowedFiles = ["tengku_zainul_resume.pdf"];
    if (!allowedFiles.includes(filename)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Construct the file path - private location outside public directory
    const privatePath = path.join(process.cwd(), "private", "assets", filename);

    // Check if the file exists
    if (!fs.existsSync(privatePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Read file and serve it
    const fileBuffer = fs.readFileSync(privatePath);

    // Create a response with the file
    const response = new NextResponse(fileBuffer);

    // Set appropriate headers
    response.headers.set("Content-Type", "application/pdf");
    response.headers.set(
      "Content-Disposition",
      `attachment; filename=${filename}`
    );

    return response;
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
