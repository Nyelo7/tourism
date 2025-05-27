import React, { useState } from 'react';
import '../styles/SiteDetails.css';
import '../styles/theme.css';
import BottomNav from '../components/BottomNav1';

const SiteDetails = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  // Simulated site data
  const site = {
    name: 'Hundred Islands National Park',
    location: 'Alaminos, Pangasinan',
    rating: 4.8,
    reviews: 245,
    description: 'A national park and protected area in the Philippines that features 124 islands at low tide and 123 at high tide. The islands are believed to be about two million years old.',
    category: 'nature',
    details: {
      bestTime: 'November to April',
      duration: '4-6 hours',
      difficulty: 'Easy to Moderate',
      price: '₱1,500 - ₱2,500',
      activities: [
        'Island Hopping',
        'Snorkeling',
        'Kayaking',
        'Cliff Jumping',
        'Swimming'
      ]
    },
    history: 'The Hundred Islands National Park was declared a national park in 1940 through Proclamation No. 667. The islands were believed to have been formed millions of years ago by the action of waves and winds on ancient coral reefs.',
    reviews: [
      {
        id: 1,
        user: 'Maria S.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Amazing experience! The islands are breathtaking and the activities are well-organized.',
        avatar: null
      },
      {
        id: 2,
        user: 'John D.',
        rating: 4,
        date: '1 month ago',
        comment: 'Great place for family trips. The boat tours are excellent but bring lots of water and sunscreen!',
        avatar: null
      }
    ]
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i 
        key={index}
        className={`fas fa-star ${index < Math.floor(rating) ? 'filled' : ''}`}
      ></i>
    ));
  };

  const renderPlaceholderImage = () => {
    const icons = {
      'nature': 'leaf',
      'historical': 'landmark',
      'religious': 'church',
      'adventure': 'hiking'
    };

    return (
      <div className="placeholder-image">
        <i className={`fas fa-${icons[site.category] || 'image'}`}></i>
      </div>
    );
  };

  return (
    <div className="page-container site-details-page">
      <div className="site-header">
        <div className="image-gallery">
          {renderPlaceholderImage()}
          <div className="thumbnail-grid">
            <div className="thumbnail-placeholder">
              <i className="fas fa-camera"></i>
            </div>
            <div className="thumbnail-placeholder">
              <i className="fas fa-camera"></i>
            </div>
          </div>
        </div>
        
        <div className="site-info card fade-in">
          <div className="site-title">
            <h1>{site.name}</h1>
            <p className="location">
              <i className="fas fa-map-marker-alt"></i>
              {site.location}
            </p>
          </div>
          
          <div className="rating-box">
            <div className="stars">
              {renderStars(site.rating)}
              <span className="rating-value">{site.rating}</span>
            </div>
            <p className="review-count">{site.reviews} reviews</p>
          </div>
        </div>
      </div>

      <div className="content-tabs fade-in">
        <button 
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <i className="fas fa-info-circle"></i>
          About
        </button>
        <button 
          className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          <i className="fas fa-list"></i>
          Details
        </button>
        <button 
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <i className="fas fa-star"></i>
          Reviews
        </button>
      </div>

      <div className="tab-content card fade-in">
        {activeTab === 'about' && (
          <div className="about-content">
            <p className="description">{site.description}</p>
            <div className="history-section">
              <h2>History</h2>
              <p>{site.history}</p>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="details-content">
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>Best Time to Visit</h3>
                <p>{site.details.bestTime}</p>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-hourglass-half"></i>
              <div>
                <h3>Duration</h3>
                <p>{site.details.duration}</p>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-hiking"></i>
              <div>
                <h3>Difficulty</h3>
                <p>{site.details.difficulty}</p>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-tag"></i>
              <div>
                <h3>Price Range</h3>
                <p>{site.details.price}</p>
              </div>
            </div>
            
            <div className="activities-section">
              <h2>Activities</h2>
              <div className="activities-grid">
                {site.details.activities.map((activity, index) => (
                  <div key={index} className="activity-tag">
                    <i className="fas fa-check-circle"></i>
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-content">
            {site.reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.user} className="reviewer-avatar" />
                    ) : (
                      <div className="avatar-placeholder">
                        {review.user.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3>{review.user}</h3>
                      <p className="review-date">{review.date}</p>
                    </div>
                  </div>
                  <div className="review-stars">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="action-buttons fade-in">
        <button className="button-primary">
          <i className="fas fa-map-marked-alt"></i>
          Get Directions
        </button>
        <button className="button-secondary">
          <i className="fas fa-bookmark"></i>
          Save for Later
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default SiteDetails; 