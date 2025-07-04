import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const { taskTitle, taskDescription } = await request.json();

    if (!taskTitle) {
      return NextResponse.json(
        { error: "Task title is required" },
        { status: 400 }
      );
    }

    const prompt = `Given this task: "${taskTitle}"${
      taskDescription ? ` with description: "${taskDescription}"` : ""
    }

Please suggest 3-5 specific, actionable subtasks that would help complete this task. 
Each subtask should be a concrete action that can be done.

Format your response as a JSON array of strings, like this:
["Subtask 1", "Subtask 2", "Subtask 3", "Subtask 4"]

Example for "Plan birthday party":
["Book venue", "Send invitations", "Order cake", "Plan decorations", "Prepare playlist"]

Only return the JSON array, nothing else.`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    let response;
    try {
      response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        throw new Error(
          "Request timeout - Gemini API took too long to respond"
        );
      }
      throw new Error(
        `Network error: ${
          fetchError instanceof Error ? fetchError.message : "Unknown error"
        }`
      );
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      console.error("Response status:", response.status);
      console.error(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (response.status === 400) {
        throw new Error(
          "Invalid request to Gemini API - check API key and request format"
        );
      } else if (response.status === 401) {
        throw new Error("Unauthorized - check your Gemini API key");
      } else if (response.status === 403) {
        throw new Error("Forbidden - API key may be invalid or quota exceeded");
      } else if (response.status === 404) {
        throw new Error("Gemini API endpoint not found - check API URL");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded - try again later");
      } else if (response.status >= 500) {
        throw new Error("Gemini API server error - try again later");
      } else {
        throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
      }
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content
    ) {
      console.error("Invalid Gemini API response structure:", data);
      throw new Error("Invalid response structure from Gemini API");
    }

    const generatedText = data.candidates[0].content.parts[0].text;

    if (!generatedText || typeof generatedText !== "string") {
      console.error("Invalid generated text from Gemini:", generatedText);
      throw new Error("No valid text generated from Gemini API");
    }

    let subtasks: string[];
    try {
      const jsonMatch = generatedText.match(/\[.*\]/s);
      if (jsonMatch) {
        subtasks = JSON.parse(jsonMatch[0]);
      } else {
        subtasks = generatedText
          .split("\n")
          .map((line: string) => line.replace(/^[-*•]\s*/, "").trim())
          .filter((line: string) => line.length > 0)
          .slice(0, 5);
      }
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      console.error("Raw response text:", generatedText);

      const taskLower = taskTitle.toLowerCase();

      if (
        taskLower.includes("plan") ||
        taskLower.includes("organize") ||
        taskLower.includes("prepare")
      ) {
        subtasks = [
          "Research and gather information",
          "Create a detailed plan",
          "Set up necessary resources",
          "Execute the main task",
          "Review and follow up",
        ];
      } else if (
        taskLower.includes("study") ||
        taskLower.includes("learn") ||
        taskLower.includes("research")
      ) {
        subtasks = [
          "Find relevant resources",
          "Create study schedule",
          "Take notes and summarize",
          "Practice and apply knowledge",
          "Review and test understanding",
        ];
      } else if (
        taskLower.includes("clean") ||
        taskLower.includes("organize") ||
        taskLower.includes("sort")
      ) {
        subtasks = [
          "Assess current state",
          "Create organization system",
          "Sort and categorize items",
          "Implement new structure",
          "Maintain organization",
        ];
      } else {
        subtasks = [
          "Break down the task into steps",
          "Gather necessary resources",
          "Create a timeline",
          "Execute the task",
          "Review and improve",
        ];
      }
    }

    return NextResponse.json({ subtasks });
  } catch (error) {
    console.error("Error in suggest-subtasks API:", error);
    return NextResponse.json(
      {
        error: "Failed to generate subtasks",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
