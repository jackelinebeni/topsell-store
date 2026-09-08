// Solo permite negrita y listas con viñetas; bloquea scripts, estilos y atributos peligrosos.
// Implementación sin jsdom: html-encoding-sniffer (dependencia de jsdom) requiere un paquete
// solo-ESM que Turbopack no puede cargar en el runtime serverless de Vercel (ERR_REQUIRE_ESM).
const ALLOWED_TAGS = new Set(['b', 'strong', 'ul', 'li', 'br']);

export function sanitizeRichText(html) {
  if (!html || typeof html !== 'string') return '';

  // Descarta por completo bloques de contenido peligroso junto con su contenido.
  let clean = html.replace(/<!--[\s\S]*?-->/g, '');
  clean = clean.replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, '');

  // Cualquier etiqueta fuera de la lista blanca se elimina; las permitidas pierden sus atributos
  // (así no sobrevive ningún vector de XSS vía onerror/onclick/href="javascript:"/style, etc.).
  clean = clean.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tagName) => {
    const tag = tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return '';
    return match.startsWith('</') ? `</${tag}>` : `<${tag}>`;
  });

  return clean;
}
