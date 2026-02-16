'use client';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa'; // FaFacebookF y FaWhatsapp no se usaban en este fragmento, pero puedes dejarlos si los usas en otro lado
import { useCart } from '@/context/CartContext';

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // Variable auxiliar para verificar stock
  const isOutOfStock = product.stock === 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const handleIncrease = () => {
    // Opcional: Puedes limitar que no suba más allá del stock disponible
    // if (quantity < product.stock) setQuantity(quantity + 1);
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return; // Prevención extra

    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Breadcrumb / Categoría */}
      <p className="text-xl text-gray-500 mb-2 uppercase tracking-wide">
        {product.category?.name || 'General'}
      </p>

      {/* Título */}
      <h1 className="text-5xl font-extrabold text-secondary mb-4">
        {product.name}
      </h1>

      {/* SKU */}
      {product.sku && (
        <div className="text-gray-600 text-xl leading-relaxed mb-6">
          <span className="font-bold">SKU:</span> {product.sku}
        </div>
      )}

      {/* Características */}
      {product.features && product.features.length > 0 && (
        <ul className="list-disc list-inside text-lg text-gray-600 mb-8 space-y-2">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}

      {/* Fila de Acción */}
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
        
        {/* LÓGICA DE STOCK: Si es 0, mostramos mensaje. Si no, mostramos controles */}
        {isOutOfStock ? (
             // --- ESTADO SIN STOCK ---
             <div className="w-full">
                <button 
                    disabled
                    className="w-full font-bold py-4 px-10 rounded transition uppercase tracking-wide shadow-none text-xl bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                >
                    Agotado
                </button>
                <p className="text-lg text-red-500 mt-2 font-medium">
                    * Este producto no se encuentra disponible actualmente.
                </p>
             </div>
        ) : (
            // --- ESTADO CON STOCK (Normal) ---
            <>
                {/* Selector Cantidad */}
                <div className="flex items-center border border-gray-300 rounded text-lg">
                    <button onClick={handleDecrease} className="px-5 py-3 text-gray-600 hover:bg-gray-100 transition">-</button>
                    <span className="px-5 py-3 font-bold text-secondary min-w-[50px] text-center">{quantity}</span>
                    <button onClick={handleIncrease} className="px-5 py-3 text-gray-600 hover:bg-gray-100 transition">+</button>
                </div>

                {/* Botón Cotizar */}
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
            </>
        )}
      </div>

    </div>
  );
}