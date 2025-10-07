import { NextResponse } from 'next/server';

// Local mock plant data only
const MOCK_PLANTS = [
  {
    id: 1,
    scientificName: 'Ficus lyrata',
    commonName: 'Fiddle Leaf Fig',
    family: 'Moraceae',
    genus: 'Ficus',
    imageUrl: '/plants/ficus-lyrata.jpg',
    year: 1894,
    slug: 'ficus-lyrata',
  },
  {
    id: 2,
    scientificName: 'Monstera deliciosa',
    commonName: 'Swiss Cheese Plant',
    family: 'Araceae',
    genus: 'Monstera',
    imageUrl: '/plants/monstera-deliciosa.jpg',
    year: 1840,
    slug: 'monstera-deliciosa',
  },
  // Add more mock plants as needed
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '15');

  let filteredPlants = MOCK_PLANTS;
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPlants = MOCK_PLANTS.filter(plant => 
      plant.scientificName.toLowerCase().includes(query) ||
      plant.commonName.toLowerCase().includes(query) ||
      plant.family.toLowerCase().includes(query) ||
      plant.genus.toLowerCase().includes(query)
    );
  }

  // Paginate mock data
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPlants = filteredPlants.slice(startIndex, endIndex);

  return NextResponse.json({
    plants: paginatedPlants,
    meta: {
      page: page,
      total: filteredPlants.length,
    }
  });
}
