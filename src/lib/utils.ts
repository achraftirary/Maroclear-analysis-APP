import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency: string = "MAD"): string {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-MA').format(value)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`
}

export function generateMockData() {
  const today = new Date()
  const data = []
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      volume: Math.floor(Math.random() * 1000000) + 500000,
      value: Math.floor(Math.random() * 50000000) + 10000000,
      transactions: Math.floor(Math.random() * 5000) + 1000,
      masi: 12000 + Math.random() * 1000 - 500,
      madex: 9500 + Math.random() * 800 - 400,
    })
  }
  
  return data
}
