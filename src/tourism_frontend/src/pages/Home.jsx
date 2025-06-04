import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav1';

const Home = () => {
  // Updated data for cities in Pangasinan, using placeholder image URLs
  const cities = [
    { id: 1, name: 'Dagupan City', image: 'https://via.placeholder.com/400x250?text=Dagupan+City', description: 'Known as the Bangus Capital of the World.', category: 'Urban' },
    { id: 2, name: 'Alaminos City', image: 'https://via.placeholder.com/400x250?text=Alaminos+City', description: 'Gateway to the Hundred Islands National Park.', category: 'Coastal' },
    { id: 3, name: 'Urdaneta City', image: 'https://via.placeholder.com/400x250?text=Urdaneta+City', description: 'A bustling trade and commercial center in Eastern Pangasinan.', category: 'Commercial' },
    { id: 4, name: 'San Carlos City', image: 'https://via.placeholder.com/400x250?text=San+Carlos+City', description: 'The largest city in Pangasinan by land area and population.', category: 'Agricultural' },
  ];

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Cities');

  // Updated filters for city categories
  const filters = [
    { label: 'All Cities', category: 'All Cities', icon: 'fas fa-city' },
    { label: 'Urban', category: 'Urban', icon: 'fas fa-building' },
    { label: 'Coastal', category: 'Coastal', icon: 'fas fa-water' },
    { label: 'Commercial', category: 'Commercial', icon: 'fas fa-store' },
    { label: 'Agricultural', category: 'Agricultural', icon: 'fas fa-leaf' },
  ];

  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = selectedFilter === 'All Cities' || city.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Tailwind color classes based on city category
  const categoryColors = {
    Urban: 'bg-indigo-500 text-white',
    Coastal: 'bg-blue-400 text-white',
    Commercial: 'bg-green-500 text-white',
    Agricultural: 'bg-yellow-600 text-white',
    'All Cities': 'bg-gray-300 text-gray-800',
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
            Discover the vibrant cities and municipalities of Pangasinan
          </p>
        </header>

        <section
          aria-label="Search cities"
          className="flex items-center bg-white rounded-full shadow-md px-4 py-2 max-w-md mx-auto sm:mx-0 mb-10 border border-gray-300"
        >
          <i className="fas fa-search text-gray-400 mr-3 text-lg" aria-hidden="true"></i>
          <input
            type="search"
            placeholder="Search cities..."
            className="flex-grow outline-none text-gray-800 placeholder-gray-400 text-base sm:text-lg"
            aria-label="Search cities"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </section>

        <section aria-label="Filter cities" className="flex flex-wrap gap-3 justify-center sm:justify-start mb-12">
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

        <section aria-label="City listings">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <Link
                  to={`/city/${city.id}`}
                  key={city.id}
                  className="relative group block rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[city.category]}`}
                    >
                      {city.category}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-cyan-600 transition-colors duration-200"
                        aria-label={`Explore ${city.name}`}
                        type="button"
                      >
                        <span>Explore</span>
                        <i className="fas fa-arrow-right text-sm" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{city.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{city.description}</p>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-star text-yellow-400" aria-hidden="true"></i>
                        <span>4.7</span>
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
              <p className="text-center text-gray-700 text-base col-span-full">No cities match your criteria.</p>
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