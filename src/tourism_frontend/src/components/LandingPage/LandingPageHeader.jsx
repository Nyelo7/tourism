import React, { useState, useEffect } from 'react';
const LandingPageHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
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

export default LandingPageHeader;
