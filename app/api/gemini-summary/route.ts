// app/api/gemini-summary/route.ts
import { NextRequest, NextResponse } from "next/server"
import { callGemini } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  const { title, data } = await req.json()
  const prompt = `You're a crypto wallet analytics expert. Summarize the user's ${title} data in 2–3 sentences. Make it human-friendly and insightful.\n\nHere is the data:\n${JSON.stringify(data, null, 2)}`

  try {
    const responseText = await callGemini([
      { role: "user", content: prompt }
    ])

    return NextResponse.json({ insight: responseText })
  } catch (err: any) {
    console.error("Gemini summary error:", err.message)
    return NextResponse.json({ insight: "AI insight unavailable at the moment." })
  }
}
