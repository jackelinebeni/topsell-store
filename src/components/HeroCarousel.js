'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/utils/cloudinary';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroCarousel({ banners }) {
  if (!banners || !Array.isArray(banners) || banners.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        autoHeight={true} 
        className="w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id || index} className="w-full">

            {/* Imagen mobile */}
            {banner.imageUrlMobile && (
              <div className="w-full block md:hidden">
                <Image
                  src={getCloudinaryUrl(banner.imageUrlMobile, { width: 1280 })}
                  alt={banner.alt || "Banner promocional"}
                  width={1280}
                  height={1370}
                  className="w-full h-auto block"
                  priority={index === 0}
                  sizes="100vw"
                  quality={100} // 🔥 1. Aumenta la calidad al máximo
                  unoptimized={true} // 🔥 2. Evita que Next.js la comprima de nuevo
                />
              </div>
            )}

            {/* Imagen desktop */}
            <div className={`w-full ${banner.imageUrlMobile ? 'hidden md:block' : 'block'}`}>
              <Image
                src={getCloudinaryUrl(banner.imageUrl, { width: 1920 })}
                alt={banner.alt || "Banner promocional"}
                width={1920}
                height={600} 
                className="w-full h-auto block" 
                priority={index === 0}
                sizes="100vw" 
                quality={100} // 🔥 1. Aumenta la calidad al máximo
                unoptimized={true} // 🔥 2. Evita la doble compresión con Cloudinary
              />
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}