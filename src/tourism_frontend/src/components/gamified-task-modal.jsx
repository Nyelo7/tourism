"use client"

import { useState } from "react"
import { X, Trophy, Star, CheckCircle, Clock } from "lucide-react"

const GamifiedTaskModal = ({ isOpen, onClose, destinationName, attractionName, tasks, onTaskComplete, userPoints }) => {
  const [selectedTask, setSelectedTask] = useState(null)

  const completedCount = tasks.filter((task) => task.isCompleted).length
  const totalPoints = tasks.reduce((sum, task) => sum + (task.isCompleted ? task.points : 0), 0)
  const progressPercentage = (completedCount / tasks.length) * 100

  const handleTaskComplete = (taskId) => {
    onTaskComplete(taskId)
    setSelectedTask(null)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Hard":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "qr_scan":
        return "bg-blue-100 text-blue-700"
      case "photo_share":
        return "bg-purple-100 text-purple-700"
      case "souvenir":
        return "bg-orange-100 text-orange-700"
      case "check_in":
        return "bg-cyan-100 text-cyan-700"
      case "review":
        return "bg-pink-100 text-pink-700"
      case "social_share":
        return "bg-indigo-100 text-indigo-700"
      case "explore":
        return "bg-emerald-100 text-emerald-700"
      case "food_challenge":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Adventure Tasks</h2>
              <p className="text-cyan-100">
                {attractionName} • {destinationName}
              </p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Section */}
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Progress</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{totalPoints} pts</div>
                <div className="text-xs text-cyan-100">
                  {completedCount}/{tasks.length} completed
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {!selectedTask ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      task.isCompleted
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-white hover:border-cyan-300"
                    }`}
                    onClick={() => !task.isCompleted && setSelectedTask(task)}
                  >
                    {task.isCompleted && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(task.type)}`}>{task.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}
                            >
                              {task.difficulty}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {task.estimatedTime}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-cyan-600 font-semibold">
                            <Trophy className="w-4 h-4" />
                            <span>{task.points}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <TaskDetail
                task={selectedTask}
                onBack={() => setSelectedTask(null)}
                onComplete={() => handleTaskComplete(selectedTask.id)}
                attractionName={attractionName}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const TaskDetail = ({ task, onBack, onComplete, attractionName }) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = async () => {
    setIsCompleting(true)
    // Simulate task completion process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onComplete()
    setIsCompleting(false)
  }

  const getTaskInstructions = (type, attractionName) => {
    switch (type) {
      case "qr_scan":
        return [
          `Find the QR code at ${attractionName}`,
          "Open your camera or QR scanner app",
          "Scan the code to verify your visit",
          "Screenshot the confirmation page",
        ]
      case "photo_share":
        return [
          `Take a creative photo at ${attractionName}`,
          "Share it on your social media",
          "Use the hashtag #TravelAdventure",
          "Tag the location in your post",
        ]
      case "souvenir":
        return [
          `Visit the souvenir shop at ${attractionName}`,
          "Purchase any item as a memento",
          "Scan the receipt QR code",
          "Keep your receipt for verification",
        ]
      case "check_in":
        return [
          `Arrive at ${attractionName}`,
          "Take a selfie with the landmark",
          "Check in using the location services",
          "Share your experience (optional)",
        ]
      case "review":
        return [
          `Visit and experience ${attractionName}`,
          "Write a detailed review (min 50 words)",
          "Rate your experience (1-5 stars)",
          "Submit your review on the platform",
        ]
      case "social_share":
        return [
          `Create engaging content about ${attractionName}`,
          "Share on at least 2 social platforms",
          "Include location tags and hashtags",
          "Encourage friends to visit too",
        ]
      case "food_challenge":
        return [
          `Try the local specialty at ${attractionName}`,
          "Take a photo of your meal",
          "Share your food experience",
          "Rate the taste and presentation",
        ]
      case "explore":
        return [
          `Explore all areas of ${attractionName}`,
          "Visit the main highlights",
          "Take photos at key spots",
          "Document your exploration journey",
        ]
      default:
        return [
          `Complete the specific activity at ${attractionName}`,
          "Follow all safety guidelines",
          "Document your experience",
          "Submit proof of completion",
        ]
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ← Back
        </button>
        <div
          className={`p-2 rounded-lg ${
            task.type === "qr_scan"
              ? "bg-blue-100 text-blue-700"
              : task.type === "photo_share"
                ? "bg-purple-100 text-purple-700"
                : task.type === "souvenir"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-100 text-gray-700"
          }`}
        >
          {task.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyan-50 p-4 rounded-lg text-center">
          <Trophy className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-cyan-600">{task.points}</div>
          <div className="text-sm text-gray-600">Points Reward</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-yellow-600">{task.estimatedTime}</div>
          <div className="text-sm text-gray-600">Est. Time</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-green-600">{task.difficulty}</div>
          <div className="text-sm text-gray-600">Difficulty</div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">How to Complete This Task:</h4>
        <ol className="space-y-2">
          {getTaskInstructions(task.type, attractionName).map((instruction, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
              <span className="text-gray-700">{instruction}</span>
            </li>
          ))}
        </ol>
      </div>

      {task.requirements && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Requirements:</h4>
          <ul className="space-y-1">
            {task.requirements.map((req, index) => (
              <li key={index} className="text-blue-700 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleComplete}
        disabled={isCompleting}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCompleting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Completing Task...</span>
          </div>
        ) : (
          `Complete Task (+${task.points} pts)`
        )}
      </button>
    </div>
  )
}

export default GamifiedTaskModal
