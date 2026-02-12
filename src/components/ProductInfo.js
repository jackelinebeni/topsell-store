'use client';
import { useState } from 'react';
import { FaFacebookF, FaWhatsapp, FaCheck } from 'react-icons/fa';
import { useCart } from '@/context/CartContext'; // <--- 1. IMPORTAR CONTEXTO

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // <--- 2. OBTENER FUNCIÓN
  const [added, setAdded] = useState(false); // Estado visual para feedback

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrease = () => setQuantity(quantity + 1);

  // 3. FUNCIÓN PARA AGREGAR
  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    // Feedback visual simple (cambia el texto del botón por 2 seg)
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Breadcrumb / Categoría - de text-sm a text-base */}
      <p className="text-base text-gray-500 mb-2 uppercase tracking-wide">
        {product.category?.name || 'General'}
      </p>

      {/* Título - de text-3xl a text-5xl */}
      <h1 className="text-5xl font-extrabold text-secondary mb-4">
        {product.name}
      </h1>

      {/* Descripción Corta - de text-sm a text-base */}
      <div className="text-gray-600 text-base leading-relaxed mb-6">
        {product.shortDescription || product.description}
      </div>

      {/* Descripción Larga - de text-sm a text-base */}
      {product.longDescription && (
        <div className="text-gray-600 text-base leading-relaxed mb-6">
          {product.longDescription}
        </div>
      )}

      {/* Características - de text-sm a text-base */}
      {product.features && product.features.length > 0 && (
        <ul className="list-disc list-inside text-base text-gray-600 mb-8 space-y-2">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}

      {/* Fila de Acción */}
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
        
        {/* Selector Cantidad - botones y texto más grandes */}
        <div className="flex items-center border border-gray-300 rounded text-lg">
            <button onClick={handleDecrease} className="px-5 py-3 text-gray-600 hover:bg-gray-100 transition">-</button>
            <span className="px-5 py-3 font-bold text-secondary min-w-[50px] text-center">{quantity}</span>
            <button onClick={handleIncrease} className="px-5 py-3 text-gray-600 hover:bg-gray-100 transition">+</button>
        </div>

        {/* Botón Cotizar - de text-base (por defecto) a text-xl */}
        <button 
            onClick={handleAddToCart}
            className={`flex-grow font-bold py-4 px-10 rounded transition uppercase tracking-wide shadow-md text-xl
                ${added ? 'bg-green-600 text-white' : 'bg-primary hover:bg-primary-hover text-white'}
            `}
        >
            {added ? (
                <span className="flex items-center justify-center gap-2"><FaCheck /> Agregado</span>
            ) : (
                "Cotizar"
            )}
        </button>
      </div>

    </div>
  );
}