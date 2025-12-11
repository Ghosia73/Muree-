import { Place, PlaceCategory } from './types';

export const MURREE_PLACES: Place[] = [
  {
    id: '1',
    name: 'Mall Road',
    description: 'The heart of Murree, famous for its shopping, restaurants, and colonial architecture. A must-visit for every tourist.',
    category: 'Shopping',
    image: 'https://picsum.photos/800/600?random=1',
    location: { lat: 33.907, lon: 73.394, address: 'Mall Road, Murree' },
    rating: 4.5,
    tags: ['Shopping', 'Food', 'Crowded', 'Nightlife'],
    reviews: [
      { id: 'r1', user: 'Ali K.', rating: 5, comment: 'Best place for evening walk.', date: '2023-10-12' },
      { id: 'r2', user: 'Sara M.', rating: 4, comment: 'Great food but very crowded.', date: '2023-11-05' }
    ]
  },
  {
    id: '2',
    name: 'Pindi Point',
    description: 'A scenic viewpoint offering a chairlift ride and panoramic views of the twin cities on a clear day.',
    category: 'Viewpoint',
    image: 'https://picsum.photos/800/600?random=2',
    location: { lat: 33.896, lon: 73.388, address: 'Pindi Point, Murree' },
    rating: 4.2,
    tags: ['Chairlift', 'Scenic', 'Nature'],
    reviews: [
      { id: 'r3', user: 'John D.', rating: 4, comment: 'Chairlift ride was fun.', date: '2023-09-20' }
    ]
  },
  {
    id: '3',
    name: 'Kashmir Point',
    description: 'The highest point in Murree, offering breathtaking views of the Kashmir mountains. quieter than Mall Road.',
    category: 'Viewpoint',
    image: 'https://picsum.photos/800/600?random=3',
    location: { lat: 33.912, lon: 73.402, address: 'Kashmir Point, Murree' },
    rating: 4.7,
    tags: ['Peaceful', 'Hiking', 'Views'],
    reviews: []
  },
  {
    id: '4',
    name: 'Patriata (New Murree)',
    description: 'Famous for its world-class chairlift and cable car system. A bit further from the main city but worth the trip.',
    category: 'Attraction',
    image: 'https://picsum.photos/800/600?random=4',
    location: { lat: 33.867, lon: 73.468, address: 'Patriata, Murree' },
    rating: 4.8,
    tags: ['Cable Car', 'Forest', 'Adventure'],
    reviews: []
  },
  {
    id: '5',
    name: 'Gloria Jean\'s Coffees',
    description: 'Enjoy a premium coffee experience with a view of the hills near the GPO.',
    category: 'Restaurant',
    image: 'https://picsum.photos/800/600?random=5',
    location: { lat: 33.906, lon: 73.393, address: 'Near GPO, Mall Road' },
    rating: 4.3,
    tags: ['Coffee', 'Wifi', 'Relax'],
    reviews: []
  },
  {
    id: '6',
    name: 'PC Bhurban',
    description: 'A luxury 5-star hotel located in Bhurban, offering top-tier amenities and stunning valley views.',
    category: 'Hotel',
    image: 'https://picsum.photos/800/600?random=6',
    location: { lat: 33.955, lon: 73.451, address: 'Bhurban, Murree' },
    rating: 4.9,
    tags: ['Luxury', 'Stay', 'Golf'],
    reviews: []
  }
];

export const CATEGORIES: PlaceCategory[] = ['Attraction', 'Viewpoint', 'Restaurant', 'Hotel', 'Shopping'];