import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { canisterId, createActor } from 'declarations/tourism_backend';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import '../styles/theme.css';

const Login = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const navigate = useNavigate();

  const tourism_backend = createActor(canisterId);

  const connectMetaMask = async () => {
    setError('');
    try {
      if (!window.ethereum) {
        setError('MetaMask is not installed');
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        setError('Invalid wallet address');
        return;
      }

      setWalletAddress(address);

      const result = await tourism_backend.checkWallet(address);

      if (result.exists) {
        sessionStorage.setItem('username', result.username || '');
        sessionStorage.setItem('wallet', address);
        navigate('/dashboard');
      } else {
        setShowUsernameForm(true);
      }
    } catch (err) {
      console.error('Error connecting MetaMask:', err);
      setError(err.message || 'Failed to connect wallet');
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    try {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('wallet', walletAddress);
      navigate('/dashboard');
    } catch (err) {
      console.error('Username submission failed:', err);
      setError('Could not save username');
    }
  };

  return (
    <div className="page-container">
      <div className="login-content card fade-in">
        <div className="login-header">
          <h1>Welcome to Pangasinan Explorer</h1>
          <p className="subtitle">Connect your wallet to start exploring</p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {!walletAddress && (
          <div className="connect-wallet-section">
            <div className="wallet-info">
              <i className="fas fa-wallet wallet-icon"></i>
              <h2>Connect Your Wallet</h2>
              <p>To access your account and explore Pangasinan</p>
            </div>
            <button onClick={connectMetaMask} className="button-primary connect-button">
              <i className="fas fa-plug"></i>
              <span>Connect with MetaMask</span>
            </button>
          </div>
        )}

        {showUsernameForm && (
          <form onSubmit={handleUsernameSubmit} className="username-form fade-in">
            <div className="input-group">
              <label htmlFor="username">
                <i className="fas fa-user"></i>
                Choose your username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your preferred username"
                required
              />
            </div>
            <button type="submit" className="button-primary">
              <span>Continue</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>
        )}

        <div className="login-footer">
          <p>New to Pangasinan Explorer?</p>
          <button onClick={() => navigate('/register')} className="button-secondary">
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
