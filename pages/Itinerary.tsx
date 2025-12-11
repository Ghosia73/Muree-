import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItinerary, removeFromItinerary } from '../services/itineraryService';
import { Place } from '../types';
import { Trash2, MapPin, Calendar, Share2 } from 'lucide-react';

export const Itinerary: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPlaces(getItinerary());
  }, []);

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeFromItinerary(id);
    setPlaces(getItinerary());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Itinerary</h2>
            <p className="text-gray-500">Plan your perfect trip to Murree</p>
        </div>
        <button className="flex items-center gap-2 text-primary hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
            <Share2 size={18} />
            <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {places.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-800">Your itinerary is empty</h3>
          <p className="text-gray-500 mb-6">Start exploring to add places to your list.</p>
          <button 
            onClick={() => navigate('/explore')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Explore Places
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {places.map((place, index) => (
                <div 
                    key={place.id}
                    onClick={() => navigate(`/place/${place.id}`)}
                    className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                    <div className="w-full sm:w-32 h-32 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
                         <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                         <div className="absolute top-0 left-0 bg-primary text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-br-lg">
                            {index + 1}
                         </div>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-gray-800">{place.name}</h3>
                                <button 
                                    onClick={(e) => handleRemove(e, place.id)}
                                    className="text-gray-400 hover:text-red-500 p-1"
                                    title="Remove from itinerary"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin size={14} className="mr-1" />
                                {place.location.address}
                            </div>
                            <div className="text-xs text-primary bg-green-50 inline-block px-2 py-1 rounded mt-2">
                                {place.category}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="p-4 bg-gray-50 flex justify-end">
                <a 
                    href={`https://www.google.com/maps/dir/${places.map(p => `${p.location.lat},${p.location.lon}`).join('/')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                    <MapPin size={18} />
                    View Full Route on Google Maps
                </a>
            </div>
        </div>
      )}
    </div>
  );
};