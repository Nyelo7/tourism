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
      description:
        "Ultra-rare NFT collection featuring photorealistic Hundred Islands artwork with exclusive utility benefits.",
      image: "/placeholder.svg?height=400&width=400",
      likes: 2340,
      views: 12050,
      edition: "1/50",
      benefits: [
        "25% discount on private island tours",
        "Exclusive VIP holder events",
        "10% resale royalties",
        "Private yacht access",
        "Concierge services",
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
      description:
        "Museum-quality digital masterpiece of the historic Cape Bolinao Lighthouse by renowned digital artist.",
      image: "/placeholder.svg?height=400&width=400",
      likes: 1560,
      views: 8920,
      edition: "12/100",
      benefits: [
        "20% discount on lighthouse premium tours",
        "Signed digital certificate",
        "Full commercial usage rights",
        "Artist meet & greet",
      ],
    },
    {
      id: 3,
      name: "Artisan Travel Collection T-Shirt",
      category: "physical",
      basePrice: 2.3,
      minPrice: 0,
      maxPointsDiscount: 4000,
      rank: "bronze",
      type: "physical",
      description: "Hand-crafted premium cotton tee with blockchain-verified authenticity and limited production run.",
      image: "/placeholder.svg?height=400&width=400",
      likes: 890,
      views: 4450,
      edition: "Limited Edition",
      benefits: [
        "Blockchain authenticity certificate",
        "Premium packaging",
        "Lifetime warranty",
        "Member exclusive colorways",
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
      description: "Genesis collection digital badge proving elite exploration achievements with governance utility.",
      image: "/placeholder.svg?height=400&width=400",
      likes: 3120,
      views: 15670,
      edition: "Genesis #47",
      benefits: [
        "Profile verification with blue checkmark",
        "Exclusive DAO governance rights",
        "Achievement tracking system",
        "Priority access to new drops",
        "Annual holder rewards",
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
      description: "Premium animated collectible with dynamic weather effects and seasonal transformations.",
      image: "/placeholder.svg?height=400&width=400",
      likes: 1780,
      views: 7230,
      edition: "25/200",
      benefits: ["4K animated artwork", "Seasonal updates", "Community voting rights", "Staking rewards"],
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
      description: "Handcrafted platinum-plated enamel pins with NFC chips and luxury presentation box.",
      image: "/placeholder.svg?height=400&width=400",
      likes: 670,
      views: 3340,
      edition: "Collector's Edition",
      benefits: ["NFC verification technology", "Platinum plating", "Luxury gift box", "Collector community access"],
    },
  ]

  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  const getRankColor = (rank) => {
    const colors = {
      bronze: "text-amber-700 bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300",
      silver: "text-slate-700 bg-gradient-to-r from-slate-100 to-gray-100 border-slate-300",
      gold: "text-yellow-700 bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300",
    }
    return colors[rank] || "text-slate-700 bg-gradient-to-r from-slate-100 to-gray-100 border-slate-300"
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case "gold":
        return <Crown className="w-4 h-4" />
      case "silver":
        return <Gem className="w-4 h-4" />
      case "bronze":
        return <Star className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
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

  const ShopItemCard = ({ item }) => {
    const [pointsToUse, setPointsToUse] = useState(0)
    const [showFullBenefits, setShowFullBenefits] = useState(false)
    const calculation = calculatePrice(item, pointsToUse)
    const maxUsablePoints = Math.min(userPoints, item.maxPointsDiscount)

    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 hover:shadow-2xl hover:border-cyan-300 transition-all duration-500 overflow-hidden group">
        {/* Image Header */}
        <div className="relative h-80 bg-gradient-to-br from-slate-100 via-cyan-50 to-teal-100 overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div
              className={`px-3 py-2 rounded-xl text-sm font-bold border-2 backdrop-blur-md shadow-lg ${getRankColor(item.rank)}`}
            >
              <div className="flex items-center gap-2">
                {getRankIcon(item.rank)}
                {item.rank.toUpperCase()}
              </div>
            </div>

            {item.type === "nft" && (
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm">
                PREMIUM NFT
              </div>
            )}
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
              <div className="text-xs text-gray-300">Edition</div>
              <div className="text-sm font-bold">{item.edition}</div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-slate-700">{item.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                <Eye className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-bold text-slate-700">{item.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title and Description */}
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight">{item.name}</h3>
            <p className="text-slate-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Benefits Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Premium Benefits</h4>
              {item.benefits.length > 3 && (
                <button
                  onClick={() => setShowFullBenefits(!showFullBenefits)}
                  className="text-xs text-cyan-600 font-bold hover:text-cyan-700 transition-colors"
                >
                  {showFullBenefits ? "Show Less" : `+${item.benefits.length - 3} More`}
                </button>
              )}
            </div>

            <div className="space-y-2">
              {(showFullBenefits ? item.benefits : item.benefits.slice(0, 3)).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Section */}
          <div className="border-t border-slate-200 pt-6">
            {/* Base Price Display */}
            <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
              <span className="text-sm font-semibold text-slate-700">Base Price</span>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-900">{item.basePrice} ICP</div>
                <div className="text-xs text-slate-500">≈ ${(item.basePrice * 12.5).toFixed(2)} USD</div>
              </div>
            </div>

            {/* NFT Minimum Notice */}
            {item.type === "nft" && (
              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-semibold text-cyan-800">NFT Minimum Payment</span>
                </div>
                <p className="text-xs text-cyan-700">
                  Minimum {item.minPrice} ICP required for blockchain fees and creator royalties.
                </p>
              </div>
            )}

            {/* Points Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-slate-800">Use Reward Points</label>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  Max: {maxUsablePoints.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={maxUsablePoints}
                value={pointsToUse}
                onChange={(e) => setPointsToUse(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg appearance-none cursor-pointer slider-cyan mb-2"
              />

              <div className="flex justify-between text-xs text-slate-500">
                <span>0 pts</span>
                <span className="font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">
                  {pointsToUse.toLocaleString()} pts
                </span>
                <span>{maxUsablePoints.toLocaleString()} pts</span>
              </div>
            </div>

            {/* Price Calculation */}
            <div className="bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 border-2 border-cyan-200 p-5 rounded-xl mb-6 shadow-inner">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700 font-medium">Points Applied:</span>
                  <span className="text-cyan-600 font-bold">-{calculation.pointsUsed.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700 font-medium">ICP Discount:</span>
                  <span className="text-emerald-600 font-bold">-{calculation.savings.toFixed(3)} ICP</span>
                </div>
                <div className="border-t-2 border-cyan-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-bold text-lg">Final Price:</span>
                    <div className="text-right">
                      <div className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text">
                        {calculation.finalPrice.toFixed(3)} ICP
                      </div>
                      <div className="text-xs text-slate-500">≈ ${(calculation.finalPrice * 12.5).toFixed(2)} USD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Button */}
            <button
              className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 hover:from-cyan-600 hover:via-teal-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] group"
              disabled={icpBalance < calculation.finalPrice}
            >
              {icpBalance < calculation.finalPrice ? (
                <>
                  <Wallet className="w-5 h-5" />
                  Insufficient ICP Balance
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5" />
                  Purchase for {calculation.finalPrice.toFixed(3)} ICP
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-cyan-50 to-teal-50 shadow-xl border-b-2 border-cyan-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-yellow-500" />
              <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                Luxury Web3 Marketplace
              </h1>
              <Gem className="w-8 h-8 text-cyan-500" />
            </div>
            <p className="text-slate-600 text-xl font-medium">
              Premium NFT collectibles and exclusive luxury souvenirs
            </p>
          </div>

          {/* User Balance */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-4 bg-gradient-to-r from-cyan-100 to-teal-100 border-2 border-cyan-300 px-8 py-4 rounded-2xl shadow-lg">
              <Wallet className="w-8 h-8 text-cyan-600" />
              <div>
                <div className="font-black text-slate-900 text-2xl">{icpBalance} ICP</div>
                <div className="text-sm text-slate-600 font-medium">≈ ${(icpBalance * 12.5).toFixed(2)} USD</div>
                <div className="text-xs text-slate-500">Wallet Balance</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 px-8 py-4 rounded-2xl shadow-lg">
              <Coins className="w-8 h-8 text-amber-600" />
              <div>
                <div className="font-black text-slate-900 text-2xl">{userPoints.toLocaleString()}</div>
                <div className="text-sm text-slate-600 font-medium">Premium Points</div>
                <div className="text-xs text-slate-500">Reward Balance</div>
              </div>
            </div>
          </div>

          {/* Premium Info */}
          <div className="bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 border-2 border-yellow-300 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-6 h-6 text-yellow-600" />
              <span className="font-bold text-yellow-800 text-lg">Premium Discount System</span>
            </div>
            <p className="text-yellow-700 font-medium">
              Use premium points to unlock significant discounts on luxury items! NFTs maintain minimum values to
              preserve exclusivity and creator royalties.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 overflow-x-auto pb-4 mb-10">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 text-white shadow-2xl scale-105"
                    : "bg-white text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-cyan-50 border-2 border-slate-200 hover:border-cyan-300"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <IconComponent className="w-6 h-6" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <ShopItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Luxury Features */}
        <div className="mt-20 bg-gradient-to-r from-slate-100 via-cyan-100 to-teal-100 border-2 border-cyan-300 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Luxury Web3 Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-5xl mb-6">🔗</div>
              <h3 className="font-bold text-slate-900 mb-3 text-xl">Blockchain Certified</h3>
              <p className="text-slate-600 font-medium">
                Every item is permanently recorded on the ICP blockchain with immutable ownership and provenance
              </p>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-5xl mb-6">💎</div>
              <h3 className="font-bold text-slate-900 mb-3 text-xl">True Digital Ownership</h3>
              <p className="text-slate-600 font-medium">
                Own premium digital assets with full control, transferability, and exclusive utility benefits
              </p>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-5xl mb-6">👑</div>
              <h3 className="font-bold text-slate-900 mb-3 text-xl">VIP Utility Access</h3>
              <p className="text-slate-600 font-medium">
                Unlock exclusive real-world experiences, premium discounts, and VIP treatment worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Shop
