"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Wallet, Coins, ImageIcon, TrendingUp, BarChart3, History, AlertCircle } from "lucide-react"
import { callBitsCrunchApi, getBitsCrunchEndpoints } from "@/lib/api"

interface LoadingStep {
  id: string
  label: string
  icon: React.ElementType
  completed: boolean
  loading: boolean
  error?: string
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


interface LoadingScreenProps {
  onComplete: () => void
  walletAddress: string
}

export function LoadingScreen({ onComplete, walletAddress }: LoadingScreenProps) {
  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: "defi", label: "DeFi Portfolio", icon: TrendingUp, completed: false, loading: false },
    { id: "nft", label: "NFT Portfolio", icon: ImageIcon, completed: false, loading: false },
    { id: "erc20", label: "ERC20 Tokens", icon: Coins, completed: false, loading: false },
    { id: "score", label: "Wallet Score", icon: BarChart3, completed: false, loading: false },
    { id: "metrics", label: "Wallet Metrics", icon: Wallet, completed: false, loading: false },
    { id: "label", label: "Wallet Labels", icon: History, completed: false, loading: false },
  ])

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [allCompleted, setAllCompleted] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  // Get API endpoints configuration
  const apiEndpoints = getBitsCrunchEndpoints(walletAddress)

  const processNextStep = async () => {
    if (currentStepIndex >= steps.length) {
      setAllCompleted(true)
      return
    }

    const currentEndpoint = apiEndpoints[currentStepIndex]
    
    // Start loading current step
    setSteps((prev) => 
      prev.map((step, index) => 
        index === currentStepIndex 
          ? { ...step, loading: true, error: undefined } 
          : step
      )
    )

    try {
      const result = await callBitsCrunchApi(currentEndpoint.endpoint, walletAddress)
      
      if (result.success && result.data) {
        // Store data in localStorage
        localStorage.setItem(currentEndpoint.storageKey, JSON.stringify(result.data))
      }
      
      // Update step status
      setSteps((prev) =>
        prev.map((step, index) =>
          index === currentStepIndex
            ? { 
                ...step, 
                loading: false, 
                completed: result.success,
                error: result.success ? undefined : result.error
              }
            : step
        )
      )

      if (!result.success) {
        setHasErrors(true)
      }

      // Move to next step
      setCurrentStepIndex((prev) => prev + 1)
    } catch (error) {
      // Handle unexpected errors
      setSteps((prev) =>
        prev.map((step, index) =>
          index === currentStepIndex
            ? { 
                ...step, 
                loading: false, 
                completed: false,
                error: 'Unexpected error occurred'
              }
            : step
        )
      )
      setHasErrors(true)
      await sleep(2000);
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      processNextStep()
    } else {
      setAllCompleted(true)
    }
  }, [currentStepIndex])

  const completedSteps = steps.filter((s) => s.completed).length
  const totalSteps = steps.length

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Analyzing Your Wallet
          </h2>
          <p className="text-gray-400 text-lg">
            {hasErrors 
              ? "Some data couldn't be retrieved, but we'll show what we have..."
              : "Please wait while we gather your crypto data..."
            }
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Analyzing: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        </div>

        {/* Vertical Stepper */}
        <div className="space-y-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-700" />}

                {/* Step Card */}
                <div
                  className={`
                  relative flex items-center p-4 rounded-xl border transition-all duration-500
                  ${
                    step.completed
                      ? "bg-green-500/10 border-green-500/30 shadow-green-500/20 shadow-lg"
                      : step.loading
                        ? "bg-cyan-500/10 border-cyan-500/30 shadow-cyan-500/20 shadow-lg animate-pulse"
                        : step.error
                          ? "bg-red-500/10 border-red-500/30 shadow-red-500/20 shadow-lg"
                          : "bg-gray-900/50 border-gray-700/50"
                  }
                `}
                >
                  {/* Status Icon */}
                  <div
                    className={`
                    flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-all duration-500
                    ${
                      step.completed
                        ? "bg-green-500/20 border-2 border-green-500"
                        : step.loading
                          ? "bg-cyan-500/20 border-2 border-cyan-500"
                          : step.error
                            ? "bg-red-500/20 border-2 border-red-500"
                            : "bg-gray-700/50 border-2 border-gray-600"
                    }
                  `}
                  >
                    {step.completed ? (
                      <Check className="w-6 h-6 text-green-400" />
                    ) : step.loading ? (
                      <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                    ) : step.error ? (
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    ) : (
                      <Icon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h3
                      className={`
                      text-lg font-semibold transition-colors duration-500
                      ${step.completed ? "text-green-400" : step.loading ? "text-cyan-400" : step.error ? "text-red-400" : "text-gray-300"}
                    `}
                    >
                      {step.label}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {step.completed 
                        ? "Analysis complete" 
                        : step.loading 
                          ? "Analyzing data..." 
                          : step.error
                            ? step.error
                            : "Waiting..."
                      }
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  {step.loading && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* View Summary Button */}
        <div className="text-center">
          <div className="relative group">
            <div
              className={`
              absolute -inset-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-2xl blur opacity-40 transition-opacity duration-500
              ${allCompleted ? "opacity-60 animate-pulse" : "opacity-20"}
            `}
            />
            <Button
              onClick={onComplete}
              disabled={!allCompleted}
              size="lg"
              className={`
                relative w-full h-14 text-lg font-semibold rounded-xl transition-all duration-500 transform
                ${
                  allCompleted
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 hover:scale-105 shadow-2xl"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {allCompleted ? (
                <>
                  <BarChart3 className="w-6 h-6 mr-3" />
                  {hasErrors ? "View Available Data" : "View Summary"}
                </>
              ) : (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Processing...
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round((completedSteps / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
