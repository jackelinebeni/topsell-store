'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductCarousel({ title, products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="px-4">
      {/* Título de sección y enlace 'Ver todo' centrados o equilibrados */}
      <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="w-16 h-1 bg-orange-500 mt-2 mb-4 rounded-full"></div> {/* Decoración visual */}
          <a href="#" className="text-orange-600 text-sm font-semibold hover:underline">Ver catálogo completo</a>
      </div>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={25}
        slidesPerView={1}
        navigation
        centerInsufficientSlides={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-8 px-2"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="py-2"> {/* Padding y para que no corte la sombra */}
            <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col items-center text-center">
              
              {/* Imagen del Producto Centrada */}
              <div className="relative w-40 h-40 mb-6 rounded-lg overflow-hidden mix-blend-multiply">
                <Image
                  src={'https://placehold.co/400x400?text=Producto'}
                  alt={product.name}
                  fill
                  className="object-contain hover:scale-110 transition duration-500"
                  unoptimized
                />
              </div>
              
              {/* Info Centrada */}
              <div className="flex-grow w-full">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-medium text-gray-500 rounded-md mb-2">
                    {product.category?.name || 'General'}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 px-2">
                    {product.shortDescription}
                  </p>
              </div>

              {/* Precio y Botón Centrados */}
              <div className="mt-4 flex flex-col items-center gap-3 w-full">
                  <span className="text-2xl font-extrabold text-gray-900">S/ {product.price}</span>
                  <button className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 px-4 rounded-xl font-medium transition flex justify-center items-center gap-2 shadow-md hover:shadow-lg transform active:scale-95">
                      <span>Agregar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                  </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}