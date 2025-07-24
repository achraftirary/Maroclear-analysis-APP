import { NextResponse } from 'next/server'
import { generateDashboardMetrics, realMaroclearData } from '@/data/mock-data'

export async function GET() {
  try {
    const metrics = generateDashboardMetrics()
    
    return NextResponse.json({
      success: true,
      data: {
        realTime: metrics,
        aggregated: {
          ...realMaroclearData.assetsUnderCustody,
          ...realMaroclearData.dailySettlement
        }
      },
      metadata: {
        lastUpdate: new Date().toISOString(),
        source: 'Maroclear Analytics System',
        currency: 'MAD'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la récupération des métriques',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}