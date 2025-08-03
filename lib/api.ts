export interface ApiResponse {
  success: boolean
  data?: any
  error?: string
}

export const callBitsCrunchApi = async (endpoint: string, walletAddress: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`/api/bitscrunch?endpoint=${endpoint}&walletAddress=${walletAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data: data.data }
  } catch (error) {
    console.error('API call error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}

export const getBitsCrunchEndpoints = (walletAddress: string) => [
  {
    id: "defi",
    endpoint: "defi",
    storageKey: "bitscrunch_defi_data"
  },
  {
    id: "nft",
    endpoint: "nft",
    storageKey: "bitscrunch_nft_data"
  },
  {
    id: "erc20",
    endpoint: "token",
    storageKey: "bitscrunch_erc20_data"
  },
  {
    id: "label",
    endpoint: "label",
    storageKey: "bitscrunch_label_data"
  },
  {
    id: "score",
    endpoint: "score",
    storageKey: "bitscrunch_score_data"
  },
  {
    id: "metrics",
    endpoint: "metrics",
    storageKey: "bitscrunch_metrics_data"
  }
] 