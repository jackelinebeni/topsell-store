'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { getCloudinaryUrl } from '@/utils/cloudinary';

export default function BrandCarousel({ brands }) {
  if (!brands || brands.length === 0) return null;

  const sorted = [...brands].sort((a, b) => {
    const aHas = a.sortOrder != null;
    const bHas = b.sortOrder != null;
    if (aHas && bHas) return a.sortOrder - b.sortOrder;
    if (aHas) return -1;
    if (bHas) return 1;
    return 0;
  });

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
        {sorted.map((brand) => (
          <SwiperSlide key={brand.id}>
            {/* Flex y justify-center para centrar la imagen horizontalmente */}
            <div className="flex justify-center items-center h-24 sm:h-20 md:h-16 transition-all duration-300 cursor-pointer hover:scale-105">
              <div className="relative w-full h-full">
                <Image
                  src={getCloudinaryUrl(brand.logoUrl, { width: 200, height: 100 })}
                  alt={brand.name}
                  fill
                  className="object-contain" // object-contain es clave para que logos irregulares se vean bien centrados
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}