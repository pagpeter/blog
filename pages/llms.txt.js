import { getGlobalData } from '../utils/global-data';
import { getPosts } from '../utils/mdx-utils';
import { getSiteUrl } from '../utils/site-url';

export async function getServerSideProps({ req, res }) {
  const siteUrl = getSiteUrl(req);
  const { name, tagline } = getGlobalData();
  const posts = getPosts();

  const articles = posts.map(({ data, filePath }) => {
    const slug = filePath.replace(/\.mdx?$/, '');
    const url = new URL(`/posts/${encodeURIComponent(slug)}/content.md`, siteUrl);
    return `- [${data.title}](${url.href})${data.description ? `: ${data.description}` : ''}`;
  });

  const content = [
    `# ${name}`,
    '',
    `> ${tagline}`,
    '',
    `Website: ${siteUrl.href}`,
    '',
    '## Articles',
    '',
    ...articles,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(content);

  return { props: {} };
}

export default function Llms() {
  return null;
}
