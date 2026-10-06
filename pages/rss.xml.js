import { getGlobalData } from '../utils/global-data';
import { getPosts } from '../utils/mdx-utils';
import { getSiteUrl } from '../utils/site-url';

function escapeXml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };
    return entities[character];
  });
}

export async function getServerSideProps({ req, res }) {
  const siteUrl = getSiteUrl(req);
  const { name, tagline } = getGlobalData();
  const posts = getPosts();

  const items = posts.map(({ data, filePath }) => {
    const slug = filePath.replace(/\.mdx?$/, '');
    const url = new URL(`/posts/${encodeURIComponent(slug)}`, siteUrl).href;
    const published = new Date(data.date).toUTCString();

    return `    <item>
      <title>${escapeXml(data.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${escapeXml(published)}</pubDate>
      <description>${escapeXml(data.description)}</description>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(name)}</title>
    <link>${escapeXml(siteUrl.href)}</link>
    <description>${escapeXml(tagline)}</description>
    <language>en</language>
${items.join('\n')}
  </channel>
</rss>`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.end(xml);

  return { props: {} };
}

export default function Rss() {
  return null;
}
