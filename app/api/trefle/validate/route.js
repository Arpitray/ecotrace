import { NextResponse } from 'next/server';

const TREFLE_API_KEY = process.env.TREFLE_API_KEY || '';
const TREFLE_BASE_URL = 'https://trefle.io/api/v1';

async function fetchWithQuery(id) {
  const url = `${TREFLE_BASE_URL}/plants/${encodeURIComponent(id)}?token=${encodeURIComponent(TREFLE_API_KEY)}`;
  try {
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
    const text = await resp.text().catch(() => '');
    return { ok: resp.ok, status: resp.status, body: text };
  } catch (e) {
    return { ok: false, status: 0, body: String(e) };
  }
}

async function fetchWithHeader(id) {
  const url = `${TREFLE_BASE_URL}/plants/${encodeURIComponent(id)}`;
  try {
    const resp = await fetch(url, { headers: { Accept: 'application/json', Authorization: `Bearer ${TREFLE_API_KEY}` } });
    const text = await resp.text().catch(() => '');
    return { ok: resp.ok, status: resp.status, body: text };
  } catch (e) {
    return { ok: false, status: 0, body: String(e) };
  }
}

export async function GET(request) {
  try {
    if (!TREFLE_API_KEY) {
      return NextResponse.json({ ok: false, message: 'TREFLE_API_KEY is not set in environment (.env.local).' }, { status: 400 });
    }

    // Test a known id (1) which should exist in the API if token/auth is valid.
    const id = 1;
    const [q, h] = await Promise.all([fetchWithQuery(id), fetchWithHeader(id)]);

    // Basic analysis to recommend which transport (if any) appears valid
    const recommendation = (() => {
      if (q.ok && !h.ok) return 'query-param';
      if (h.ok && !q.ok) return 'header';
      if (q.ok && h.ok) return 'either';
      return 'none';
    })();

    // If both failed with the JWT/segments message, surface that clearly
    const qmsg = (q.body || '').toLowerCase();
    const hmsg = (h.body || '').toLowerCase();
    const jwtHint = (qmsg.includes('not enough') && qmsg.includes('segments')) || (hmsg.includes('not enough') && hmsg.includes('segments'));

    return NextResponse.json({ ok: recommendation !== 'none', recommendation, query: q, header: h, jwtHint, note: jwtHint ? 'Trefle returned a JWT parsing error ("Not enough or too many segments"). This typically indicates the provided token is not the expected JWT/bearer format. Consider regenerating your token and ensuring no extra whitespace exists in .env.local.' : undefined });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message || String(err) }, { status: 500 });
  }
}
