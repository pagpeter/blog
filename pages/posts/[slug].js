import { getGlobalData } from '../../utils/global-data';
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  getPostFilePaths,
} from '../../utils/mdx-utils';

import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import CustomImage from '../../components/CustomImage';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';

const components = {
  a: CustomLink,
  Head,
  img: CustomImage,
};

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function PostPage({
  source,
  frontMatter,
  prevPost,
  nextPost,
  globalData,
  slug,
}) {
  return (
    <Layout>
      <SEO
        title={`${frontMatter.title} — ${globalData.name}`}
        description={frontMatter.description}
      />
      <Header name={globalData.name} tagline={globalData.tagline} />
      <article data-sb-object-id={`posts/${slug}.mdx`}>
        <header className="mb-10">
          <p className="mb-3 text-sm text-muted tabular-nums">
            {formatDate(frontMatter.date)}
          </p>
          <h1
            className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
            data-sb-field-path="title"
          >
            {frontMatter.title}
          </h1>
          {frontMatter.description && (
            <p
              className="mt-3 text-base text-muted"
              data-sb-field-path="description"
            >
              {frontMatter.description}
            </p>
          )}
        </header>
        <div className="prose-terminal" data-sb-field-path="markdown_content">
          <MDXRemote {...source} components={components} />
        </div>
        {(prevPost || nextPost) && (
          <nav className="mt-16 grid grid-cols-1 gap-3 border-t border-faint pt-6 text-sm sm:grid-cols-2">
            <div>
              {prevPost && (
                <Link
                  href={`/posts/${prevPost.slug}`}
                  className="flex flex-col text-muted hover:text-fg"
                >
                  <span className="text-xs uppercase tracking-wider">
                    ← prev
                  </span>
                  <span className="mt-1 text-fg">{prevPost.title}</span>
                </Link>
              )}
            </div>
            <div className="sm:text-right">
              {nextPost && (
                <Link
                  href={`/posts/${nextPost.slug}`}
                  className="flex flex-col text-muted hover:text-fg"
                >
                  <span className="text-xs uppercase tracking-wider">
                    next →
                  </span>
                  <span className="mt-1 text-fg">{nextPost.title}</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </article>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug);
  const prevPost = getPreviousPostBySlug(params.slug);
  const nextPost = getNextPostBySlug(params.slug);

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
      prevPost,
      nextPost,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getPostFilePaths()
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
