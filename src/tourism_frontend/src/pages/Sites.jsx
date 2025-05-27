import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sites.css';
import '../styles/theme.css';
import BottomNav from '../components/BottomNav1';

const Sites = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'alaminos', name: 'Alaminos' },
    { id: 'bolinao', name: 'Bolinao' },
    { id: 'lingayen', name: 'Lingayen' },
    { id: 'dagupan', name: 'Dagupan' }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'globe' },
    { id: 'nature', name: 'Nature', icon: 'leaf' },
    { id: 'historical', name: 'Historical', icon: 'landmark' },
    { id: 'religious', name: 'Religious', icon: 'church' },
    { id: 'adventure', name: 'Adventure', icon: 'hiking' }
  ];

  const sites = [
    {
      id: 1,
      name: 'Hundred Islands',
      region: 'alaminos',
      category: 'nature',
      rating: 4.8,
      reviews: 245,
      description: 'A national park featuring 124 islands at low tide.',
      activities: ['Island Hopping', 'Snorkeling', 'Kayaking'],
      difficulty: 'Easy',
      price: '₱1,500'
    },
    {
      id: 2,
      name: 'Cape Bolinao Lighthouse',
      region: 'bolinao',
      category: 'historical',
      rating: 4.5,
      reviews: 180,
      description: 'Historic lighthouse offering panoramic views.',
      activities: ['Sightseeing', 'Photography'],
      difficulty: 'Easy',
      price: '₱50'
    },
    {
      id: 3,
      name: 'Minor Basilica of Our Lady of the Rosary',
      region: 'lingayen',
      category: 'religious',
      rating: 4.7,
      reviews: 156,
      description: 'Historic church with Spanish colonial architecture.',
      activities: ['Worship', 'Photography'],
      difficulty: 'Easy',
      price: 'Free'
    }
  ];

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || site.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
    
    return matchesSearch && matchesRegion && matchesCategory;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i 
        key={index}
        className={`fas fa-star ${index < Math.floor(rating) ? 'filled' : ''}`}
      ></i>
    ));
  };

  const renderPlaceholderImage = (category) => {
    const icon = categories.find(c => c.id === category)?.icon || 'image';
    return (
      <div className="placeholder-image">
        <i className={`fas fa-${icon}`}></i>
      </div>
    );
  };

  return (
    <div className="page-container sites-page">
      <div className="sites-header card fade-in">
        <h1>Discover Pangasinan</h1>
        <p className="subtitle">Explore the rich heritage and natural wonders</p>
        
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filters-section fade-in">
        <div className="region-scroll">
          {regions.map(region => (
            <button
              key={region.id}
              className={`region-pill ${selectedRegion === region.id ? 'active' : ''}`}
              onClick={() => setSelectedRegion(region.id)}
            >
              {region.name}
            </button>
          ))}
        </div>

        <div className="category-scroll">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <i className={`fas fa-${category.icon}`}></i>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="sites-grid">
        {filteredSites.map(site => (
          <Link to={`/site/${site.id}`} key={site.id} className="site-card card fade-in">
            <div className="site-image">
              {renderPlaceholderImage(site.category)}
              <div className="site-category">
                <i className={`fas fa-${categories.find(c => c.id === site.category)?.icon}`}></i>
                {categories.find(c => c.id === site.category)?.name}
              </div>
            </div>
            
            <div className="site-content">
              <div className="site-header">
                <h2>{site.name}</h2>
                <div className="site-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {regions.find(r => r.id === site.region)?.name}
                </div>
              </div>
              
              <p className="site-description">{site.description}</p>
              
              <div className="site-details">
                <div className="rating-box">
                  <div className="stars">
                    {renderStars(site.rating)}
                    <span className="rating-value">{site.rating}</span>
                  </div>
                  <p className="review-count">{site.reviews} reviews</p>
                </div>
                
                <div className="site-meta">
                  <span className="difficulty">
                    <i className="fas fa-hiking"></i>
                    {site.difficulty}
                  </span>
                  <span className="price">
                    <i className="fas fa-tag"></i>
                    {site.price}
                  </span>
                </div>
              </div>
              
              <div className="activities-list">
                {site.activities.map((activity, index) => (
                  <span key={index} className="activity-tag">
                    <i className="fas fa-check-circle"></i>
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Sites; 