"use client"

import { useEffect, useState } from "react"
import { InsightSummary } from "@/components/InsightSummary"

type ScoreData = {
  [key: string]: number | string
  wallet_score: number
  classification: string
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-400"
  if (score >= 60) return "text-yellow-400"
  return "text-red-400"
}

export function WalletScoreCard() {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("bitscrunch_score_data")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.data?.[0]) {
          setScoreData(parsed.data[0])
        }
      } catch (err) {
        console.error("Error parsing walletScoreData:", err)
      }
    }
  }, [])

  if (!scoreData) {
    return <div className="text-center text-gray-400">No wallet score data found</div>
  }

  const walletScore = scoreData.wallet_score ?? 0
  const classification = scoreData.classification ?? "N/A"
  const radius = 56
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - walletScore / 100)

  const scoreEntries = Object.entries(scoreData).filter(
    ([key, value]) =>
      key !== "wallet_score" &&
      key !== "classification" &&
      typeof value === "number"
  )

  return (
    <div className="space-y-6">
      {/* Main Score Circle */}
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-700"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${offset}`}
              className="text-green-400"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{walletScore.toFixed(0)}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
          </div>
        </div>
        <div className={`${getScoreColor(walletScore)} font-semibold`}>{classification}</div>
      </div>

      {/* Other scores */}
      <div className="grid grid-cols-2 gap-4">
        {scoreEntries.map(([key, value]) => (
          <div
            key={key}
            className="p-4 bg-gradient-to-tr from-purple-700/20 to-cyan-600/10 border border-gray-700/50 rounded-lg shadow-md text-white"
          >
            <div className="text-sm text-gray-400 capitalize">{key.replace(/_/g, " ")}</div>
            <div className="text-xl font-bold">{Number(value).toFixed(1)}</div>
          </div>
        ))}
      </div>
      <InsightSummary storageKey="bitscrunch_score_data" title="Wallet score" />
    </div>
  )
}
