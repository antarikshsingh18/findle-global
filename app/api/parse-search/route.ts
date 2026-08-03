import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an AI search parser for Findle.global, a Canadian real estate platform.

Extract user intent into a valid JSON object with EXACTLY these keys:
- "title": string or null — the property/project NAME if the user seems to be searching for a specific listing by name (e.g. "Aura Lakeview", "The Well Condos"). Only set this if the query looks like a proper name, not a generic description.
- "city": string or null (e.g., "Toronto")
- "maxPrice": number or null (e.g., 900000 for 900k)
- "bedrooms": number or null (e.g., 2)
- "sellingStatus": array of strings or null (e.g., ["Selling"])
- "developer": string or null

Rules:
- If a field is not mentioned or implied, set it to null.
- Only ONE of "title" or the structured fields (city/maxPrice/bedrooms/developer) should usually be non-null at once — a query is either a name lookup OR a structured filter, rarely both.
- Return ONLY the JSON object, no preamble, no markdown fences.

Examples:

Query: "Aura Lakeview"
{"title": "Aura Lakeview", "city": null, "maxPrice": null, "bedrooms": null, "sellingStatus": null, "developer": null}

Query: "2-bed condo under 900k"
{"title": null, "city": null, "maxPrice": 900000, "bedrooms": 2, "sellingStatus": null, "developer": null}

Query: "properties in Brampton"
{"title": null, "city": "Brampton", "maxPrice": null, "bedrooms": null, "sellingStatus": null, "developer": null}

Query: "The Well Condos still selling"
{"title": "The Well Condos", "city": null, "maxPrice": null, "bedrooms": null, "sellingStatus": ["Selling"], "developer": null}

Query: "Mattamy homes under 1.2m"
{"title": null, "city": null, "maxPrice": 1200000, "bedrooms": null, "sellingStatus": null, "developer": "Mattamy"}`,
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