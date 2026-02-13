'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroCarousel({ banners }) {
  if (!banners || !Array.isArray(banners) || banners.length === 0) {
    return null;
  }

  return (
    // 1. Mantenemos el aspect-ratio para que el contenedor sea responsivo por sí mismo
    // 2. Quitamos el max-h si queremos que sea 100% proporcional, o lo dejamos para pantallas ultra-anchas
    <div className="w-full relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[1920/1080]">
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
              alt={banner.alt || "Banner promocional"}
              fill
              // 'object-cover' es el truco maestro: llena el espacio sin deformar, recortando los bordes si es necesario
              // 'object-center' asegura que lo más importante (el centro) siempre sea visible
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw" // Ayuda a Next.js a optimizar la carga según el ancho de pantalla
              unoptimized 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}