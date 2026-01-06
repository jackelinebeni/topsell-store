'use client';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function ShopSidebar({ categories, selectedCategory, onSelectCategory }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      
      {/* Cabecera de Filtros */}
      <div className="flex justify-between items-center mb-6">
        <div className="border border-primary text-primary font-bold text-xs px-4 py-2 uppercase tracking-widest">
            Filtrar
        </div>
        <button 
            onClick={() => onSelectCategory(null)} 
            className="text-xs text-gray-500 hover:text-primary underline decoration-gray-300 hover:decoration-primary transition"
        >
            Limpiar todo
        </button>
      </div>

      {/* Bloque de Categorías */}
      <div className="border-t border-gray-100 py-4">
        <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => setIsOpen(!isOpen)}
        >
            <h3 className="font-bold text-secondary text-sm">Categorías</h3>
            <span className="text-gray-400 text-xs">{isOpen ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {/* Lista Desplegable */}
        {isOpen && (
            <ul className="space-y-3">
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <button
                            onClick={() => onSelectCategory(cat.slug)}
                            className={`flex justify-between w-full text-sm group ${
                                selectedCategory === cat.slug ? 'text-primary font-bold' : 'text-gray-500 hover:text-secondary'
                            }`}
                        >
                            <span>{cat.name}</span>
                            {/* Número simulado (luego se conectará con BD real) */}
                            <span className="text-gray-300 group-hover:text-gray-400 text-xs">
                                ({Math.floor(Math.random() * 20) + 1})
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        )}
      </div>
    </aside>
  );
}