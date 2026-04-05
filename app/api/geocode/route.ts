import { NextRequest, NextResponse } from 'next/server'

interface GeocodeRequest {
  address?: string
  eircode?: string
}

interface GeocodeResponse {
  lat: number
  lng: number
  formattedAddress: string
}

export async function POST(request: NextRequest) {
  try {
    const body: GeocodeRequest = await request.json()
    const { address, eircode } = body

    if (!address && !eircode) {
      return NextResponse.json(
        { error: 'Either address or eircode must be provided' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      )
    }

    const query = address || eircode || ''
    const searchQuery = eircode ? `${eircode}, Ireland` : address

    const url = new URL('https://maps.googleapis.com/maps/api/geocode/json')
    url.searchParams.append('address', searchQuery)
    url.searchParams.append('key', apiKey)

    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      )
    }

    const firstResult = data.results[0]
    const { lat, lng } = firstResult.geometry.location
    const formattedAddress = firstResult.formatted_address

    return NextResponse.json({
      lat,
      lng,
      formattedAddress,
    } as GeocodeResponse)
  } catch (error) {
    console.error('[Geocode API Error]', error)
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    )
  }
}
