"use client"

import { useEffect, useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ArrowUpRight, TrendingUp } from "lucide-react"


export function DefiPortfolioCard() {
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bitscrunch_defi_data")
      if (!stored || JSON.parse(stored)?.data === "no_data_found") {
        setNoData(true)
      }
    } catch (err) {
      setNoData(true)
    }
  }, [])

  if (noData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400 text-lg">
        No data found
      </div>
    )
  }

  // Mock/fallback data
  const defiData = [
    { protocol: "Uniswap", value: 15420, apy: 12.5 },
    { protocol: "Aave", value: 8930, apy: 8.2 },
    { protocol: "Compound", value: 5670, apy: 6.8 },
    { protocol: "Curve", value: 3240, apy: 15.3 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-sm">Total Value</span>
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">$33,260</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center justify-between">
            <span className="text-purple-400 text-sm">Avg APY</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-1">10.7%</div>
        </div>
      </div>
      <ChartContainer config={{}} className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={defiData}>
            <XAxis dataKey="protocol" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
