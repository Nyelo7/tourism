import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import BottomNav from "../components/BottomNav1"

const Home = () => {
  // Updated data for cities in Pangasinan
  const cities = [
    {
      id: 1,
      name: "Dagupan City",
      image: "https://via.placeholder.com/400x250?text=Dagupan+City",
      description: "Known as the Bangus Capital of the World.",
      category: "Urban",
      rating: 4.8,
      attractions: 12,
      population: "174,302",
    },
    {
      id: 2,
      name: "Alaminos City",
      image: "https://via.placeholder.com/400x250?text=Alaminos+City",
      description: "Gateway to the Hundred Islands National Park.",
      category: "Coastal",
      rating: 4.9,
      attractions: 8,
      population: "99,397",
    },
    {
      id: 3,
      name: "Urdaneta City",
      image: "https://via.placeholder.com/400x250?text=Urdaneta+City",
      description: "A bustling trade and commercial center in Eastern Pangasinan.",
      category: "Commercial",
      rating: 4.6,
      attractions: 15,
      population: "144,577",
    },
    {
      id: 4,
      name: "San Carlos City",
      image: "https://via.placeholder.com/400x250?text=San+Carlos+City",
      description: "The largest city in Pangasinan by land area and population.",
      category: "Agricultural",
      rating: 4.7,
      attractions: 10,
      population: "205,424",
    },
  ]

  const [searchText, setSearchText] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("All Cities")
  const [isLoading, setIsLoading] = useState(true)
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [hoveredCard, setHoveredCard] = useState(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchText])

  const filters = [
    { label: "All Cities", category: "All Cities", icon: "🏙️" },
    { label: "Urban", category: "Urban", icon: "🏢" },
    { label: "Coastal", category: "Coastal", icon: "🌊" },
    { label: "Commercial", category: "Commercial", icon: "🏪" },
    { label: "Agricultural", category: "Agricultural", icon: "🌾" },
  ]

  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      const matchesSearch =
        city.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        city.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesFilter = selectedFilter === "All Cities" || city.category === selectedFilter
      return matchesSearch && matchesFilter
    })
  }, [debouncedSearch, selectedFilter])

  const categoryColors = {
    Urban: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white",
    Coastal: "bg-gradient-to-r from-blue-400 to-cyan-500 text-white",
    Commercial: "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
    Agricultural: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
    "All Cities": "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800",
  }

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-300 h-48 sm:h-56 rounded-t-xl"></div>
          <div className="p-4 bg-white rounded-b-xl">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-3 w-3/4"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-300 rounded w-16"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const StatCard = ({ icon, value, label }) => (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col font-sans">
      <main className="max-w-7xl mx-auto flex-grow">
        <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl max-w-6xl mx-auto">
          <div className="relative mb-12 flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl opacity-10 transform rotate-1"></div>
            <div className="relative z-10 py-8 max-w-4xl w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 animate-pulse">
                Hackatour
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-700">
                Explore the vibrant cities, municipalities, and hidden gems of Pangasinan.
              </p>

              {/* Fun Fact text added here */}
              <p className="mt-2 text-sm sm:text-base text-blue-800 font-semibold italic">
                Fun Fact: Pangasinan comes from the word “asin,” meaning salt — a nod to its long history of salt-making!
              </p>

              <div className="mt-12 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border border-blue-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="text-4xl mb-2">🐟</div>
                    <h3 className="font-semibold text-gray-800 text-lg">Bangus Capital</h3>
                    <p className="text-sm text-gray-600 text-center">Dagupan produces the finest milkfish in the Philippines.</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border border-blue-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="text-4xl mb-2">🏝️</div>
                    <h3 className="font-semibold text-gray-800 text-lg">124 Islands</h3>
                    <p className="text-sm text-gray-600 text-center">Hundred Islands has actually 124 islands and islets.</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border border-blue-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="text-4xl mb-2">🌾</div>
                    <h3 className="font-semibold text-gray-800 text-lg">Rice Granary</h3>
                    <p className="text-sm text-gray-600 text-center">Pangasinan is one of the top rice-producing provinces.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Enhanced Search Section */}
        <section aria-label="Search cities" className="relative max-w-md mx-auto sm:mx-0 mb-10">
          <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-4 border border-gray-200 hover:shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-cyan-100">
            <div className="text-gray-400 mr-3 text-lg">🔍</div>
            <input
              type="search"
              placeholder="Search cities, attractions..."
              className="flex-grow outline-none text-gray-800 placeholder-gray-400 text-base sm:text-lg"
              aria-label="Search cities"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="text-gray-400 hover:text-gray-600 ml-2 text-lg"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {debouncedSearch && (
            <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-600 text-center">
              {filteredCities.length} result{filteredCities.length !== 1 ? "s" : ""} found
            </div>
          )}
        </section>

        {/* Enhanced Filter Section */}
        <section aria-label="Filter cities" className="flex flex-wrap gap-3 justify-center sm:justify-start mb-12">
          {filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => setSelectedFilter(filter.category)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95
                ${selectedFilter === filter.category
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:shadow-lg"
                }`}
              aria-pressed={selectedFilter === filter.category}
              aria-label={`Filter by ${filter.label}`}
            >
              <span className="text-lg">{filter.icon}</span>
              <span className="text-sm sm:text-base font-semibold">{filter.label}</span>
            </button>
          ))}
        </section>

        {/* Enhanced City Listings */}
        <section aria-label="City listings">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <Link
                    to={`/city/${city.id}`}
                    key={city.id}
                    className="relative group block rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    onMouseEnter={() => setHoveredCard(city.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={city.image || "/placeholder.svg"}
                        alt={city.name}
                        className="w-full h-48 sm:h-56 object-cover transition-all duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${categoryColors[city.category]}`}
                      >
                        {city.category}
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-800">
                        ⭐ {city.rating}
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${hoveredCard === city.id ? "opacity-100" : "opacity-0"} flex items-center justify-center`}
                      >
                        <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 font-semibold hover:bg-white/30 transition-colors duration-200">
                            <span>Explore Now</span>
                            <span className="ml-2">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
                        {city.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{city.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <span>👥</span>
                            <span>{city.population}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>🎯</span>
                            <span>{city.attractions} spots</span>
                          </span>
                        </div>
                        <span className="flex items-center space-x-1 text-cyan-600 font-semibold">
                          <span>📍</span>
                          <span>Pangasinan</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No cities found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setSearchText("")
                      setSelectedFilter("All Cities")
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-auto bg-white shadow-inner">
        <BottomNav />
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Home
