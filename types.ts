export interface Location {
  lat: number;
  lon: number;
  address: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export type PlaceCategory = 'Viewpoint' | 'Restaurant' | 'Hotel' | 'Attraction' | 'Shopping';

export interface Place {
  id: string;
  name: string;
  description: string;
  category: PlaceCategory;
  image: string;
  location: Location;
  rating: number;
  reviews: Review[];
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}