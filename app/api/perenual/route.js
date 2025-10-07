import { NextResponse } from 'next/server';
import { searchPlantDatabase } from '../plant-data';

const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY || '';
const PERENUAL_BASE_URL = process.env.PERENUAL_BASE_URL || 'https://perenual.com/api/species-list';

/**
 * GET /api/perenual?q=Scientific+Name
 * Proxy to Perenual (best-effort). If external call fails, fallback to local PLANT_DATABASE via searchPlantDatabase.
 * Returns an object with care, images, edibility, toxicity, watering, growth details, and a note/source field.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const alt = searchParams.get('alt') || '';
    const common = searchParams.get('common') || '';

    if (!q && !alt && !common) {
      return NextResponse.json({ error: 'Missing query parameter q/alt/common' }, { status: 400 });
    }

    // If no API key configured, immediately return local DB result (try q, alt, common in order)
    if (!PERENUAL_API_KEY) {
      const term = q || alt || common;
      const local = searchPlantDatabase(term) || {};
      return NextResponse.json({
        source: 'local',
        note: 'Perenual API key not configured; returning local curated data',
        data: {
          foundIn: local.foundIn || null,
          edibility: local.edibility || null,
          toxicity: local.toxicity || null,
          usage: local.usage || null,
          airPurifying: local.airPurifying || null,
          medicinal: local.medicinal || null,
          image: local.image || null,
        }
      });
    }

    // Helper to attempt fetch for a term with multiple strategies
    async function tryFetchTerm(term) {
      if (!term) return null;
      
      // Strategy 1: Try exact search with the term
      let url = `${PERENUAL_BASE_URL}?q=${encodeURIComponent(term)}&key=${encodeURIComponent(PERENUAL_API_KEY)}`;
      console.log('[Perenual] Trying term:', term, 'URL:', url);
      
      try {
        let resp = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!resp.ok) {
          const txt = await resp.text();
          console.warn('[Perenual] Non-OK response for term', term, resp.status, txt);
          
          // Strategy 2: If exact fails, try with only genus (first word)
          const genus = term.split(' ')[0];
          if (genus && genus !== term) {
            console.log('[Perenual] Trying genus only:', genus);
            url = `${PERENUAL_BASE_URL}?q=${encodeURIComponent(genus)}&key=${encodeURIComponent(PERENUAL_API_KEY)}`;
            resp = await fetch(url, { headers: { Accept: 'application/json' } });
            if (!resp.ok) {
              console.warn('[Perenual] Non-OK response for genus', genus, resp.status);
              return null;
            }
          } else {
            return null;
          }
        }
        
        const json = await resp.json();
        // Log raw JSON response for verification
        try {
          console.log('[Perenual] Raw response for term', term, ':', JSON.stringify(json, null, 2));
        } catch (logErr) {
          console.log('[Perenual] Raw response for term', term, ': (unable to stringify response)');
        }

        // If Perenual returns an empty data array explicitly, treat as no match
        if (json && Array.isArray(json.data) && json.data.length === 0) {
          console.warn('[Perenual] Response contains empty data array for term', term);

          // Heuristic: detect paywall/upgrade text in the response (Perenual may return HTML/text advising upgrade)
          const rawText = JSON.stringify(json).toLowerCase();
          if (rawText.includes('upgrade plans') || rawText.includes('subscription-api-pricing') || rawText.includes("i'm sorry") || rawText.includes('please upgrade')) {
            console.warn('[Perenual] Detected paywall/upgrade message in response for term', term);
            // Signal to caller that this is a paywall case by returning a special object
            return { paywall: true };
          }

          // Strategy 3: Try fuzzy search by removing spaces and trying as single word
          const singleWord = term.replace(/\s+/g, '');
          if (singleWord !== term && singleWord.length > 2) {
            console.log('[Perenual] Trying fuzzy single-word search:', singleWord);
            const fuzzyUrl = `${PERENUAL_BASE_URL}?q=${encodeURIComponent(singleWord)}&key=${encodeURIComponent(PERENUAL_API_KEY)}`;
            const fuzzyResp = await fetch(fuzzyUrl, { headers: { Accept: 'application/json' } });
            if (fuzzyResp.ok) {
              const fuzzyJson = await fuzzyResp.json();
              if (fuzzyJson && Array.isArray(fuzzyJson.data) && fuzzyJson.data.length > 0) {
                console.log('[Perenual] Fuzzy search succeeded with', fuzzyJson.data.length, 'results');
                json.data = fuzzyJson.data;
              }
            }
          }

          // If still empty, try partial match on first word
          if (json.data.length === 0) {
            const firstWord = term.split(' ')[0];
            if (firstWord && firstWord.length > 3) {
              console.log('[Perenual] Trying partial match on first word:', firstWord);
              const partialUrl = `${PERENUAL_BASE_URL}?q=${encodeURIComponent(firstWord)}&key=${encodeURIComponent(PERENUAL_API_KEY)}`;
              const partialResp = await fetch(partialUrl, { headers: { Accept: 'application/json' } });
              if (partialResp.ok) {
                const partialJson = await partialResp.json();
                if (partialJson && Array.isArray(partialJson.data) && partialJson.data.length > 0) {
                  console.log('[Perenual] Partial search succeeded with', partialJson.data.length, 'results');
                  json.data = partialJson.data;
                }
              }
            }
          }

          // If still no data after all strategies, return null (or paywall marker handled above)
          if (json.data.length === 0) {
            return null;
          }
        }

        // Determine the first species-like entry from common response shapes
        let first = null;
        if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
          first = json.data[0];
        } else if (json?.species && (Array.isArray(json.species) ? json.species[0] : json.species)) {
          first = Array.isArray(json.species) ? json.species[0] : json.species;
        } else if (json?.results && Array.isArray(json.results) && json.results.length > 0) {
          first = json.results[0];
        } else if (typeof json === 'object' && Object.keys(json).length > 0 && (json.scientific_name || json.common_name || json.id)) {
          // If the json itself looks like a species object, use it
          first = json;
        }

        if (!first) {
          console.warn('[Perenual] No species-like entry found in response for term', term);
          return null;
        }

        // Check if the species object contains paywall text in its fields
        const firstStr = JSON.stringify(first).toLowerCase();
        if (firstStr.includes('upgrade plans') || firstStr.includes('subscription-api-pricing') || firstStr.includes("i'm sorry") || firstStr.includes('please upgrade')) {
          console.warn('[Perenual] Detected paywall/upgrade message in species fields for term', term);
          return { paywall: true, term };
        }

        return { term, first };
      } catch (err) {
        console.warn('[Perenual] Fetch error for term', term, err.message);
        return null;
      }
    }

    // Try q, then alt, then common
    const attempts = [q, alt, common];
    let result = null;
    for (const term of attempts) {
      if (!term) continue;
      result = await tryFetchTerm(term);
      if (result) break;
    }

    // If a paywall was detected during attempts, return local fallback with paywall note
    if (result && result.paywall) {
      const term = q || alt || common;
      console.log('[Perenual] Paywall detected for term:', result.term || term, '- falling back to local DB');
      const local = searchPlantDatabase(term) || {};
      return NextResponse.json({
        source: 'local',
        note: 'Perenual data requires a paid subscription; showing local curated data instead',
        data: {
          foundIn: local.foundIn || null,
          edibility: local.edibility || null,
          toxicity: local.toxicity || null,
          usage: local.usage || null,
          airPurifying: local.airPurifying || null,
          medicinal: local.medicinal || null,
          image: local.image || null,
        }
      });
    }

    if (!result) {
      // All external attempts failed — fallback to local DB
      const term = q || alt || common;
      console.log('[Perenual] All attempts failed, falling back to local DB for term:', term);
      const local = searchPlantDatabase(term) || {};
      return NextResponse.json({
        source: 'local',
        note: 'Perenual API unavailable or returned no matches; using local curated data',
        data: {
          foundIn: local.foundIn || null,
          edibility: local.edibility || null,
          toxicity: local.toxicity || null,
          usage: local.usage || null,
          airPurifying: local.airPurifying || null,
          medicinal: local.medicinal || null,
          image: local.image || null,
        }
      });
    }

    const first = result.first;
    try {
      console.log('[Perenual] Mapping first result:', JSON.stringify(first, null, 2));
    } catch (err) {
      console.log('[Perenual] Mapping first result: (unable to stringify)');
    }

    // Map Perenual response fields to our expected structure
    // Based on typical Perenual API structure: { id, common_name, scientific_name, watering, sunlight, ... }
    const mapped = {
      source: 'perenual',
      note: `Data from Perenual API (matched term: ${result.term})`,
      data: {
        // Perenual typical fields
        commonName: first?.common_name || null,
        scientificName: first?.scientific_name || null,
        otherNames: first?.other_name || null,
        family: first?.family || null,
        origin: first?.origin || null,
        type: first?.type || null,
        dimension: first?.dimension || null,
        cycle: first?.cycle || null,
        watering: first?.watering || null,
        sunlight: Array.isArray(first?.sunlight) ? first.sunlight.join(', ') : first?.sunlight || null,
        maintenance: first?.maintenance || null,
        growthRate: first?.growth_rate || null,
        indoor: first?.indoor !== undefined ? (first.indoor ? 'Yes' : 'No') : null,
        
        // Care level and details
        care_level: first?.care_level || null,
        description: first?.description || null,
        
        // Propagation
        propagation: Array.isArray(first?.propagation) ? first.propagation.join(', ') : first?.propagation || null,
        
        // Hardiness
        hardiness: first?.hardiness ? `${first.hardiness.min || ''}-${first.hardiness.max || ''}` : null,
        hardiness_location: first?.hardiness_location ? 
          `Min: ${first.hardiness_location.full_url || ''}, Max: ${first.hardiness_location.full_iframe || ''}` : null,
        
        // Flowering and fruiting
        flowers: first?.flowers !== undefined ? (first.flowers ? 'Yes' : 'No') : null,
        flowering_season: first?.flowering_season || null,
        fruits: first?.fruits !== undefined ? (first.fruits ? 'Yes' : 'No') : null,
        fruit_color: Array.isArray(first?.fruit_color) ? first.fruit_color.join(', ') : first?.fruit_color || null,
        
        // Safety
        poisonous_to_humans: first?.poisonous_to_humans !== undefined ? (first.poisonous_to_humans ? 'Yes' : 'No') : null,
        poisonous_to_pets: first?.poisonous_to_pets !== undefined ? (first.poisonous_to_pets ? 'Yes' : 'No') : null,
        
        // Images
        thumbnail: first?.default_image?.thumbnail || first?.default_image?.small_url || null,
        images: first?.default_image ? [{ 
          url: first.default_image.original_url || first.default_image.regular_url || first.default_image.medium_url || first.default_image.small_url,
          thumbnail: first.default_image.thumbnail 
        }] : [],
        
        // Additional care details (fallback for alternate structure)
        edibility: first?.edible_leaf !== undefined ? (first.edible_leaf ? 'Leaves edible' : 'Not edible') : null,
        drought_tolerant: first?.drought_tolerant !== undefined ? (first.drought_tolerant ? 'Yes' : 'No') : null,
        salt_tolerant: first?.salt_tolerant !== undefined ? (first.salt_tolerant ? 'Yes' : 'No') : null,
        thorny: first?.thorny !== undefined ? (first.thorny ? 'Yes' : 'No') : null,
        invasive: first?.invasive !== undefined ? (first.invasive ? 'Yes' : 'No') : null,
        tropical: first?.tropical !== undefined ? (first.tropical ? 'Yes' : 'No') : null,
        
        // Medicinal and culinary
        medicinal: first?.medicinal !== undefined ? (first.medicinal ? 'Yes' : 'No') : null,
        cuisine: first?.cuisine !== undefined ? (first.cuisine ? 'Yes' : 'No') : null,
        
        // Keep old fallback structure
        care: first?.care || first?.growth?.care || first?.attributes?.care || null,
        growth: first?.growth || null,
        climate: first?.climate || null,
        toxicity: null, // Will be set below
        usage: null, // Will be set below
      }
    };

    // Synthesize toxicity and usage from mapped fields
    if (mapped.data.poisonous_to_humans === 'Yes' || mapped.data.poisonous_to_pets === 'Yes') {
      mapped.data.toxicity = `Poisonous to ${mapped.data.poisonous_to_humans === 'Yes' ? 'humans' : ''}${mapped.data.poisonous_to_humans === 'Yes' && mapped.data.poisonous_to_pets === 'Yes' ? ' and ' : ''}${mapped.data.poisonous_to_pets === 'Yes' ? 'pets' : ''}`;
    } else if (mapped.data.poisonous_to_humans === 'No' && mapped.data.poisonous_to_pets === 'No') {
      mapped.data.toxicity = 'Non-toxic';
    }

    if (mapped.data.indoor) {
      mapped.data.usage = `${mapped.data.indoor === 'Yes' ? 'Indoor' : 'Outdoor'} plant`;
    }

    try {
      console.log('[Perenual] Final mapped data:', JSON.stringify(mapped, null, 2));
    } catch (err) {
      console.log('[Perenual] Final mapped data: (unable to stringify)');
    }

    return NextResponse.json(mapped);

  } catch (error) {
    console.error('[Perenual] Error in perenual proxy route:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
