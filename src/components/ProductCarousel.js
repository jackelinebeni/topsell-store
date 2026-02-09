'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link'; // Importamos Link de Next.js
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductCarousel({ title, products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="px-4">
      <style jsx global>{`
        @media (max-width: 640px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
      
      <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-2xl font-bold text-secondary">{title}</h2>
          <div className="w-16 h-1 bg-primary mt-2 mb-4 rounded-full"></div>
      </div>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={6}
        slidesPerView={2}
        navigation
        centerInsufficientSlides={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
        }}
        className="pb-8 px-2 product-carousel"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="py-2">
            
            {/* ENVOLVEMOS LA CARD EN EL LINK */}
            {/* block h-full asegura que el link ocupe toda la altura del slide */}
            <Link href={`/producto/${product.slug}`} className="block h-full group">
              
              <div className="border border-gray-100 rounded-2xl p-3 sm:p-4 md:p-6 hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col items-center text-center cursor-pointer">
                
                {/* Imagen */}
                <div className="relative w-full aspect-square mb-3 sm:mb-4 md:mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-110 transition duration-500" // group-hover para animación al pasar mouse por la tarjeta
                    unoptimized
                  />
                </div>
                
                {/* Info */}
                <div className="flex-grow w-full">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-[11px] sm:text-xs font-medium text-gray-500 rounded-md mb-2">
                      {product.category?.name || 'General'}
                    </span>
                    <h3 className="font-bold text-secondary text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 line-clamp-2 mb-2 sm:mb-4 px-0 sm:px-2 hidden sm:block">
                      {product.shortDescription}
                    </p>
                </div>

                {/* Botón de Acción */}
                <div className="mt-2 sm:mt-4 flex flex-col items-center gap-3 w-full">
                    <button 
                      className="w-full bg-primary hover:bg-primary-hover text-white py-2 sm:py-2 md:py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition flex justify-center items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg transform active:scale-95"
                    >
                        <span>Ver más</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
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