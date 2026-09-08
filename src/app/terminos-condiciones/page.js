import { getLegalPageContent } from '@/services/api';
import { sanitizeRichText } from '@/utils/sanitizeHtml';

export const metadata = {
  title: "Términos y Condiciones",
};

// Página completamente dinámica (sin caché): refleja los cambios del admin al instante
export const dynamic = 'force-dynamic';

const DEFAULT_SECTIONS = [
  { title: '1. Objeto del sitio web', content: 'El presente sitio web es operado por Corporación Topsell S.A.C., y tiene como finalidad mostrar un catálogo referencial de productos, permitir la solicitud de cotizaciones y la suscripción para recibir información comercial. El uso del sitio web no constituye una venta directa ni genera una relación contractual automática.' },
  { title: '2. Uso del sitio', content: 'El usuario se compromete a utilizar el sitio web de forma lícita y adecuada, proporcionar información veraz y actualizada en los formularios de contacto, cotización o suscripción, y no realizar acciones que afecten la seguridad, funcionamiento o contenido del sitio web. Corporación Topsell S.A.C. se reserva el derecho de limitar o bloquear el acceso a usuarios que incumplan estas condiciones.' },
  { title: '3. Solicitudes de cotización', content: 'Las cotizaciones solicitadas a través del sitio web son referenciales y no vinculantes. Están sujetas a validación posterior, disponibilidad de stock y confirmación por parte de Corporación Topsell S.A.C. El envío de una cotización no implica reserva de productos ni obligación de venta.' },
  { title: '4. Precios, promociones y disponibilidad', content: 'Corporación Topsell S.A.C. se reserva el derecho de modificar precios, promociones, condiciones comerciales y disponibilidad de productos en cualquier momento y sin previo aviso. La información publicada en este sitio web es válida únicamente dentro de esta plataforma. Las imágenes y descripciones de los productos son referenciales y pueden presentar variaciones.' },
  { title: '5. Propiedad intelectual', content: 'Todos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, marcas, diseños y material gráfico, son propiedad de Corporación Topsell S.A.C. o se utilizan con autorización. Queda prohibida su reproducción total o parcial sin autorización expresa.' },
  { title: '6. Responsabilidad', content: 'Corporación Topsell S.A.C. no garantiza que el sitio web esté libre de errores, interrupciones o fallas técnicas, ni se hace responsable por daños derivados del uso de la información publicada. El uso del sitio se realiza bajo responsabilidad del usuario.' },
  { title: '7. Enlaces externos', content: 'El sitio web puede contener enlaces a páginas de terceros. Corporación Topsell S.A.C. no se responsabiliza por el contenido, políticas o prácticas de dichos sitios.' },
  { title: '8. Legislación aplicable', content: 'Los presentes Términos y Condiciones se rigen por las leyes de la República del Perú.' },
];

export default async function TerminosCondiciones() {
  const data = await getLegalPageContent('terminos-condiciones');
  const title    = data?.title    || 'TÉRMINOS Y CONDICIONES';
  const sections = data?.sections?.length ? data.sections : DEFAULT_SECTIONS;

  return (
    <main className="bg-white min-h-screen py-20 px-6 text-gray-800">
      <article className="max-w-5xl mx-auto">
        <header className="mb-16 border-b-2 border-primary pb-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-secondary">
            {title}
          </h1>
          <p className="text-xl font-bold text-gray-600">Corporación Topsell S.A.C.</p>
        </header>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-black uppercase text-secondary mb-4">{section.title}</h2>
              <div
                className="rich-text-content text-xl leading-relaxed"
                style={{ fontSize: section.contentFontSize ? `${section.contentFontSize}px` : undefined }}
                dangerouslySetInnerHTML={{ __html: sanitizeRichText(section.content) }}
              />
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
