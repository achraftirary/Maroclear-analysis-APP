import { NextResponse } from 'next/server'
import { generateMockMarketData } from '@/data/mock-data'

export async function GET() {
  try {
    const marketData = generateMockMarketData()
    
    return NextResponse.json({
      success: true,
      data: marketData,
      metadata: {
        total: marketData.length,
        lastUpdate: new Date().toISOString(),
        source: 'Maroclear Analytics System'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la récupération des données de marché',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}