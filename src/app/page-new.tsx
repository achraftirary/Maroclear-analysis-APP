'use client'

import React, { useState, useEffect } from 'react'
import {
  BarChart3,
  TrendingUp,
  Activity,
  Building2,
  RefreshCw,
  Filter,
  FileText,
  Download,
  Search,
  Bell,
  Calendar,
  Database,
  Settings
} from 'lucide-react'
import { generateMockMarketData, generateMockSecurities, generateDashboardMetrics } from '@/data/mock-data'

export default function MaroclearDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dashboardMetrics, setDashboardMetrics] = useState(generateDashboardMetrics())
  const [marketData, setMarketData] = useState(generateMockMarketData())
  const [securities, setSecurities] = useState(generateMockSecurities())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Mise à jour des données toutes les 30 secondes
    const dataTimer = setInterval(() => {
      setDashboardMetrics(generateDashboardMetrics())
      setSecurities(generateMockSecurities())
    }, 30000)
    return () => clearInterval(dataTimer)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setDashboardMetrics(generateDashboardMetrics())
    setMarketData(generateMockMarketData())
    setSecurities(generateMockSecurities())
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const mainMetrics = [
    {
      title: 'VOLUME DÉNOUÉ',
      value: '47.523,61 MADM',
      change: '+5.2%',
      trend: 'up',
      icon: BarChart3,
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Compensation et règlement-livraison'
    },
    {
      title: 'TITRES ÉCHANGÉS',
      value: '2.650.843',
      change: '+8.3%',
      trend: 'up',
      icon: Activity,
      gradient: 'from-emerald-500 to-teal-600',
      description: 'Volume de titres traités'
    },
    {
      title: 'MASI',
      value: '11.994,627',
      change: '+0.51%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-violet-600',
      description: 'Indice MASI'
    },
    {
      title: 'MADEX',
      value: '9.698,089',
      change: '0.36%',
      trend: 'down',
      icon: Building2,
      gradient: 'from-red-500 to-pink-600',
      description: 'Indice MADEX'
    }
  ]

  const topSecuritiesData = securities.mostActive.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header professionnel style Maroclear */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et titre */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Maroclear</h1>
                <p className="text-sm text-gray-600">Analytics</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                <BarChart3 className="w-4 h-4" />
                <span>Tableau de Bord</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Analyses</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
                <Activity className="w-4 h-4" />
                <span>Marchés</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
                <Database className="w-4 h-4" />
                <span>Activité</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
                <Settings className="w-4 h-4" />
                <span>Paramètres</span>
              </button>
            </nav>

            {/* Actions utilisateur */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Rechercher des titres, indices..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-600">Administrateur</p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sous-header avec date et actions */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <Calendar className="w-4 h-4" />
                <span>mercredi 23 juillet 2025</span>
                <span className="mx-2">•</span>
                <span>Dernière mise à jour : {currentTime.toLocaleTimeString('fr-FR')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Titre de section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Dépositaire Central - Activité Quotidienne
          </h3>
          <p className="text-gray-600">Dernière mise à jour : {currentTime.toLocaleTimeString('fr-FR')}</p>
        </div>

        {/* Métriques principales - Style cards comme Maroclear */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.gradient} text-white`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                  metric.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                }`}>
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Analyse du Marché */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h4 className="text-lg font-bold text-gray-900">Analyse du Marché</h4>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Volume des Transactions */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h5 className="font-semibold text-gray-900">Volume des Transactions</h5>
                <span className="text-xs text-gray-500">1.6M</span>
              </div>
              <div className="h-64 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-4 flex items-end justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Graphique de volume</p>
                </div>
              </div>
            </div>

            {/* Valeur du Marché */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h5 className="font-semibold text-gray-900">Valeur du Marché</h5>
                <span className="text-xs text-gray-500">60.0M</span>
              </div>
              <div className="h-64 bg-gradient-to-b from-green-50 to-green-100 rounded-lg p-4 flex items-end justify-center">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Évolution du marché</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Securities les plus actives */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-6">Titres les Plus Actifs</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Titre</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Prix</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Variation</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Volume</th>
                </tr>
              </thead>
              <tbody>
                {topSecuritiesData.map((security, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{security.symbol}</p>
                        <p className="text-sm text-gray-500">{security.name}</p>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 font-medium">{security.price.toFixed(2)} MAD</td>
                    <td className={`text-right py-3 px-4 font-medium ${
                      security.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {security.change >= 0 ? '+' : ''}{security.change.toFixed(2)}%
                    </td>
                    <td className="text-right py-3 px-4 text-gray-600">
                      {(security.volume / 1000).toFixed(0)}K
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
