'use client';
import { useState } from 'react';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/utils/cloudinary';

export default function ProductGallery({ mainImage, secondaryImages = [], productName }) {
  // Construir array de imágenes: principal primero, luego las secundarias
  const images = [mainImage, ...secondaryImages].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(images[0]);
  
  // Estados para controlar el zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Función para calcular la posición del mouse relativa al contenedor
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      
      {/* 1. Tira de Miniaturas (Vertical en Desktop, Horizontal en Mobile) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`relative w-20 h-20 border cursor-pointer rounded-md overflow-hidden transition
                ${selectedImage === img ? 'border-primary border-2' : 'border-gray-200 hover:border-gray-300'}
            `}
            onClick={() => setSelectedImage(img)}
          >
            <Image 
                src={getCloudinaryUrl(img, { width: 200, height: 200 })} 
                alt={`Thumb ${index}`} 
                fill 
                className="object-contain p-1"
            />
          </div>
        ))}
      </div>

      {/* 2. Imagen Principal con Zoom Interactivo */}
      <div 
        className="relative flex-grow bg-white border border-gray-100 rounded-lg overflow-hidden min-h-[400px] md:min-h-[500px] cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image 
            // Opcional: Aumentar la resolución aquí para que al hacer zoom no se pixele
            src={getCloudinaryUrl(selectedImage, { width: 1200, height: 1200 })} 
            alt={productName} 
            fill 
            className="object-contain transition-transform duration-200 ease-out pointer-events-none"
            style={{
              // p-8 equivale a ~2rem, lo removemos visualmente al hacer zoom para aprovechar el espacio
              padding: isZoomed ? '0' : '2rem', 
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
            }}
        />
      </div>

    </div>
  );
}