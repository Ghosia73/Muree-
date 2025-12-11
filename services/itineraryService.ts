import { Place } from '../types';

const STORAGE_KEY = 'murree_itinerary';

export const getItinerary = (): Place[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load itinerary", e);
    return [];
  }
};

export const addToItinerary = (place: Place): void => {
  const current = getItinerary();
  if (!current.find(p => p.id === place.id)) {
    const updated = [...current, place];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};

export const removeFromItinerary = (placeId: string): void => {
  const current = getItinerary();
  const updated = current.filter(p => p.id !== placeId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isInItinerary = (placeId: string): boolean => {
  const current = getItinerary();
  return !!current.find(p => p.id === placeId);
};
