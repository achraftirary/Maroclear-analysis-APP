import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { DashboardMetrics, SecurityData, MarketData } from '@/types'

// Types pour les exports - adaptés aux types existants
export interface ExportData {
  metrics: DashboardMetrics
  securities: SecurityData[]
  marketData: MarketData[]
}

// Fonction utilitaire pour formatter la date/heure exacte
const getCurrentTimestamp = (): string => {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Africa/Casablanca',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  
  return new Intl.DateTimeFormat('fr-MA', options).format(now)
}

// Export PDF avec timestamp exact
export const exportToPDF = async (data: ExportData): Promise<void> => {
  console.log('📄 Génération PDF en cours...')
  
  try {
    const doc = new jsPDF()
    const timestamp = getCurrentTimestamp()
    
    // En-tête
    doc.setFontSize(20)
    doc.setTextColor(40, 40, 40)
    doc.text('Dashboard Maroclear - Statistiques', 20, 30)
    
    // Timestamp exact
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text(`Généré le: ${timestamp}`, 20, 45)
    
    // Ligne de séparation
    doc.setLineWidth(0.5)
    doc.line(20, 50, 190, 50)
    
    let yPosition = 65
    
    // Section Métriques
    doc.setFontSize(16)
    doc.setTextColor(40, 40, 40)
    doc.text('Métriques Générales', 20, yPosition)
    yPosition += 15
    
    doc.setFontSize(12)
    doc.text(`Volume Quotidien: ${data.metrics.dailyVolume.toLocaleString('fr-FR')}`, 25, yPosition)
    yPosition += 8
    doc.text(`Valeur Quotidienne: ${data.metrics.dailyValue.toLocaleString('fr-FR')} MAD`, 25, yPosition)
    yPosition += 8
    doc.text(`Transactions: ${data.metrics.dailyTransactions.toLocaleString('fr-FR')}`, 25, yPosition)
    yPosition += 8
    doc.text(`MASI: ${data.metrics.masi.toFixed(2)} (${data.metrics.masiChange >= 0 ? '+' : ''}${data.metrics.masiChange.toFixed(2)}%)`, 25, yPosition)
    yPosition += 8
    doc.text(`MADEX: ${data.metrics.madex.toFixed(2)} (${data.metrics.madexChange >= 0 ? '+' : ''}${data.metrics.madexChange.toFixed(2)}%)`, 25, yPosition)
    yPosition += 20
    
    // Section Top Securities
    doc.setFontSize(16)
    doc.text('Top Securities', 20, yPosition)
    yPosition += 15
    
    data.securities.slice(0, 10).forEach((security, index) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }
      
      doc.setFontSize(10)
      const changeColor = security.changePercent >= 0 ? [0, 150, 0] : [200, 0, 0]
      doc.setTextColor(40, 40, 40)
      doc.text(`${index + 1}. ${security.symbol} - ${security.name}`, 25, yPosition)
      yPosition += 6
      doc.text(`   Volume: ${security.volume.toLocaleString('fr-FR')} | Prix: ${security.price.toFixed(2)} MAD`, 25, yPosition)
      doc.setTextColor(changeColor[0], changeColor[1], changeColor[2])
      doc.text(`   Variation: ${security.changePercent >= 0 ? '+' : ''}${security.changePercent.toFixed(2)}%`, 25, yPosition + 6)
      yPosition += 18
    })
    
    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(`Page ${i}/${pageCount} - Maroclear Analytics Dashboard`, 20, 285)
      doc.text(`Exporté le ${timestamp}`, 140, 285)
    }
    
    // Nom du fichier avec timestamp
    const fileName = `Maroclear_Dashboard_${timestamp.replace(/[\/\s:]/g, '_')}.pdf`
    doc.save(fileName)
    
    console.log('✅ PDF généré avec succès:', fileName)
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération PDF:', error)
    throw new Error('Erreur lors de la génération du PDF')
  }
}

// Export Excel avec timestamp exact
export const exportToExcel = async (data: ExportData): Promise<void> => {
  console.log('📊 Génération Excel en cours...')
  
  try {
    const timestamp = getCurrentTimestamp()
    const workbook = XLSX.utils.book_new()
    
    // Feuille 1: Métriques générales
    const metricsData = [
      ['Métrique', 'Valeur', 'Unité'],
      ['Volume Quotidien', data.metrics.dailyVolume, 'Titres'],
      ['Valeur Quotidienne', data.metrics.dailyValue, 'MAD'],
      ['Transactions', data.metrics.dailyTransactions, 'Nombre'],
      ['MASI', data.metrics.masi, 'Points'],
      ['MADEX', data.metrics.madex, 'Points'],
      ['Variation MASI', data.metrics.masiChange, '%'],
      ['Variation MADEX', data.metrics.madexChange, '%'],
      [],
      ['Rapport généré le:', timestamp, '']
    ]
    
    const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData)
    XLSX.utils.book_append_sheet(workbook, metricsSheet, 'Métriques')
    
    // Feuille 2: Securities
    const securitiesData = [
      ['Symbole', 'Nom', 'Volume', 'Prix (MAD)', 'Variation (%)', 'Cap. Marché', 'Secteur'],
      ...data.securities.map(s => [s.symbol, s.name, s.volume, s.price, s.changePercent, s.marketCap, s.sector])
    ]
    
    const securitiesSheet = XLSX.utils.aoa_to_sheet(securitiesData)
    XLSX.utils.book_append_sheet(workbook, securitiesSheet, 'Securities')
    
    // Feuille 3: Données de marché
    const marketDataFormatted = [
      ['Date', 'Volume', 'Valeur (MAD)', 'Transactions', 'MASI', 'MADEX'],
      ...data.marketData.map(m => [m.date, m.volume, m.value, m.transactions, m.masi, m.madex])
    ]
    
    const marketSheet = XLSX.utils.aoa_to_sheet(marketDataFormatted)
    XLSX.utils.book_append_sheet(workbook, marketSheet, 'Données Marché')
    
    // Génération du fichier
    const fileName = `Maroclear_Data_${timestamp.replace(/[\/\s:]/g, '_')}.xlsx`
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    
    saveAs(blob, fileName)
    
    console.log('✅ Excel généré avec succès:', fileName)
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération Excel:', error)
    throw new Error('Erreur lors de la génération du fichier Excel')
  }
}
