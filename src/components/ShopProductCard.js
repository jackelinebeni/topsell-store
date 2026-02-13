import Image from "next/image";
import Link from "next/link";

export default function ShopProductCard({ product }) {
  // Solo lógica de stock
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group flex flex-col items-center text-center">
      {/* Imagen + Badge */}
      <div className="relative w-full aspect-square mb-8 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
        {/* Badge Agotado - Subido a text-sm y más padding */}
        <div className="absolute top-4 left-4 z-10">
          {isOutOfStock && (
            <span className="bg-gray-700 text-white text-sm font-black px-5 py-2 uppercase tracking-tighter rounded-md shadow-md">
              Agotado
            </span>
          )}
        </div>

        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-110 transition duration-700 ease-in-out p-4"
          unoptimized
        />
      </div>

      {/* Info (SIN PRECIO) */}
      <div className="space-y-4 w-full px-4">
        {/* Categoría - Subido a text-sm y mayor tracking */}
        <p className="text-sm text-gray-400 uppercase tracking-[0.2em] font-bold">
          {product.category?.name || "General"}
        </p>

        {/* Nombre del producto - Subido a text-lg/xl para que destaque */}
        <h3 className="text-gray-900 font-extrabold text-xl line-clamp-2 min-h-[56px] leading-tight group-hover:text-primary transition-colors px-2">
          {product.name}
        </h3>

        {/* Enlace "Ver más" - Subido a text-xl y borde más grueso */}
        <div className="pt-2">
          <Link
            href={`/producto/${product.slug}`}
            className="inline-block text-xl font-black text-primary hover:text-secondary border-b-4 border-primary/20 hover:border-secondary transition-all pb-1.5"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}