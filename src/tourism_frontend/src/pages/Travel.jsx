import React from 'react';
import { Plane } from 'lucide-react'; // Importing a plane icon from lucide-react
import BottomNav from '../components/BottomNav1';

export default function Travel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-cyan-900 px-4 py-8 font-inter">
      <div className="text-center text-white space-y-8 p-8 rounded-xl shadow-2xl bg-white/20 backdrop-blur-md animate-fade-in-up">
        {/* Travel Icon with pulse animation */}
        <div className="flex justify-center mb-6">
          <Plane className="w-24 h-24 text-white animate-pulse-slow" />
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight">
          Hackatour
        </h1>

        {/* Subtitle with a subtle delay in animation */}
        <p className="text-3xl sm:text-4xl mt-4 animate-fade-in-up animation-delay-200">
          Smart Travel
        </p>

        {/* Coming Soon message */}
        <p className="text-xl sm:text-2xl opacity-80 mt-2 animate-fade-in-up animation-delay-400">
          <span className="text-red-500 font-black text-4xl sm:text-5xl">SOON!</span>
        </p>
      </div>

      {/* Tailwind CSS custom animations and delays */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        /* Define the fade-in-up animation */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        /* Animation delays */
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        /* Define the pulse-slow animation */
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
      <BottomNav/>
    </div>
  );
}