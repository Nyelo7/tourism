"use client"
import { useState, useEffect, useMemo } from "react"
import { ArrowLeft, MapPin, Star, Users, Camera, Trophy, Clock, CheckCircle, Gamepad2, QrCode, Image, ShoppingBag, MapPin as MapPinIcon, MessageSquare, Share2, Utensils, Compass } from "lucide-react" // Added icons for tasks
import { useNavigate } from 'react-router-dom';
import GamifiedTaskModal from "../../components/gamified-task-modal"

// Dummy implementations for task generation and progress management
// These functions are directly included here, similar to the DagupanPage structure.
const generateTasksForAttraction = (attractionName, category) => {
  // Common tasks with structure matching GamifiedTaskModal expectations
  const commonTasks = [
    {
      id: 1,
      title: `Photo Challenge at ${attractionName}`,
      description: `Capture the best angle of ${attractionName}.`,
      points: 10,
      type: "photo_share",
      difficulty: "Easy",
      estimatedTime: "5 mins",
      icon: <Image className="w-5 h-5" />,
      requirements: ["A clear photo of the landmark", "Good lighting"],
    },
    {
      id: 2,
      title: `Historical Fact Finding`,
      description: `Learn and share an interesting historical fact.`,
      points: 15,
      type: "explore",
      difficulty: "Medium",
      estimatedTime: "10 mins",
      icon: <Compass className="w-5 h-5" />,
      requirements: ["Research a fact", "Be able to recite it"],
    },
    {
      id: 3,
      title: `Social Media Shoutout`,
      description: `Post about your visit on social media.`,
      points: 5,
      type: "social_share",
      difficulty: "Easy",
      estimatedTime: "3 mins",
      icon: <Share2 className="w-5 h-5" />,
      requirements: ["Public post", "Hashtag #ManaoagAdventure"],
    },
  ];

  if (category === "Religious") {
    return [
      ...commonTasks,
      {
        id: 4,
        title: `Candle Lighting Ceremony`,
        description: `Light a candle and offer a prayer.`,
        points: 20,
        type: "check_in", // Using check_in type for simplicity, adjust as needed
        difficulty: "Easy",
        estimatedTime: "10 mins",
        icon: <Clock className="w-5 h-5" />, // Placeholder icon
        requirements: ["Purchase a candle", "Perform the ritual"],
      },
      {
        id: 5,
        title: `Blessed Item Scan`,
        description: `Scan the QR code on a blessed item (e.g., rosary).`,
        points: 25,
        type: "qr_scan",
        difficulty: "Medium",
        estimatedTime: "7 mins",
        icon: <QrCode className="w-5 h-5" />,
        requirements: ["Find QR code", "Successful scan"],
      },
    ];
  } else if (category === "Nature") {
    return [
      ...commonTasks,
      {
        id: 6,
        title: `Nature Trail Walk`,
        description: `Complete a walk along the designated nature trail.`,
        points: 20,
        type: "explore",
        difficulty: "Medium",
        estimatedTime: "30 mins",
        icon: <Compass className="w-5 h-5" />,
        requirements: ["Complete the trail", "Take a photo at trail's end"],
      },
      {
        id: 7,
        title: `Wildlife Spotting`,
        description: `Identify and photograph at least one local flora or fauna.`,
        points: 15,
        type: "photo_share",
        difficulty: "Hard",
        estimatedTime: "15 mins",
        icon: <Camera className="w-5 h-5" />,
        requirements: ["Clear photo", "Correct identification"],
      },
    ];
  }
  return commonTasks;
};

const saveTaskProgress = (attractionName, destination, completedTaskIds, points) => {
  const key = `taskProgress-${destination}-${attractionName}`;
  const progress = { completedTasks: completedTaskIds, points: points };
  localStorage.setItem(key, JSON.stringify(progress));
};

const loadTaskProgress = (attractionName, destination) => {
  const key = `taskProgress-${destination}-${attractionName}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};


const ManaoagPage = () => {
  // State for the gamified task modal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [selectedAttraction, setSelectedAttraction] = useState(null)
  const [attractionTasks, setAttractionTasks] = useState([])
  const [totalUserPoints, setTotalUserPoints] = useState(0)

  // Tourist attractions in Manaoag
  const attractions = [
    {
      id: 1,
      name: "Our Lady of Manaoag Shrine",
      image: "/manaoag-shrine.jpg",
      description: "A major pilgrimage site known for the miraculous statue of the Virgin Mary.",
      category: "Religious",
      rating: 4.9,
      visitCount: 4500,
      isVisited: true,
      difficulty: "Easy",
      estimatedTime: "1-2 hours",
      highlights: ["Pilgrimage Site", "Historic Church", "Spiritual Experience"],
    },
    {
      id: 2,
      name: "Manaoag Church Museum",
      image: "/manaoag-museum.jpg",
      description: "A museum showcasing religious artifacts and the history of the Manaoag Shrine.",
      category: "Cultural",
      rating: 4.5,
      visitCount: 890,
      isVisited: true,
      difficulty: "Easy",
      estimatedTime: "1-2 hours",
      highlights: ["Religious Artifacts", "Local History", "Educational"],
    },

    {
      id: 4,
      name: "Manaoag Nature Park",
      image: "/manaoag-park.jpg",
      description: "A serene park perfect for family outings and nature walks.",
      category: "Nature",
      rating: 4.4,
      visitCount: 670,
      isVisited: false,
      difficulty: "Easy",
      estimatedTime: "2-3 hours",
      highlights: ["Nature Trails", "Family Friendly", "Picnic Areas"],
    },

    {
      id: 6,
      name: "Manaoag Rosary Garden",
      image: "manaoag-rosaryjpg.jpg",
      description: "A peaceful garden dedicated to the Rosary, ideal for meditation and prayer.",
      category: "Religious",
      rating: 4.7,
      visitCount: 980,
      isVisited: true,
      difficulty: "Easy",
      estimatedTime: "1 hour",
      highlights: ["Meditation", "Spiritual Site", "Gardens"],
    },
    {
      id: 7,
      name: "Manaoag Candle Gallery",
      image: "manaoag-candle.jpg",
      description: "A unique gallery where visitors can light candles and offer prayers.",
      category: "Religious",
      rating: 4.5,
      visitCount: 720,
      isVisited: false,
      difficulty: "Easy",
      estimatedTime: "30 minutes",
      highlights: ["Candle Lighting", "Spiritual Experience", "Unique Attraction"],
    },

  ]

  const [searchText, setSearchText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [debouncedSearch, setDebouncedSearch] = useState("")

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

  // Get unique categories (though not currently used for filtering in UI)
  const categories = ["All", ...new Set(attractions.map((attraction) => attraction.category))]
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/home'); // replace with your target route
  };

  // Initialize total user points from local storage for Manaoag
  useEffect(() => {
    let totalPoints = 0
    attractions.forEach((attraction) => {
      const progress = loadTaskProgress(attraction.name, "Manaoag")
      if (progress) {
        totalPoints += progress.points || 0
      }
    })
    setTotalUserPoints(totalPoints)
  }, [])


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

  // Calculate stats
  const stats = useMemo(() => {
    const visitedCount = attractions.filter((a) => a.isVisited).length
    const totalVisits = attractions.reduce((sum, a) => sum + (a.isVisited ? a.visitCount : 0), 0)
    const completionRate = Math.round((visitedCount / attractions.length) * 100)

    let totalCompletedTasks = 0
    let totalTasks = 0
    attractions.forEach((attraction) => {
      const tasks = generateTasksForAttraction(attraction.name, attraction.category)
      totalTasks += tasks.length
      const progress = loadTaskProgress(attraction.name, "Manaoag")
      if (progress) {
        totalCompletedTasks += progress.completedTasks?.length || 0
      }
    })

    return {
      visited: visitedCount,
      total: attractions.length,
      totalVisits,
      completionRate,
      totalCompletedTasks, // Added for gamification stats
      totalTasks,         // Added for gamification stats
    }
  }, [attractions]) // Depend on attractions to recalculate when data changes (if it ever would)

  // Function to open the task modal
  const handleOpenTaskModal = (attraction) => {
    // Generate base tasks for the selected attraction
    const tasks = generateTasksForAttraction(attraction.name, attraction.category)

    // Load existing progress for *this specific attraction*
    const progress = loadTaskProgress(attraction.name, "Manaoag")

    // Update tasks with their completion status based on loaded progress
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isCompleted: progress?.completedTasks?.includes(task.id) || false,
    }))

    setSelectedAttraction(attraction)
    setAttractionTasks(updatedTasks) // Set the tasks state
    setIsTaskModalOpen(true)
  }

  // Function to handle task completion
  const handleTaskComplete = (taskId) => {
    if (!selectedAttraction) return

    setAttractionTasks((prev) => {
      const updatedTasks = prev.map((task) => {
        if (task.id === taskId && !task.isCompleted) {
          return { ...task, isCompleted: true }
        }
        return task
      })

      const completedTaskIds = updatedTasks.filter((t) => t.isCompleted).map((t) => t.id)
      const points = updatedTasks.reduce((sum, task) => sum + (task.isCompleted ? task.points : 0), 0)

      saveTaskProgress(selectedAttraction.name, "Manaoag", completedTaskIds, points)

      // Update total user points
      setTotalUserPoints((prev) => {
        const oldProgress = loadTaskProgress(selectedAttraction.name, "Manaoag")
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
                <span className="font-semibold text-[#212121]">Manaoag</span>
              </div>
              {/* Total User Points Display */}
              {totalUserPoints > 0 && (
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
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Manaoag</h1>
              <p className="text-xl md:text-2xl mb-2 opacity-90">The Pilgrimage Capital of Pangasinan</p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Experience the spiritual serenity and rich heritage of Manaoag
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
            {/* Updated StatCard for gamification */}
            <StatCard
              icon={<Gamepad2 />}
              value={`${stats.totalCompletedTasks}/${stats.totalTasks}`}
              label="Tasks Completed"
              color="text-purple-600"
            />
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
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

                      {/* Stats and Action Button wrapped in a single parent div */}
                      <div>
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

                        {/* Action Button - modified to open modal */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleOpenTaskModal(attraction)}
                            className="flex-1 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-[#66D9ED] text-white hover:bg-[#4F9CF9] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                          >
                            <span>Travel</span>
                            <Gamepad2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div> {/* End of wrapper div */}

                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No attractions found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setSearchText("")
                    }}
                    className="bg-[#66D9ED] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4F9CF9] transition-all duration-300 transform hover:scale-105"
                  >
                    Reset Filters
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
          destinationName="Manaoag" // Hardcoded destination name as per Dagupan example
          attractionName={selectedAttraction.name}
          tasks={attractionTasks}
          onTaskComplete={handleTaskComplete}
          userPoints={totalUserPoints}
        />
      )}

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

export default ManaoagPage