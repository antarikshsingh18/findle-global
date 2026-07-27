import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are an AI search parser for Findle.global, a Canadian real estate platform. 
          Extract user intent into a valid JSON object with EXACTLY these keys:
          - "city": string or null (e.g., "Toronto")
          - "maxPrice": number or null (e.g., 900000 for 900k)
          - "bedrooms": number or null (e.g., 2)
          - "sellingStatus": array of strings or null (e.g., ["Selling"])
          - "developer": string or null
          If a field is not mentioned or implied, set it to null. Return ONLY the JSON object.`,
        },
        { role: "user", content: query },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content || "{}";
    console.log("Groq Raw Response:", content); // Check your terminal console for this!
    
    const parsedFilters = JSON.parse(content);
    return NextResponse.json({ filters: parsedFilters });
  } catch (error) {
    console.error("Error parsing search query:", error);
    return NextResponse.json({ error: "Failed to parse search query" }, { status: 500 });
  }
}