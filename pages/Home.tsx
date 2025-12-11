import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { MURREE_PLACES, CATEGORIES } from '../constants';
import { PlaceCard } from '../components/PlaceCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const featuredPlaces = MURREE_PLACES.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden shadow-xl h-64 md:h-80 bg-gray-900">
        <img 
          src="https://picsum.photos/1000/500?grayscale" 
          alt="Murree Hills" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">Discover Murree</h2>
          <p className="text-lg md:text-xl mb-6 max-w-lg drop-shadow-sm">Find the best attractions, hotels, and viewpoints in the Queen of Hills.</p>
          
          <form onSubmit={handleSearch} className="w-full max-w-md relative">
            <input 
              type="text" 
              placeholder="Search places, hotels..." 
              className="w-full py-3 px-5 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-green-700 transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat}
              onClick={() => navigate(`/explore?category=${cat}`)}
              className="flex-shrink-0 px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-primary hover:text-primary transition-all whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Places */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Featured Places</h3>
          <button onClick={() => navigate('/explore')} className="text-primary text-sm font-semibold hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlaces.map((place) => (
            <PlaceCard 
              key={place.id} 
              place={place} 
              onClick={() => navigate(`/place/${place.id}`)} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};