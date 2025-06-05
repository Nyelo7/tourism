import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import BottomNav from "../components/BottomNav1"
import LandingPageHeader from "../components/LandingPage/LandingPageHeader"

const Home = () => {
  // Updated data for cities in Pangasinan
  const cities = [
    {
      id: 1,
      name: "Dagupan",
      image: "/dagupan-card.jpg",
      description: "Known as the Bangus Capital of the World.",
      rating: 4.8,
      attractions: 8,
      population: "174,302",
    },
    {
      id: 2,
      name: "Alaminos",
      image: "/alaminos-card.jpg",
      description: "Gateway to the Hundred Islands National Park.",
      rating: 4.9,
      attractions: 8,
      population: "99,397",
    },
    {
      id: 3,
      name: "Manaoag",
      image: "/manaoag-card.jpg",
      description: "A popular pilgrimage town known for its historic church and religious significance.",
      rating: 4.7,
      attractions: 10,
      population: "49,000",
    },
    {
      id: 4,
      name: "Bolinao",
      image: "/bolinao-card.jpg",
      description: "A coastal town known for its beautiful beaches, waterfalls, and rich marine life.",
      rating: 4.8,
      attractions: 12,
      population: "71,000",
    },
  ]

  const [searchText, setSearchText] = useState("")
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

  // Filter cities only by search text (name or description)
  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      const searchLower = debouncedSearch.toLowerCase()
      return (
        city.name.toLowerCase().includes(searchLower) ||
        city.description.toLowerCase().includes(searchLower)
      )
    })
  }, [debouncedSearch])

  // Category colors for badges
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

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col font-sans min-h-screen">
      <LandingPageHeader />
      <main className="max-w-7xl mx-auto flex-grow">
        <section className="mt-15 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl max-w-6xl mx-auto">
          <div className="relative mb-12 flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl opacity-10 transform rotate-1"></div>
            <div className="relative z-10 py-8 max-w-4xl w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 animate-pulse">
                Hackatour
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-700">
                Explore the vibrant cities, municipalities, and hidden gems of Pangasinan.
              </p>

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

        {/* Search Section */}
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

        {/* City Listings */}
        <section aria-label="City listings">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="mb-25 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <Link
                    to={`/city/${city.name.toLowerCase()}`}
                    key={city.id}
                    className="relative group block rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    onMouseEnter={() => setHoveredCard(city.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {/* Image container with overlay */}
                    <div className="relative w-full h-56 rounded-t-2xl overflow-hidden">
                      <img
                        src={city.image}
                        alt={`${city.name} image`}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay on image */}
                      <div
                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-80 flex items-center justify-center transition-opacity duration-300 cursor-pointer rounded-t-2xl"
                        aria-hidden="true"
                      >
                        <span className="text-white text-xl font-semibold select-none">
                          Explore
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2 text-gray-900">{city.name}</h2>
                      <p className="text-gray-700 text-sm mb-3">{city.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-yellow-400">
                          <span>⭐</span>
                          <span className="text-gray-900 font-semibold">{city.rating}</span>
                        </div>
                        <div className="text-gray-500 text-sm">{city.attractions} attractions</div>
                      </div>
                      <div className="flex justify-between items-center text-gray-600 text-sm">
                        <span>Population: {city.population}</span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            categoryColors[city.category] || categoryColors["All Cities"]
                          }`}
                        >
                          {city.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-600 text-lg">No cities found.</p>
              )}
            </div>
          )}
        </section>
      </main>
      <BottomNav />
    </div>
  )
}

export default Home
