import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from './BottomNav1';
import bolinaoImage from '../images/bolinao.jpg';
import hundredImage from '../images/hundreds.jpg';
import manleluagImage from '../images/manleluag.jpg';
import salasaImage from '../images/salasa.jpg';
import './Home.css';
import '../styles/theme.css';

const Home = () => {
  const sites = [
    { 
      id: 1, 
      name: 'Hundred Island', 
      image: hundredImage,
      description: 'A National Park featuring 124 stunning islands and islets'
    },
    { 
      id: 2, 
      name: 'Cape Bolinao Lighthouse', 
      image: bolinaoImage,
      description: 'Historic Spanish colonial lighthouse overlooking the West Philippine Sea'
    },
    { 
      id: 3, 
      name: 'Salasa Church', 
      image: salasaImage,
      description: 'Beautiful baroque church showcasing Spanish colonial architecture'
    },
    { 
      id: 4, 
      name: 'Manleluag Church', 
      image: manleluagImage,
      description: 'Historic church known for its religious significance and architecture'
    },
  ];

  return (
    <div className="page-container home-page">
      <div className="home-header">
        <h1>Discover Pangasinan's Heritage</h1>
        <p className="subtitle">Explore our cultural and historical landmarks</p>
      </div>

      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="Search heritage sites..."
          className="search-input"
        />
      </div>

      <div className="categories">
        <button className="category-button active">
          <i className="fas fa-landmark"></i>
          All Sites
        </button>
        <button className="category-button">
          <i className="fas fa-church"></i>
          Churches
        </button>
        <button className="category-button">
          <i className="fas fa-mountain"></i>
          Nature
        </button>
        <button className="category-button">
          <i className="fas fa-monument"></i>
          Historical
        </button>
      </div>

      <div className="site-grid">
        {sites.map((site) => (
          <Link to={`/site/${site.id}`} key={site.id} className="site-card card fade-in">
            <div className="site-image">
              <img src={site.image} alt={site.name} />
              <div className="site-overlay">
                <button className="button-primary">
                  <span>Explore</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <div className="site-info">
              <h3>{site.name}</h3>
              <p>{site.description}</p>
              <div className="site-meta">
                <span>
                  <i className="fas fa-star"></i>
                  4.8
                </span>
                <span>
                  <i className="fas fa-map-marker-alt"></i>
                  Pangasinan
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;