import { NextResponse } from 'next/server';
import { searchPlantDatabase } from '../plant-data.js';
import { NextResponse } from 'next/server';
import { searchPlantDatabase } from '../plant-data.js';

// Local-only trefle replacement: return curated data from our local database.
// This removes dependence on external Trefle API and avoids auth/token issues.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    if (!q) return NextResponse.json({ error: 'Missing query parameter q' }, { status: 400 });

    const local = searchPlantDatabase(q);
    if (local) {
      return NextResponse.json({
        foundIn: local.foundIn || 'Information unavailable',
        edibility: local.edibility || 'Unknown',
        medicinal: local.medicinal || 'Information not available',
        toxicity: local.toxicity || 'Information not available',
        usage: local.usage || 'Indoor/Outdoor',
        airPurifying: ('airPurifying' in local) ? local.airPurifying : null,
        raw: local,
        source: 'local',
        note: 'Using curated local plant database'
      });
    }

    // If no local data, return a generic fallback
    return NextResponse.json({
      foundIn: 'Information unavailable',
      edibility: 'Unknown',
      medicinal: 'Information not available',
      toxicity: 'Information not available',
      usage: 'Indoor/Outdoor',
      airPurifying: null,
      raw: null,
      source: 'fallback',
      note: 'No curated data available for this plant.'
    });
  } catch (err) {
    console.error('Error in /api/trefle (local) route:', err);
    return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
  }
}
    // auto
