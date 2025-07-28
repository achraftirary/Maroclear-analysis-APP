# 🏦 Maroclear Analytics Dashboard

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan.svg)

Une application dashboard moderne et professionnelle pour **Maroclear**, le dépositaire central du Maroc, offrant des statistiques et analyses en temps réel du marché financier.

C'est un projet qui consiste à développer une application financière pour l'entreprise Maroclear.

## ✨ Fonctionnalités

### 📊 **Dashboard Principal**
- **Métriques KPI** en temps réel avec indicateurs de tendance
- **Graphiques interactifs** pour l'activité du marché
- **Monitoring système** avec barres de progression colorées
- **Top des valeurs** avec volumes et variations
- **Activité récente** avec détails des transactions

### 🎨 **Design Ultra-Moderne**
- **Interface épurée** avec palette de couleurs sophistiquée
- **Animations fluides** et transitions élégantes
- **Responsive design** pour tous les écrans
- **Effets glassmorphism** et ombres modernes
- **Typographie premium** avec Inter font

### ⚡ **Performance**
- **Next.js 15** avec Turbopack pour des compilations rapides
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour un styling optimal
- **API Routes** pour les données en temps réel

### 🔧 **Fonctionnalités Techniques**
- **Horloge en temps réel** dans l'en-tête
- **Système de notifications** avec badges animés
- **Actualisation automatique** des données
- **Export des données** (fonctionnalité future)
- **Navigation intuitive** avec états actifs

## 🚀 Installation

```bash
# Cloner le projet
git clone [repository-url]
cd MaroclearAnalysis

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Lancer en production
npm start
```

## 📁 Structure du Projet

```
src/
├── app/                   # App Router de Next.js
│   ├── api/               # Routes API
│   │   └── maroclear/     # Endpoints spécifiques
│   ├── globals.css        # Styles globaux modernes
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil (Dashboard)
├── data/                  # Données mock et constantes
├── lib/                   # Utilitaires et helpers
└── types/                 # Définitions TypeScript
```

## 🎯 Métriques Affichées

### 📈 **KPIs Principaux**
- **Volume de Trading** : €4.2B (+18.5%)
- **Transactions** : 24,847 (+12.3%)
- **Participants Actifs** : 2,156 (+8.7%)
- **Performance Système** : 99.98% (+0.02%)

### 💻 **État Système**
- **CPU Usage** : Monitoring en temps réel
- **Memory** : Utilisation mémoire
- **Network** : Statut réseau
- **Storage** : Espace de stockage

### 🏢 **Top Valeurs**
- **ATWA** (Attijariwafa Bank)
- **BCP** (Banque Populaire)
- **IAM** (Maroc Telecom)
- **BMCE** (BMCE Bank)
- **LHM** (LafargeHolcim)

## 🎨 Palette de Couleurs

```css
/* Couleurs principales */
--primary: #0ea5e9        /* Bleu principal */
--secondary: #64748b      /* Gris secondaire */
--accent: #8b5cf6         /* Violet accent */
--success: #10b981        /* Vert succès */
--warning: #f59e0b        /* Orange alerte */
--error: #ef4444          /* Rouge erreur */
```

## 📱 Responsive Design

- **Desktop** : Layout en grille complète
- **Tablet** : Adaptation des colonnes
- **Mobile** : Stack vertical optimisé
- **Navigation** : Menu hamburger sur petits écrans

## 🛠️ Technologies Utilisées

| Technologie | Version | Usage |
|------------|---------|-------|
| Next.js | 15.4.2 | Framework React |
| TypeScript | 5.0+ | Typage statique |
| Tailwind CSS | 3.0+ | Styling |
| Lucide React | Latest | Icônes |
| React | 18+ | Interface utilisateur |

## 🚀 Déploiement

```bash
# Build de production
npm run build

# Vérifier le build
npm run start

# Déployer sur Vercel (recommandé)
vercel deploy
```

## 📈 Performances

- **⚡ Fast Refresh** : Rechargement instantané en développement
- **🎯 Lazy Loading** : Chargement optimisé des composants
- **📦 Tree Shaking** : Bundle optimisé
- **🗜️ Compression** : Assets compressés automatiquement

## 🔐 Sécurité

- **TypeScript** : Prévention des erreurs de type
- **API Routes** : Endpoints sécurisés
- **CORS** : Configuration appropriée
- **Validation** : Données validées côté serveur

## 🎯 Dernières Améliorations (v1.1.0)

### ✅ Nouvelles Fonctionnalités Ajoutées
- **💼 Actifs sous Garde** : Section dédiée aux 2,768B MAD d'actifs gérés
- **📊 Top Gainers/Losers** : Analyse en temps réel des meilleures et pires performances
- **⚡ Règlement Quotidien** : Dashboard des opérations de clearing (58.3B MAD)
- **� Événements** : Calendrier des maintenances et notifications importantes
- **🔄 Données Dynamiques** : Intégration complète des mock data réalistes
- **🎨 Animations Avancées** : Effets visuels et transitions fluides

### 🛠️ Améliorations Techniques
- **Données Réelles** : Utilisation des vraies valeurs de la Bourse de Casablanca
- **Performance** : Mise à jour automatique toutes les 30 secondes
- **UI/UX** : Design encore plus professionnel et ergonomique
- **TypeScript** : Typage complet pour toutes les nouvelles fonctionnalités
- **Responsive** : Optimisation mobile et tablette

### 📈 Métriques en Temps Réel
- Volume quotidien dynamique (45-60B MAD)
- Indices MASI/MADEX avec variations en temps réel
- Données des 12 principales valeurs du marché
- Statistiques de règlement détaillées

## �📞 Support

Pour toute question ou suggestion :
- 📧 Email : [your-email]
- 💬 Issues : Utilisez GitHub Issues
- 📖 Documentation : Consultez ce README

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ pour Maroclear** | **Dashboard Analytics v1.1.0**
