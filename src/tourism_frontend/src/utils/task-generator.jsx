"use client"

import { Camera, ShoppingBag, MapPin, Share2, Star, QrCode, Utensils, Compass } from "lucide-react"

export const generateTasksForAttraction = (attractionName, attractionType = "Nature") => {
  const baseTasks = [
    {
      id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-qr-scan`,
      title: "Scan Location QR Code",
      description: `Find and scan the official QR code at ${attractionName}`,
      points: 50,
      type: "qr_scan",
      difficulty: "Easy",
      estimatedTime: "5 min",
      isCompleted: false,
      icon: <QrCode className="w-5 h-5" />,
      requirements: ["Smartphone with camera", "QR scanner app"],
    },
    {
      id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-photo-share`,
      title: "Capture & Share",
      description: `Take a stunning photo at ${attractionName} and share it`,
      points: 75,
      type: "photo_share",
      difficulty: "Easy",
      estimatedTime: "10 min",
      isCompleted: false,
      icon: <Camera className="w-5 h-5" />,
      requirements: ["Social media account", "Use hashtag #TravelAdventure"],
    },
    {
      id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-check-in`,
      title: "Location Check-in",
      description: `Check in at ${attractionName} and scan qr code`,
      points: 60,
      type: "check_in",
      difficulty: "Easy",
      estimatedTime: "5 min",
      isCompleted: false,
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-review`,
      title: "Write a Review",
      description: `Share your experience at ${attractionName} with a detailed review`,
      points: 100,
      type: "review",
      difficulty: "Medium",
      estimatedTime: "15 min",
      isCompleted: false,
      icon: <Star className="w-5 h-5" />,
      requirements: ["Minimum 50 words", "Rate 1-5 stars"],
    },
  ]

  // Add attraction-type specific tasks
  const specificTasks = []

  switch (attractionType) {
    case "Nature":
      specificTasks.push(
        {
          id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-explore`,
          title: "Nature Explorer",
          description: `Explore all the natural highlights of ${attractionName}`,
          points: 120,
          type: "explore",
          difficulty: "Medium",
          estimatedTime: "45 min",
          isCompleted: false,
          icon: <Compass className="w-5 h-5" />,
          requirements: ["Visit main viewpoints", "Take photos of wildlife/nature"],
        },
        {
          id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-souvenir`,
          title: "Nature Souvenir",
          description: `Buy a nature-themed souvenir from ${attractionName}`,
          points: 80,
          type: "souvenir",
          difficulty: "Easy",
          estimatedTime: "15 min",
          isCompleted: false,
          icon: <ShoppingBag className="w-5 h-5" />,
        },
      )
      break

    case "Beach":
      specificTasks.push({
        id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-beach-activity`,
        title: "Beach Adventure",
        description: `Enjoy beach activities at ${attractionName}`,
        points: 100,
        type: "explore",
        difficulty: "Easy",
        estimatedTime: "30 min",
        isCompleted: false,
        icon: <Compass className="w-5 h-5" />,
        requirements: ["Try swimming or beach sports", "Take sunset/sunrise photo"],
      })
      break

    case "Food":
    case "Landmark":
      specificTasks.push({
        id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-food-challenge`,
        title: "Local Taste Challenge",
        description: `Try the local specialty at ${attractionName}`,
        points: 90,
        type: "food_challenge",
        difficulty: "Easy",
        estimatedTime: "20 min",
        isCompleted: false,
        icon: <Utensils className="w-5 h-5" />,
        requirements: ["Order local dish", "Take photo of meal"],
      })
      break

    case "Historical":
    case "Religious":
      specificTasks.push({
        id: `${attractionName.toLowerCase().replace(/\s+/g, "-")}-cultural`,
        title: "Cultural Discovery",
        description: `Learn about the history and culture of ${attractionName}`,
        points: 110,
        type: "explore",
        difficulty: "Medium",
        estimatedTime: "30 min",
        isCompleted: false,
        icon: <Compass className="w-5 h-5" />,
        requirements: ["Read information plaques", "Take educational photos"],
      })
      break
  }

  return [...baseTasks, ...specificTasks]
}

export const getStorageKey = (attractionName, destinationName) => {
  return `tasks-${destinationName.toLowerCase()}-${attractionName.toLowerCase().replace(/\s+/g, "-")}`
}

export const saveTaskProgress = (attractionName, destinationName, completedTaskIds, points) => {
  const key = getStorageKey(attractionName, destinationName)
  localStorage.setItem(
    key,
    JSON.stringify({
      completedTasks: completedTaskIds,
      points: points,
      lastUpdated: new Date().toISOString(),
    }),
  )
}

export const loadTaskProgress = (attractionName, destinationName) => {
  const key = getStorageKey(attractionName, destinationName)
  const saved = localStorage.getItem(key)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return null
    }
  }
  return null
}
