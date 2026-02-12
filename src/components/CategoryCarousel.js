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
      {/* Título: text-3xl */}
      <h2 className="text-3xl font-bold mb-8 text-center text-secondary">
        Descubre todas nuestras categorías
      </h2>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={25} // Aumentado un poco el espacio para acomodar círculos más grandes
        slidesPerView={2}
        navigation
        centerInsufficientSlides={true}
        breakpoints={{
          480: { slidesPerView: 2.5 },
          640: { slidesPerView: 3.2 },
          768: { slidesPerView: 4.2 },
          1024: { slidesPerView: 5.2 },
        }}
        className="px-4"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div className="flex flex-col items-center justify-center group cursor-pointer pb-2">
              {/* Contenedor aumentado: de w-32 (128px) a w-40 (160px) */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-primary transition-all duration-300 shadow-md group-hover:shadow-lg">
                <Image
                  src={cat.image || 'https://placehold.co/300x300'}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                  unoptimized
                />
              </div>
              
              {/* Nombre de categoría: text-lg y un poco más de margen superior */}
              <h3 className="mt-5 font-semibold text-2xl text-secondary group-hover:text-primary text-center leading-tight">
                {cat.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}