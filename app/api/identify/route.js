import { NextResponse } from 'next/server';

const PLANTNET_API_KEY = process.env.PLANTNET_API_KEY || '2b10vOxvLNU2R0M1AgyPLqdn';
const PLANTNET_BASE_URL = process.env.PLANTNET_BASE_URL || 'https://my-api.plantnet.org/v2';

// Random environmental facts about plants
const ECO_FACTS = [
  "A single tree can absorb up to 48 pounds of carbon dioxide per year.",
  "Plants produce approximately 70% of the Earth's oxygen.",
  "The Amazon rainforest produces 20% of the world's oxygen supply.",
  "One acre of trees can remove up to 2.6 tons of carbon dioxide per year.",
  "Plants help reduce urban heat by providing shade and cooling through transpiration.",
  "Indoor plants can remove up to 87% of air toxins in 24 hours.",
  "Phytoplankton in the ocean produce more oxygen than all land plants combined.",
  "A mature tree can provide a day's oxygen supply for up to 4 people.",
  "Plants help prevent soil erosion and maintain water quality.",
  "Urban trees can reduce air conditioning costs by up to 30%.",
];

function getRandomEcoFact() {
  return ECO_FACTS[Math.floor(Math.random() * ECO_FACTS.length)];
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Prepare the form data for PlantNet API
    const plantNetFormData = new FormData();
    plantNetFormData.append('images', imageFile);
    plantNetFormData.append('organs', 'leaf'); // You can make this dynamic based on image content

    // Call PlantNet API
    const plantNetUrl = `${PLANTNET_BASE_URL}/identify/all?api-key=${PLANTNET_API_KEY}`;
    
    const response = await fetch(plantNetUrl, {
      method: 'POST',
      body: plantNetFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PlantNet API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to identify plant', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Check if we got results
    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: 'No plant matches found. Please try a clearer image.' },
        { status: 404 }
      );
    }

    // Get the best match (highest score)
    const bestMatch = data.results[0];
    
    // Format the response
    const result = {
      scientificName: bestMatch.species.scientificNameWithoutAuthor || 'Unknown',
      commonNames: bestMatch.species.commonNames || [],
      family: bestMatch.species.family?.scientificNameWithoutAuthor || 'Unknown',
      genus: bestMatch.species.genus?.scientificNameWithoutAuthor || 'Unknown',
      score: Math.round(bestMatch.score * 100), // Convert to percentage
      images: bestMatch.images?.map(img => ({
        url: img.url?.o || img.url?.m || img.url?.s,
        organ: img.organ,
        author: img.author,
        license: img.license
      })) || [],
      ecoFact: getRandomEcoFact(),
      // Include additional matches for reference
      alternativeMatches: data.results.slice(1, 4).map(match => ({
        scientificName: match.species.scientificNameWithoutAuthor,
        commonNames: match.species.commonNames || [],
        score: Math.round(match.score * 100)
      }))
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in identify API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
