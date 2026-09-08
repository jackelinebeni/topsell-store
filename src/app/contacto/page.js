import { getContactPageContent } from '@/services/api';
import ContactFormWrapper from './ContactFormWrapper';

export default async function ContactoPage() {
  const content = await getContactPageContent();
  return <ContactFormWrapper content={content} />;
}
