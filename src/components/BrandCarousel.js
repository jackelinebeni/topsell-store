'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';

export default function BrandCarousel({ brands }) {
  if (!brands || brands.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-center text-sm font-bold text-gray-400 mb-6 uppercase tracking-[0.2em]">
        Marcas Oficiales
      </h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        loop={true}
        centerInsufficientSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        // 'items-center' en el wrapper del swiper ayuda a centrar verticalmente los slides
        className="flex items-center justify-center" 
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            {/* Flex y justify-center para centrar la imagen horizontalmente */}
            <div className="flex justify-center items-center h-20 opacity-40 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer scale-90 hover:scale-100">
              <div className="relative w-full h-full">
                <Image
                  src={brand.logoUrl}
                  alt={brand.name}
                  fill
                  className="object-contain" // object-contain es clave para que logos irregulares se vean bien centrados
                  unoptimized
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}