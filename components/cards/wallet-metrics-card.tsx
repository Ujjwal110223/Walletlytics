"use client"

import { useEffect, useState } from "react"
import { InsightSummary } from "@/components/InsightSummary"

type WalletMetrics = {
  balance_eth: number
  balance_usd: number
  total_txn: number
  wallet_age: number
  wallet_active_days: number
}

export function WalletMetricsCard() {
  const [metrics, setMetrics] = useState<WalletMetrics | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("bitscrunch_metrics_data")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.data?.length > 0) {
          const data = parsed.data[0]
          setMetrics({
            balance_eth: data.balance_eth,
            balance_usd: data.balance_usd,
            total_txn: data.total_txn,
            wallet_age: data.wallet_age,
            wallet_active_days: data.wallet_active_days,
          })
        }
      } catch (e) {
        console.error("Failed to parse wallet metrics:", e)
      }
    }
  }, [])

  if (!metrics) {
    return <p className="text-center text-gray-400">No metrics data available</p>
  }

  return (
    <div className="space-y-6">
      {/* ETH Balance */}
      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20 text-center">
        <span className="text-purple-300 text-lg font-semibold block">ETH Balance</span>
        <div className="text-4xl font-extrabold text-white mt-2">{metrics.balance_eth.toFixed(2)} ETH</div>
      </div>

      {/* USD Balance */}
      <div className="p-6 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20 text-center">
        <span className="text-green-300 text-lg font-semibold block">USD Balance</span>
        <div className="text-4xl font-extrabold text-white mt-2">${metrics.balance_usd.toLocaleString()}</div>
      </div>

      {/* Other Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-lg border border-cyan-500/20">
          <span className="text-cyan-400 text-sm">Total Transactions</span>
          <div className="text-2xl font-bold text-white mt-1">{metrics.total_txn}</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
          <span className="text-blue-400 text-sm">Wallet Age (days)</span>
          <div className="text-2xl font-bold text-white mt-1">{metrics.wallet_age}</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg border border-orange-500/20">
          <span className="text-orange-400 text-sm">Active Days</span>
          <div className="text-2xl font-bold text-white mt-1">{metrics.wallet_active_days}</div>
        </div>
      </div>
      <InsightSummary storageKey="bitscrunch_metrics_data" title="Wallet metrics" />
    </div>
  )
}
