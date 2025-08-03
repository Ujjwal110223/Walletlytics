"use client"

import { useEffect, useState } from "react"
import { InsightSummary } from "@/components/InsightSummary"


type NftItem = {
  token_id: string
  contract_address: string
  collection?: string
  image_url?: string
}

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

export function NftPortfolioCard() {
  const [nftData, setNftData] = useState<NftItem[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    const stored = localStorage.getItem("bitscrunch_nft_data")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.data?.length > 0) {
          setNftData(parsed.data.slice(0, 10))
        }
        if (parsed?.pagination?.total_items) {
          setTotalItems(parsed.pagination.total_items)
        }
      } catch (err) {
        console.error("Failed to parse nft data:", err)
      }
    }
  }, [])

  const truncateTokenId = (id: string) => (id.length > 4 ? id.slice(0, 4) + "..." : id)

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-lg border border-cyan-500/20 text-center">
        <span className="text-cyan-300 text-lg font-semibold block">Total NFTs Held</span>
        <div className="text-4xl font-extrabold text-white mt-2">{totalItems}</div>
      </div>

      <p className="text-white text-lg text-center mt-4 opacity-80">Your top 10 NFTs</p>

      {nftData.length === 0 ? (
        <p className="text-gray-400 text-center mt-4">No NFT data found</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {nftData.map((nft, index) => {
            const glowClass = glowColors[index % glowColors.length]
            return (
              <div
                key={index}
                className={`p-4 rounded-lg bg-gradient-to-br ${glowClass} border shadow-lg flex items-center gap-4`}
              >
                {/* <img
                  src={nft.image_url || `https://via.placeholder.com/48?text=${truncateTokenId(nft.token_id)}`}
                  alt={`Token ${nft.token_id}`}
                  className="w-12 h-12 object-cover rounded-md border border-white/20"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/48?text=NFT"
                  }}
                /> */}
                <div className="text-sm text-white leading-snug">
                  <div className="font-semibold">
                    <span className="text-gray-400">Token ID:</span>{" "}
                    {truncateTokenId(nft.token_id)}
                  </div>
                  <div className="truncate text-xs">
                    <span className="text-gray-400">Contract:</span>{" "}
                    {nft.contract_address.slice(0, 10)}...
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <InsightSummary storageKey="bitscrunch_nft_data" title="NFT holdings" />

    </div>
  )
}
