import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.tagline} />
      <Header name={globalData.name} tagline={globalData.tagline} />
      <main className="w-full">
        <ul className="flex flex-col">
          {posts.map((post) => {
            const slug = post.filePath.replace(/\.mdx?$/, '');
            return (
              <li
                key={post.filePath}
                className="group border-b border-faint py-4 first:border-t"
                data-sb-object-id={`posts/${post.filePath}`}
              >
                <Link
                  href={`/posts/${slug}`}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <time
                    className="shrink-0 text-sm text-muted tabular-nums"
                    data-sb-field-path="date"
                    dateTime={post.data.date}
                  >
                    {formatDate(post.data.date)}
                  </time>
                  <div className="flex-1">
                    <h2
                      className="text-base font-medium text-fg group-hover:underline group-hover:decoration-fg underline-offset-4 decoration-muted"
                      data-sb-field-path="title"
                    >
                      {post.data.title}
                    </h2>
                    {post.data.description && (
                      <p
                        className="mt-1 text-sm text-muted line-clamp-2"
                        data-sb-field-path="description"
                      >
                        {post.data.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
