"use client"

import { useState } from "react"
import {
  User,
  MapPin,
  Star,
  Crown,
  Gem,
  Award,
  Calendar,
  TrendingUp,
  Settings,
  Share2,
  Camera,
  Edit3,
  Lock,
  CheckCircle,
} from "lucide-react"
import BottomNav from "../components/BottomNav1"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBadgeCategory, setSelectedBadgeCategory] = useState("all")

  // Enhanced user data with Web3 elements
  const user = {
    name: "Explorer Juan",
    username: "@juan_explorer",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=200&width=800",
    xp: 18500,
    level: 42,
    totalPoints: 12500,
    icpBalance: 25.8,
    completedPlaces: 15,
    collectedNFTs: 8,
    totalSpent: 45.2,
    memberSince: "March 2024",
    rank: "Gold Explorer",
    nextRank: "Platinum Explorer",
    followers: 1247,
    following: 892,
  }

  // Comprehensive badge collection with categories - SOULBOUND NFTs
  const allBadges = [
    // EARNED BADGES
    {
      id: 1,
      name: "Dagupan Pioneer",
      location: "Dagupan City",
      category: "city",
      description: "First to explore all major attractions in Dagupan City",
      icon: "🏆",
      rarity: "legendary",
      dateEarned: "2024-01-15",
      xpReward: 500,
      earned: true,
      soulbound: true,
      tokenId: "DGPN-001",
      requirements: "Visit 8+ major Dagupan attractions",
    },
    {
      id: 2,
      name: "Bolinao Lighthouse Keeper",
      location: "Bolinao",
      category: "landmark",
      description: "Completed the historic lighthouse exploration quest",
      icon: "🗼",
      rarity: "epic",
      dateEarned: "2024-02-03",
      xpReward: 350,
      earned: true,
      soulbound: true,
      tokenId: "BLNK-002",
      requirements: "Complete lighthouse quest and climb to the top",
    },
    {
      id: 3,
      name: "Hundred Islands Navigator",
      location: "Alaminos",
      category: "nature",
      description: "Visited 25+ islands in the Hundred Islands National Park",
      icon: "🏝️",
      rarity: "rare",
      dateEarned: "2024-02-20",
      xpReward: 400,
      earned: true,
      soulbound: true,
      tokenId: "HIND-003",
      requirements: "Visit 25+ islands in the national park",
    },
    {
      id: 4,
      name: "Pangasinan Heritage Guardian",
      location: "Pangasinan Province",
      category: "heritage",
      description: "Explored 10+ heritage sites across Pangasinan",
      icon: "🏛️",
      rarity: "epic",
      dateEarned: "2024-03-10",
      xpReward: 600,
      earned: true,
      soulbound: true,
      tokenId: "PNGH-004",
      requirements: "Visit 10+ official heritage sites",
    },
    {
      id: 5,
      name: "Manaoag Pilgrim",
      location: "Manaoag",
      category: "spiritual",
      description: "Completed the spiritual journey to Our Lady of Manaoag",
      icon: "⛪",
      rarity: "rare",
      dateEarned: "2024-03-25",
      xpReward: 300,
      earned: true,
      soulbound: true,
      tokenId: "MNPG-005",
      requirements: "Complete pilgrimage and attend blessing ceremony",
    },
    {
      id: 6,
      name: "Lingayen Gulf Explorer",
      location: "Lingayen",
      category: "nature",
      description: "Discovered hidden gems along the historic Lingayen Gulf",
      icon: "🌊",
      rarity: "uncommon",
      dateEarned: "2024-04-05",
      xpReward: 250,
      earned: true,
      soulbound: true,
      tokenId: "LNGE-006",
      requirements: "Explore 5+ hidden spots along the gulf",
    },
  ]

  const badgeCategories = [
    { id: "all", name: "All Badges", count: allBadges.length },
    { id: "earned", name: "Earned", count: allBadges.filter((b) => b.earned).length },
    { id: "locked", name: "Locked", count: allBadges.filter((b) => !b.earned).length },
  ]

  const getFilteredBadges = () => {
    let filtered = allBadges

    if (selectedBadgeCategory === "earned") {
      filtered = allBadges.filter((badge) => badge.earned)
    } else if (selectedBadgeCategory === "locked") {
      filtered = allBadges.filter((badge) => !badge.earned)
    } else if (selectedBadgeCategory !== "all") {
      filtered = allBadges.filter((badge) => badge.category === selectedBadgeCategory)
    }

    return filtered
  }

  const getRarityColor = (rarity) => {
    const colors = {
      legendary: "from-purple-500 to-pink-500",
      epic: "from-purple-400 to-blue-500",
      rare: "from-blue-400 to-cyan-500",
      uncommon: "from-green-400 to-teal-500",
      common: "from-gray-400 to-slate-500",
    }
    return colors[rarity] || colors.common
  }

  const calculateProgress = (xp) => {
    const nextLevel = (user.level + 1) * 500
    const currentLevelXP = user.level * 500
    return ((xp - currentLevelXP) / (nextLevel - currentLevelXP)) * 100
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "badges", label: "Badges", icon: Award },
    { id: "nfts", label: "NFTs", icon: Gem },
    { id: "activity", label: "Activity", icon: TrendingUp },
  ]

  const earnedBadges = allBadges.filter((badge) => badge.earned)
  const totalXpFromBadges = earnedBadges.reduce((sum, badge) => sum + badge.xpReward, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 pb-20">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 relative overflow-hidden">
          <img
            src={user.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Header Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="relative px-4 pb-6">
          <div className="flex flex-col items-center -mt-16">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white"
              />
              <button className="absolute bottom-2 right-2 bg-cyan-500 text-white p-2 rounded-full shadow-lg hover:bg-cyan-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center mt-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
                <button className="text-slate-600 hover:text-slate-800">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-600 mb-3">{user.username}</p>

              {/* Rank Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-300 px-4 py-2 rounded-full">
                <Crown className="w-4 h-4 text-yellow-600" />
                <span className="font-bold text-yellow-800">{user.rank}</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 mb-6">
              <div className="text-center">
                <div className="font-black text-xl text-slate-900">{user.followers.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-black text-xl text-slate-900">{user.following.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Following</div>
              </div>
              <div className="text-center">
                <div className="font-black text-xl text-slate-900">{user.completedPlaces}</div>
                <div className="text-sm text-slate-600">Places</div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="w-full max-w-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-700">Level {user.level}</span>
                <span className="text-sm text-slate-600">{user.xp.toLocaleString()} XP</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${calculateProgress(user.xp)}%` }}
                />
              </div>
              <div className="text-center text-xs text-slate-500 mt-1">
                {Math.round(calculateProgress(user.xp))}% to Level {user.level + 1}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-200 font-bold ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Badges Tab Content */}
      {activeTab === "badges" && (
        <div className="px-4 space-y-6">
          {/* Badge Stats */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-black text-slate-900 mb-4">Badge Collection</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">{earnedBadges.length}</div>
                <div className="text-sm text-slate-600">Badges Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">{allBadges.length - earnedBadges.length}</div>
                <div className="text-sm text-slate-600">Badges Locked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">{totalXpFromBadges.toLocaleString()}</div>
                <div className="text-sm text-slate-600">XP from Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {Math.round((earnedBadges.length / allBadges.length) * 100)}%
                </div>
                <div className="text-sm text-slate-600">Completion</div>
              </div>
            </div>
          </div>

          {/* Badge Categories */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-bold text-slate-900 mb-3">Filter by Category</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {badgeCategories.map((category) => (
                <button
                  key={category.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 font-medium ${
                    selectedBadgeCategory === category.id
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  onClick={() => setSelectedBadgeCategory(category.id)}
                >
                  {category.name}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedBadgeCategory === category.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getFilteredBadges().map((badge) => (
              <div
                key={badge.id}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
                  badge.earned ? "border-slate-200 hover:border-cyan-300" : "border-slate-100 opacity-75"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Badge Icon */}
                  <div
                    className={`relative text-4xl p-3 rounded-xl ${
                      badge.earned ? `bg-gradient-to-r ${getRarityColor(badge.rarity)}` : "bg-slate-200"
                    }`}
                  >
                    {badge.earned ? (
                      badge.icon
                    ) : (
                      <div className="text-slate-400">
                        <Lock className="w-8 h-8" />
                      </div>
                    )}
                    {badge.earned && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Badge Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-black ${badge.earned ? "text-slate-900" : "text-slate-500"}`}>
                        {badge.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                          badge.earned ? `bg-gradient-to-r ${getRarityColor(badge.rarity)}` : "bg-slate-400"
                        }`}
                      >
                        {badge.rarity.toUpperCase()}
                      </span>
                    </div>

                    <p className={`text-sm mb-3 ${badge.earned ? "text-slate-600" : "text-slate-400"}`}>
                      {badge.description}
                    </p>

                    {/* Location and Date */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {badge.location}
                      </span>
                      {badge.earned && (
                        <>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(badge.dateEarned).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />+{badge.xpReward} XP
                          </span>
                        </>
                      )}
                    </div>

                    {/* Progress for locked badges */}
                    {!badge.earned && badge.progress !== undefined && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Progress</span>
                          <span className="text-slate-600">
                            {badge.progress}/{badge.target}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                            style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Requirements */}
                    <div className="mb-3">
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        {badge.earned ? "Requirements Met:" : "Requirements:"}
                      </h4>
                      <p className="text-xs text-slate-600">{badge.requirements}</p>
                    </div>

                    {/* Soulbound NFT Info */}
                    {badge.earned && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm font-bold text-purple-800">Soulbound NFT</span>
                        </div>
                        <div className="space-y-1 text-xs text-purple-700">
                          <div>Token ID: {badge.tokenId}</div>
                          <div>Non-transferable • Permanently bound to your wallet</div>
                          <div>Proof of authentic experience completion</div>
                        </div>
                      </div>
                    )}

                    {/* Locked Badge Info */}
                    {!badge.earned && (
                      <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-bold text-slate-700">Unlock Requirements</span>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{badge.requirements}</p>
                        <div className="text-xs text-slate-500">Reward: +{badge.xpReward} XP + Exclusive Benefits</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overview Tab Content */}
      {activeTab === "overview" && (
        <div className="px-4 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-black text-slate-900">{earnedBadges.length}</div>
              <div className="text-sm text-slate-600">Badges Earned</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-3xl mb-2">📍</div>
              <div className="text-2xl font-black text-slate-900">{user.completedPlaces}</div>
              <div className="text-sm text-slate-600">Places Visited</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-black text-slate-900">{user.collectedNFTs}</div>
              <div className="text-sm text-slate-600">NFTs Collected</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-black text-slate-900">{totalXpFromBadges.toLocaleString()}</div>
              <div className="text-sm text-slate-600">XP from Badges</div>
            </div>
          </div>

          {/* Wallet & Balance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-cyan-100 to-teal-100 border border-cyan-300 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500 text-white p-3 rounded-xl">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900">ICP Wallet</h3>
                  <p className="text-sm text-slate-600">Blockchain Balance</p>
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-2">{user.icpBalance} ICP</div>
              <div className="text-sm text-slate-600">≈ ${(user.icpBalance * 12.5).toFixed(0)} USD</div>
            </div>

            <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-500 text-white p-3 rounded-xl">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900">Premium Points</h3>
                  <p className="text-sm text-slate-600">Loyalty Rewards</p>
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-2">{user.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Available for discounts</div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-500" />
                Recent Achievements
              </h2>
              <button
                onClick={() => setActiveTab("badges")}
                className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earnedBadges
                .slice(-4)
                .reverse()
                .map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className={`text-2xl p-2 rounded-lg bg-gradient-to-r ${getRarityColor(badge.rarity)}`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-sm">{badge.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <MapPin className="w-3 h-3" />
                        {badge.location}
                        <span className="text-purple-600">• Soulbound NFT</span>
                      </div>
                      <div className="text-xs text-slate-500">{new Date(badge.dateEarned).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              Progress Overview
            </h2>
            <div className="space-y-4">
              {/* Badge Collection Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">Badge Collection</span>
                  <span className="text-sm text-slate-600">
                    {earnedBadges.length} / {allBadges.length}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${(earnedBadges.length / allBadges.length) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {Math.round((earnedBadges.length / allBadges.length) * 100)}% Complete
                </div>
              </div>

              {/* Level Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">Level Progress</span>
                  <span className="text-sm text-slate-600">
                    Level {user.level} → {user.level + 1}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                    style={{ width: `${calculateProgress(user.xp)}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {Math.round(calculateProgress(user.xp))}% to next level
                </div>
              </div>

              {/* Rank Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">Rank Progress</span>
                  <span className="text-sm text-slate-600">
                    {user.rank} → {user.nextRank}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">75% to Platinum Explorer</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="bg-purple-500 text-white p-2 rounded-lg">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-sm">Earned Sagada Cave Explorer Badge</h3>
                  <p className="text-xs text-slate-600">Completed cave exploration quest</p>
                  <span className="text-xs text-slate-500">2 hours ago</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="bg-cyan-500 text-white p-2 rounded-lg">
                  <Gem className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-sm">Purchased Hundred Islands NFT</h3>
                  <p className="text-xs text-slate-600">Spent 15.5 ICP on premium collection</p>
                  <span className="text-xs text-slate-500">1 day ago</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-sm">Visited Bolinao Lighthouse</h3>
                  <p className="text-xs text-slate-600">Checked in and earned 150 XP</p>
                  <span className="text-xs text-slate-500">3 days ago</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="bg-amber-500 text-white p-2 rounded-lg">
                  <Star className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-sm">Earned 500 Premium Points</h3>
                  <p className="text-xs text-slate-600">Completed weekly exploration challenge</p>
                  <span className="text-xs text-slate-500">5 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Badges Preview */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                Featured Badges
              </h2>
              <button
                onClick={() => setActiveTab("badges")}
                className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              >
                View Collection
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {earnedBadges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className="text-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div
                    className={`text-3xl mb-2 p-2 rounded-lg bg-gradient-to-r ${getRarityColor(badge.rarity)} inline-block`}
                  >
                    {badge.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{badge.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-xs text-slate-600 mb-1">
                    <MapPin className="w-3 h-3" />
                    {badge.location}
                  </div>
                  <div className="text-xs text-purple-600 font-medium">Soulbound NFT</div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full mt-2 text-white bg-gradient-to-r ${getRarityColor(badge.rarity)}`}
                  >
                    {badge.rarity.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-gradient-to-r from-slate-100 to-cyan-100 border border-cyan-200 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Explorer Since {user.memberSince}</h3>
            <p className="text-slate-600 mb-4">Thank you for being part of our Web3 tourism community!</p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-slate-900">{user.totalSpent} ICP</div>
                <div className="text-slate-600">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900">{earnedBadges.length}</div>
                <div className="text-slate-600">Achievements</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900">{user.completedPlaces}</div>
                <div className="text-slate-600">Places Explored</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

export default Profile
