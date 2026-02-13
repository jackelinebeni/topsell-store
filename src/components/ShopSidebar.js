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
    <aside className="w-full md:w-80 flex-shrink-0"> {/* Ancho intermedio ideal */}
      
      {/* Cabecera de Filtros */}
      <div className="flex justify-between items-center mb-10">
        <div className="border-2 border-primary text-primary font-bold text-base px-6 py-3 uppercase tracking-widest">
            Filtrar
        </div>
        <button 
            onClick={onClearFilters} 
            className="text-base text-gray-500 hover:text-primary underline decoration-gray-300 hover:decoration-primary transition font-semibold"
        >
            Limpiar todo
        </button>
      </div>

      {/* Bloque de Categorías */}
      <div className="border-t border-gray-100 py-8">
        <div 
            className="flex justify-between items-center cursor-pointer mb-8"
            onClick={() => setIsOpen(!isOpen)}
        >
            <h3 className="font-extrabold text-secondary text-xl">Categorías</h3>
            <span className="text-gray-400 text-base">{isOpen ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {/* Lista Desplegable */}
        {isOpen && (
            <ul className="space-y-6"> 
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <div className="space-y-4">
                            {/* Categoría Principal */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => onSelectCategory(cat.slug)}
                                    className={`flex-grow text-left text-lg transition group ${
                                        selectedCategory === cat.slug ? 'text-primary font-bold' : 'text-gray-500 hover:text-secondary'
                                    }`}
                                >
                                    <span>{cat.name}</span>
                                </button>
                                
                                {cat.subCategories && cat.subCategories.length > 0 && (
                                    <button
                                        onClick={() => toggleSubCategory(cat.slug)}
                                        className="text-gray-400 hover:text-gray-600 text-sm p-2.5 ml-2 bg-gray-50 rounded-md transition-colors"
                                    >
                                        {openSubCategories[cat.slug] ? <FaMinus /> : <FaPlus />}
                                    </button>
                                )}
                            </div>

                            {/* Subcategorías */}
                            {cat.subCategories && cat.subCategories.length > 0 && openSubCategories[cat.slug] && (
                                <ul className="ml-6 space-y-4 border-l-2 border-gray-100 pl-5 py-2">
                                    {cat.subCategories.map((subCat) => (
                                        <li key={subCat.id}>
                                            <button
                                                onClick={() => onSelectSubCategory(subCat.slug)}
                                                className={`text-base w-full text-left transition ${
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