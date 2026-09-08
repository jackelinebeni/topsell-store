import { getLegalPageContent } from '@/services/api';
import { sanitizeRichText } from '@/utils/sanitizeHtml';

// Página completamente dinámica (sin caché)
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Política de Privacidad",
};

const DEFAULT_SECTIONS = [
  { title: '1. Responsable del tratamiento de datos personales', content: 'Corporación Topsell S.A.C., con domicilio en Lima - Perú, es responsable del tratamiento de los datos personales recopilados a través de este sitio web, conforme a lo establecido en la Ley N° 29733 – Ley de Protección de Datos Personales y su Reglamento aprobado mediante Decreto Supremo N° 003-2013-JUS.' },
  { title: '2. Datos personales recopilados', content: 'A través de los formularios del sitio web se pueden recopilar: nombre y apellidos, correo electrónico, número de teléfono, empresa (si corresponde) e información proporcionada en solicitudes de cotización o contacto. No se recopilan datos sensibles ni información financiera.' },
  { title: '3. Finalidad del tratamiento de datos', content: 'Atender solicitudes de cotización. Contactar al usuario en relación con su consulta. Gestionar comunicaciones comerciales relacionadas con productos o servicios. Enviar información comercial, promociones o novedades, siempre que el usuario haya otorgado su consentimiento.' },
  { title: '4. Consentimiento del usuario', content: 'El usuario declara haber sido informado y otorga su consentimiento libre, previo, expreso, inequívoco e informado para el tratamiento de sus datos personales al completar y enviar los formularios del sitio web, de conformidad con la normativa vigente sobre protección de datos personales en el Perú.' },
  { title: '5. Seguridad y confidencialidad', content: 'Corporación Topsell S.A.C. adopta las medidas técnicas, organizativas y legales razonables necesarias para proteger los datos personales y garantizar su confidencialidad, evitando su alteración, pérdida, tratamiento o acceso no autorizado. Los datos personales no serán cedidos, vendidos ni compartidos con terceros sin autorización del titular, salvo obligación legal.' },
  { title: '6. Derechos del titular de los datos', content: 'El usuario puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición (derechos ARCO), así como los demás derechos reconocidos por la Ley N° 29733, enviando una solicitud al correo electrónico indicado en los canales oficiales de la empresa.' },
  { title: '7. Conservación de los datos', content: 'Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados o mientras exista una relación informativa o comercial con el usuario, salvo obligación legal de conservación por un plazo mayor.' },
  { title: '8. Modificaciones de la política', content: 'Corporación Topsell S.A.C. se reserva el derecho de modificar la presente Política de Privacidad para adaptarla a cambios normativos o mejoras en sus procesos. Cualquier modificación será publicada oportunamente en este sitio web.' },
];

export default async function PoliticaPrivacidad() {
  const data = await getLegalPageContent('politica-privacidad');
  const title    = data?.title    || 'POLÍTICA DE PRIVACIDAD';
  const sections = data?.sections?.length ? data.sections : DEFAULT_SECTIONS;

  return (
    <main className="bg-white min-h-screen py-20 px-6 text-gray-800">
      <article className="max-w-5xl mx-auto">
        <header className="mb-16 border-b-2 border-primary pb-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-secondary">
            {title}
          </h1>
          <div className="text-xl font-bold text-gray-600">
            <p>Corporación Topsell S.A.C.</p>
          </div>
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

