"use client"
import { useState, useEffect, useMemo } from "react"
import { ArrowLeft, MapPin, Star, Users, Trophy, Clock, CheckCircle, Gamepad2 } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import GamifiedTaskModal from "../../components/gamified-task-modal" // Ensure this path is correct
import { generateTasksForAttraction, saveTaskProgress, loadTaskProgress } from "../../utils/task-generator" // Ensure this path is correct

const Bolinao = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [selectedAttraction, setSelectedAttraction] = useState(null)
  const [attractionTasks, setAttractionTasks] = useState([])
  const [totalUserPoints, setTotalUserPoints] = useState(0)

  // Tourist attractions in Bolinao - This data remains exactly as you provided for Bolinao
  const attractions = [
    {
      id: 1,
      name: "Cape Bolinao Lighthouse",
      image: "/bolinao-cape.jpg", // Ensure path starts with / for public folder access
      description: "A historic lighthouse offering stunning views of the West Philippine Sea.",
      category: "Landmark",
      rating: 4.8,
      visitCount: 1800,
      isVisited: true,
      difficulty: "Moderate",
      estimatedTime: "1-2 hours",
      highlights: ["Ocean Views", "Historic Site", "Photo Spots"],
    },
    {
      id: 2,
      name: "Patar Beach",
      image: "/bolinao-patar.jpg", // Ensure path starts with /
      description: "A pristine white sand beach known for its crystal-clear waters and golden sunsets.",
      category: "Beach",
      rating: 4.7,
      visitCount: 2200,
      isVisited: true,
      difficulty: "Easy",
      estimatedTime: "Half day",
      highlights: ["White Sand", "Swimming", "Sunset Views"],
    },
    {
      id: 3,
      name: "Enchanted Cave",
      image: "/bolinao-cave.jpg", // Ensure path starts with /
      description: "A natural cave with a clear underground pool, ideal for a refreshing swim.",
      category: "Nature",
      rating: 4.6,
      visitCount: 950,
      isVisited: false,
      difficulty: "Moderate",
      estimatedTime: "2-3 hours",
      highlights: ["Underground Pool", "Adventure", "Natural Beauty"],
    },
    {
      id: 4,
      name: "Bolinao Falls",
      image: "/bolinao-falls.jpg", // Ensure path starts with /
      description: "A series of cascading waterfalls surrounded by lush greenery, perfect for nature lovers.",
      category: "Nature",
      rating: 4.5,
      visitCount: 780,
      isVisited: false,
      difficulty: "Moderate",
      estimatedTime: "3-4 hours",
      highlights: ["Waterfalls", "Hiking", "Nature Trails"],
    },
    {
      id: 5,
      name: "St. James the Great Parish Church",
      image: "/bolinao-church.jpg", // Ensure path starts with /
      description: "A historic church with beautiful architecture, a spiritual and cultural landmark.",
      category: "Religious",
      rating: 4.4,
      visitCount: 620,
      isVisited: true,
      difficulty: "Easy",
      estimatedTime: "1 hour",
      highlights: ["Historic Architecture", "Spiritual Site", "Cultural Heritage"],
    },
    {
      id: 6,
      name: "Rock Garden View Deck",
      image: "/bolinao-rock.jpg", // Ensure path starts with /
      description: "A scenic viewpoint with unique rock formations and panoramic coastal views.",
      category: "Landmark",
      rating: 4.3,
      visitCount: 510,
      isVisited: false,
      difficulty: "Easy",
      estimatedTime: "1-2 hours",
      highlights: ["Rock Formations", "Coastal Views", "Photo Opportunity"],
    },
  ]

  const [searchText, setSearchText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/home'); // replace with your target route
  };

  // Calculate total points from all attractions (gamification feature)
  useEffect(() => {
    let totalPoints = 0
    attractions.forEach((attraction) => {
      const progress = loadTaskProgress(attraction.name, "Bolinao") // Destination name is Bolinao
      if (progress) {
        totalPoints += progress.points || 0
      }
    })
    setTotalUserPoints(totalPoints)
  }, [])

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

  // Filter attractions
  const filteredAttractions = useMemo(() => {
    return attractions.filter((attraction) => {
      const searchLower = debouncedSearch.toLowerCase()
      return (
        attraction.name.toLowerCase().includes(searchLower) ||
        attraction.description.toLowerCase().includes(searchLower)
      )
    })
  }, [debouncedSearch])

  // Calculate stats (updated with gamification stats)
  const stats = useMemo(() => {
    const visitedCount = attractions.filter((a) => a.isVisited).length
    const totalVisits = attractions.reduce((sum, a) => sum + (a.isVisited ? a.visitCount : 0), 0)
    const completionRate = Math.round((visitedCount / attractions.length) * 100)

    // Calculate total completed tasks across all attractions for Bolinao
    let totalCompletedTasks = 0
    let totalTasks = 0
    attractions.forEach((attraction) => {
      const progress = loadTaskProgress(attraction.name, "Bolinao") // Destination name is Bolinao
      const tasks = generateTasksForAttraction(attraction.name, attraction.category)
      totalTasks += tasks.length
      if (progress) {
        totalCompletedTasks += progress.completedTasks?.length || 0
      }
    })

    return {
      visited: visitedCount,
      total: attractions.length,
      totalVisits,
      completionRate,
      totalCompletedTasks,
      totalTasks,
    }
  }, [])

  // Functions for task modal
  const handleOpenTaskModal = (attraction) => {
    const tasks = generateTasksForAttraction(attraction.name, attraction.category)

    // Load saved progress
    const progress = loadTaskProgress(attraction.name, "Bolinao") // Destination name is Bolinao
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isCompleted: progress?.completedTasks?.includes(task.id) || false,
    }))

    setSelectedAttraction(attraction)
    setAttractionTasks(updatedTasks)
    setIsTaskModalOpen(true)
  }

  const handleTaskComplete = (taskId) => {
    if (!selectedAttraction) return

    setAttractionTasks((prev) => {
      const updatedTasks = prev.map((task) => {
        if (task.id === taskId && !task.isCompleted) {
          return { ...task, isCompleted: true }
        }
        return task
      })

      // Save progress
      const completedTaskIds = updatedTasks.filter((t) => t.isCompleted).map((t) => t.id)
      const points = updatedTasks.reduce((sum, task) => sum + (task.isCompleted ? task.points : 0), 0)

      saveTaskProgress(selectedAttraction.name, "Bolinao", completedTaskIds, points) // Destination name is Bolinao

      // Update total points
      setTotalUserPoints((prev) => {
        const oldProgress = loadTaskProgress(selectedAttraction.name, "Bolinao") // Destination name is Bolinao
        const oldPoints = oldProgress?.points || 0
        return prev - oldPoints + points
      })

      return updatedTasks
    })
  }

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-t-xl"></div>
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

  const StatCard = ({ icon, value, label, color = "text-cyan-600" }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center space-x-4">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className="bg-[#D5EFF7] min-h-screen font-sans"
      style={{
        "--color-cyan-vibrant": "#66D9ED",
        "--color-ocean-blue": "#D5EFF7",
        "--color-charcoal-gray": "#212121",
        "--color-optimistic-yellow": "#FFD700",
        "--color-subtle-gray": "#D0D3D4",
      }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goToHome}
              className="flex items-center space-x-2 text-[#212121] hover:text-[#66D9ED] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Cities</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#66D9ED]" />
                <span className="font-semibold text-[#212121]">Bolinao</span>
              </div>
              {totalUserPoints > 0 && ( // Display total points
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>{totalUserPoints} pts</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative bg-gradient-to-r from-[#66D9ED] to-[#4F9CF9] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 px-8 py-12 text-center text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Bolinao</h1>
              <p className="text-xl md:text-2xl mb-2 opacity-90">The Coastal Gem of Pangasinan</p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Discover the breathtaking beaches, historic landmarks, and natural wonders of Bolinao
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#212121] mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<CheckCircle />}
              value={`${stats.visited}/${stats.total}`}
              label="Places Visited"
              color="text-cyan-600"
            />
            <StatCard
              icon={<Trophy />}
              value={`${stats.completionRate}%`}
              label="Completion Rate"
              color="text-[#FFD700]"
            />
            <StatCard
              icon={<Users />}
              value={stats.totalVisits.toLocaleString()}
              label="Total Visits"
              color="text-blue-600"
            />
            <StatCard
              icon={<Gamepad2 />}
              value={`${stats.totalCompletedTasks}/${stats.totalTasks}`}
              label="Tasks Completed"
              color="text-purple-600"
            />
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-3 border border-[#D0D3D4] hover:shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-cyan-100 w-full md:w-96">
              <div className="text-gray-400 mr-3">🔍</div>
              <input
                type="search"
                placeholder="Search attractions..."
                className="flex-grow outline-none text-[#212121] placeholder-gray-400"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <button onClick={() => setSearchText("")} className="text-gray-400 hover:text-gray-600 ml-2">
                  ✕
                </button>
              )}
            </div>
          </div>

          {debouncedSearch && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              {filteredAttractions.length} result{filteredAttractions.length !== 1 ? "s" : ""} found
            </div>
          )}
        </section>

        {/* Attractions Grid */}
        <section>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.length > 0 ? (
                filteredAttractions.map((attraction, index) => (
                  <div
                    key={attraction.id}
                    className="relative group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {/* Visited Badge */}
                    {attraction.isVisited && (
                      <div className="absolute top-4 left-4 z-20 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Visited</span>
                      </div>
                    )}

                    <div className="relative overflow-hidden">
                      <img
                        src={attraction.image || "/placeholder.svg"}
                        alt={attraction.name}
                        className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-800 flex items-center space-x-1">
                        <Star className="w-3 h-3 text-[#FFD700] fill-current" />
                        <span>{attraction.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#212121] mb-2 group-hover:text-[#66D9ED] transition-colors duration-300">
                        {attraction.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{attraction.description}</p>

                      {/* Highlights */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {attraction.highlights.slice(0, 2).map((highlight, idx) => (
                            <span
                              key={idx}
                              className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                          {attraction.highlights.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                              +{attraction.highlights.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{attraction.visitCount}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{attraction.estimatedTime}</span>
                          </span>
                        </div>
                        <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full font-medium">
                          {attraction.difficulty}
                        </span>
                      </div>

                      {/* Action Button - changed to use gamified task modal */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenTaskModal(attraction)}
                          className="flex-1 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-[#66D9ED] text-white hover:bg-[#4F9CF9] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                        >
                          <span>Travel</span>
                          <Gamepad2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No attractions found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
                  <button
                    onClick={() => setSearchText("")}
                    className="bg-[#66D9ED] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4F9CF9] transition-all duration-300 transform hover:scale-105"
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Gamified Task Modal */}
      {selectedAttraction && (
        <GamifiedTaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          destinationName="Bolinao" // Set destination to Bolinao
          attractionName={selectedAttraction.name}
          tasks={attractionTasks}
          onTaskComplete={handleTaskComplete}
          userPoints={totalUserPoints}
        />
      )}

      {/* This style block is part of the original code you provided for Alaminos */}
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

export default Bolinao