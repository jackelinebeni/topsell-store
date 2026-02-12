'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

export default function BrandCarousel({ brands }) {
  if (!brands || brands.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-bold text-gray-400 mb-6 uppercase tracking-[0.2em]">
        Marcas Oficiales
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={2}
        loop={brands.length > 4}
        navigation={true}
        centerInsufficientSlides={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        // 'items-center' en el wrapper del swiper ayuda a centrar verticalmente los slides
        className="flex items-center justify-center brand-carousel" 
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            {/* Flex y justify-center para centrar la imagen horizontalmente */}
            <div className="flex justify-center items-center h-24 sm:h-20 md:h-16 transition-all duration-300 cursor-pointer hover:scale-105">
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