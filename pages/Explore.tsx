import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MURREE_PLACES, CATEGORIES } from '../constants';
import { PlaceCard } from '../components/PlaceCard';
import { Filter } from 'lucide-react';

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || 'All';

  const filteredPlaces = useMemo(() => {
    return MURREE_PLACES.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(query.toLowerCase()) || 
                            place.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = categoryFilter === 'All' || place.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [query, categoryFilter]);

  const toggleCategory = (cat: string) => {
    if (categoryFilter === cat) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Explore Murree</h2>
        
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
          <Filter size={20} className="text-gray-500 flex-shrink-0" />
          <button 
            onClick={() => toggleCategory('All')}
            className={`px-3 py-1 rounded-full text-sm border transition-colors whitespace-nowrap ${categoryFilter === 'All' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300'}`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors whitespace-nowrap ${categoryFilter === cat ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {query && (
        <p className="text-gray-500">
          Showing results for "<span className="font-semibold text-gray-800">{query}</span>"
        </p>
      )}

      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard 
              key={place.id} 
              place={place} 
              onClick={() => navigate(`/place/${place.id}`)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">No places found matching your criteria.</p>
          <button 
            onClick={() => { setSearchParams({}); }}
            className="mt-4 text-primary font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};