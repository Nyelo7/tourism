import React, { useState } from 'react';
import './Shop.css';
import '../styles/theme.css';
import BottomNav from './BottomNav1';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: 'store' },
    { id: 'nft', name: 'NFT Collectibles', icon: 'certificate' },
    { id: 'powerups', name: 'Power Ups', icon: 'bolt' },
    { id: 'badges', name: 'Special Badges', icon: 'award' }
  ];

  const items = [
    {
      id: 1,
      name: 'Hundred Islands NFT',
      category: 'nft',
      price: '0.05 ETH',
      rarity: 'Rare',
      description: 'Exclusive digital collectible of the famous Hundred Islands.',
      benefits: ['Exclusive access to island tours', '+50 XP boost']
    },
    {
      id: 2,
      name: 'Bolinao Lighthouse NFT',
      category: 'nft',
      price: '0.03 ETH',
      rarity: 'Uncommon',
      description: 'Digital art featuring the historic Cape Bolinao Lighthouse.',
      benefits: ['Special lighthouse badge', '+30 XP boost']
    },
    {
      id: 3,
      name: '2X XP Boost',
      category: 'powerups',
      price: '200 Points',
      rarity: 'Common',
      description: 'Double your XP earnings for 24 hours.',
      benefits: ['2X XP for 24 hours', 'Stackable bonus']
    },
    {
      id: 4,
      name: 'Master Explorer Badge',
      category: 'badges',
      price: '500 Points',
      rarity: 'Epic',
      description: 'Show off your exploration achievements.',
      benefits: ['Unique profile badge', 'Special chat emotes']
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const getRarityColor = (rarity) => {
    const colors = {
      'Common': 'var(--text-secondary)',
      'Uncommon': '#4CAF50',
      'Rare': '#2196F3',
      'Epic': '#9C27B0'
    };
    return colors[rarity] || 'var(--text-secondary)';
  };

  const renderItemImage = (item) => {
    if (item.category === 'nft') {
      return (
        <div className="item-image">
          <div className="placeholder-image">
            <i className="fas fa-image"></i>
          </div>
          <span className="item-price">
            <i className="fab fa-ethereum"></i>
            {item.price}
          </span>
        </div>
      );
    }

    return (
      <div className="item-icon">
        <i className={`fas fa-${item.category === 'powerups' ? 'bolt' : 'award'}`}></i>
        <span className="item-price">
          <i className="fas fa-coins"></i>
          {item.price}
        </span>
      </div>
    );
  };

  return (
    <div className="page-container shop-page">
      <div className="shop-header card fade-in">
        <h1>NFT Marketplace</h1>
        <p className="subtitle">Collect unique digital souvenirs from your adventures</p>
        
        <div className="user-balance">
          <div className="balance-item">
            <i className="fab fa-ethereum"></i>
            <div>
              <h3>0.15 ETH</h3>
              <p>Balance</p>
            </div>
          </div>
          <div className="balance-item">
            <i className="fas fa-coins"></i>
            <div>
              <h3>1,250</h3>
              <p>Points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="category-scroll fade-in">
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

      <div className="shop-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="shop-item card fade-in">
            {renderItemImage(item)}
            
            <div className="item-info">
              <div className="item-header">
                <h3>{item.name}</h3>
                <span className="rarity-badge" style={{ color: getRarityColor(item.rarity) }}>
                  {item.rarity}
                </span>
              </div>
              
              <p className="item-description">{item.description}</p>
              
              <div className="item-benefits">
                {item.benefits.map((benefit, index) => (
                  <span key={index} className="benefit-tag">
                    <i className="fas fa-check"></i>
                    {benefit}
                  </span>
                ))}
              </div>
              
              <button className="button-primary buy-button">
                Purchase
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Shop;
