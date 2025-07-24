import { MarketData, SecurityData, DashboardMetrics } from "@/types"

export const generateMockMarketData = (): MarketData[] => {
  const today = new Date()
  const data: MarketData[] = []
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      volume: Math.floor(Math.random() * 1000000) + 500000, // Volume de titres échangés
      value: Math.floor(Math.random() * 10000000000) + 45000000000, // Volume dénoué en MAD (45-55 milliards)
      transactions: Math.floor(Math.random() * 5000) + 1000,
      masi: 12000 + (Math.random() - 0.5) * 1000,
      madex: 9500 + (Math.random() - 0.5) * 800,
    })
  }
  
  return data
}

export const generateMockSecurities = (): {
  topGainers: SecurityData[]
  topLosers: SecurityData[]
  mostActive: SecurityData[]
} => {
  // Vraies valeurs de la Bourse de Casablanca gérées par Maroclear
  const securities = [
    { symbol: 'ATW', name: 'Attijariwafa Bank', sector: 'Banques', code: 'MA0000011884' },
    { symbol: 'BCP', name: 'Banque Centrale Populaire', sector: 'Banques', code: 'MA0000010944' },
    { symbol: 'IAM', name: 'Itissalat Al-Maghrib', sector: 'Télécommunications', code: 'MA0000011520' },
    { symbol: 'LHM', name: 'LafargeHolcim Maroc', sector: 'Matériaux de Construction', code: 'MA0000011595' },
    { symbol: 'BOA', name: 'Bank of Africa', sector: 'Banques', code: 'MA0000011413' },
    { symbol: 'CIH', name: 'Crédit Immobilier et Hôtelier', sector: 'Banques', code: 'MA0000011280' },
    { symbol: 'CDM', name: 'Crédit du Maroc', sector: 'Banques', code: 'MA0000011272' },
    { symbol: 'TQM', name: 'Taqa Morocco', sector: 'Services aux collectivités', code: 'MA0000011819' },
    { symbol: 'SNI', name: 'Société Nationale d\'Investissement', sector: 'Holdings', code: 'MA0000011751' },
    { symbol: 'MNG', name: 'Managem', sector: 'Mines', code: 'MA0000011604' },
    { symbol: 'ADI', name: 'Aradei Capital', sector: 'Immobilier', code: 'MA0000012413' },
    { symbol: 'RES', name: 'Résidences Dar Saada', sector: 'Immobilier', code: 'MA0000012157' },
  ]

  const generateSecurityData = (security: any): SecurityData => ({
    ...security,
    price: Math.random() * 1000 + 50,
    change: (Math.random() - 0.5) * 20,
    changePercent: (Math.random() - 0.5) * 10,
    volume: Math.floor(Math.random() * 100000) + 10000,
    marketCap: Math.floor(Math.random() * 100000000000) + 10000000000,
  })

  const allSecurities = securities.map(generateSecurityData)

  return {
    topGainers: [...allSecurities]
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 5),
    topLosers: [...allSecurities]
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 5),
    mostActive: [...allSecurities]
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 5),
  }
}

export const generateDashboardMetrics = (): DashboardMetrics => ({
  dailyVolume: Math.floor(Math.random() * 2000000) + 1000000, // Volume de titres
  dailyValue: Math.floor(Math.random() * 15000000000) + 45000000000, // Volume dénoué (45-60 milliards MAD)
  dailyTransactions: Math.floor(Math.random() * 10000) + 5000,
  masi: 12000 + (Math.random() - 0.5) * 500,
  madex: 9500 + (Math.random() - 0.5) * 400,
  masiChange: (Math.random() - 0.5) * 4,
  madexChange: (Math.random() - 0.5) * 4,
})

// Données réelles Maroclear pour contexte
export const realMaroclearData = {
  assetsUnderCustody: {
    total: 2768000000000, // 2 768 milliards MAD
    actions: 982000000000, // 982 milliards MAD  
    bonds: 970000000000,   // 970 milliards MAD
    opcvm: 815000000000,   // 815 milliards MAD
  },
  dailySettlement: {
    total: 58297000000,      // 58.3 milliards MAD
    pensionLivree: 38568000000, // 38.6 milliards MAD
    greAGre: 18526000000,    // 18.5 milliards MAD
    bourse: 1203000000,      // 1.2 milliards MAD
  }
}
