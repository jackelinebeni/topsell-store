'use client'; // Obligatorio para Swiper en Next.js App Router

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroCarousel({ banners }) {
  // CORRECCIÓN AQUÍ:
  // Verificamos si banners existe Y si es un Array real.
  if (!banners || !Array.isArray(banners) || banners.length === 0) {
    // Opcional: Renderiza un div vacío o un mensaje de depuración temporal
    console.warn("HeroCarousel recibió datos inválidos:", banners); 
    return null;
  }

  return (
    <div className="w-full h-[300px] md:h-[500px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            {/* Imagen optimizada de Next.js */}
            <Image
              src={banner.imageUrl}
              alt={banner.title || 'Banner'}
              fill // Ocupa todo el contenedor
              className="object-cover" // Recorta la imagen para llenar sin deformar
              priority={banner.sortOrder === 1} // Carga la primera imagen rápido
                unoptimized
            />
            {/* Texto superpuesto (Opcional) */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
                {banner.targetUrl && (
                    <a href={banner.targetUrl} className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-semibold transition">
                        Ver Oferta
                    </a>
                )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}