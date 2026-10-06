import { servePostMarkdown } from '../../../utils/post-markdown';

export async function getServerSideProps({ params, req, res }) {
  return servePostMarkdown({ params, req, res }, 'text/markdown');
}

export default function PostMarkdown() {
  return null;
}
