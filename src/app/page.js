import { getBanners, getCategories, getProducts, getBrands } from "@/services/api";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import BrandCarousel from "@/components/BrandCarousel";
import Header from "@/components/Header";
import Footer  from "@/components/Footer";

// Página completamente dinámica (sin caché)
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Obtener banners, categorías, productos y marcas
  const [banners, categories, allProducts, brands] = await Promise.all([
    getBanners(),
    getCategories(),
    getProducts(),
    getBrands()
  ]);

  // Novedades: últimos productos añadidos (los últimos 12 por ID)
  const novedades = [...allProducts]
    .sort((a, b) => b.id - a.id)
    .slice(0, 12);

  // Productos Varios: selección distribuida de productos (determinista)
  const productosVarios = allProducts
    .filter((_, index) => index % 2 === 0) // Tomar productos en posiciones pares
    .slice(0, 12);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* CONTENEDOR CENTRAL */}
      <div className="flex-grow w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* HERO SECTION */}
        <section className="w-full rounded-2xl overflow-hidden shadow-lg">
           <HeroCarousel banners={banners} />
        </section>

        {/* CATEGORIES */}
        <section className="text-center">
           <CategoryCarousel categories={categories} />
        </section>

        {/* NOVEDADES */}
        {novedades.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden py-8">
            <ProductCarousel title="Novedades" products={novedades} />
          </section>
        )}

        {/* PRODUCTOS */}
        {productosVarios.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden py-8">
            <ProductCarousel title="Productos" products={productosVarios} />
          </section>
        )}

        {/* BRANDS */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
           <BrandCarousel brands={brands} />
        </section>

      </div>

    </main>
  );
}