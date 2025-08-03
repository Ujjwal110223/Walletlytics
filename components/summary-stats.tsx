"use client"

import { TrendingUp, BarChart3, ImageIcon, History,Coins } from "lucide-react"
import { useEffect, useState } from "react"
export function SummaryStats() {
  const [walletScore, setWalletScore] = useState<number | null>(null)
  const [totalNFTs, setTotalNFTs] = useState<number | null>(null)
  const [totalTxns, setTotalTxns] = useState<number | null>(null)
  const [totalERC20, setTotalERC20] = useState<number | null>(null)

  useEffect(() => {
    const walletScoreData = localStorage.getItem("bitscrunch_score_data")
    if (walletScoreData) {
      try {
        const parsed = JSON.parse(walletScoreData)
        if (parsed?.data?.[0]?.wallet_score != null) {
          setWalletScore(Math.round(parsed.data[0].wallet_score))
        }
      } catch (err) {
        console.error("Error parsing wallet score:", err)
      }
    }

    const nftData = localStorage.getItem("bitscrunch_nft_data")
    if (nftData) {
      try {
        const parsed = JSON.parse(nftData)
        if (parsed?.pagination?.total_items != null) {
          setTotalNFTs(parsed.pagination.total_items)
        }
      } catch (err) {
        console.error("Error parsing NFT data:", err)
      }
    }
    const erc20Data = localStorage.getItem("bitscrunch_erc20_data")
    if (erc20Data) {
      try {
        const parsed = JSON.parse(erc20Data)
        if (parsed?.pagination?.total_items != null) {
          setTotalERC20(parsed.pagination.total_items)
        }
      } catch (err) {
        console.error("Error parsing ERC20 data:", err)
      }
    }

    const metricsData = localStorage.getItem("bitscrunch_metrics_data")
    if (metricsData) {
      try {
        const parsed = JSON.parse(metricsData)
        if (parsed?.data?.[0]?.total_txn != null) {
          setTotalTxns(parsed.data[0].total_txn)
        }
      } catch (err) {
        console.error("Error parsing wallet metrics:", err)
      }
    }
  }, [])

  const stats = [
    {
      label: "Wallet Score",
      value: walletScore != null ? walletScore.toString() : "—",
      icon: BarChart3,
      color: "purple",
    },
    {
      label: "Total NFTs",
      value: totalNFTs != null ? totalNFTs.toString() : "—",
      icon: ImageIcon,
      color: "cyan",
    },
    {
      label: "Transactions",
      value: totalTxns != null ? totalTxns.toLocaleString() : "—",
      icon: History,
      color: "orange",
    },
    {
      label: "ERC-20 Tokens",
      value: totalERC20 != null ? totalERC20.toString() : "—",
      icon: Coins,
      color: "green",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className={`p-6 bg-gradient-to-r from-${stat.color}-500/10 to-${stat.color}-600/10 rounded-xl border border-${stat.color}-500/20`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-${stat.color}-400 text-sm`}>{stat.label}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
              <Icon className={`w-8 h-8 text-${stat.color}-400`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
