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
import DagupanPage from './pages/city/Dagupan';
import AlaminosPage from './pages/city/Alaminos';
import ManaoagPage from './pages/city/Manaoag';
import BolinaoPage from './pages/city/Bolinao';
import FAQ from './pages/faq';
import Travel from './pages/Travel'


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="faq" element={<FAQ/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/site/:id" element={<Site />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/travel" element={<Travel />} />


        <Route path="/city/dagupan" element={<DagupanPage />} />
        <Route path="/city/alaminos" element={<AlaminosPage />} />
        <Route path="/city/manaoag" element={<ManaoagPage />} />
        <Route path="/city/bolinao" element={<BolinaoPage />} />
      </Routes>
      
    </div>
  );
}

export default App;