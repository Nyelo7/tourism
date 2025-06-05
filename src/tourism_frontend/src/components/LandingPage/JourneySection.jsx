"use client"
import { motion } from "framer-motion"
import { Search, Plane, Target, Award, TrendingUp } from "lucide-react"

const journeySteps = [
  {
    icon: <Search className="w-full h-full" />,
    title: "Search for Destination",
    description:
      "Browse through curated destinations across Pangasinan and discover hidden gems waiting to be explored.",
    step: "01",
  },
  {
    icon: <Plane className="w-full h-full" />,
    title: "Travel",
    description:
      "Embark on your adventure with our guided routes and local recommendations for an authentic experience.",
    step: "02",
  },
  {
    icon: <Target className="w-full h-full" />,
    title: "Complete Mission",
    description:
      "Engage with interactive challenges, capture moments, and contribute valuable insights to the community.",
    step: "03",
  },
  {
    icon: <Award className="w-full h-full" />,
    title: "Earn NFT",
    description: "Mint unique digital collectibles and souvenirs that commemorate your journey and achievements.",
    step: "04",
  },
  {
    icon: <TrendingUp className="w-full h-full" />,
    title: "Level Up",
    description: "Advance your explorer status, unlock exclusive rewards, and gain access to premium destinations.",
    step: "05",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const stepVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const lineVariants = {
  hidden: { height: 0 },
  visible: {
    height: "100%",
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
}

const JourneySection = () => (
  <section id="journey" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 z-0 opacity-10">
      <motion.div
        className="w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-2xl absolute top-1/4 right-10"
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl absolute bottom-1/4 left-10"
        animate={{
          y: [0, 50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>

    <div className="container mx-auto px-6 lg:px-8 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        <span className="text-cyan-600">Hackatour</span> Your Web3 Tour Guide
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Follow the path from discovery to mastery in the world of Web3-powered travel experiences
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
        >
          {/* Vertical connecting line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-20 bottom-20 w-1 bg-gray-200 overflow-hidden">
            <motion.div className="w-full bg-gradient-to-b from-cyan-500 to-blue-500" variants={lineVariants} />
          </div>

          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              className={`
                relative flex items-center mb-16 last:mb-0
                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
              `}
              variants={stepVariants}
            >
              {/* Step number and icon */}
              <div className="flex-shrink-0 relative z-10">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white border-4 border-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-cyan-600 font-bold text-lg">{step.step}</span>
                  </div>
                  <div className="ml-4 md:hidden">
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content card */}
              <motion.div
                className={`
                  flex-1 ml-8 md:ml-0 md:mx-12
                  ${index % 2 === 0 ? "md:mr-auto md:ml-12" : "md:ml-auto md:mr-12"}
                  max-w-md
                `}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  <div className="relative z-10">
                    {/* Desktop icon */}
                    <div className="hidden md:block w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-100 to-transparent opacity-50 rounded-bl-full" />
                </div>
              </motion.div>

              {/* Connecting arrow for larger screens */}
              <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2">
                <motion.div
                  className={`
                    w-8 h-8 border-2 border-cyan-500 rounded-full bg-cyan-500
                    ${index % 2 === 0 ? "ml-8" : "-ml-8"}
                  `}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
)

export default JourneySection
