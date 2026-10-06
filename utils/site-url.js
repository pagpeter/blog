export function getSiteUrl(req) {
  if (process.env.SITE_URL) {
    return new URL(process.env.SITE_URL);
  }

  const host = req.headers.host || 'localhost:3000';
  const forwardedProto = req.headers['x-forwarded-proto'];
  const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto)
    ?.split(',')[0] || (host.startsWith('localhost') ? 'http' : 'https');
  return new URL(`${protocol}://${host}`);
}
