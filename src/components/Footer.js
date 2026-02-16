"use client";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import { submitNewsUser } from "@/services/api"; 

export default function Footer() {
  // --- ESTADOS ---
  const [email, setEmail] = useState("");
  const [verification, setVerification] = useState(false); // Nuevo estado para el checkbox
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // --- LÓGICA DE ENVÍO ---
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // 1. Validación de Email
    if (!email || !email.includes("@")) {
      setStatus({ type: "error", message: "Por favor, ingresa un correo válido." });
      return;
    }

    // 2. Validación del Checkbox (Verification)
    if (!verification) {
      setStatus({ type: "error", message: "Debes aceptar la verificación para continuar." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // 3. Llamada a la API enviando (email, verification)
      // verification ahora es true porque pasó la validación
      const result = await submitNewsUser(email, verification);

      if (result.success) {
        setStatus({ type: "success", message: "¡Suscrito correctamente! Gracias." });
        setEmail(""); 
        setVerification(false); // Reseteamos el checkbox
      } else {
        setStatus({ type: "error", message: result.error || "Error al suscribir." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Ocurrió un error inesperado." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-secondary text-gray-300 pt-24 pb-12 text-xl">
      <div className="container mx-auto max-w-[1800px] px-[30px] sm:px-[38px] lg:px-[46px]">
        
        {/* --- SECCIÓN SUPERIOR: SUSCRIPCIÓN --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 pb-16 border-b border-gray-700">

          {/* Logo */}
          <div className="bg-white p-1 rounded w-56 h-20 flex items-center justify-center relative shrink-0">
            <div className="relative w-full h-full">
              <Image src="/logo.png" alt="TopSell Logo" fill className="object-contain" />
            </div>
          </div>

          {/* Texto */}
          <div className="text-center lg:text-left max-w-lg">
            <h3 className="text-white font-bold text-3xl mb-3">
              Suscríbete a nuestra página
            </h3>
            <p className="text-gray-400 text-xl leading-relaxed">
              Para enviarte a tu correo todas nuestras ofertas exclusivas y novedades.
            </p>
          </div>

          {/* --- FORMULARIO CONECTADO --- */}
          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              
              {/* Grupo Input + Botón */}
              <div className="flex w-full lg:w-auto shadow-lg relative">
                <input
                  type="email"
                  placeholder="Ingresa tu correo aquí..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full lg:w-80 px-6 py-4 text-gray-800 bg-white border-none focus:ring-2 focus:ring-primary outline-none text-xl disabled:bg-gray-200"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 transition uppercase tracking-wider text-xl flex items-center justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "..." : "Suscribirse"}
                </button>
              </div>

              {/* Checkbox de Verificación */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={verification}
                    onChange={(e) => setVerification(e.target.checked)}
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded border border-gray-500 checked:border-primary checked:bg-primary transition-all"
                  />
                  {/* Icono de check SVG personalizado */}
                  <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-gray-400 text-lg group-hover:text-white transition select-none">
                  Acepto recibir comunicaciones (Verificación)
                </span>
              </label>

              {/* Mensajes de Feedback */}
              {status && (
                <div className={`text-lg font-medium ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* --- RESTO DEL FOOTER (Igual que antes) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Columna 1: Contacto */}
          <div>
            <h4 className="text-white font-bold mb-8 text-2xl tracking-wide">Contacto</h4>
            <ul className="space-y-4 text-xl text-gray-400 leading-relaxed">
              <li>
                <p>Lunes - Viernes: 9:00AM - 6:00PM</p>
                <p>Sábado: 9:00AM - 2:00PM</p>
              </li>
              <li className="hover:text-white transition cursor-pointer">ventas@topsell.com</li>
            </ul>
            <div className="flex flex-col gap-2 mt-6 ">
              <span className="text-gray-400 text-xl font-medium">+51 977 658 053</span>
              <a href="https://wa.me/51977658053" target="_blank" rel="noopener noreferrer" className="flex flex-col items-start gap-2 group w-max">
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl group-hover:bg-green-600 transition shadow-md hover:scale-110 duration-300">
                  <FaWhatsapp />
                </div>
                <span className="text-xl text-gray-400 group-hover:text-white transition">Ventas</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Mi Cuenta */}
          <div>
            <h4 className="text-white font-bold mb-8 text-2xl tracking-wide">Mi Cuenta</h4>
            <ul className="space-y-5 text-xl text-gray-400">
              <li><a href="/nosotros" className="hover:text-primary transition hover:pl-2 duration-200 block">Sobre Nosotros</a></li>
              <li><a href="/terminos-condiciones" className="hover:text-primary transition hover:pl-2 duration-200 block">Términos y Condiciones</a></li>
              <li><a href="/politica-privacidad" className="hover:text-primary transition hover:pl-2 duration-200 block">Política y Privacidad</a></li>
            </ul>
          </div>

          {/* Columna 3: Más Información */}
          <div>
            <h4 className="text-white font-bold mb-8 text-2xl tracking-wide">Más Información</h4>
            <ul className="space-y-6 text-xl text-gray-400">
              <li>
                <div className="rounded p-2 inline-block w-40 h-50 relative hover:border-white transition cursor-pointer overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300">
                  <Image src="/libro-reclamaciones.png" alt="Libro de Reclamaciones" fill className="object-contain" />
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h4 className="text-white font-bold mb-8 text-2xl tracking-wide">Redes Sociales</h4>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition text-3xl hover:scale-110 duration-200"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-3xl hover:scale-110 duration-200"><FaInstagram /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-3xl hover:scale-110 duration-200"><FaTiktok /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-xl text-gray-500">Topsell © 2025. Todos los Derechos Reservados</p>
        </div>
      </div>
    </footer>
  );
}