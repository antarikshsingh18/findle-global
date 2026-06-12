

import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generic 5-parameter user input contract
interface PropertyValuationRequest {
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: PropertyValuationRequest = await request.json();
    const { city, propertyType, bedrooms, bathrooms, squareFootage } = body;

    // Rigid server-side confirmation checks for the 5 requested keys
    if (!city || !propertyType || !bedrooms || !bathrooms || !squareFootage) {
      return Response.json(
        { error: "Missing required core inputs: city, propertyType, bedrooms, bathrooms, squareFootage" },
        { status: 400 }
      );
    }

    const prompt = `You are an advanced Canadian real estate valuation AI specializing in Ontario residential properties.
Your goal is to estimate a property's current market value as accurately as possible using limited user input and market intelligence.

Property Information provided by user:
- City: ${city}, Ontario, Canada
- Property Type: ${propertyType}
- Square Footage: ${squareFootage} sq ft
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}

Your systemic instructions for calculation are:
1. Estimate a realistic market value range in CAD.
2. Calculate a most likely market value.
3. Estimate current price per square foot.
4. Adjust valuation based on current Ontario macro/micro trends, local supply/demand metrics, neighborhood desirability, transit accessibility, and nearby amenities.
5. Estimate monthly rental value.
6. Provide appreciation forecasts for 1 Year, 3 Years, and 5 Years.
7. Generate an Investment Score, Rental Demand Score, Family-Friendly Score, and Resale Potential Score (each out of 100).
8. Explain the top factors influencing the valuation.
9. State confidence level (Low, Medium, High).

OUTPUT REQUIREMENT: You must respond ONLY with the exact template layout below. Use actual computed data to replace the variables like $X, $Y, $Z, and X%. Do not wrap it in markdown code blocks, do not say "Here is your valuation", just print the text layout directly:

  Estimated Home Value

Value Range:
$X - $Y

Most Likely Value:
$Z

Price Per Sq Ft:
$X/sq.ft

  Rental Estimate
$X/month

  Future Appreciation
1 Year: X%
3 Years: X%
5 Years: X%

  Property Scores
Investment: X/100
Rental Demand: X/100
Family-Friendly: X/100
Resale Potential: X/100

  Key Drivers
* [First key market driver specific to ${city} and ${propertyType}]
* [Second driver regarding local transit, school layout or density infrastructure]
* [Third driver based on current interest rates and macro economic conditions]

Confidence Level: [High or Medium or Low]

Provide realistic estimates based on Ontario market conditions and comparable property characteristics.`;

    // Fire the calculation process using the free flash infrastructure
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const outputText = response.text;

    if (!outputText) {
      throw new Error("No response string returned from generation engine.");
    }

    // Direct return of the clean plain-text template report
    return new Response(outputText, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (err) {
    console.error("Valuation Pipeline Crash:", err);
    return Response.json(
      { error: "Valuation engine failed to compile formatting templates." },
      { status: 500 }
    );
  }
}