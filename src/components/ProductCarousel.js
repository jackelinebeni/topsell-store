'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

export default function ProductCarousel({ title, products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="px-4">
      <style jsx global>{`
        /* 1. Forzar que todos los slides tengan la misma altura */
        .product-carousel .swiper-wrapper {
          display: flex;
        }
        .product-carousel .swiper-slide {
          height: auto; /* Permite que el flex del wrapper dicte la altura */
          display: flex;
        }
        
        @media (max-width: 640px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            display: none !important;
          }
          .product-carousel {
            height: auto;
            padding-bottom: 20px;
          }
        }
      `}</style>
      
      <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-4xl font-bold text-secondary">{title}</h2>
          <div className="w-16 h-1 bg-primary mt-2 mb-4 rounded-full"></div>
      </div>
      
      <Swiper
        modules={[Navigation, Grid]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        centerInsufficientSlides={true}
        breakpoints={{
          0: {
            grid: { rows: 2, fill: 'row' },
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: { 
            grid: { rows: 1 },
            slidesPerView: 2, 
            spaceBetween: 12 
          },
          768: { 
            grid: { rows: 1 },
            slidesPerView: 3, 
            spaceBetween: 15 
          },
          1024: { 
            grid: { rows: 1 },
            slidesPerView: 4, 
            spaceBetween: 15 
          },
        }}
        className="pb-8 px-2 product-carousel"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="py-2">
            {/* 2. Asegurar que el Link y el div interno ocupen el 100% de la altura */}
            <Link href={`/producto/${product.slug}`} className="block w-full h-full group">
              <div className="border border-gray-100 rounded-2xl p-3 sm:p-4 md:p-6 hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col items-center text-center cursor-pointer">
                
                {/* Imagen y Bullet de Stock */}
                <div className="relative w-full aspect-square mb-3 sm:mb-4 md:mb-6 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-110 transition duration-500"
                    unoptimized
                  />
                  
                  {/* --- AQUI COMIENZA EL CAMBIO --- */}
                  {product.stock === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px] sm:text-lg font-bold px-2 py-1 rounded-full shadow-sm z-10 backdrop-blur-[2px]">
                      Agotado
                    </div>
                  )}
                  {/* --- FIN DEL CAMBIO --- */}

                </div>
                
                {/* Info - flex-grow hará que este div empuje al botón hacia abajo */}
                <div className="flex-grow w-full flex flex-col">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-xs sm:text-sm font-medium text-gray-500 rounded-md">
                        {product.category?.name || 'General'}
                      </span>
                    </div>

                    <h3 className="font-semibold text-secondary text-lg sm:text-lg md:text-xl mb-1 sm:mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors min-h-[3rem]">
                      {product.name}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-gray-500 line-clamp-2 mb-2 sm:mb-4 px-0 sm:px-2 hidden sm:block">
                      {product.shortDescription}
                    </p>
                </div>

                {/* Botón de Acción */}
                <div className="mt-auto pt-2 sm:pt-4 w-full">
                    <button 
                      className="w-full bg-primary hover:bg-primary-hover text-white py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-base font-medium transition flex justify-center items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg transform active:scale-95"
                    >
                        <span>Ver más</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 sm:w-5 sm:h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>

              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}