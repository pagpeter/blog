import { getPosts } from './mdx-utils';
import { getSiteUrl } from './site-url';

export function servePostMarkdown({ params, req, res }, contentType) {
  const post = getPosts().find(({ filePath }) =>
    filePath.replace(/\.mdx?$/, '') === params.slug
  );

  if (!post) {
    return { notFound: true };
  }

  const siteUrl = getSiteUrl(req);
  const articleUrl = new URL(`/posts/${encodeURIComponent(params.slug)}`, siteUrl);
  const content = [
    `# ${post.data.title}`,
    '',
    `Source: ${articleUrl.href}`,
    `Published: ${post.data.date}`,
    '',
    post.content.trim(),
    '',
  ].join('\n');

  res.setHeader('Content-Type', `${contentType}; charset=utf-8`);
  res.end(content);

  return { props: {} };
}
