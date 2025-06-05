"use client"

import { useState } from "react"
import {
  ShoppingBag,
  Star,
  Gift,
  Award,
  Check,
  Coins,
  Wallet,
  Info,
  Heart,
  Eye,
  Crown,
  Gem,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import BottomNav from "../components/BottomNav1"

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [userPoints, setUserPoints] = useState(12500)
  const [icpBalance, setIcpBalance] = useState(25.8)

  const categories = [
    { id: "all", name: "All Items", icon: ShoppingBag },
    { id: "nft", name: "Premium NFTs", icon: Star },
    { id: "physical", name: "Luxury Items", icon: Gift },
    { id: "digital", name: "Exclusive Collectibles", icon: Award },
  ]

  const items = [
    {
      id: 1,
      name: "Hundred Islands Platinum Collection",
      category: "nft",
      basePrice: 15.5,
      minPrice: 3.2,
      maxPointsDiscount: 4000,
      rank: "gold",
      type: "nft",
      description: "Ultra-rare NFT collection featuring photorealistic Hundred Islands artwork.",
      image: "alaminos-plat.png",
      likes: 2340,
      views: 12050,
      edition: "1/50",
      benefits: [
        "10% discount on selected shops",
        "Exclusive VIP holder events",
        "10% resale royalties",
        "Private yacht access",
        "Concierge services",
        "Priority customer support",
        "DAO governance voting rights",
      ],
    },
    {
      id: 2,
      name: "Bolinao Lighthouse Masterpiece",
      category: "nft",
      basePrice: 8.7,
      minPrice: 1.8,
      maxPointsDiscount: 2500,
      rank: "silver",
      type: "nft",
      description: "Museum-quality digital masterpiece by renowned digital artist.",
      image: "/bolinao-capenft.png",
      likes: 1560,
      views: 8920,
      edition: "12/100",
      benefits: [
        "10% discount on selected shops",
        "Signed digital certificate",
        "Commercial usage rights",
        "Artist meet & greet",
        "Early access to new drops",
        "Exclusive holder events",
      ],
    },
    {
      id: 3,
      name: "Artisan Travel T-Shirt",
      category: "physical",
      basePrice: 2.3,
      minPrice: 0,
      maxPointsDiscount: 4000,
      rank: "bronze",
      type: "physical",
      description: "Hand-crafted premium cotton tee with blockchain authenticity.",
      image: "artisan.png",
      likes: 890,
      views: 4450,
      edition: "Limited Edition",
      benefits: [
        "3% discount on selected shops",
        "Blockchain authenticity certificate",
        "Premium packaging",
      ],
    },
    {
      id: 4,
      name: "Legendary Explorer Genesis Badge",
      category: "digital",
      basePrice: 12.8,
      minPrice: 2.5,
      maxPointsDiscount: 3000,
      rank: "gold",
      type: "nft",
      description: "Genesis collection digital badge with governance utility.",
      image: "legendary.jpg",
      likes: 3120,
      views: 15670,
      edition: "Genesis #47",
      benefits: [
        "10% discount on selected shops",
        "DAO governance rights",
        "Achievement tracking",
        "Priority access to drops",
        "Annual holder rewards",
        "Exclusive community access",
      ],
    },
    {
      id: 5,
      name: "Tropical Paradise Animated NFT",
      category: "digital",
      basePrice: 6.9,
      minPrice: 1.4,
      maxPointsDiscount: 2000,
      rank: "silver",
      type: "nft",
      description: "Premium animated collectible with dynamic effects.",
      image: "tropical.jpg",
      likes: 1780,
      views: 7230,
      edition: "25/200",
      benefits: [
        "5% discount on selected shops",
        "Seasonal updates",
        "Community voting rights",
        "Staking rewards",
        "Tier-specific discounts",
      ],
    },
    {
      id: 6,
      name: "Platinum Souvenir Pin Collection",
      category: "physical",
      basePrice: 1.8,
      minPrice: 0,
      maxPointsDiscount: 2000,
      rank: "bronze",
      type: "physical",
      description: "Handcrafted platinum-plated pins with NFC chips.",
      image: "platinum.jpg",
      likes: 670,
      views: 3340,
      edition: "Collector's Edition",
      benefits: ["3% discount on selected shops", "Platinum plating", "Luxury gift box", "Collector community access"],
    },
  ]

  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  const getRankColor = (rank) => {
    const colors = {
      bronze: "text-amber-700 bg-amber-100 border-amber-300",
      silver: "text-slate-700 bg-slate-100 border-slate-300",
      gold: "text-yellow-700 bg-yellow-100 border-yellow-300",
    }
    return colors[rank] || "text-slate-700 bg-slate-100 border-slate-300"
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case "gold":
        return <Crown className="w-3 h-3" />
      case "silver":
        return <Gem className="w-3 h-3" />
      case "bronze":
        return <Star className="w-3 h-3" />
      default:
        return <Star className="w-3 h-3" />
    }
  }

  const calculatePrice = (item, pointsToUse) => {
    const maxDiscount = Math.min(pointsToUse, item.maxPointsDiscount)
    const discountAmount = (maxDiscount / 2000) * item.basePrice
    const discountedPrice = Math.max(item.basePrice - discountAmount, item.minPrice)
    return {
      finalPrice: discountedPrice,
      pointsUsed: maxDiscount,
      savings: item.basePrice - discountedPrice,
    }
  }

  const CompactShopCard = ({ item }) => {
    const [pointsToUse, setPointsToUse] = useState(0)
    const [showDetails, setShowDetails] = useState(false)
    const calculation = calculatePrice(item, pointsToUse)
    const maxUsablePoints = Math.min(userPoints, item.maxPointsDiscount)

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl hover:border-cyan-300 transition-all duration-300 overflow-hidden">
        {/* Compact Image Header */}
        <div className="relative h-48 bg-gradient-to-br from-slate-100 to-cyan-50 overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <div
              className={`px-2 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm ${getRankColor(item.rank)}`}
            >
              <div className="flex items-center gap-1">
                {getRankIcon(item.rank)}
                {item.rank.toUpperCase()}
              </div>
            </div>
            {item.type === "nft" && (
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                NFT
              </div>
            )}
          </div>

          {/* Bottom Stats */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
              <div className="text-white/80">Edition</div>
              <div className="font-bold">{item.edition}</div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-lg">
                <Heart className="w-3 h-3 text-red-500" />
                <span className="text-xs font-bold">{(item.likes / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-lg">
                <Eye className="w-3 h-3 text-slate-500" />
                <span className="text-xs font-bold">{(item.views / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Content */}
        <div className="p-4">
          {/* Title & Price */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-2">{item.name}</h3>
            <p className="text-sm text-slate-600 mb-2 line-clamp-2">{item.description}</p>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-black text-slate-900">{item.basePrice} ICP</div>
                <div className="text-xs text-slate-500">≈ ${(item.basePrice * 12.5).toFixed(0)} USD</div>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              >
                Details
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div className="space-y-4 border-t border-slate-200 pt-4">
              {/* Benefits Preview */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase mb-2">Key Benefits</h4>
                <div className="space-y-1">
                  {item.benefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600">{benefit}</span>
                    </div>
                  ))}
                  {item.benefits.length > 3 && (
                    <div className="text-xs text-cyan-600 font-medium">+{item.benefits.length - 3} more benefits</div>
                  )}
                </div>
              </div>

              {/* NFT Notice */}
              {item.type === "nft" && (
                <div className="bg-cyan-50 border border-cyan-200 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-3 h-3 text-cyan-600" />
                    <span className="text-xs font-bold text-cyan-800">NFT Minimum</span>
                  </div>
                  <p className="text-xs text-cyan-700">Min {item.minPrice} ICP required for blockchain fees.</p>
                </div>
              )}

              {/* Points Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-800">Use Points</label>
                  <span className="text-xs text-slate-500">Max: {maxUsablePoints.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxUsablePoints}
                  value={pointsToUse}
                  onChange={(e) => setPointsToUse(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-cyan"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0</span>
                  <span className="font-bold text-cyan-600">{pointsToUse.toLocaleString()}</span>
                  <span>{maxUsablePoints.toLocaleString()}</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 p-3 rounded-lg">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Points:</span>
                    <span className="text-cyan-600 font-bold">-{calculation.pointsUsed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Savings:</span>
                    <span className="text-emerald-600 font-bold">-{calculation.savings.toFixed(3)} ICP</span>
                  </div>
                  <div className="border-t border-cyan-200 pt-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Final:</span>
                      <div className="text-right">
                        <div className="text-lg font-black text-cyan-600">{calculation.finalPrice.toFixed(3)} ICP</div>
                        <div className="text-xs text-slate-500">
                          ≈ ${(calculation.finalPrice * 12.5).toFixed(0)} USD
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Purchase Button */}
          <button
            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={icpBalance < calculation.finalPrice}
          >
            {icpBalance < calculation.finalPrice ? (
              <>
                <Wallet className="w-4 h-4" />
                Insufficient Balance
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                {showDetails ? `Buy ${calculation.finalPrice.toFixed(3)} ICP` : "Purchase"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 pb-20">
      {/* Compact Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Crown className="w-6 h-6 text-yellow-500" />
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Luxury Web3 Marketplace
              </h1>
              <Gem className="w-6 h-6 text-cyan-500" />
            </div>
            <p className="text-slate-600">Premium NFT collectibles and exclusive luxury souvenirs</p>
          </div>

          {/* Compact Balance */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-100 to-teal-100 border border-cyan-300 px-6 py-3 rounded-xl">
              <Wallet className="w-5 h-5 text-cyan-600" />
              <div>
                <div className="font-black text-slate-900">{icpBalance} ICP</div>
                <div className="text-xs text-slate-500">≈ ${(icpBalance * 12.5).toFixed(0)} USD</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 px-6 py-3 rounded-xl">
              <Coins className="w-5 h-5 text-amber-600" />
              <div>
                <div className="font-black text-slate-900">{userPoints.toLocaleString()}</div>
                <div className="text-xs text-slate-500">Premium Points</div>
              </div>
            </div>
          </div>

          {/* Compact Info */}
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-300 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-yellow-600" />
              <span className="font-bold text-yellow-800">Premium Discount System</span>
            </div>
            <p className="text-sm text-yellow-700">Use premium points for significant discounts on luxury items!</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-200 font-bold ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-cyan-300"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <IconComponent className="w-5 h-5" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <CompactShopCard key={item.id} item={item} />
          ))}
        </div>

        {/* Compact Features */}
        <div className="mt-12 bg-gradient-to-r from-slate-100 to-cyan-100 border border-cyan-200 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">Web3 Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-bold text-slate-900 mb-2">Blockchain Certified</h3>
              <p className="text-sm text-slate-600">Permanent ICP blockchain records</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-bold text-slate-900 mb-2">True Ownership</h3>
              <p className="text-sm text-slate-600">Full control and transferability</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">👑</div>
              <h3 className="font-bold text-slate-900 mb-2">VIP Access</h3>
              <p className="text-sm text-slate-600">Exclusive experiences and discounts</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Shop
