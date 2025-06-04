import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic,
    // e.g., send email and password to a backend API.
    console.log('Logging in with:', { email, password });

    // For demonstration, navigate to home after a "successful" login
    navigate('/home');
  };

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
            Login to start exploring
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-charcoal-gray text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-charcoal-gray leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-vibrant/50 focus:border-transparent transition-all duration-200"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-charcoal-gray text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-charcoal-gray leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-vibrant/50 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="
              w-full flex items-center justify-center gap-4
              bg-gradient-to-r from-cyan-vibrant via-[#4cc3d9] to-[#3db1ce]
              hover:bg-gradient-to-r hover:from-optimistic-yellow hover:via-[#FFEB3B] hover:to-optimistic-yellow
              text-white font-semibold py-4 rounded-2xl shadow-lg shadow-cyan-vibrant/50 text-xl select-none
              transition-all duration-300
            "
            aria-label="Login"
          >
            <i className="fas fa-sign-in-alt text-2xl"></i>
            <span>Login</span>
          </button>
        </form>

        {/* Optional: Register/Forgot Password links */}
        <div className="text-center mt-6 text-charcoal-gray/75">
          <p className="text-sm">Don't have an account? <a href="#" className="font-semibold text-cyan-vibrant hover:underline">Sign up</a></p>
          <p className="text-sm mt-2"><a href="#" className="font-semibold text-cyan-vibrant hover:underline">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;