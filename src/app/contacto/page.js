import { getContactPageContent } from '@/services/api';
import ContactFormWrapper from './ContactFormWrapper';

// Página completamente dinámica (sin caché)
export const dynamic = 'force-dynamic';

export default async function ContactoPage() {
  const content = await getContactPageContent();
  return <ContactFormWrapper content={content} />;
}
