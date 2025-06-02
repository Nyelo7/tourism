// src/components/LandingPage.jsx (or your main component file)

import React, { useState, useEffect } from 'react';

// === Custom Colors (as defined in your tailwind.config.js, for reference) ===
// 'cyan-vibrant': '#66D9ED'
// 'ocean-blue': '#D5EFF7'
// 'charcoal-gray': '#212121'
// 'optimistic-yellow': '#FFD700'
// 'subtle-gray': '#D0D3D4'
// =========================================================================

// --- Header Component ---
const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        // Only trigger visibility change if scrolling past a certain threshold (e.g., 80px)
        // to avoid flicker near top, but still hide on scroll down.
        if (window.scrollY > 80) {
          if (window.scrollY > lastScrollY) { // if scrolling down
            setIsVisible(false);
          } else { // if scrolling up
            setIsVisible(true);
          }
        } else { // At the very top of the page, always show header
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScrollY]);

  return (
    <header className={`w-full p-4 bg-charcoal-gray/80 backdrop-blur-sm fixed top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="container mx-auto flex justify-between items-center px-4">
        <a href="#hero" className="text-white text-3xl font-extrabold hover:text-cyan-vibrant transition-colors duration-300 rounded-md p-2">
          Hackatour
        </a>
        <ul className="flex space-x-6 items-center">
          <li>
            <button className="px-6 py-2 bg-cyan-vibrant text-charcoal-gray font-semibold border border-cyan-vibrant rounded-full hover:bg-optimistic-yellow hover:border-optimistic-yellow transition-all duration-300 transform hover:scale-105 shadow-md">
              Login
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// --- Hero Section ---
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center pt-16 overflow-hidden"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute inset-0 bg-charcoal-gray opacity-60"></div> {/* Increased opacity for better text contrast */}
      <div className="relative z-10 p-8 text-center max-w-4xl mx-auto flex flex-col items-center"> {/* Added flex-col items-center */}
        <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl animate-fade-in-up">
          Explore The Beauty<br />of Pangasinan With Us
        </h1>
        <p className="mt-4 text-white text-xl md:text-2xl font-light drop-shadow-md opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Your unforgettable journey starts here. Discover unique experiences, earn rewards, and connect with fellow explorers.
        </p>
        <button className="mt-10 px-10 py-4 rounded-full bg-cyan-vibrant text-charcoal-gray font-bold text-lg shadow-xl hover:bg-optimistic-yellow transition duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Start Exploring
        </button>
      </div>
    </section>
  );
};

// --- Features Section ---
const FeaturesSection = () => {
  const features = [
    {
      icon: '📍', // Replace with actual SVG icon
      title: 'Discover Destinations',
      description: 'Find hidden gems and popular spots across Pangasinan with detailed guides.'
    },
    {
      icon: '💰', // Replace with actual SVG icon
      title: 'Earn Crypto Tokens',
      description: 'Get rewarded for your travels and contributions to the community.'
    },
    {
      icon: '🖼️', // Replace with actual SVG icon
      title: 'Collect Digital Souvenirs',
      description: 'Mint unique NFTs and digital collectibles from places you visit.'
    },
    {
      icon: '🌐', // Replace with actual SVG icon
      title: 'Web3 Powered Adventures',
      description: 'Experience the future of travel with decentralized and transparent systems.'
    },
  ];

  return (
    <section id="features" className="py-20 bg-subtle-gray">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-charcoal-gray mb-12 animate-fade-in-up">Why Choose Hackatour?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center
                         transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                         animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="text-5xl mb-4 text-cyan-vibrant">{feature.icon}</div>
              <h3 className="text-xl font-bold text-charcoal-gray mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Travel Guide Section (Renamed to Destinations for clarity) ---
const DestinationsSection = () => {
  const travelSpots = [
    {
      id: 1,
      src: "https://picsum.photos/id/240/400/300",
      alt: "Hundred Islands National Park",
      name: "Hundred Islands",
      description: "Explore the famous clusters of islands perfect for island hopping."
    },
    {
      id: 2,
      src: "https://picsum.photos/id/241/400/300",
      alt: "Patar Beach, Bolinao",
      name: "Patar Beach",
      description: "Relax on the golden sands and enjoy stunning sunsets."
    },
    {
      id: 3,
      src: "https://picsum.photos/id/242/400/300",
      alt: "Cape Bolinao Lighthouse",
      name: "Bolinao Lighthouse",
      description: "Visit the iconic lighthouse offering panoramic ocean views."
    },
    {
      id: 4,
      src: "https://picsum.photos/id/243/400/300",
      alt: "Pangasinan Capitol Building",
      name: "Pangasinan Capitol",
      description: "Admire the historical and architectural beauty of the provincial capitol."
    },
  ];

  return (
    <section id="travel-guide" className="min-h-screen bg-ocean-blue py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-charcoal-gray mb-12 text-center animate-fade-in-up">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Section: Text Content */}
          <div className="flex flex-col justify-center animate-fade-in-up">
            <h3 className="text-4xl md:text-5xl font-extrabold text-charcoal-gray mb-6 leading-tight">
              Every journey <br /> is unique
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Our web3 guide helps you explore. Discover destinations, earn tokens,
              and collect unique digital souvenirs. Turn every trip into a
              rewarding collection.
            </p>
            <p className="text-xl font-semibold text-charcoal-gray">
              Discover destinations, Travel and Earn
            </p>
          </div>

          {/* Right Section: Main Image */}
          <div className="bg-ocean-blue rounded-xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://picsum.photos/id/1011/800/500" // Placeholder for Bolinao Falls (landscape image)
              alt="Bolinao Falls"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            <p className="text-4xl font-bold text-charcoal-gray mt-5 text-center">Bolinao Falls</p>
            <p className="text-lg text-gray-600 mt-2 text-center">A majestic natural wonder in Pangasinan.</p>
          </div>
        </div>

        {/* Bottom Section: Grid of Smaller Images with Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {travelSpots.map((spot, index) => (
            <div
              key={spot.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
                         group transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                         animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <img
                src={spot.src}
                alt={spot.alt}
                className="w-full h-56 object-cover transition-opacity duration-300 group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-charcoal-gray bg-opacity-70 flex flex-col items-center justify-center p-4
                              text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold text-cyan-vibrant mb-2">{spot.name}</h3>
                <p className="text-center text-sm">{spot.description}</p>
              </div>
              {/* Initial visible text for non-hover state */}
              <div className="p-4 text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-lg font-semibold text-charcoal-gray">{spot.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Testimonials Section ---
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Hackatour transformed my travel experience! Earning tokens while exploring was a game-changer.",
      author: "Maria S. - Adventure Enthusiast"
    },
    {
      quote: "The digital souvenirs are amazing! It's like having a unique piece of each journey.",
      author: "John D. - Digital Nomad"
    },
    {
      quote: "A truly innovative platform. The community features are fantastic for discovering new places.",
      author: "Sarah L. - Travel Blogger"
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-charcoal-gray mb-12 animate-fade-in-up">What Our Explorers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-ocean-blue p-8 rounded-xl shadow-lg
                         transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                         animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <p className="text-xl font-semibold text-charcoal-gray mb-4">"{testimonial.quote}"</p>
              <p className="text-lg text-gray-700">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Call to Action Section ---
const CallToActionSection = () => {
  return (
    <section className="bg-cyan-vibrant py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal-gray mb-6 animate-fade-in-up">
          Ready to Start Your Next Adventure?
        </h2>
        <p className="text-xl text-charcoal-gray mb-10 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Join Hackatour today and redefine how you explore the world.
        </p>
        <button className="px-12 py-5 rounded-full bg-optimistic-yellow text-charcoal-gray font-bold text-xl shadow-xl hover:bg-white transition duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Join Hackatour Now!
        </button>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  // Ensure the date is consistent with the current time you provided
  const locationAndDate = `Urdaneta, Ilocos Region, Philippines - June 2, ${currentYear}`;

  return (
    <footer className="w-full p-8 mt-12 bg-charcoal-gray text-subtle-gray">
      <div className="container mx-auto text-center">
        <p className="mb-3 text-lg">&copy; {currentYear} Hackatour. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="block text-subtle-gray hover:text-cyan-vibrant transition-colors duration-300 hover:underline">Privacy Policy</a>
          <a href="#" className="block text-subtle-gray hover:text-cyan-vibrant transition-colors duration-300 hover:underline">Terms of Service</a>
        </div>
        <p className="text-sm text-subtle-gray opacity-80 mt-4">{locationAndDate}</p>
      </div>
    </footer>
  );
};


// --- Main Landing Page Component ---
const LandingPage = () => {
  return (
    <div className="font-sans antialiased">
      <Header />
      <HeroSection />
      <FeaturesSection /> {/* New Section */}
      <DestinationsSection /> {/* Renamed TravelGuide */}
      <TestimonialsSection /> {/* New Section */}
      <CallToActionSection /> {/* New Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;