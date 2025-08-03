"use client"

import { useEffect, useState } from "react"
import { InsightSummary } from "@/components/InsightSummary"

const glowColors = [
  "from-pink-500/20 to-red-500/10 border-pink-500/30",
  "from-green-500/20 to-emerald-500/10 border-green-500/30",
  "from-purple-500/20 to-indigo-500/10 border-purple-500/30",
  "from-yellow-500/20 to-amber-500/10 border-yellow-500/30",
  "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
  "from-red-500/20 to-rose-500/10 border-red-500/30",
  "from-orange-500/20 to-yellow-500/10 border-orange-500/30",
  "from-teal-500/20 to-cyan-500/10 border-teal-500/30",
  "from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/30",
  "from-lime-500/20 to-green-500/10 border-lime-500/30",
]

export function Erc20PortfolioCard() {
  const [erc20Data, setErc20Data] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    const stored = localStorage.getItem("bitscrunch_erc20_data")
    if (stored) {
      const parsed = JSON.parse(stored)
      setErc20Data(parsed.data.slice(0, 10)) // top 10
      setTotalItems(parsed.pagination.total_items || 0)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Total Token Holdings */}
      <div className="p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20 text-center">
        <span className="text-blue-300 text-lg font-semibold block">Total ERC-20 Tokens</span>
        <div className="text-4xl font-extrabold text-white mt-2">{totalItems}</div>
      </div>

      {/* Subheading */}
      <p className="text-white text-sm text-center mt-4 opacity-80">Your top 10 ERC-20 tokens</p>

      {/* Token Grid */}
      <div className="grid grid-cols-2 gap-4">
        {erc20Data.map((token, index) => {
          const glowClass = glowColors[index % glowColors.length]
          return (
            <div
              key={index}
              className={`p-4 bg-gradient-to-br ${glowClass} border rounded-lg shadow-md text-white`}
            >
              <div className="text-base font-semibold truncate">{token.token_name || "Unnamed"}</div>
              <div className="text-sm text-gray-400 truncate">{token.token_symbol}</div>
              <div className="text-md font-mono mt-2 break-all">
                {Number(token.quantity).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          )
        })}
      </div>
      <InsightSummary storageKey="bitscrunch_erc20_data" title="ERC-20 token holdings" />
    </div>
  )
}
