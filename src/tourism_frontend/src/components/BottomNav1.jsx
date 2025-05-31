import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/BottomNav.css';
import '../styles/theme.css';

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav">
      <Link to="/home" className={pathname === '/home' ? 'active' : ''}>
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <Link to="/map" className={pathname === '/map' ? 'active' : ''}>
        <i className="fas fa-map-marked-alt"></i>
        <span>Map</span>
      </Link>
      <Link to="/shop" className={pathname === '/shop' ? 'active' : ''}>
        <i className="fas fa-shopping-bag"></i>
        <span>Shop</span>
      </Link>
      <Link to="/profile" className={pathname === '/profile' ? 'active' : ''}>
        <i className="fas fa-user"></i>
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;