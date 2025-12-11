import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MURREE_PLACES } from '../constants';
import { addToItinerary, removeFromItinerary, isInItinerary } from '../services/itineraryService';
import { MapPin, Star, Clock, Phone, Globe, Plus, Check, ArrowLeft, Navigation } from 'lucide-react';
import { Place } from '../types';

export const PlaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [inItinerary, setInItinerary] = useState(false);

  useEffect(() => {
    const found = MURREE_PLACES.find(p => p.id === id);
    if (found) {
      setPlace(found);
      setInItinerary(isInItinerary(found.id));
    } else {
      // Handle not found
      navigate('/explore');
    }
  }, [id, navigate]);

  const toggleItinerary = () => {
    if (!place) return;
    if (inItinerary) {
      removeFromItinerary(place.id);
      setInItinerary(false);
    } else {
      addToItinerary(place);
      setInItinerary(true);
    }
  };

  if (!place) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in">
      {/* Header Image */}
      <div className="relative h-64 md:h-96 w-full">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{place.name}</h1>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin size={16} className="mr-1" />
              <span>{place.location.address}</span>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={toggleItinerary}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${inItinerary ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-primary text-white hover:bg-green-700'}`}
            >
              {inItinerary ? <><Check size={20} /> Saved</> : <><Plus size={20} /> Add to Itinerary</>}
            </button>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lon}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              <Navigation size={20} />
              Directions
            </a>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-gray-100 py-6">
          <div className="col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">About</h3>
            <p className="text-gray-600 leading-relaxed">{place.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {place.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
             <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Rating</span>
                <div className="flex items-center text-yellow-500 font-bold">
                  <Star size={18} className="fill-current mr-1" />
                  {place.rating} / 5
                </div>
             </div>
             
             <div className="space-y-3 pt-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-3" />
                  <span>Open today: 09:00 - 22:00</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-3" />
                  <span>+92 300 1234567</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Globe size={16} className="mr-3" />
                  <span>www.visit-murree.com</span>
                </div>
             </div>
          </div>
        </div>

        {/* Reviews Section (Mock) */}
        <div>
           <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>
           {place.reviews.length > 0 ? (
             <div className="space-y-4">
               {place.reviews.map(review => (
                 <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                   <div className="flex justify-between items-center mb-1">
                     <span className="font-semibold text-gray-800">{review.user}</span>
                     <span className="text-xs text-gray-400">{review.date}</span>
                   </div>
                   <div className="flex text-yellow-400 text-xs mb-2">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={12} className={i < review.rating ? 'fill-current' : 'text-gray-300'} />
                     ))}
                   </div>
                   <p className="text-gray-600 text-sm">{review.comment}</p>
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-gray-500 italic">No reviews yet. Be the first to visit!</p>
           )}
        </div>

      </div>
    </div>
  );
};