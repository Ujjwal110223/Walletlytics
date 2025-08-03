"use client"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import { InsightSummary } from "@/components/InsightSummary"

const glowColors = [
  "from-green-500/20 to-emerald-500/10 border-green-500/30",
  "from-purple-500/20 to-indigo-500/10 border-purple-500/30",
  "from-yellow-500/20 to-amber-500/10 border-yellow-500/30",
  "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
  "from-pink-500/20 to-red-500/10 border-pink-500/30",
  "from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/30",
]

export function WalletLabelsCard() {
  const [activeLabels, setActiveLabels] = useState<string[]>([])

  useEffect(() => {
    const raw = localStorage.getItem("bitscrunch_label_data")
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        const labelData = parsed?.data?.[0] || {}

        const filteredLabels = Object.entries(labelData)
          .filter(([key, value]) => typeof value === "boolean" && value === true)
          .map(([key]) => key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()))

        setActiveLabels(filteredLabels)
      } catch (err) {
        console.error("Failed to parse wallet label data:", err)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 rounded-lg border border-indigo-500/20 text-center">
        <span className="text-indigo-300 text-lg font-semibold block">Wallet Traits</span>
        <div className="text-4xl font-extrabold text-white mt-2">{activeLabels.length}</div>
      </div>

      {/* Subheading */}
      <p className="text-white text-sm text-center mt-4 opacity-80">
        Verified wallet traits (labels) detected
      </p>

      {/* Trait Cards */}
      <div className="grid grid-cols-2 gap-4">
        {activeLabels.map((label, index) => {
          const glowClass = glowColors[index % glowColors.length]
          return (
            <div
              key={index}
              className={`p-4 bg-gradient-to-br ${glowClass} border rounded-lg shadow text-white flex items-center gap-3`}
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          )
        })}
      </div>
      <InsightSummary storageKey="bitscrunch_label_data" title="Wallet traits" />
    </div>
  )
}


