export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : 'Peter Pagenstedt';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : '';
  const tagline = process.env.BLOG_TAGLINE
    ? decodeURI(process.env.BLOG_TAGLINE)
    : 'notes on software, systems, and captchas';
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : '© ' + new Date().getFullYear() + ' peter pagenstedt';

  return {
    name,
    blogTitle,
    tagline,
    footerText,
  };
};
