import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/tourism_backend'; // Adjusted path
import { Principal } from '@dfinity/principal';

// Backend canister ID from dfx deploy
const CANISTER_ID = 'uxrrr-q7777-77774-qaaaq-cai';

// Initialize the backend actor
const initActor = async () => {
  const agent = new HttpAgent({ host: 'http://localhost:4943' }); // Local testing
  await agent.fetchRootKey(); // Required for local canister communication
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: CANISTER_ID,
  });
  return actor;
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email/password login handler
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    navigate('/home');
  };

  // Connect to OKX Wallet
  const connectOKXWallet = async (e) => {
    e.preventDefault();
    if (!window.okxwallet) {
      setStatus('OKX Wallet extension not detected. Please install it from https://www.okx.com/web3.');
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await window.okxwallet.request({
        method: 'eth_requestAccounts',
      });
      const address = accounts[0];
      setWalletAddress(address);
      setStatus(`Connected to wallet: ${address.slice(0, 6)}...${address.slice(-4)}`);
      // Immediately navigate to home after successful connection
      navigate('/home');
    } catch (error) {
      setStatus(`Connection failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Check wallet address in backend - this function will no longer be called directly after connection if you always navigate to home
  const checkWalletAddress = async (address) => {
    try {
      const actor = await initActor();
      const result = await actor.checkWallet(address);
      if (result.exists) {
        setStatus(`Wallet already registered with username: ${result.username}`);
        navigate('/home');
      } else {
        setStatus('Wallet not registered. Please enter a username.');
      }
    } catch (error) {
      setStatus(`Error checking wallet: ${error.message}`);
    }
  };

  // Register username for wallet
  const registerUsername = async (e) => {
    e.preventDefault();
    if (!walletAddress || !username) {
      setStatus('Please connect wallet and enter a username.');
      return;
    }
    setIsLoading(true);
    try {
      const actor = await initActor();
      const result = await actor.registerUsername(walletAddress, username);
      if (result.ok) {
        setStatus(result.ok);
        navigate('/home');
      } else {
        setStatus(`Error: ${result.err}`);
      }
    } catch (error) {
      setStatus(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-ocean-blue flex items-center justify-center relative overflow-hidden px-4"
      style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div
        className="absolute inset-0 bg-black/65 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-vibrant/20 via-transparent to-charcoal-gray/10 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 space-y-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-charcoal-gray hover:text-optimistic-yellow font-semibold mb-6 select-none"
          aria-label="Go back"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-charcoal-gray mb-2 tracking-tight">
            Hackatour
          </h1>
          <p className="text-charcoal-gray/75 text-base font-medium">
            Login to start exploring
          </p>
        </div>
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
            disabled={isLoading}
          >
            <i className="fas fa-sign-in-alt text-2xl"></i>
            <span>{isLoading ? 'Loading...' : 'Login'}</span>
          </button>
        </form>
        <form onSubmit={connectOKXWallet} className="space-y-6">
          <button
            type="submit"
            className="
              w-full flex items-center justify-center gap-4
              bg-gradient-to-r from-cyan-vibrant via-[#4cc3d9] to-[#3db1ce]
              hover:bg-gradient-to-r hover:from-optimistic-yellow hover:via-[#FFEB3B] hover:to-optimistic-yellow
              text-white font-semibold py-4 rounded-2xl shadow-lg shadow-cyan-vibrant/50 text-xl select-none
              transition-all duration-300
            "
            aria-label="Connect to wallet"
            disabled={isLoading}
          >
            <i className="fas fa-sign-in-alt text-2xl"></i>
            <span>{isLoading ? 'Connecting...' : 'Connect to wallet'}</span>
          </button>
        </form>
        {walletAddress && status.includes('Please enter a username') && (
          <form onSubmit={registerUsername} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-charcoal-gray text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-charcoal-gray leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-vibrant/50 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              aria-label="Register Username"
              disabled={isLoading}
            >
              <span>{isLoading ? 'Registering...' : 'Register Username'}</span>
            </button>
          </form>
        )}
        {status && (
          <p className="text-center text-charcoal-gray/75 mt-4">{status}</p>
        )}
        <div className="text-center mt-6 text-charcoal-gray/75">
          <p className="text-sm">Don't have an account? <a href="#" className="font-semibold text-cyan-vibrant hover:underline">Sign up</a></p>
          <p className="text-sm mt-2"><a href="#" className="font-semibold text-cyan-vibrant hover:underline">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;