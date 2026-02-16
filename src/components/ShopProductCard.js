import Image from "next/image";
import Link from "next/link";

export default function ShopProductCard({ product }) {
  // Solo lógica de stock, quitamos lógica de oferta por precio
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group flex flex-col items-center text-center">
      {/* Imagen + Badge */}
      <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg bg-gray-50">
        {/* Badge (Solo Agotado) - Subido de text-[10px] a text-xs */}
        <div className="absolute top-3 left-3 z-10">
          {isOutOfStock && (
            <span className="bg-gray-600 text-white text-xs font-bold px-4 py-1.5 uppercase tracking-wider rounded-sm shadow-sm">
              Agotado
            </span>
          )}
        </div>

        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition duration-500"
          unoptimized
        />
      </div>

      {/* Info (SIN PRECIO) */}
      <div className="space-y-3 w-full px-2">
        {/* Categoría - Subido de text-[10px] a text-xs */}
        <p className="text-lg text-gray-400 uppercase tracking-widest font-semibold">
          {product.category?.name || "General"}
        </p>

        {/* Nombre del producto - Subido de text-sm (14px) a text-base (16px) */}
        <h3 className="text-gray-800 font-semibold text-lg line-clamp-2 min-h-[48px] leading-snug group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Enlace "Ver más" - Subido de text-base (16px) a text-lg (18px) */}
        <Link
          href={`/producto/${product.slug}`}
          className="inline-block text-2xl font-bold text-primary hover:text-secondary border-b-2 border-primary/30 hover:border-secondary transition-all pb-1"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}