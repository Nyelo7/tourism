import React from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-ocean-blue flex items-center justify-center relative overflow-hidden px-4"
      style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/65 pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Existing subtle pattern overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-vibrant/20 via-transparent to-charcoal-gray/10 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 space-y-8">

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-charcoal-gray hover:text-optimistic-yellow font-semibold mb-6 select-none"
          aria-label="Go back"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-charcoal-gray mb-2 tracking-tight">
            Hackatour
          </h1>
          <p className="text-charcoal-gray/75 text-base font-medium">
            Connect your wallet to start exploring
          </p>
        </div>

        {/* Connect wallet section */}
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center text-charcoal-gray">
            <i className="fas fa-wallet text-6xl mb-3 text-cyan-vibrant drop-shadow-md"></i>
            <h2 className="text-2xl font-semibold">Connect Your Wallet</h2>
            <p className="max-w-xs text-charcoal-gray/60 mt-1 font-normal">
              To access your account and explore Pangasinan
            </p>
          </div>
          <button

            className="
              w-full flex items-center justify-center gap-4
              bg-gradient-to-r from-cyan-vibrant via-[#4cc3d9] to-[#3db1ce]
              hover:bg-gradient-to-r hover:from-optimistic-yellow hover:via-[#FFEB3B] hover:to-optimistic-yellow
              text-white font-semibold py-4 rounded-2xl shadow-lg shadow-cyan-vibrant/50 text-xl select-none
              transition-all duration-300
            "
            aria-label="Connect with MetaMask"
            onClick={() => navigate('/dashboard')}
          >
            <i className="fas fa-plug text-2xl"></i>
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
