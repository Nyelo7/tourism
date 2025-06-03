import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav1';
import bolinaoImage from '../images/bolinao.jpg';
import hundredImage from '../images/hundreds.jpg';
import manleluagImage from '../images/manleluag.jpg';
import salasaImage from '../images/salasa.jpg';

const Home = () => {
  const sites = [
    { id: 1, name: 'Hundred Island', image: hundredImage, description: 'A National Park featuring 124 stunning islands and islets', category: 'Nature' },
    { id: 2, name: 'Cape Bolinao Lighthouse', image: bolinaoImage, description: 'Historic Spanish colonial lighthouse overlooking the West Philippine Sea', category: 'Historical' },
    { id: 3, name: 'Salasa Church', image: salasaImage, description: 'Beautiful baroque church showcasing Spanish colonial architecture', category: 'Churches' },
    { id: 4, name: 'Manleluag Church', image: manleluagImage, description: 'Historic church known for its religious significance and architecture', category: 'Churches' },
  ];

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Sites');

  const filters = [
    { label: 'All Sites', category: 'All Sites', icon: 'fas fa-landmark' },
    { label: 'Churches', category: 'Churches', icon: 'fas fa-church' },
    { label: 'Nature', category: 'Nature', icon: 'fas fa-mountain' },
    { label: 'Historical', category: 'Historical', icon: 'fas fa-monument' },
  ];

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = selectedFilter === 'All Sites' || site.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Tailwind color classes based on category
  const categoryColors = {
    Churches: 'bg-cyan-500 text-white',
    Nature: 'bg-yellow-400 text-gray-800',
    Historical: 'bg-orange-500 text-white',
    'All Sites': 'bg-gray-300 text-gray-800',
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-poppins">
      <main className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 max-w-7xl mx-auto flex-grow">
        <header className="mb-12 text-center max-w-4xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-gray-800"
          >
            Hackatour
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-700">
            Explore cultural, historical, and natural landmarks in breathtaking beauty
          </p>
        </header>

        <section
          aria-label="Search heritage sites"
          className="flex items-center bg-white rounded-full shadow-md px-4 py-2 max-w-md mx-auto sm:mx-0 mb-10 border border-gray-300"
        >
          <i className="fas fa-search text-gray-400 mr-3 text-lg" aria-hidden="true"></i>
          <input
            type="search"
            placeholder="Search heritage sites..."
            className="flex-grow outline-none text-gray-800 placeholder-gray-400 text-base sm:text-lg"
            aria-label="Search heritage sites"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </section>

        <section aria-label="Filter heritage sites" className="flex flex-wrap gap-3 justify-center sm:justify-start mb-12">
          {filters.map(filter => (
            <button
              key={filter.label}
              type="button"
              onClick={() => setSelectedFilter(filter.category)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium shadow-sm transition duration-300 transform
                ${selectedFilter === filter.category
                  ? 'bg-gray-200 text-gray-800 scale-105 shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:scale-105'
                }`}
              aria-pressed={selectedFilter === filter.category}
              aria-label={`Filter by ${filter.label}`}
            >
              <i className={`${filter.icon} text-lg`} aria-hidden="true"></i>
              <span className="text-sm sm:text-base">{filter.label}</span>
            </button>
          ))}
        </section>

        <section aria-label="Heritage site listings">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredSites.length > 0 ? (
              filteredSites.map(site => (
                <Link
                  to={`/site/${site.id}`}
                  key={site.id}
                  className="relative group block rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[site.category]}`}
                    >
                      {site.category}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-cyan-600 transition-colors duration-200"
                        aria-label={`Explore ${site.name}`}
                        type="button"
                      >
                        <span>Explore</span>
                        <i className="fas fa-arrow-right text-sm" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{site.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{site.description}</p>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-star text-yellow-400" aria-hidden="true"></i>
                        <span>4.8</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-map-marker-alt text-cyan-500" aria-hidden="true"></i>
                        <span>Pangasinan</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-700 text-base col-span-full">No sites match your criteria.</p>
            )}
          </div>
        </section>
      </main>

      <footer className="mt-auto bg-white shadow-inner">
        <BottomNav />
      </footer>
    </div>
  );
};

export default Home;
