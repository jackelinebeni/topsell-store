'use client';
import React from 'react';

export default function TerminosCondiciones() {
  return (
    <main className="bg-white min-h-screen py-20 px-6 text-gray-800">
      <article className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <header className="mb-16 border-b-2 border-primary pb-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-secondary">
            Términos y Condiciones
          </h1>
          <p className="text-xl font-bold text-gray-600">Corporación Topsell S.A.C.</p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">1. Objeto del sitio web</h2>
            <p className="text-xl leading-relaxed">
              El presente sitio web es operado por Corporación Topsell S.A.C., y tiene como finalidad mostrar un catálogo referencial de productos, permitir la solicitud de cotizaciones y la suscripción para recibir información comercial.
            </p>
            <p className="mt-4 text-xl font-bold italic">
              El uso del sitio web no constituye una venta directa ni genera una relación contractual automática.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">2. Uso del sitio</h2>
            <p className="text-xl mb-4">El usuario se compromete a:</p>
            <ul className="list-disc list-inside space-y-2 text-xl pl-4">
              <li>Utilizar el sitio web de forma lícita y adecuada.</li>
              <li>Proporcionar información veraz y actualizada en los formularios de contacto, cotización o suscripción.</li>
              <li>No realizar acciones que afecten la seguridad, funcionamiento o contenido del sitio web.</li>
            </ul>
            <p className="mt-4 text-xl leading-relaxed">
              Corporación Topsell S.A.C. se reserva el derecho de limitar o bloquear el acceso a usuarios que incumplan estas condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">3. Solicitudes de cotización</h2>
            <ul className="list-disc list-inside space-y-3 text-xl pl-4">
              <li>Las cotizaciones solicitadas a través del sitio web son referenciales y no vinculantes.</li>
              <li>Están sujetas a validación posterior, disponibilidad de stock y confirmación por parte de Corporación Topsell S.A.C.</li>
              <li>El envío de una cotización no implica reserva de productos ni obligación de venta.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">4. Precios, promociones y disponibilidad</h2>
            <ul className="list-disc list-inside space-y-3 text-xl pl-4">
              <li>Corporación Topsell S.A.C. se reserva el derecho de modificar precios, promociones, condiciones comerciales y disponibilidad de productos en cualquier momento y sin previo aviso.</li>
              <li>La información publicada en este sitio web es válida únicamente dentro de esta plataforma y no aplica necesariamente a otros medios.</li>
              <li>Las imágenes y descripciones de los productos son referenciales y pueden presentar variaciones.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">5. Propiedad intelectual</h2>
            <p className="text-xl leading-relaxed">
              Todos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, marcas, diseños y material gráfico, son propiedad de Corporación Topsell S.A.C. o se utilizan con autorización. Queda prohibida su reproducción total o parcial sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">6. Responsabilidad</h2>
            <p className="text-xl leading-relaxed">
              Corporación Topsell S.A.C. no garantiza que el sitio web esté libre de errores, interrupciones o fallas técnicas, ni se hace responsable por daños derivados del uso de la información publicada. El uso del sitio se realiza bajo responsabilidad del usuario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">7. Enlaces externos</h2>
            <p className="text-xl leading-relaxed">
              El sitio web puede contener enlaces a páginas de terceros. Corporación Topsell S.A.C. no se responsabiliza por el contenido, políticas o prácticas de dichos sitios.
            </p>
          </section>

          <section className="pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">8. Legislación aplicable</h2>
            <p className="text-xl leading-relaxed font-bold">
              Los presentes Términos y Condiciones se rigen por las leyes de la República del Perú.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}