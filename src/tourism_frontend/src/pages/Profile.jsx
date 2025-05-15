import React from 'react';
import './Profile.css';
import '../styles/theme.css';
import avatarImg from '../images/avatar.jpg';
import BottomNav from './BottomNav1';

const Profile = () => {
  // Simulated user data
  const user = {
    name: 'Explorer Juan',
    avatar: avatarImg,
    xp: 1850,
    level: 12,
    totalPoints: 1200,
    completedPlaces: 7,
    collectedNFTs: 4,
    achievements: [
      { id: 1, title: 'Heritage Explorer', description: 'Visited 5 historical sites', icon: 'landmark' },
      { id: 2, title: 'Church Pilgrim', description: 'Visited 3 churches', icon: 'church' },
      { id: 3, title: 'Nature Lover', description: 'Explored 2 natural attractions', icon: 'leaf' }
    ],
    recentActivity: [
      { id: 1, action: 'Visited', place: 'Hundred Islands', date: '2 days ago', icon: 'map-marker-alt' },
      { id: 2, action: 'Collected NFT', place: 'Cape Bolinao Lighthouse', date: '5 days ago', icon: 'certificate' }
    ]
  };

  const calculateProgress = (xp) => {
    const nextLevel = (user.level + 1) * 1000;
    const currentLevelXP = user.level * 1000;
    return ((xp - currentLevelXP) / (nextLevel - currentLevelXP)) * 100;
  };

  return (
    <div className="page-container profile-page">
      <div className="profile-header card fade-in">
        <div className="profile-cover">
          <div className="profile-avatar-wrapper">
            <img className="profile-avatar" src={user.avatar} alt="User Avatar" />
            <div className="level-badge">
              <i className="fas fa-star"></i>
              <span>{user.level}</span>
            </div>
          </div>
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <div className="xp-progress">
            <div className="xp-bar">
              <div 
                className="xp-fill" 
                style={{ width: `${calculateProgress(user.xp)}%` }}
              ></div>
            </div>
            <p className="xp-text">{user.xp} XP / {(user.level + 1) * 1000} XP</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card fade-in">
          <i className="fas fa-trophy"></i>
          <h3>{user.totalPoints}</h3>
          <p>Total Points</p>
        </div>
        <div className="stat-card card fade-in">
          <i className="fas fa-map-marked-alt"></i>
          <h3>{user.completedPlaces}</h3>
          <p>Places Visited</p>
        </div>
        <div className="stat-card card fade-in">
          <i className="fas fa-certificate"></i>
          <h3>{user.collectedNFTs}</h3>
          <p>NFTs Collected</p>
        </div>
      </div>

      <div className="achievements-section card fade-in">
        <h2>
          <i className="fas fa-award"></i>
          Achievements
        </h2>
        <div className="achievements-grid">
          {user.achievements.map(achievement => (
            <div key={achievement.id} className="achievement-card">
              <i className={`fas fa-${achievement.icon}`}></i>
              <div className="achievement-info">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-activity card fade-in">
        <h2>
          <i className="fas fa-history"></i>
          Recent Activity
        </h2>
        <div className="activity-list">
          {user.recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <i className={`fas fa-${activity.icon}`}></i>
              <div className="activity-info">
                <h3>{activity.action} {activity.place}</h3>
                <p>{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;