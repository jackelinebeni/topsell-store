import { getProductBySlug, getProductsByCategory } from '@/services/api'; // <--- Importamos la nueva función
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import ShopProductCard from '@/components/ShopProductCard';

// Página completamente dinámica (sin caché)
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  return {
    title: product ? product.name : "Producto",
  };
}

export default async function ProductDetailPage({ params }) {
  // Await params porque en Next.js 15 los params son asíncronos en server components
  const { slug } = await params; 

  // 1. Pedir el producto específico a la API
  const product = await getProductBySlug(slug);

  // Si no existe, mostrar error 404 visual
  if (!product) {
    return (
        <div className="container mx-auto py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Producto no encontrado</h1>
            <p className="text-gray-500 mt-2">El producto &quot;{slug}&quot; no existe en nuestra base de datos.</p>
            <a href="/productos" className="text-primary underline mt-4 block">Volver a la tienda</a>
        </div>
    );
  }

  // 2. Pedir productos relacionados (si tiene categoría)
  let related = [];
  if (product.category) {
    const categoryProducts = await getProductsByCategory(product.category.slug);
    // Filtrar para no mostrar el mismo producto que estamos viendo
    related = categoryProducts.filter(p => p.id !== product.id).slice(0, 4);
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 py-12">
        
        {/* SECCIÓN SUPERIOR: GALERÍA + INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Columna Izquierda: Galería */}
            <ProductGallery 
                mainImage={product.imageUrl}
                secondaryImages={product.images?.map(img => img.imageUrl) || []}
                productName={product.name}
            />

            {/* Columna Derecha: Información */}
            <ProductInfo product={product} />
        </div>

        {/* SECCIÓN INFERIOR: PRODUCTOS RELACIONADOS */}
        <div className="border-t border-gray-100 pt-12">
            <h2 className="text-4xl font-extrabold text-secondary text-center mb-12">
                Productos Relacionados
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.length > 0 ? (
                    related.map((relProduct) => (
                        <ShopProductCard key={relProduct.id} product={relProduct} />
                    ))
                ) : (
                    <p className="text-center text-gray-400 col-span-full text-sm">
                        No hay otros productos relacionados por ahora.
                    </p>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}