// src/pages/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import BottomNav from '../components/BottomNav1';

/**
 * Dashboard component displaying user info, stats, and navigation tabs
 * @component
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // --- Mock Data ---

  // User profile and activity data
  const userData = {
    name: 'Juan Dela Cruz',
    level: 5,
    xp: 2750,
    nextLevel: 3000,
    achievements: [
      { id: 1, name: 'Island Explorer', icon: '🏝️', description: 'Visited 5 islands' },
      { id: 2, name: 'Culture Enthusiast', icon: '🏛️', description: 'Visited 3 historical sites' },
      { id: 3, name: 'Food Adventurer', icon: '🍜', description: 'Tried 10 local dishes' },
    ],
    recentActivities: [
      { id: 1, type: 'visit', location: 'Hundred Islands', date: '2 days ago' },
      { id: 2, type: 'achievement', name: 'Island Explorer', date: '3 days ago' },
      { id: 3, type: 'review', location: 'Cape Bolinao Lighthouse', date: '5 days ago' },
    ],
  };

  // Tourism-related stats and destinations
  const tourismData = {
    featuredDestinations: [
      { id: 1, name: 'Hundred Islands', image: null, rating: 4.8, category: 'Nature' },
      { id: 2, name: 'Cape Bolinao Lighthouse', image: null, rating: 4.5, category: 'Historical' },
      { id: 3, name: 'Minor Basilica', image: null, rating: 4.7, category: 'Religious' },
    ],
    stats: {
      totalVisitors: '125K+',
      activeExplorers: '1.2K',
      totalDestinations: '50+',
      completedTasks: '15K+',
    },
  };

  /**
   * Returns the appropriate icon element for an activity type.
   * @param {string} type - The activity type ('visit', 'achievement', 'review', etc.)
   * @returns {JSX.Element} Icon element
   */
  const renderActivityIcon = (type) => {
    switch (type) {
      case 'visit':
        return <i className="fas fa-map-marker-alt" aria-label="Visit"></i>;
      case 'achievement':
        return <i className="fas fa-trophy" aria-label="Achievement"></i>;
      case 'review':
        return <i className="fas fa-star" aria-label="Review"></i>;
      default:
        return <i className="fas fa-check-circle" aria-label="Other Activity"></i>;
    }
  };

  /**
   * Maps category to corresponding FontAwesome icon name
   * @param {string} category - Destination category
   * @returns {string} Icon name
   */
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Nature':
        return 'leaf';
      case 'Historical':
        return 'landmark';
      case 'Religious':
        return 'church';
      default:
        return 'map-marker-alt';
    }
  };

  return (
    <div className="dashboard-container">
      {/* User Profile Header */}
      <header className="dashboard-header">
        <div className="user-profile">
          <div className="avatar-container" aria-label={`User avatar for ${userData.name}`}>
            <div className="avatar">{userData.name.charAt(0)}</div>
            <div className="level-badge">Lvl {userData.level}</div>
          </div>
          <div className="user-info">
            <h2>{userData.name}</h2>
            <div className="xp-progress" aria-label="Experience progress bar">
              <div
                className="xp-bar"
                style={{ width: `${(userData.xp / userData.nextLevel) * 100}%` }}
                role="progressbar"
                aria-valuenow={userData.xp}
                aria-valuemin={0}
                aria-valuemax={userData.nextLevel}
              />
              <span>{userData.xp} / {userData.nextLevel} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats Section */}
      <section className="quick-stats" aria-label="Tourism statistics summary">
        {Object.entries(tourismData.stats).map(([key, value]) => (
          <div key={key} className="stat-card" aria-label={`${key} stat`}>
            <h3>{value}</h3>
            <p>{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        ))}
      </section>

      {/* Tab Navigation */}
      <nav className="content-tabs" role="tablist" aria-label="Dashboard Tabs">
        {[
          { id: 'overview', icon: 'home', label: 'Overview' },
          { id: 'achievements', icon: 'trophy', label: 'Achievements' },
          { id: 'activities', icon: 'history', label: 'Activities' },
        ].map(({ id, icon, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`${id}-tab`}
            id={`${id}-tab-button`}
            className={`tab-button ${activeTab === id ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            <i className={`fas fa-${icon}`} aria-hidden="true"></i>
            {label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <section className="tab-content">
        {activeTab === 'overview' && (
          <div id="overview-tab" role="tabpanel" aria-labelledby="overview-tab-button" tabIndex={0}>
            <FeaturedDestinations
              destinations={tourismData.featuredDestinations}
              onNavigate={navigate}
              getCategoryIcon={getCategoryIcon}
            />
            <QuickActions onNavigate={navigate} />
          </div>
        )}

        {activeTab === 'achievements' && (
          <div id="achievements-tab" role="tabpanel" aria-labelledby="achievements-tab-button" tabIndex={0}>
            <Achievements achievements={userData.achievements} />
          </div>
        )}

        {activeTab === 'activities' && (
          <div id="activities-tab" role="tabpanel" aria-labelledby="activities-tab-button" tabIndex={0}>
            <Activities
              activities={userData.recentActivities}
              renderIcon={renderActivityIcon}
            />
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
};

/**
 * Featured Destinations Component
 */
const FeaturedDestinations = ({ destinations, onNavigate, getCategoryIcon }) => (
  <section className="featured-destinations" aria-label="Featured Destinations">
    <h2>Featured Destinations</h2>
    <div className="destinations-grid">
      {destinations.map(({ id, name, image, rating, category }) => (
        <div
          key={id}
          className="destination-card"
          onClick={() => onNavigate(`/site/${id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate(`/site/${id}`)}
          aria-label={`Navigate to ${name} details`}
        >
          <div className="destination-image">
            {image ? (
              <img src={image} alt={name} />
            ) : (
              <div className="placeholder-image" aria-label="Placeholder image">
                <i className="fas fa-image" aria-hidden="true"></i>
              </div>
            )}
            <div className="destination-category">
              <i className={`fas fa-${getCategoryIcon(category)}`} aria-hidden="true"></i>
              {category}
            </div>
          </div>
          <div className="destination-info">
            <h3>{name}</h3>
            <div className="rating" aria-label={`Rating: ${rating} stars`}>
              <i className="fas fa-star" aria-hidden="true"></i>
              <span>{rating}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);


/**
 * Achievements Component
 */
const Achievements = ({ achievements }) => (
  <div className="achievements-grid" aria-label="User achievements">
    {achievements.map(({ id, icon, name, description }) => (
      <div key={id} className="achievement-card" tabIndex={0} aria-label={`Achievement: ${name}`}>
        <div className="achievement-icon" aria-hidden="true">{icon}</div>
        <div className="achievement-info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Activities Component
 */
const Activities = ({ activities, renderIcon }) => (
  <div className="activity-timeline" aria-label="Recent activities">
    {activities.map(({ id, type, location, name, date }) => (
      <div key={id} className="activity-item" tabIndex={0}>
        <div className="activity-icon" aria-hidden="true">{renderIcon(type)}</div>
        <div className="activity-info">
          <h3>
            {type === 'visit' && `Visited ${location}`}
            {type === 'achievement' && `Earned ${name}`}
            {type === 'review' && `Reviewed ${location}`}
          </h3>
          <p>{date}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Dashboard;
