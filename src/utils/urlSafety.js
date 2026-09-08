// Evita esquemas peligrosos (ej. javascript:) en URLs administrables que se usan como href.
export function safeExternalUrl(url, fallback = '#') {
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : fallback;
}

// Deja solo dígitos, para construir enlaces wa.me sin inyectar segmentos extra en la URL.
export function safeWhatsappNumber(number, fallback = '') {
  if (!number || typeof number !== 'string') return fallback;
  const digits = number.replace(/\D/g, '');
  return digits || fallback;
}
