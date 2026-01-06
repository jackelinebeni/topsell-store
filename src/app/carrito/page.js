'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';

export default function CarritoPage() {
  const { cart, updateQuantity, removeFromCart, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center px-4 min-h-[50vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-secondary mb-4">Tu lista de cotización está vacía</h2>
        <Link href="/tienda" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-extrabold text-secondary mb-8">Solicitud de Cotización</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- COLUMNA IZQUIERDA: LISTA DE PRODUCTOS --- */}
          <div className="flex-grow">
            
            {/* Encabezados (Sin Precio ni Subtotal) */}
            <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 pb-4 mb-6 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <div className="col-span-8">Producto</div>
              <div className="col-span-4 text-center">Cantidad</div>
            </div>

            {/* Filas */}
            <div className="space-y-6 md:space-y-0">
              {cart.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-100 py-6">
                  
                  {/* Imagen y Nombre */}
                  <div className="col-span-8 flex items-center gap-6">
                    <div className="relative w-20 h-20 border border-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.imageUrl || item.image || 'https://placehold.co/100x100'} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary text-base">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">SKU: {item.id}</p>
                      
                      {/* Botón Eliminar Móvil/Desktop */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 hover:underline mt-2 flex items-center gap-1 font-medium"
                      >
                        <FaTrash /> Quitar de la lista
                      </button>
                    </div>
                  </div>

                  {/* Selector Cantidad */}
                  <div className="col-span-4 flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition rounded-l-lg"
                      >-</button>
                      <span className="w-12 text-center font-bold text-secondary">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition rounded-r-lg"
                      >+</button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Botón Volver */}
            <div className="mt-8">
              <Link 
                href="/tienda" 
                className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition text-sm"
              >
                <FaArrowLeft /> Agregar más productos
              </Link>
            </div>
          </div>


          {/* --- COLUMNA DERECHA: RESUMEN COTIZACIÓN --- */}
          <div className="w-full lg:w-[350px] flex-shrink-0">
            <div className="bg-gray-100 rounded-2xl p-8 sticky top-24 border border-gray-200">
              
              <h2 className="text-lg font-bold text-secondary uppercase mb-6 text-center tracking-wide">
                Resumen
              </h2>

              <div className="space-y-4 text-sm mb-8 border-b border-gray-300 pb-6">
                <div className="flex justify-between items-center text-gray-700">
                  <span>Productos distintos:</span>
                  <span className="font-bold text-secondary">{cart.length}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span>Total de unidades:</span>
                  <span className="font-bold text-secondary">{totalItems}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center mb-6 leading-relaxed">
                Al proceder, enviaremos esta lista a nuestro equipo de ventas para generarte una cotización personalizada.
              </p>

              <button className="w-full bg-secondary hover:bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider transition shadow-lg transform active:scale-95">
                Proceder a cotizar
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}