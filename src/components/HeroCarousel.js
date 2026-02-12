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
    <div className="w-full relative aspect-[1920/1080] max-h-[100vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id || index} className="relative w-full h-full">
            <Image
              src={banner.imageUrl}
              alt="Banner promocional"
              fill
              className="object-cover"
              priority={index === 0} // Prioriza la carga de la primera imagen
              unoptimized // Mantener si las imágenes vienen de un CDN externo sin configuración de domains
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}