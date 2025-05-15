// src/pages/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import BottomNav from './BottomNav1';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: 'Juan Dela Cruz',
    level: 5,
    xp: 2750,
    nextLevel: 3000,
    achievements: [
      { id: 1, name: 'Island Explorer', icon: '🏝️', description: 'Visited 5 islands' },
      { id: 2, name: 'Culture Enthusiast', icon: '🏛️', description: 'Visited 3 historical sites' },
      { id: 3, name: 'Food Adventurer', icon: '🍜', description: 'Tried 10 local dishes' }
    ],
    recentActivities: [
      { id: 1, type: 'visit', location: 'Hundred Islands', date: '2 days ago' },
      { id: 2, type: 'achievement', name: 'Island Explorer', date: '3 days ago' },
      { id: 3, type: 'review', location: 'Cape Bolinao Lighthouse', date: '5 days ago' }
    ]
  };

  // Mock tourism data
  const tourismData = {
    featuredDestinations: [
      {
        id: 1,
        name: 'Hundred Islands',
        image: null,
        rating: 4.8,
        category: 'Nature'
      },
      {
        id: 2,
        name: 'Cape Bolinao Lighthouse',
        image: null,
        rating: 4.5,
        category: 'Historical'
      },
      {
        id: 3,
        name: 'Minor Basilica',
        image: null,
        rating: 4.7,
        category: 'Religious'
      }
    ],
    stats: {
      totalVisitors: '125K+',
      activeExplorers: '1.2K',
      totalDestinations: '50+',
      completedTasks: '15K+'
    }
  };

  const renderActivityIcon = (type) => {
    switch (type) {
      case 'visit':
        return <i className="fas fa-map-marker-alt"></i>;
      case 'achievement':
        return <i className="fas fa-trophy"></i>;
      case 'review':
        return <i className="fas fa-star"></i>;
      default:
        return <i className="fas fa-check-circle"></i>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* User Profile Header */}
      <header className="dashboard-header">
        <div className="user-profile">
          <div className="avatar-container">
            <div className="avatar">
              {userData.name.charAt(0)}
            </div>
            <div className="level-badge">Lvl {userData.level}</div>
          </div>
          <div className="user-info">
            <h2>{userData.name}</h2>
            <div className="xp-progress">
              <div 
                className="xp-bar" 
                style={{ width: `${(userData.xp / userData.nextLevel) * 100}%` }}
              ></div>
              <span>{userData.xp} / {userData.nextLevel} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="quick-stats">
        {Object.entries(tourismData.stats).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3>{value}</h3>
            <p>{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <div className="content-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fas fa-home"></i>
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <i className="fas fa-trophy"></i>
          Achievements
        </button>
        <button
          className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          <i className="fas fa-history"></i>
          Activities
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <section className="featured-destinations">
              <h2>Featured Destinations</h2>
              <div className="destinations-grid">
                {tourismData.featuredDestinations.map(destination => (
                  <div 
                    key={destination.id} 
                    className="destination-card"
                    onClick={() => navigate(`/site/${destination.id}`)}
                  >
                    <div className="destination-image">
                      {destination.image ? (
                        <img src={destination.image} alt={destination.name} />
                      ) : (
                        <div className="placeholder-image">
                          <i className="fas fa-image"></i>
                        </div>
                      )}
                      <div className="destination-category">
                        <i className={`fas fa-${destination.category === 'Nature' ? 'leaf' : 
                                       destination.category === 'Historical' ? 'landmark' : 'church'}`}></i>
                        {destination.category}
                      </div>
                    </div>
                    <div className="destination-info">
                      <h3>{destination.name}</h3>
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <span>{destination.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button onClick={() => navigate('/map')}>
                  <i className="fas fa-map-marked-alt"></i>
                  Explore Map
                </button>
                <button onClick={() => navigate('/site')}>
                  <i className="fas fa-compass"></i>
                  Browse Sites
                </button>
                <button onClick={() => navigate('/shop')}>
                  <i className="fas fa-store"></i>
                  Visit Shop
                </button>
                <button onClick={() => navigate('/profile')}>
                  <i className="fas fa-user"></i>
                  View Profile
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-content">
            <div className="achievements-grid">
              {userData.achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <h3>{achievement.name}</h3>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="activities-content">
            <div className="activity-timeline">
              {userData.recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {renderActivityIcon(activity.type)}
                  </div>
                  <div className="activity-info">
                    <h3>
                      {activity.type === 'visit' && `Visited ${activity.location}`}
                      {activity.type === 'achievement' && `Earned ${activity.name}`}
                      {activity.type === 'review' && `Reviewed ${activity.location}`}
                    </h3>
                    <p>{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;