import React from 'react';
import { Place } from '../types';
import { MapPin, Star } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-40 w-full">
        <img 
          src={place.image} 
          alt={place.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          {place.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{place.name}</h3>
          <div className="flex items-center text-yellow-500 text-sm font-semibold">
            <Star size={14} className="fill-current mr-1" />
            {place.rating}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-grow">
          {place.description}
        </p>

        <div className="flex items-center text-gray-500 text-xs mt-auto">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{place.location.address}</span>
        </div>
      </div>
    </div>
  );
};