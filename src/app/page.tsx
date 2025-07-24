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
  Settings,
  Menu,
  X,
  Home,
  PieChart,
  Users,
  Shield,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  ChevronUp,
  ChevronDown,
  DollarSign,
  Briefcase,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { generateMockMarketData, generateMockSecurities, generateDashboardMetrics } from '@/data/mock-data'

export default function MaroclearDashboard() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeView, setActiveView] = useState('dashboard')
  const [dashboardMetrics, setDashboardMetrics] = useState<any>(null)
  const [marketData, setMarketData] = useState<any>(null)
  const [securities, setSecurities] = useState<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    // Initialize all data on client-side to avoid hydration mismatch
    setCurrentTime(new Date())
    setDashboardMetrics(generateDashboardMetrics())
    setMarketData(generateMockMarketData())
    setSecurities(generateMockSecurities())
    
    // Generate static chart data to avoid hydration mismatch
    setChartData({
      metricCharts: Array.from({ length: 4 }, () => 
        Array.from({ length: 12 }, () => Math.random() * 100)
      )
    })
    
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
      description: 'Compensation et règlement-livraison',
      target: 60000,
      current: 47523.61
    },
    {
      title: 'TITRES ÉCHANGÉS',
      value: '2.650.843',
      change: '+8.3%',
      trend: 'up',
      icon: Activity,
      gradient: 'from-emerald-500 to-teal-600',
      description: 'Volume de titres traités',
      target: 3000000,
      current: 2650843
    },
    {
      title: 'MASI',
      value: '11.994,627',
      change: '+0.51%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-violet-600',
      description: 'Indice MASI',
      target: 12500,
      current: 11994.627
    },
    {
      title: 'MADEX',
      value: '9.698,089',
      change: '0.36%',
      trend: 'down',
      icon: Building2,
      gradient: 'from-red-500 to-pink-600',
      description: 'Indice MADEX',
      target: 10000,
      current: 9698.089
    }
  ]

  const sidebarNavigation = [
    {
      name: 'Tableau de Bord',
      id: 'dashboard',
      icon: Home,
      current: activeView === 'dashboard',
      badge: null
    },
    {
      name: 'Analyses',
      id: 'analytics',
      icon: BarChart3,
      current: activeView === 'analytics',
      badge: '12'
    },
    {
      name: 'Marchés',
      id: 'markets',
      icon: TrendingUp,
      current: activeView === 'markets',
      badge: null
    },
    {
      name: 'Portefeuille',
      id: 'portfolio',
      icon: Briefcase,
      current: activeView === 'portfolio',
      badge: '3'
    },
    {
      name: 'Règlements',
      id: 'settlements',
      icon: Shield,
      current: activeView === 'settlements',
      badge: null
    },
    {
      name: 'Utilisateurs',
      id: 'users',
      icon: Users,
      current: activeView === 'users',
      badge: null
    }
  ]

  const quickStats = [
    {
      label: 'Participants Actifs',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Opérations/Jour',
      value: '18,592',
      change: '+8.7%',
      trend: 'up',
      icon: Activity,
      color: 'green'
    },
    {
      label: 'Disponibilité',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      label: 'Latence Moy.',
      value: '12ms',
      change: '-2.1ms',
      trend: 'up',
      icon: Clock,
      color: 'purple'
    }
  ]

  const recentAlerts = [
    {
      id: 1,
      type: 'success',
      title: 'Règlement Batch Complété',
      message: 'Traitement de 15,847 opérations terminé avec succès',
      time: '2 min',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'info',
      title: 'Maintenance Programmée',
      message: 'Mise à jour système prévue le 25 juillet à 2h00',
      time: '1h',
      icon: AlertCircle
    },
    {
      id: 3,
      type: 'warning',
      title: 'Volume Élevé Détecté',
      message: 'Pic de trafic sur les valeurs bancaires',
      time: '3h',
      icon: TrendingUp
    }
  ]

  // Show loading state if data is not ready
  if (!currentTime || !dashboardMetrics || !marketData || !securities || !chartData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="text-xl font-semibold text-gray-900 mb-2">Maroclear Analytics Pro</div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="text-gray-600 mt-2">Chargement...</div>
        </div>
      </div>
    )
  }

  const topSecuritiesData = securities.mostActive.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex-shrink-0`}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">Maroclear</h1>
                <p className="text-xs text-gray-500">Analytics Pro</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  item.current
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`flex-shrink-0 w-5 h-5 ${item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                {sidebarOpen && (
                  <>
                    <span className="ml-3">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Quick Stats in Sidebar */}
        {sidebarOpen && (
          <div className="mt-8 px-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Statistiques Rapides</h3>
            <div className="space-y-3">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-1 rounded-md bg-${stat.color}-100`}>
                      <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                    </div>
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings at Bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className={`w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 ${!sidebarOpen && 'justify-center'}`}>
            <Settings className="flex-shrink-0 w-5 h-5 text-gray-400" />
            {sidebarOpen && <span className="ml-3">Paramètres</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Page Title & Breadcrumb */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>mercredi 23 juillet 2025</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Dernière mise à jour : {currentTime ? currentTime.toLocaleTimeString('fr-FR') : '--:--:--'}</span>
                  </div>
                </div>
              </div>

              {/* Top Actions */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Rechercher des titres, indices..."
                    className="pl-10 pr-4 py-2.5 w-80 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleRefresh}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Actualiser</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                    <Filter className="w-4 h-4" />
                    <span>Filtres</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-sm">
                    <FileText className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-sm">
                    <Download className="w-4 h-4" />
                    <span>Excel</span>
                  </button>
                </div>

                {/* Notifications & Profile */}
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <button className="p-2.5 text-gray-600 hover:text-blue-600 relative bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <Bell className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-600">Administrateur</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Dépositaire Central - Activité Quotidienne
                    </h3>
                    <p className="text-gray-600 flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Dernière mise à jour : {currentTime ? currentTime.toLocaleTimeString('fr-FR') : '--:--:--'}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">Système Opérationnel</span>
                      </div>
                    </div>
                    <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {mainMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group overflow-hidden relative">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${metric.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <metric.icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center space-x-1">
                        {metric.trend === 'up' ? (
                          <ChevronUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-bold ${
                          metric.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                        } px-3 py-1 rounded-full`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
                      <p className="text-xs text-gray-500">{metric.description}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progression</span>
                        <span>{((metric.current / metric.target) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${metric.gradient} transition-all duration-1000`}
                          style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Mini Chart Placeholder */}
                    <div className="flex items-end space-x-1 h-8">
                      {chartData && chartData.metricCharts[index] ? chartData.metricCharts[index].map((height: number, i: number) => (
                        <div 
                          key={i} 
                          className={`bg-gradient-to-t ${metric.gradient} opacity-30 rounded-sm flex-1 transition-all duration-300 hover:opacity-60`}
                          style={{ height: `${height}%` }}
                        ></div>
                      )) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Advanced Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Market Analysis - Enhanced */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h4 className="text-lg font-bold text-gray-900">Analyse du Marché</h4>
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">En temps réel</span>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Volume Chart */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <h5 className="font-semibold text-gray-900">Volume des Transactions</h5>
                        </div>
                        <p className="text-2xl font-bold text-blue-700">1.6M</p>
                        <p className="text-sm text-blue-600">+12.3% vs hier</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    
                    {/* Mini Chart */}
                    <div className="flex items-end space-x-1 h-16">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                        <div 
                          key={i} 
                          className="bg-blue-400 rounded-t-sm flex-1 transition-all duration-300 hover:bg-blue-500"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Market Value Chart */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <h5 className="font-semibold text-gray-900">Valeur du Marché</h5>
                        </div>
                        <p className="text-2xl font-bold text-green-700">60.0M</p>
                        <p className="text-sm text-green-600">+8.7% vs hier</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    
                    {/* Trend Line */}
                    <div className="flex items-end space-x-1 h-16">
                      {[30, 45, 40, 70, 65, 80, 75, 85, 82, 90, 88, 95].map((height, i) => (
                        <div 
                          key={i} 
                          className="bg-green-400 rounded-t-sm flex-1 transition-all duration-300 hover:bg-green-500"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="mt-6 grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">47.5B</p>
                    <p className="text-sm text-gray-600">Volume Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">2.65M</p>
                    <p className="text-sm text-gray-600">Titres Échangés</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">99.97%</p>
                    <p className="text-sm text-gray-600">Disponibilité</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">12ms</p>
                    <p className="text-sm text-gray-600">Latence Moy.</p>
                  </div>
                </div>
              </div>

              {/* Alerts & Notifications Panel */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-gray-900">Alertes Récentes</h4>
                  <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">3 nouvelles</span>
                </div>
                
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className={`p-2 rounded-lg ${
                        alert.type === 'success' ? 'bg-green-100 text-green-600' :
                        alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <alert.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                        <span className="text-xs text-gray-500 mt-1 block">Il y a {alert.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-xl transition-colors">
                  Voir toutes les alertes
                </button>
              </div>
            </div>

            {/* Enhanced Securities Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-lg font-bold text-gray-900">Titres les Plus Actifs</h4>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      Gainants
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      Perdants
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg">
                      Volume
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">Titre</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-900 text-sm">Prix</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-900 text-sm">Variation</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-900 text-sm">Volume</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900 text-sm">Tendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topSecuritiesData.map((security, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                              index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                              index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                              index === 2 ? 'bg-gradient-to-br from-orange-400 to-red-500' :
                              'bg-gradient-to-br from-blue-400 to-indigo-500'
                            }`}>
                              {security.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {security.symbol}
                              </p>
                              <p className="text-sm text-gray-500">{security.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-4 px-6">
                          <span className="font-semibold text-gray-900">{security.price.toFixed(2)} MAD</span>
                        </td>
                        <td className="text-right py-4 px-6">
                          <div className="flex items-center justify-end space-x-1">
                            {security.change >= 0 ? (
                              <ArrowUpRight className="w-4 h-4 text-green-600" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-600" />
                            )}
                            <span className={`font-semibold ${
                              security.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {security.change >= 0 ? '+' : ''}{security.change.toFixed(2)}%
                            </span>
                          </div>
                        </td>
                        <td className="text-right py-4 px-6">
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{(security.volume / 1000).toFixed(0)}K</p>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5 ml-auto mt-1">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min((security.volume / 100000) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-6">
                          <div className="flex justify-center">
                            <div className="flex space-x-0.5">
                              {[...Array(8)].map((_, i) => (
                                <div 
                                  key={i}
                                  className={`w-1 rounded-full transition-all duration-300 ${
                                    security.change >= 0 ? 'bg-green-400' : 'bg-red-400'
                                  }`}
                                  style={{ height: `${Math.random() * 20 + 8}px` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Affichage de 5 titres sur {securities.mostActive.length}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Voir tous les titres →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
