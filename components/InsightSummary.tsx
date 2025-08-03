"use client"

import { useEffect, useState } from "react"

interface InsightSummaryProps {
  storageKey: string
  title: string
}

export function InsightSummary({ storageKey, title }: InsightSummaryProps) {
  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [typedText, setTypedText] = useState<string>("")

  useEffect(() => {
    const fetchSummary = async () => {
      const raw = localStorage.getItem(storageKey)
      console.log("rawwww", raw)
      if (!raw) return
      setLoading(true)
      try {
        const response = await fetch("/api/gemini-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            data: JSON.parse(raw),
          }),
        })
        const { insight } = await response.json()
        setSummary(insight)
      } catch (err) {
        console.error("Gemini insight fetch failed:", err)
        setSummary("No insight available.")
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [storageKey, title])

  useEffect(() => {
    if (!summary) return
    let i = 0
    setTypedText("")
    const interval = setInterval(() => {
      setTypedText((prev) => prev + summary.charAt(i))
      i++
      if (i >= summary.length) clearInterval(interval)
    }, 10)
    return () => clearInterval(interval)
  }, [summary])

  return (
    <div className="mt-4 p-5 bg-black/30 border border-cyan-500/30 rounded-xl text-[15px] text-gray-200 leading-relaxed font-grotesk">
      <p className="font-semibold text-cyan-400 mb-3 text-[16px]">AI Insight</p>
      {loading ? (
        <p className="italic text-gray-400 text-[15px]">Loading summary...</p>
      ) : (
        <p className="whitespace-pre-line">{typedText}</p>
      )}
    </div>
  )
}
