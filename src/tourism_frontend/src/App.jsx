import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Site from './pages/Site';
import Profile from './pages/Profile';
import Map from './pages/Maps';
import Shop from './pages/Shop'; // Create this file
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/site/:id" element={<Site />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      
    </div>
  );
}

export default App;