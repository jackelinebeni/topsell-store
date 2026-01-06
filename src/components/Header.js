'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronRight, FaTrash, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { getCategories } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext'; // <--- 1. IMPORTAR AUTH

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isStoreHovered, setIsStoreHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Estados para dropdowns
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // <--- NUEVO ESTADO PARA MENÚ USUARIO

  const { cart, removeFromCart, totalItems } = useCart();
  const { user, logout } = useAuth(); // <--- 2. SACAR USER Y LOGOUT

  useEffect(() => {
    const fetchCats = async () => {
      const data = await getCategories();
      setCategories(data);
      if(data.length > 0) setActiveCategory(data[0]);
    };
    fetchCats();
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 font-sans">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div className="flex-shrink-0 z-20">
            <Link href="/" className="flex items-center">
              <h1 className="text-3xl font-extrabold text-secondary tracking-tighter">
                TOP<span className="text-primary">SELL</span>
              </h1>
            </Link>
          </div>

          {/* MENÚ DE NAVEGACIÓN */}
          <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2 h-full items-center">
             {/* (Mega Menu código igual al anterior...) */}
             <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsStoreHovered(true)}
                onMouseLeave={() => setIsStoreHovered(false)}
            >
                <Link href="/tienda" className="text-sm font-bold text-secondary hover:text-primary transition uppercase tracking-wide cursor-pointer h-full flex items-center">
                  Tienda
                </Link>
                {isStoreHovered && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[600px] bg-white shadow-xl border border-gray-100 rounded-b-xl flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* ... (Contenido del mega menu igual) ... */}
                        <div className="w-1/3 bg-gray-50 py-4">
                            {categories.map((cat) => (
                                <div key={cat.id} onMouseEnter={() => setActiveCategory(cat)} className={`px-6 py-3 cursor-pointer text-sm font-semibold flex justify-between items-center transition ${activeCategory?.id === cat.id ? 'bg-white text-primary border-l-4 border-primary shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    {cat.name} {activeCategory?.id === cat.id && <FaChevronRight className="text-xs" />}
                                </div>
                            ))}
                        </div>
                        <div className="w-2/3 p-6 bg-white">
                            {activeCategory && activeCategory.subCategories && (
                                <div>
                                    <h3 className="text-lg font-bold text-secondary mb-4 border-b pb-2">{activeCategory.name}</h3>
                                    <ul className="grid grid-cols-2 gap-4">
                                        {activeCategory.subCategories.map((sub) => (
                                            <li key={sub.id}>
                                                <Link href={`/categoria/${activeCategory.slug}/${sub.slug}`} className="text-gray-500 hover:text-primary text-sm transition hover:underline">{sub.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link href="/nosotros" className="text-sm font-bold text-secondary hover:text-primary transition uppercase tracking-wide">Nosotros</Link>
            <Link href="/contacto" className="text-sm font-bold text-secondary hover:text-primary transition uppercase tracking-wide">Contacto</Link>
          </nav>

          {/* ACCIONES (Login + Carrito) */}
          <div className="flex items-center gap-6 z-20">
            
            {/* 3. LÓGICA DE USUARIO LOGUEADO */}
            {user ? (
                // --- VISTA LOGUEADO ---
                <div className="relative hidden md:block">
                    <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)}
                        className="flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition focus:outline-none"
                    >
                        <FaUserCircle className="text-xl" />
                        <span>Bienvenido, {user.firstName || user.nombres} {user.lastName || user.apellidos}</span>
                        <FaChevronRight className={`text-xs transition-transform ${isUserMenuOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Dropdown de Usuario */}
                    {isUserMenuOpen && (
                        <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50">
                                <p className="text-xs text-gray-500">Conectado como</p>
                                <p className="text-xs font-bold text-secondary truncate">{user.email}</p>
                            </div>
                            <button 
                                onClick={logout}
                                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition"
                            >
                                <FaSignOutAlt /> Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                // --- VISTA INVITADO (Link Login) ---
                <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition">
                    <FaUser className="text-lg" />
                    <span>Iniciar Sesión</span>
                </Link>
            )}

            <div className="hidden md:block h-6 w-px bg-gray-200"></div>
            
            {/* CARRITO (Igual que antes) */}
            <div className="relative">
              <button 
                className="relative group focus:outline-none"
                onClick={() => setIsCartOpen(!isCartOpen)} 
                onBlur={() => setTimeout(() => setIsCartOpen(false), 200)}
              >
                <div className={`p-2 rounded-full transition ${isCartOpen ? 'bg-primary/10' : 'bg-gray-100 group-hover:bg-primary/10'}`}>
                  <FaShoppingCart className={`text-xl transition ${isCartOpen ? 'text-primary' : 'text-secondary group-hover:text-primary'}`} />
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                    {totalItems}
                  </span>
                )}
              </button>
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-secondary">Mi Lista ({totalItems})</h3>
                    <Link href="/carrito" className="text-xs text-primary font-bold hover:underline">Ver todo</Link>
                  </div>
                  {cart.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">Tu lista está vacía</div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {cart.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-4 flex gap-3 border-b border-gray-50">
                           <div className="w-12 h-12 relative border border-gray-100 rounded overflow-hidden flex-shrink-0">
                             <Image src={item.imageUrl || item.image || 'https://placehold.co/100x100'} alt={item.name} fill className="object-contain" unoptimized />
                           </div>
                           <div className="flex-grow min-w-0">
                             <h4 className="text-xs font-bold text-secondary truncate">{item.name}</h4>
                             <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }} className="text-gray-400 hover:text-red-500"><FaTrash className="text-xs" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-4 bg-white border-t border-gray-100">
                    <Link href="/carrito" className="block w-full bg-secondary hover:bg-black text-white text-center py-3 rounded-lg font-bold text-sm transition uppercase tracking-wide">Ir a Cotizar</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburguesa Móvil */}
            <button className="md:hidden text-2xl text-secondary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      
      {/* MENU MÓVIL (Simplificado) */}
      {isMobileMenuOpen && (
         <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg p-4">
             {/* Aquí también podrías poner el condicional de usuario para móvil */}
             {user ? (
                 <div className="mb-4 pb-4 border-b border-gray-100">
                     <p className="font-bold text-secondary">Hola, {user.firstName}</p>
                     <button onClick={logout} className="text-red-500 text-sm mt-1">Cerrar Sesión</button>
                 </div>
             ) : (
                 <Link href="/login" className="block mb-4 font-bold text-secondary">Iniciar Sesión</Link>
             )}
             <Link href="/tienda" className="block py-2 text-secondary">TIENDA</Link>
             <Link href="/nosotros" className="block py-2 text-secondary">NOSOTROS</Link>
             <Link href="/contacto" className="block py-2 text-secondary">CONTACTO</Link>
         </div>
      )}
    </header>
  );
}