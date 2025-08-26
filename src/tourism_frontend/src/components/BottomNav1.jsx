import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaMapMarkedAlt,
  FaShoppingBag,
  FaUser,
  FaChartLine,
  FaCar
} from 'react-icons/fa';

const BottomNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { path: '/home', label: 'Home', icon: <FaHome /> },
    { path: '/travel', label: 'Smart Travel', icon: <FaCar /> },
    { path: '/map', label: 'Map', icon: <FaMapMarkedAlt /> },
    { path: '/shop', label: 'Shop', icon: <FaShoppingBag /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
    // { path: '/dashboard', label: 'Dashboard', icon: <FaChartLine /> },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-md shadow-md rounded-xl px-6 py-3 flex justify-around items-center w-full md:w-3/4 lg:w-1/2 z-50">
      {navItems.map(({ path, label, icon }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center transition-transform duration-300 ${
              isActive
                ? 'text-blue-600 scale-105'
                : 'text-gray-400 hover:text-blue-500 hover:scale-105'
            }`}
          >
            <div className="text-xl mb-1">{icon}</div>
            <span className="text-sm font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
