export interface MarketData {
  date: string
  volume: number
  value: number // Volume dénoué en MAD
  transactions: number
  masi: number
  madex: number
}

export interface SecurityData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  sector: string
  code?: string // Code Maroclear
}

export interface TransactionSummary {
  totalVolume: number
  totalValue: number
  totalTransactions: number
  averagePrice: number
  topGainers: SecurityData[]
  topLosers: SecurityData[]
  mostActive: SecurityData[]
}

export interface DashboardMetrics {
  dailyVolume: number // Volume de titres échangés
  dailyValue: number  // Volume dénoué en MAD
  dailyTransactions: number
  masi: number
  madex: number
  masiChange: number
  madexChange: number
}

// Nouvelles interfaces spécifiques à Maroclear
export interface MaroclearAssets {
  total: number
  actions: number
  bonds: number
  opcvm: number
  treasuryBonds: number
}

export interface SettlementData {
  total: number
  pensionLivree: number // Pension livrée
  greAGre: number       // Opérations de gré à gré
  bourse: number        // Opérations de bourse
}

export interface CorporateAction {
  date: string
  type: 'dividend' | 'coupon' | 'redemption' | 'split'
  security: string
  code: string
  description: string
  amount?: number
}
