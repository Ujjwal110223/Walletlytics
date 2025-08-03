"use client"

import type React from "react"
import { useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { SummaryInterface } from "@/components/summary-interface"

export default function CryptoDashboard() {
  const [currentView, setCurrentView] = useState<"input" | "loading" | "summary">("input")
  const [walletAddress, setWalletAddress] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (walletAddress.trim()) {
      setCurrentView("loading")
    }
  }

  const handleLoadingComplete = () => {
    setCurrentView("summary")
  }

  const handleBackToInput = () => {
    setCurrentView("input")
    setWalletAddress("")
  }

  if (currentView === "loading") {
    return <LoadingScreen onComplete={handleLoadingComplete} walletAddress={walletAddress} />
  }

  if (currentView === "summary") {
    return <SummaryInterface onBack={handleBackToInput} />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-grotesk">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-20 animate-pulse blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-16 max-w-4xl animate-fadeIn">
          <h1 className="text-9xl font-bold mb-4 text-white drop-shadow-[0_0_10px_#3b82f6]">
            Walletlytics
          </h1>
          <p className="text-xl text-gray-300 font-light animate-fadeIn delay-200">
            Get your DeFi, NFT & Wallet Metrics with bitsCrunch and AI
          </p>
        </div>

        <div className="w-full max-w-2xl animate-riseUp delay-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                placeholder="Enter your wallet address (0x...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full h-16 px-6 text-lg bg-[#111111] border border-blue-500 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 backdrop-blur-sm focus:outline-none shadow-[0_0_10px_#3b82f6]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-16 text-lg font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-all duration-300 shadow-[0_0_15px_#3b82f6]"
            >
              Analyze Wallet
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
