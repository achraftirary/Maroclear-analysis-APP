'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  Users, 
  Building2, 
  Bell, 
  Download, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Eye,
  Menu,
  Search,
  Settings,
  Wifi,
  Database,
  Server,
  Globe,
  Clock,
  Target,
  Sparkles,
  RefreshCw
} from 'lucide-react'

export default function MaroclearDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeView, setActiveView] = useState('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const metrics = [
    {
      title: 'Volume Total',
      value: '€2.47B',
      change: '+15.2%',
      trend: 'up',
      icon: BarChart3,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      description: 'Transactions aujourd\'hui'
    },
    {
      title: 'Transactions',
      value: '18,247',
      change: '+8.7%',
      trend: 'up',
      icon: Activity,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      description: 'Opérations exécutées'
    },
    {
      title: 'Participants',
      value: '1,856',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      description: 'Utilisateurs actifs'
    },
    {
      title: 'Performance',
      value: '99.97%',
      change: '+0.03%',
      trend: 'up',
      icon: Zap,
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100',
      description: 'Disponibilité système'
    }
  ]

  const systemStatus = [
    { name: 'CPU Usage', value: 42, status: 'optimal', icon: Activity, color: 'emerald' },
    { name: 'Memory', value: 67, status: 'good', icon: Database, color: 'blue' },
    { name: 'Network', value: 23, status: 'optimal', icon: Wifi, color: 'emerald' },
    { name: 'Storage', value: 78, status: 'warning', icon: Server, color: 'amber' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-emerald-600 bg-emerald-100 border-emerald-200'
      case 'good': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'warning': return 'text-amber-600 bg-amber-100 border-amber-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'from-emerald-400 to-emerald-600'
      case 'good': return 'from-blue-400 to-blue-600'
      case 'warning': return 'from-amber-400 to-amber-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const recentActivities = [
    { 
      action: 'Transaction importante exécutée', 
      time: '2 min', 
      status: 'success',
      amount: '€12.5M'
    },
    { 
      action: 'Sauvegarde système terminée', 
      time: '15 min', 
      status: 'info',
      amount: null
    },
    { 
      action: 'Nouveau participant inscrit', 
      time: '1h', 
      status: 'success',
      amount: null
    },
    { 
      action: 'Maintenance programmée', 
      time: '2h', 
      status: 'warning',
      amount: null
    }
  ]

  const quickActions = [
    { name: 'Générer Rapport', icon: BarChart3, color: 'blue' },
    { name: 'Santé Système', icon: Shield, color: 'emerald' },
    { name: 'Gestion Utilisateurs', icon: Users, color: 'purple' },
    { name: 'Paramètres', icon: Settings, color: 'gray' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Maroclear Analytics
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Système opérationnel • {currentTime.toLocaleTimeString('fr-FR')}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {['overview', 'analytics', 'reports'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === view
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleRefresh}
                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              
              <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              
              <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center space-x-2 shadow-md">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Vue d'ensemble</h2>
          <p className="text-gray-600">Données de marché et surveillance système en temps réel</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div 
              key={metric.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-gray-600 font-medium">{metric.title}</p>
                <p className="text-sm text-gray-500">{metric.description}</p>
              </div>
              
              <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${metric.gradient} transition-all duration-1000`}
                  style={{ width: `${Math.random() * 30 + 70}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Activité du Marché</h3>
                <p className="text-gray-600">Tendances de volume en temps réel</p>
              </div>
              <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="h-80 flex items-end justify-between space-x-3">
              {[42, 65, 38, 78, 55, 89, 62, 45, 71, 58, 83, 49].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                    style={{ height: `${height * 3.5}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 font-medium">{8 + index}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">État Système</h3>
                <p className="text-gray-600">Surveillance en temps réel</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 text-sm font-medium">Opérationnel</span>
              </div>
            </div>

            <div className="space-y-4">
              {systemStatus.map((item) => (
                <div key={item.name} className="bg-gray-50 rounded-xl p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 font-bold">{item.value}%</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(item.status)} transition-all duration-1000`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Activité Récente</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'warning' ? 'bg-amber-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm">{activity.action}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>Il y a {activity.time}</span>
                      {activity.amount && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-emerald-600">{activity.amount}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Actions Rapides</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <button 
                  key={action.name}
                  className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-all group hover:shadow-md"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${
                    action.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    action.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                    action.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-gray-500 to-gray-600'
                  } rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-900 text-sm font-medium">{action.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
