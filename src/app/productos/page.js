'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCategories, getProducts } from '@/services/api';
import ShopSidebar from '@/components/ShopSidebar';
import ShopProductCard from '@/components/ShopProductCard';

function TiendaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  const selectedCategory = useMemo(() => searchParams.get('category'), [searchParams]);
  const selectedSubCategory = useMemo(() => searchParams.get('subcategory'), [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const [catsData, prodsData] = await Promise.all([
        getCategories(),
        getProducts()
      ]);
      setCategories(catsData);
      setAllProducts(prodsData);
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    if (selectedSubCategory) {
      filtered = filtered.filter(p => p.subCategory?.slug === selectedSubCategory);
    } 
    else if (selectedCategory) {
      filtered = filtered.filter(p => p.category?.slug === selectedCategory);
    }
    return filtered;
  }, [selectedCategory, selectedSubCategory, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (validCurrentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleClearFilters = () => {
    setCurrentPage(1);
    router.push('/productos');
  };

  const handleSelectCategory = (slug) => {
    setCurrentPage(1);
    const params = new URLSearchParams();
    params.set('category', slug);
    router.push(`/productos?${params.toString()}`);
  };

  const handleSelectSubCategory = (slug) => {
    setCurrentPage(1);
    const parentCategory = categories.find(cat => 
      cat.subCategories?.some(sub => sub.slug === slug)
    );
    const params = new URLSearchParams();
    if (parentCategory) {
      params.set('category', parentCategory.slug);
    }
    params.set('subcategory', slug);
    router.push(`/productos?${params.toString()}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto max-w-[1800px] px-[30px] sm:px-[38px] lg:px-[46px] py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          <ShopSidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            onSelectCategory={handleSelectCategory}
            onSelectSubCategory={handleSelectSubCategory}
            onClearFilters={handleClearFilters}
          />

          <div className="flex-grow">
            {/* Cabecera Móvil: Aumentada de text-sm a text-base */}
            <div className="md:hidden mb-6 flex justify-between items-center">
                <span className="text-base text-gray-500 font-medium">{filteredProducts.length} Productos</span>
            </div>

            {currentProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {currentProducts.map((product) => (
                        <ShopProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-gray-50 rounded-2xl">
                    {/* Texto de no resultados aumentado a text-xl */}
                    <p className="text-gray-500 text-xl">No se encontraron productos en esta categoría.</p>
                    <button onClick={handleClearFilters} className="text-primary mt-4 text-lg font-bold hover:underline">
                        Ver todos los productos
                    </button>
                </div>
            )}

            {/* PAGINACIÓN: El contenedor ya tenía text-lg, los botones internos se benefician de ello */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xl font-medium">
                  <span className="text-gray-500">
                      Mostrando {startIndex + 1}–{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} Productos
                  </span>
                  
                  {totalPages > 1 && (
                    <div className="flex items-center gap-3">
                        <button 
                          onClick={handlePrevPage}
                          disabled={validCurrentPage === 1}
                          className="text-gray-800 hover:text-primary px-3 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          Anterior
                        </button>
                        
                        <div className="flex items-center gap-1">
                          {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            if (
                              page === 1 || 
                              page === totalPages || 
                              (page >= validCurrentPage - 1 && page <= validCurrentPage + 1)
                            ) {
                              return (
                                <button
                                  key={page}
                                  onClick={() => handlePageClick(page)}
                                  className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg transition ${
                                    validCurrentPage === page
                                      ? 'border-primary text-primary font-bold bg-primary/5'
                                      : 'border-transparent text-gray-500 hover:border-gray-200'
                                  }`}
                                >
                                  {page}
                                </button>
                              );
                            } else if (page === validCurrentPage - 2 || page === validCurrentPage + 2) {
                              return <span key={page} className="text-gray-400 px-1">...</span>;
                            }
                            return null;
                          })}
                        </div>
                        
                        <button 
                          onClick={handleNextPage}
                          disabled={validCurrentPage === totalPages}
                          className="text-gray-800 hover:text-primary px-3 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          Siguiente
                        </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TiendaPage() {
  return (
    <Suspense fallback={
      <div className="bg-white min-h-screen font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-b-2 border-primary"></div>
          {/* Loader text aumentado de text-gray-500 a text-lg */}
          <p className="mt-6 text-lg text-gray-600 font-medium">Cargando catálogo de productos...</p>
        </div>
      </div>
    }>
      <TiendaContent />
    </Suspense>
  );
}