import { getBanners, getCategories, getProductsByCategory, getBrands } from "@/services/api";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import BrandCarousel from "@/components/BrandCarousel";

export default async function Home() {
  const [banners, categories, techProducts, fashionProducts, brands] = await Promise.all([
    getBanners(),
    getCategories(),
    getProductsByCategory('tecnologia'),
    getProductsByCategory('ropa'),
    getBrands()
  ]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* HEADER (Igual que antes) */}
      <header className="bg-white sticky top-0 z-50 shadow-sm w-full">
         <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
            <h1 className="text-2xl font-extrabold text-orange-600 tracking-tighter">TOPSELL</h1>
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
                <a href="#" className="hover:text-orange-600 transition">Inicio</a>
                <a href="#" className="hover:text-orange-600 transition">Categorías</a>
                <a href="#" className="hover:text-orange-600 transition">Ofertas</a>
            </nav>
            <button className="bg-gray-100 hover:bg-gray-200 transition px-5 py-2 rounded-full text-sm font-bold text-gray-700 flex items-center gap-2">
                <span>🛒</span> Carrito (0)
            </button>
         </div>
      </header>

      {/* CONTENEDOR CENTRAL */}
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* HERO SECTION */}
        <section className="w-full rounded-2xl overflow-hidden shadow-lg">
           <HeroCarousel banners={banners} />
        </section>

        {/* CATEGORIES */}
        <section className="text-center"> {/* <--- AGREGADO: text-center */}
           <CategoryCarousel categories={categories} />
        </section>

        {/* PRODUCTOS TECNOLOGÍA */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden py-6">
           <ProductCarousel title="Lo último en Tecnología" products={techProducts} />
        </section>
        
        {/* PRODUCTOS ROPA */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden py-6">
           <ProductCarousel title="Moda de Temporada" products={fashionProducts} />
        </section>

        {/* BRANDS */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <BrandCarousel brands={brands} />
        </section>

      </div>

      {/* FOOTER (Igual que antes) */}
      <footer className="bg-gray-900 text-gray-300 w-full mt-auto">
        <div className="border-t border-gray-800 text-center py-6">
            <p>© 2026 Topsell Ecommerce. Todos los derechos reservados.</p>
        </div>
      </footer>

    </main>
  );
}