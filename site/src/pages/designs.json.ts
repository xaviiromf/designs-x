import type { APIRoute } from 'astro';
import { getDesigns, runtime, urls } from '../lib/site';

export const GET: APIRoute = async () => {
  const designs = await getDesigns();
  const body = designs.map((d) => ({ slug: d.id, ...d.data, runtime: runtime(d), urls: urls(d) }));
  return new Response(JSON.stringify(body, null, 2) + '\n', { headers: { 'Content-Type': 'application/json' } });
};
