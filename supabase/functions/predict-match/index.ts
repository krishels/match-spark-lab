import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { homeTeam, awayTeam, homeStats, awayStats } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing match:", homeTeam, "vs", awayTeam);

    const systemPrompt = `You are an expert sports analyst specializing in football match predictions. 
Analyze the provided team statistics and generate accurate predictions with confidence scores.
Consider: recent form, key player stats, head-to-head history, tactical advantages, and injury reports.
Return your analysis in JSON format with the following structure:
{
  "prediction": "home" | "draw" | "away",
  "confidenceScore": number (0-100),
  "homeWinProbability": number (0-100),
  "drawProbability": number (0-100),
  "awayWinProbability": number (0-100),
  "keyFactors": string[],
  "analysis": {
    "homeTeam": {
      "attackProwess": number (0-10),
      "formStreak": number (0-10),
      "defensiveStrength": number (0-10)
    },
    "awayTeam": {
      "tacticalEdge": number (0-10),
      "midfieldControl": number (0-10),
      "formStreak": number (0-10)
    }
  }
}`;

    const userPrompt = `Analyze this match and provide prediction:
Home Team: ${homeTeam}
Away Team: ${awayTeam}

Home Team Stats:
${JSON.stringify(homeStats, null, 2)}

Away Team Stats:
${JSON.stringify(awayStats, null, 2)}

Provide detailed prediction with confidence score.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");
    
    const prediction = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify({ success: true, prediction }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in predict-match function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
