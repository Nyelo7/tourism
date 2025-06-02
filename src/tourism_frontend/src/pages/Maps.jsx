import React, { useState } from 'react';
import pangasinanImg from '../images/pangasinan.png';
import '../styles/Maps.css';
import '../styles/theme.css';
import BottomNav from '../components/BottomNav1';
import QRScanner from '../components/QRScanner';

const Map = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const regions = [
    { id: 1, name: 'Lingayen', sites: 3, completed: 2 },
    { id: 2, name: 'Bolinao', sites: 4, completed: 1 },
    { id: 3, name: 'Alaminos', sites: 5, completed: 3 },
    { id: 4, name: 'Dagupan', sites: 3, completed: 0 }
  ];

  const handleQRResult = (result) => {
    try {
      const [prefix, type, regionId, siteId] = result.split(':');
      
      if (prefix === 'tourism' && type === 'site') {
        const region = regions.find(r => r.id === parseInt(regionId));
        if (region) {
          setSelectedRegion(region.id);
          setScanResult({
            regionId: parseInt(regionId),
            siteId: parseInt(siteId),
            timestamp: new Date().toISOString()
          });
          
        } else {
          console.error('Region not found:', regionId);
        }
      } else {
        console.error('Invalid QR code format');
      }
    } catch (err) {
      console.error('Error processing QR code:', err);
    }
    
    setShowScanner(false);
  };

  return (
    <div className="page-container map-page">
      <div className="map-header card fade-in">
        <h1>Heritage Map</h1>
        <p className="subtitle">Explore cultural landmarks across Pangasinan</p>
        
        <div className="map-stats">
          <div className="map-stat">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h3>15</h3>
              <p>Total Sites</p>
            </div>
          </div>
          <div className="map-stat">
            <i className="fas fa-check-circle"></i>
            <div>
              <h3>6</h3>
              <p>Visited</p>
            </div>
          </div>
          <div className="map-stat">
            <i className="fas fa-trophy"></i>
            <div>
              <h3>40%</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="map-content card fade-in">
        <div className="map-wrapper">
          <img src={pangasinanImg} alt="Pangasinan Heritage Map" className="map-image" />
          <div className="map-overlay">
            {/* Add interactive map markers here */}
          </div>
        </div>
      </div>

      <div className="regions-grid">
        {regions.map(region => (
          <div 
            key={region.id} 
            className={`region-card card fade-in ${selectedRegion === region.id ? 'active' : ''}`}
            onClick={() => setSelectedRegion(region.id)}
          >
            <div className="region-header">
              <h3>{region.name}</h3>
              <span className="completion-badge">
                {region.completed}/{region.sites}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(region.completed / region.sites) * 100}%` }}
              ></div>
            </div>
            <div className="region-footer">
              <span>
                <i className="fas fa-landmark"></i>
                {region.sites} Heritage Sites
              </span>
              <button className="button-primary">
                Explore
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="floating-action-button"
        onClick={() => setShowScanner(true)}
        aria-label="Scan QR Code"
      >
        <i className="fas fa-qrcode"></i>
      </button>

      {showScanner && (
        <QRScanner
          onResult={handleQRResult}
          onClose={() => setShowScanner(false)}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default Map;