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
    console.warn("HeroCarousel recibió datos inválidos:", banners); 
    return null;
  }

  return (
    /* Cambiamos aspect-[1920/1080] a aspect-video o el ratio original de tus banners.
       Esto asegura que el contenedor SIEMPRE tenga la forma de la imagen.
    */
    <div className="w-full relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[1920/800] bg-gray-100 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full custom-swiper-large"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id || index} className="relative w-full h-full">
            <Image
              src={banner.imageUrl}
              alt="Banner promocional"
              fill
              /* CAMBIO CLAVE: object-contain asegura que la imagen se achique 
                 dentro del espacio disponible sin ser recortada.
              */
              className="object-contain" 
              priority={index === 0}
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Estilos para agrandar las flechas y puntos (Coherencia visual) */}
      <style jsx global>{`
        .custom-swiper-large .swiper-button-next,
        .custom-swiper-large .swiper-button-prev {
          color: #000;
          background: rgba(255, 255, 255, 0.8);
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .custom-swiper-large .swiper-button-next:after,
        .custom-swiper-large .swiper-button-prev:after {
          font-size: 24px;
          font-weight: bold;
        }
        .custom-swiper-large .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background: #000;
          opacity: 0.3;
        }
        .custom-swiper-large .swiper-pagination-bullet-active {
          opacity: 1;
          background: var(--primary, #000);
          width: 30px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}