// frontend/src/app/api/students/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/students`);

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const students = await response.json();
    return NextResponse.json(students);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const studentData = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    const result = await response.json();

    if (!response.ok) {
      // Pass through backend validation errors
      return NextResponse.json(result, { status: response.status });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to add student" },
      { status: 500 }
    );
  }
}
