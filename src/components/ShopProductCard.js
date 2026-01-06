import Image from 'next/image';
import Link from 'next/link';

export default function ShopProductCard({ product }) {
  // Lógica simple para simular estados (puedes ajustarla con datos reales luego)
  const isOutOfStock = product.stock === 0; 
  const isOffer = product.price < 100; // Ejemplo: Si vale menos de 100 es oferta

  return (
    <div className="group flex flex-col items-center text-center">
      
      {/* Imagen + Badge */}
      <div className="relative w-full aspect-square mb-4 overflow-hidden">
        {/* Badge (Etiqueta) */}
        <div className="absolute top-0 left-0 z-10">
            {isOutOfStock ? (
                <span className="bg-gray-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                    Agotado
                </span>
            ) : isOffer && (
                <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                    Oferta
                </span>
            )}
        </div>

        <Image
          src="https://placehold.co/400x400?text=Producto" // Placeholder
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition duration-500"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            {product.category?.name || 'General'}
        </p>
        <h3 className="text-gray-800 font-medium text-sm line-clamp-2 min-h-[40px]">
            {product.name}
        </h3>
        
        {/* Enlace "Ver Producto" estilo link rojo */}
        <Link 
            href={`/producto/${product.slug}`} 
            className="inline-block text-xs font-bold text-primary border-b border-primary/30 hover:border-primary mt-2 pb-0.5 transition"
        >
            Ver Producto
        </Link>
      </div>
    </div>
  );
}