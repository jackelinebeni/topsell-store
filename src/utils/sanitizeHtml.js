import DOMPurify from 'isomorphic-dompurify';

// Solo permite negrita y listas con viñetas; bloquea scripts, estilos y atributos peligrosos.
const ALLOWED_TAGS = ['b', 'strong', 'ul', 'li', 'br'];

export function sanitizeRichText(html) {
  if (!html) return '';
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR: [] });
}
