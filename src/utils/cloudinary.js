/**
 * Transforma una URL de Cloudinary insertando parámetros de redimensionado.
 * Si la URL no es de Cloudinary, la retorna sin cambios.
 *
 * @param {string} url       - URL original de Cloudinary
 * @param {object} options
 * @param {number} [options.width]   - Ancho en píxeles
 * @param {number} [options.height]  - Alto en píxeles
 * @param {string} [options.crop]    - Modo de recorte: 'pad' (rellena sin recortar), 'fill', 'limit'
 * @param {string} [options.quality] - Calidad: 'auto' o número 1-100
 * @param {string} [options.format]  - Formato: 'auto' (elige WebP/AVIF según browser), 'jpg', 'png'
 */
export function getCloudinaryUrl(url, { width, height, crop = 'pad', quality = 'auto', format = 'auto' } = {}) {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  const parts = [];
  if (width)  parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (crop)   parts.push(`c_${crop}`);
  parts.push(`q_${quality}`);
  parts.push(`f_${format}`);

  return url.replace('/upload/', `/upload/${parts.join(',')}/`);
}
