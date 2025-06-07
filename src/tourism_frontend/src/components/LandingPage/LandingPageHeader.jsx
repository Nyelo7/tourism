import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const LandingPageHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Effect to handle header visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 80) { // If scrolled past 80px
          if (window.scrollY > lastScrollY) {
            // Scrolling down, hide header
            setIsVisible(false);
          } else {
            // Scrolling up, show header
            setIsVisible(true);
          }
        } else {
          // At the top of the page, always show header
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY); // Update last scroll position
      }
    };

    // Add scroll event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    // Clean up event listener on component unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScrollY]); // Re-run effect when lastScrollY changes

  // Determine if the current page is the landing page
  const isLandingPage = location.pathname === '/';
  // Determine if the current page is the FAQ page
  const isFaqPage = location.pathname === '/faq';

  // Function to handle logout
  const handleLogout = () => {
    // Implement your actual logout logic here (e.g., clear tokens, update auth state)
    navigate('/'); // Redirects to the landing page after logout
  };

  return (
    <header
      className={`w-full p-2 sm:p-4 bg-charcoal-gray/80 backdrop-blur-sm fixed top-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full' // Controls header visibility based on scroll
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center px-2 sm:px-4">
        {/* Hackatour Logo/Title - Always links to home */}
        <Link
          to="/"
          className="text-white text-xl sm:text-3xl font-extrabold hover:text-cyan-vibrant transition-colors duration-300 rounded-md p-1 sm:p-2"
        >
          Hackatour
        </Link>
        <ul className="flex items-center space-x-4">
          {/* FAQ Link - Only visible on the landing page */}
          {isLandingPage && (
            <li>
              <Link
                to="/faq"
                className="px-3 py-1 sm:px-4 sm:py-2 text-white font-medium hover:text-cyan-vibrant transition-colors duration-300 rounded-full border border-transparent hover:border-cyan-vibrant"
              >
                FAQ
              </Link>
            </li>
          )}

          {/* Conditional Button: Login, Logout, or Home (for FAQ) */}
          <li>
            {isLandingPage ? (
              // Show Login button on the landing page
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-1 sm:px-6 sm:py-2 bg-cyan-vibrant text-charcoal-gray font-semibold border border-cyan-vibrant rounded-full hover:bg-optimistic-yellow hover:border-optimistic-yellow transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Login
              </button>
            ) : isFaqPage ? (
              // Show Home button on the FAQ page
              <button
                onClick={() => navigate('/')} // Navigates back to the home page
                className="px-4 py-1 sm:px-6 sm:py-2 bg-cyan-vibrant text-charcoal-gray font-semibold border border-cyan-vibrant rounded-full hover:bg-optimistic-yellow hover:border-optimistic-yellow transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Home
              </button>
            ) : (
              // Show Logout button on any other page (not landing or FAQ)
              <button
                onClick={handleLogout}
                className="px-4 py-1 sm:px-6 sm:py-2 bg-cyan-vibrant text-charcoal-gray font-semibold border border-cyan-vibrant rounded-full hover:bg-optimistic-yellow hover:border-optimistic-yellow transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LandingPageHeader;
