import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, rawTxBytesHex, sender, network } = body

    // Validate required fields
    if (!apiKey || !rawTxBytesHex || !sender || !network) {
      return NextResponse.json(
        { error: 'Missing required fields: apiKey, rawTxBytesHex, sender, network' },
        { status: 400 }
      )
    }

    console.log('Proxying Gas Station request...', {
      network,
      sender,
      txBytesLength: rawTxBytesHex.length,
    })

    // Forward request to Gas Station API
    const gasStationUrl = 'https://gas.movevm.tools/api/sponsor'

    const response = await fetch(gasStationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey,
        rawTxBytesHex,
        sender,
        network,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Gas Station API error:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      })

      return NextResponse.json(
        {
          error: responseData.error || responseData.message || 'Sponsorship failed',
          details: responseData,
        },
        { status: response.status }
      )
    }

    console.log('✅ Gas Station sponsorship successful')

    return NextResponse.json(responseData)
  } catch (error: any) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      {
        error: 'Internal proxy error',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
