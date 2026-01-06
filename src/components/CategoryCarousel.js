'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

export default function CategoryCarousel({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="py-4">
      {/* Título centrado explícitamente */}
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Compra por Categoría</h2>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        centerInsufficientSlides={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="px-4"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            {/* Flex column + Items Center = Centrado perfecto */}
            <div className="flex flex-col items-center justify-center group cursor-pointer">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-orange-500 transition duration-300 shadow-sm">
                <Image
                  src={cat.image || 'https://placehold.co/300x300'}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="mt-4 font-semibold text-gray-700 group-hover:text-orange-600 text-center">
                {cat.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}