import React from 'react';
import { motion } from 'framer-motion';
import { MapTrifold, Wallet, Image, GlobeHemisphereWest } from '@phosphor-icons/react';

const features = [
  {
    icon: <MapTrifold weight="duotone" />,
    title: 'Discover Destinations',
    description: 'Uncover hidden gems and popular spots across Pangasinan with immersive guides and local insights.',
  },
  {
    icon: <Wallet weight="duotone" />,
    title: 'Gain Points for Discounts',
    description: 'Earn points by completing missions and use them in the NFT shop to get discounts on exclusive digital collectibles.',
  },
  {
    icon: <Image weight="duotone" />,
    title: 'Collect Digital Souvenirs',
    description: 'Mint unique NFTs and exclusive digital collectibles from the memorable places you visit.',
  },
  {
    icon: <GlobeHemisphereWest weight="duotone" />,
    title: 'NFT Perks & Benefits',
    description: 'Own special NFTs to unlock exclusive perks like VIP access, partner discounts, and other premium rewards.',
  }
];

const fadeInVariant = (direction = "left") => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -60 : 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
});

const FeaturesSection = () => (
  <section id="features" className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
    {/* Animated blobs */}
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob top-0 left-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 bottom-0 right-full translate-x-1/2 -translate-y-1/2"></div>
    </div>

    <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 leading-tight"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        Why Choose <span className="text-cyan-600">Hackatour</span> for Your Next Adventure?
      </motion.h2>

      <div className="flex flex-col gap-12 lg:gap-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`
              flex flex-col
              ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
              items-center gap-8 md:gap-12 lg:gap-16
              bg-white p-6 md:p-8 lg:p-10 rounded-3xl
              shadow-xl hover:shadow-2xl transition-all duration-500
              transform hover:-translate-y-2 hover:scale-[1.02]
              border-b-4 border-cyan-500 hover:border-cyan-600
              relative overflow-hidden
            `}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            variants={fadeInVariant(index % 2 === 0 ? "left" : "right")}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-50 via-transparent to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500 rounded-3xl"></div>

            <div className="w-full md:w-2/5 flex justify-center items-center p-4">
              <div className="text-6xl md:text-7xl lg:text-8xl text-cyan-600 bg-cyan-100 p-5 md:p-7 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                {feature.icon}
              </div>
            </div>

            <div className="w-full md:w-3/5 text-center md:text-left p-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 md:mb-5 leading-snug">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
