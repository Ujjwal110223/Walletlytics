"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, TrendingUp, ImageIcon, Coins, BarChart3, Wallet, History } from "lucide-react"

// Import card components
import { DefiPortfolioCard } from "./cards/defi-portfolio-card"
import { NftPortfolioCard } from "./cards/nft-portfolio-card"
import { Erc20PortfolioCard } from "./cards/erc20-portfolio-card"
import { WalletScoreCard } from "./cards/wallet-score-card"
import { WalletMetricsCard } from "./cards/wallet-metrics-card"
import { WalletLabelsCard } from "./cards/wallet-label"
import { SummaryStats } from "./summary-stats"

interface SummaryInterfaceProps {
  onBack: () => void
}

export function SummaryInterface({ onBack }: SummaryInterfaceProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showDashboard, setShowDashboard] = useState(false)

  const cards = [
    {
      id: "defi",
      title: "DeFi Portfolio",
      icon: TrendingUp,
      description: "Your decentralized finance positions",
      component: <DefiPortfolioCard />,
    },
    {
      id: "nft",
      title: "NFT Portfolio",
      icon: ImageIcon,
      description: "Your non-fungible token collection",
      component: <NftPortfolioCard />,
    },
    {
      id: "erc20",
      title: "ERC20 Portfolio",
      icon: Coins,
      description: "Your token holdings and balances",
      component: <Erc20PortfolioCard />,
    },
    {
      id: "history",
      title: "Wallet Label",
      icon: History,
      description: "Your wallet labels",
      component: <WalletLabelsCard />,
    },
    {
      id: "score",
      title: "Wallet Score",
      icon: BarChart3,
      description: "Your wallet's risk and activity analysis",
      component: <WalletScoreCard />,
    },
    {
      id: "metrics",
      title: "Wallet Metrics",
      icon: Wallet,
      description: "Key performance indicators",
      component: <WalletMetricsCard />,
    },
    
  ]

  const nextStep = () => {
    if (currentStep < cards.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowDashboard(true)
    }
  }

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Wallet Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Complete overview of your crypto portfolio</p>
          </div>

          {/* Summary Stats */}
          <SummaryStats />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {cards.map((card, index) => {
              const Icon = card.icon
              return (
                <Card
                  key={card.id}
                  className="bg-gray-900/50 border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Icon className="w-6 h-6 text-cyan-400" />
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>{card.component}</CardContent>
                </Card>
              )
            })}
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
          <Button
            onClick={() => {
              const keysToRemove = [
                "bitscrunch_defi_data",
                "bitscrunch_erc20_data",
                "bitscrunch_label_data",
                "bitscrunch_metrics_data",
                "bitscrunch_nft_data",
                "bitscrunch_score_data",
              ]
              keysToRemove.forEach((key) => localStorage.removeItem(key))
              onBack()
            }}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400 bg-transparent"
          >
            Analyze Another Wallet
          </Button>
        </div>
        </div>
      </div>
    )
  }

  const currentCard = cards[currentStep]
  const Icon = currentCard.icon

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                    : index < currentStep
                      ? "bg-green-400"
                      : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse" />
          <Card className="relative bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                  <Icon className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">{currentCard.title}</CardTitle>
              <CardDescription className="text-gray-400 text-lg">{currentCard.description}</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">{currentCard.component}</CardContent>
          </Card>
        </div>

        {/* Navigation */}
<div className="flex justify-between items-center mt-8">
  <div className="text-gray-400">
    Step {currentStep + 1} of {cards.length}
  </div>

  <div className="flex gap-4">
    {/* Back button (only visible if not on the first step) */}
    {currentStep > 0 && (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300" />
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          size="lg"
          className="relative bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 border-0 transition-all duration-300 transform hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
          Back
        </Button>
      </div>
    )}

    {/* Next / View Dashboard Button */}
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300" />
      <Button
        onClick={nextStep}
        size="lg"
        className="relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 border-0 transition-all duration-300 transform hover:scale-105"
      >
        {currentStep === cards.length - 1 ? "View Dashboard" : "Next"}
        <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}
