import React from 'react';
// Import the specific Phosphor Icon components you need
import { MapTrifold, Wallet, Image, GlobeHemisphereWest } from '@phosphor-icons/react';

const FeaturesSection = () => {
  const features = [
    {
      // Use the imported React component for the icon
      icon: <MapTrifold weight="duotone" />, // 'duotone' for a slightly filled look, or 'bold', 'fill', 'light', 'thin'
      title: 'Discover Destinations',
      description: 'Uncover hidden gems and popular spots across Pangasinan with immersive guides and local insights.'
    },
    {
      icon: <Wallet weight="duotone" />,
      title: 'Earn Crypto Tokens',
      description: 'Get rewarded with crypto tokens for your adventures and valuable contributions to our growing community.'
    },
    {
      icon: <Image weight="duotone" />,
      title: 'Collect Digital Souvenirs',
      description: 'Mint unique NFTs and exclusive digital collectibles from the memorable places you visit.'
    },
    {
      icon: <GlobeHemisphereWest weight="duotone" />,
      title: 'Web3 Powered Adventures',
      description: 'Embark on the future of travel with decentralized, transparent, and community-governed experiences.'
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
      {/* Background shape/gradient for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob top-0 left-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 bottom-0 right-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 leading-tight animate-fade-in-up">
          Why Choose <span className="text-cyan-600">Hackatour</span> for Your Next Adventure?
        </h2>

        <div className="flex flex-col gap-12 lg:gap-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-12 lg:gap-16 bg-white p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Image/Icon Column */}
              <div className="w-full md:w-2/5 flex justify-center items-center p-4">
                {/* Phosphor icons automatically pick up parent font-size.
                    We're applying text-6xl, text-7xl, lg:text-8xl to the parent div
                    to control the icon size. */}
                <div className="text-6xl md:text-7xl lg:text-8xl text-cyan-500 bg-cyan-50 p-4 md:p-6 rounded-full shadow-lg">
                  {feature.icon}
                </div>
              </div>

              {/* Text Column */}
              <div className="w-full md:w-3/5 text-center md:text-left p-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-5 leading-snug">{feature.title}</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;