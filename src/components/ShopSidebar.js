'use client';
import { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function ShopSidebar({ 
  categories, 
  selectedCategory, 
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
  onClearFilters
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubCategories, setOpenSubCategories] = useState({});

  // Corrección de lógica: Sincronizar apertura de subcategorías con la selección
  useEffect(() => {
    if (selectedSubCategory && categories.length > 0) {
      const parentCategory = categories.find(cat => 
        cat.subCategories?.some(sub => sub.slug === selectedSubCategory)
      );
      
      if (parentCategory) {
        setOpenSubCategories(prev => ({
          ...prev,
          [parentCategory.slug]: true
        }));
      }
    }
  }, [selectedSubCategory, categories]);

  const toggleSubCategory = (categorySlug) => {
    setOpenSubCategories(prev => ({
      ...prev,
      [categorySlug]: !prev[categorySlug]
    }));
  };

  return (
    <aside className="w-full md:w-72 flex-shrink-0"> {/* Aumentado un poco el ancho de 64 a 72 */}
      
      {/* Cabecera de Filtros */}
      <div className="flex justify-between items-center mb-8">
        {/* text-xs -> text-sm */}
        <div className="border-2 border-primary text-primary font-bold text-sm px-5 py-2.5 uppercase tracking-widest">
            Filtrar
        </div>
        {/* text-xs -> text-sm */}
        <button 
            onClick={onClearFilters} 
            className="text-sm text-gray-500 hover:text-primary underline decoration-gray-300 hover:decoration-primary transition font-medium"
        >
            Limpiar todo
        </button>
      </div>

      {/* Bloque de Categorías */}
      <div className="border-t border-gray-100 py-6">
        <div 
            className="flex justify-between items-center cursor-pointer mb-6"
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* text-sm -> text-base/lg */}
            <h3 className="font-bold text-secondary text-lg">Categorías</h3>
            <span className="text-gray-400 text-sm">{isOpen ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {/* Lista Desplegable */}
        {isOpen && (
            <ul className="space-y-4"> {/* espacio aumentado */}
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <div className="space-y-3">
                            {/* Categoría Principal */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => onSelectCategory(cat.slug)}
                                    // text-sm -> text-base
                                    className={`flex-grow text-left text-base transition group ${
                                        selectedCategory === cat.slug ? 'text-primary font-bold' : 'text-gray-500 hover:text-secondary'
                                    }`}
                                >
                                    <span>{cat.name}</span>
                                </button>
                                
                                {cat.subCategories && cat.subCategories.length > 0 && (
                                    <button
                                        onClick={() => toggleSubCategory(cat.slug)}
                                        className="text-gray-400 hover:text-gray-600 text-xs p-2 ml-2 bg-gray-50 rounded-md"
                                    >
                                        {openSubCategories[cat.slug] ? <FaMinus /> : <FaPlus />}
                                    </button>
                                )}
                            </div>

                            {/* Subcategorías */}
                            {cat.subCategories && cat.subCategories.length > 0 && openSubCategories[cat.slug] && (
                                <ul className="ml-5 space-y-3 border-l-2 border-gray-100 pl-4 py-1">
                                    {cat.subCategories.map((subCat) => (
                                        <li key={subCat.id}>
                                            <button
                                                onClick={() => onSelectSubCategory(subCat.slug)}
                                                // text-xs -> text-sm
                                                className={`text-sm w-full text-left transition ${
                                                    selectedSubCategory === subCat.slug 
                                                        ? 'text-primary font-bold' 
                                                        : 'text-gray-400 hover:text-secondary font-medium'
                                                }`}
                                            >
                                                {subCat.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        )}
      </div>
    </aside>
  );
}