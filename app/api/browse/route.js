import { NextResponse } from 'next/server';

const TREFLE_API_KEY = 'usr-n11IOeYk-nvpJCtfadc8VJlDJaMOLVZm_NVh9sHbrno';
const TREFLE_BASE_URL = 'https://trefle.io/api/v1';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');

    let trefleUrl;
    
    if (searchQuery) {
      // Search for specific plants
      trefleUrl = `${TREFLE_BASE_URL}/plants/search?token=${TREFLE_API_KEY}&q=${encodeURIComponent(searchQuery)}&page=${page}`;
    } else {
      // Browse all plants
      trefleUrl = `${TREFLE_BASE_URL}/plants?token=${TREFLE_API_KEY}&page=${page}`;
    }

    const response = await fetch(trefleUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Trefle API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch plants from Trefle API', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Format the response to match our browse page expectations
    const formattedPlants = (data.data || []).map(plant => ({
      id: plant.id,
      scientificName: plant.scientific_name,
      commonName: plant.common_name || null,
      family: plant.family_common_name || plant.family || null,
      genus: plant.genus || null,
      imageUrl: plant.image_url,
      year: plant.year,
      slug: plant.slug,
    }));

    return NextResponse.json({
      plants: formattedPlants,
      meta: {
        page: page,
        total: data.meta?.total || 0,
      }
    });

  } catch (error) {
    console.error('Error in browse API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
