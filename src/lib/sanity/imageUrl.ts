

// Accepts the { asset: { url } } shape returned by the GROQ projections in
// fetchProjects.ts (the query resolves the asset's CDN url directly, it
// does not return an asset._ref for the @sanity/image-url builder to use).
export function urlFor(source: unknown, width?: number): string | undefined {
  if (!source || typeof source !== 'object') return undefined;

  const asset = (source as { asset?: unknown }).asset;
  if (!asset || typeof asset !== 'object') return undefined;

  const url = (asset as { url?: string }).url;
  if (!url) return undefined;

  if (!width) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${width}`;
}
