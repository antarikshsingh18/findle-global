export interface Property {
  id: string; // Matched to your string IDs
  name: string;
  developer: string;
  neighborhood: string;
  city: 'Toronto' | 'Mississauga' | 'Oakville' | 'Hamilton'; // Added for Ontario filtering scope
  startingPrice: number;
  completionYear: number;
  status: 'Registration' | 'Selling' | 'Under Construction'; // Matched to your exact literal types
  imageUrl: string;
  isFeatured?: boolean; // Optional property for future use in highlighting certain listings
}

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'The Lumina Residences',
    developer: 'Apex Developments',
    neighborhood: 'Downtown Core',
    city: 'Toronto', // Added Ontario mapping
    startingPrice: 549000,
    completionYear: 2028,
    status: 'Registration',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Oak & Vine Towns',
    developer: 'Vanguard Communities',
    neighborhood: 'West End',
    city: 'Oakville', // Added Ontario mapping
    startingPrice: 799000,
    completionYear: 2027,
    status: 'Selling',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Horizon Tower 2',
    developer: 'Skyline Group',
    neighborhood: 'Waterfront District',
    city: 'Mississauga', // Added Ontario mapping
    startingPrice: 620000,
    completionYear: 2029,
    status: 'Under Construction',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
  }
];