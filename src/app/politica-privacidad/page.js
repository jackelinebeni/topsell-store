'use client';
import React from 'react';

export default function PoliticaPrivacidad() {
  return (
    <main className="bg-white min-h-screen py-20 px-6 text-gray-800">
      <article className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <header className="mb-16 border-b-2 border-primary pb-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-secondary">
            POLÍTICA DE PRIVACIDAD
          </h1>
          <div className="text-xl font-bold text-gray-600">
            <p>Corporación Topsell S.A.C.</p>
          </div>
        </header>

        <div className="space-y-12">
          {/* 1. Responsable del tratamiento de datos personales */}
          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">1. Responsable del tratamiento de datos personales</h2>
            <p className="text-xl leading-relaxed">
              Corporación Topsell S.A.C., con domicilio en Lima - Perú, es responsable del tratamiento de los datos personales recopilados a través de este sitio web, conforme a lo establecido en la Ley N° 29733 – Ley de Protección de Datos Personales y su Reglamento aprobado mediante Decreto Supremo N° 003-2013-JUS.
            </p>
          </section>

          {/* 2. Datos personales recopilados */}
          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">2. Datos personales recopilados</h2>
            <p className="text-xl mb-4">A través de los formularios del sitio web, se pueden recopilar los siguientes datos:</p>
            <ul className="list-disc list-inside space-y-2 text-xl pl-4">
              <li>Nombre y apellidos</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Empresa (si corresponde)</li>
              <li>Información proporcionada en solicitudes de cotización o contacto</li>
            </ul>
            <p className="mt-6 text-lg font-bold italic text-gray-500 underline decoration-primary decoration-2">
              No se recopilan datos sensibles ni información financiera.
            </p>
          </section>

          {/* 3. Finalidad del tratamiento de datos */}
          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">3. Finalidad del tratamiento de datos</h2>
            <ul className="list-disc list-inside space-y-3 text-xl pl-4">
              <li>Atender solicitudes de cotización.</li>
              <li>Contactar al usuario en relación con su consulta.</li>
              <li>Gestionar comunicaciones comerciales relacionadas con productos o servicios.</li>
              <li>Enviar información comercial, promociones o novedades, siempre que el usuario haya otorgado su consentimiento.</li>
            </ul>
          </section>

          {/* 4. Consentimiento del usuario */}
          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">4. Consentimiento del usuario</h2>
            <p className="text-xl leading-relaxed">
              El usuario declara haber sido informado y otorga su consentimiento libre, previo, expreso, inequívoco e informado para el tratamiento de sus datos personales al completar y enviar los formularios del sitio web, de conformidad con la normativa vigente sobre protección de datos personales en el Perú.
            </p>
          </section>

          {/* 5. Seguridad y confidencialidad */}
          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">5. Seguridad y confidencialidad</h2>
            <p className="text-xl leading-relaxed">
              Corporación Topsell S.A.C. adopta las medidas técnicas, organizativas y legales razonables necesarias para proteger los datos personales y garantizar su confidencialidad, evitando su alteración, pérdida, tratamiento o acceso no autorizado.<br />
              Los datos personales no serán cedidos, vendidos ni compartidos con terceros sin autorización del titular, salvo obligación legal o cuando resulte necesario para la correcta prestación del servicio (por ejemplo, operadores logísticos o proveedores vinculados a la operación comercial).
            </p>
          </section>

          {/* 6. Derechos del titular de los datos */}
          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">6. Derechos del titular de los datos</h2>
            <p className="text-xl leading-relaxed">
              El usuario puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición (derechos ARCO), así como los demás derechos reconocidos por la Ley N° 29733, enviando una solicitud al correo electrónico indicado en los canales oficiales de la empresa.
            </p>
          </section>

          {/* 7. Conservación de los datos */}
          <section>
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">7. Conservación de los datos</h2>
            <p className="text-xl leading-relaxed">
              Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados o mientras exista una relación informativa o comercial con el usuario, salvo obligación legal de conservación por un plazo mayor.
            </p>
          </section>

          {/* 8. Modificaciones de la política */}
          <section className="pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-black uppercase text-secondary mb-4">8. Modificaciones de la política</h2>
            <p className="text-xl leading-relaxed">
              Corporación Topsell S.A.C. se reserva el derecho de modificar la presente Política de Privacidad para adaptarla a cambios normativos o mejoras en sus procesos. Cualquier modificación será publicada oportunamente en este sitio web.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}