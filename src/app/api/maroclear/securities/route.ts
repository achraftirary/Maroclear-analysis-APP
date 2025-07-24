import { NextResponse } from 'next/server'
import { generateMockSecurities } from '@/data/mock-data'

export async function GET() {
  try {
    const securities = generateMockSecurities()
    
    return NextResponse.json({
      success: true,
      data: securities,
      metadata: {
        lastUpdate: new Date().toISOString(),
        source: 'Bourse de Casablanca via Maroclear',
        indices: {
          masi: "Moroccan All Shares Index",
          madex: "Moroccan Most Active Shares Index"
        }
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la récupération des titres',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}