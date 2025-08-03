import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    const walletAddress = searchParams.get('walletAddress')
    
    if (!endpoint || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing endpoint or walletAddress parameter' },
        { status: 400 }
      )
    }

    const apiKey = process.env.BITSCRUNCH_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Construct the appropriate URL based on the endpoint
    let url: string
    switch (endpoint) {
      case 'defi':
        url = `https://api.unleashnfts.com/api/v2/wallet/balance/defi?address=${walletAddress}&blockchain=ethereum&time_range=all&offset=0&limit=10`
        break
      case 'nft':
        url = `https://api.unleashnfts.com/api/v2/wallet/balance/nft?wallet=${walletAddress}&blockchain=ethereum&time_range=all&offset=0&limit=10`
        break
      case 'token':
        url = `https://api.unleashnfts.com/api/v2/wallet/balance/token?address=${walletAddress}&blockchain=ethereum&time_range=all&offset=0&limit=30`
        break
      case 'label':
        url = `https://api.unleashnfts.com/api/v2/wallet/label?address=${walletAddress}&blockchain=ethereum&offset=0&limit=10`
        break
      case 'score':
        url = `https://api.unleashnfts.com/api/v2/wallet/score?wallet_address=${walletAddress}&time_range=all&offset=0&limit=10`
        break
      case 'metrics':
        url = `https://api.unleashnfts.com/api/v2/wallet/metrics?blockchain=ethereum&wallet=${walletAddress}&time_range=all&offset=0&limit=10`
        break
      default:
        return NextResponse.json(
          { error: 'Invalid endpoint' },
          { status: 400 }
        )
    }

    console.log(`Calling BitsCrunch API: ${endpoint}`, url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`BitsCrunch API error for ${endpoint}:`, response.status, errorText)
      return NextResponse.json(
        { error: `API request failed: ${response.status} - ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log(`BitsCrunch API success for ${endpoint}:`, data)
    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 