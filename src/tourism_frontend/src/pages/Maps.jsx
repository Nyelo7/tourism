import React, { useState } from 'react';
import pangasinanImg from '../images/pangasinan.png';
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
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <div className="bg-white shadow-md rounded-xl p-6 mx-4 mt-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800">Heritage Map</h1>
        <p className="text-gray-500">Explore cultural landmarks across Pangasinan</p>

        <div className="flex justify-around mt-6">
          <div className="flex items-center space-x-2">
            <i className="fas fa-map-marker-alt text-lg text-blue-500"></i>
            <div>
              <h3 className="text-lg font-bold text-gray-700">15</h3>
              <p className="text-sm text-gray-500">Total Sites</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-check-circle text-lg text-green-500"></i>
            <div>
              <h3 className="text-lg font-bold text-gray-700">6</h3>
              <p className="text-sm text-gray-500">Visited</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-trophy text-lg text-yellow-500"></i>
            <div>
              <h3 className="text-lg font-bold text-gray-700">40%</h3>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 animate-fade-in">
        <div className="relative rounded-xl overflow-hidden shadow-md max-w-2xl w-full mx-auto lg:w-2/4">
          <img
            src={pangasinanImg}
            alt="Pangasinan Heritage Map"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0">
            {/* Interactive markers go here */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4 mt-6">
        {regions.map(region => (
          <div
            key={region.id}
            className={`p-4 rounded-xl shadow-md transition-colors duration-300 cursor-pointer ${selectedRegion === region.id ? 'bg-blue-100 border-2 border-blue-400' : 'bg-white'
              } animate-fade-in`}
            onClick={() => setSelectedRegion(region.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{region.name}</h3>
              <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                {region.completed}/{region.sites}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${(region.completed / region.sites) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                <i className="fas fa-landmark mr-1"></i>
                {region.sites} Heritage Sites
              </span>
              <button className="flex items-center gap-1 text-blue-600 font-medium hover:underline">
                Explore
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setShowScanner(true)}
        aria-label="Scan QR Code"
      >
        <i className="fas fa-qrcode text-xl"></i>
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
