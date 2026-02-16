"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaTrash,
  FaSignOutAlt,
  FaUserCircle,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";
import { getCategories, searchProducts } from "@/services/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isStoreHovered, setIsStoreHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const pathname = usePathname(); // Detecta la ruta actual

  // --- ESTADOS PARA MENÚ MÓVIL ---
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);

  // --- ESTADOS PARA BÚSQUEDA EN VIVO ---
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const searchRef = useRef(null);

  const router = useRouter();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { cart, removeFromCart, totalItems } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchCats = async () => {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) setActiveCategory(data[0]);
    };
    fetchCats();

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowPreview(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Efecto para cerrar todo cuando cambie la ruta (navegación)
  useEffect(() => {
    setIsCartOpen(false);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setShowPreview(false); // También cierra la previsualización de búsqueda
  }, [pathname]);

  // --- EFECTO DEBOUCE PARA BÚSQUEDA ---
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      setShowPreview(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      setShowPreview(true);
      try {
        const results = await searchProducts(searchTerm);
        setSearchResults(results.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowPreview(false);
    if (searchTerm.trim()) {
      router.push(`/productos?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleMobileCategories = () => {
    setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
    setExpandedMobileCategory(null);
  };

  const toggleMobileCategory = (categoryId) => {
    setExpandedMobileCategory(
      expandedMobileCategory === categoryId ? null : categoryId,
    );
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
    setExpandedMobileCategory(null);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 font-sans">
      <div className="container mx-auto max-w-[1800px] px-[30px] sm:px-[38px] lg:px-[46px] relative">
        <div className="flex justify-between items-center h-24 gap-4">
          {/* 1. LOGO */}
          <div className="flex-shrink-0 z-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-32 h-24">
                <Image
                  src="/logo.png"
                  alt="TopSell Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* 2. MEGAMENÚ (MEJORA DE TAMAÑO) */}
          <nav className="hidden xl:flex items-center space-x-8 ml-8 h-full z-10">
            <Link
              href="/nosotros"
              className="text-xl font-bold text-secondary hover:text-primary transition uppercase tracking-wide"
            >
              Nosotros
            </Link>
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsStoreHovered(true)}
              onMouseLeave={() => setIsStoreHovered(false)}
            >
              <Link
                href="/productos"
                className="text-xl font-bold text-secondary hover:text-primary transition uppercase tracking-wide cursor-pointer h-full flex items-center"
              >
                Productos
              </Link>

              {isStoreHovered && (
                /* Aumento de ancho w-[600px] -> w-[800px] */
                <div className="absolute top-full left-0 w-[800px] bg-white shadow-2xl border border-gray-100 rounded-b-2xl flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {/* Categorías: text-lg -> text-xl */}
                  <div className="w-1/3 bg-gray-50 py-6">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat)}
                        className={`px-8 py-4 cursor-pointer text-xl font-bold flex justify-between items-center transition ${activeCategory?.id === cat.id ? "bg-white text-primary border-l-4 border-primary shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}
                      >
                        {cat.name}{" "}
                        {activeCategory?.id === cat.id && (
                          <FaChevronRight className="text-sm" />
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Subcategorías: text-lg -> text-xl y Título text-xl -> text-2xl */}
                  <div className="w-2/3 p-10 bg-white">
                    {activeCategory && activeCategory.subCategories && (
                      <div>
                        <h3 className="text-2xl font-black text-secondary mb-6 border-b-2 border-gray-50 pb-3 uppercase tracking-tighter">
                          {activeCategory.name}
                        </h3>
                        <ul className="grid grid-cols-1 gap-5">
                          {activeCategory.subCategories.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={`/productos?category=${activeCategory.slug}&subcategory=${sub.slug}`}
                                onClick={() => setIsStoreHovered(false)}
                                className="text-gray-500 hover:text-primary text-xl font-medium transition hover:translate-x-2 inline-block transform"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/contacto"
              className="text-xl font-bold text-secondary hover:text-primary transition uppercase tracking-wide"
            >
              Contacto
            </Link>
          </nav>

          {/* 3. BÚSQUEDA PREVISUALIZACIÓN (MEJORA DE TAMAÑO) */}
          <div
            className="hidden lg:flex flex-1 max-w-2xl mx-6 z-20 relative"
            ref={searchRef}
          >
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setShowPreview(true);
                }}
                className="w-full bg-gray-50 border border-gray-200 text-xl rounded-full pl-8 pr-16 py-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-hover text-white p-4 rounded-full w-12 h-12 flex items-center justify-center transition shadow-lg"
              >
                {isSearching ? (
                  <FaSpinner className="animate-spin text-lg" />
                ) : (
                  <FaSearch className="text-lg" />
                )}
              </button>
            </form>

            {showPreview && (
              <div className="absolute top-full left-0 w-full mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/producto/${product.slug}`}
                        onClick={() => {
                          setShowPreview(false);
                          setSearchTerm("");
                        }}
                        className="flex items-center gap-6 p-6 hover:bg-blue-50/50 transition border-b border-gray-50 last:border-0"
                      >
                        {/* Imagen: w-16 h-16 -> w-20 h-20 */}
                        <div className="relative w-20 h-20 flex-shrink-0 border border-gray-100 rounded-lg bg-white shadow-sm">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          {/* Título: text-lg -> text-xl */}
                          <p className="text-xl font-semibold text-secondary truncate mb-1">
                            {product.name}
                          </p>
                          <p className="text-sm text-primary uppercase font-semibold tracking-widest">
                            {product.category?.name || "Producto"}
                          </p>
                        </div>
                        <FaChevronRight className="text-gray-300 text-lg" />
                      </Link>
                    ))}
                  </>
                ) : (
                  !isSearching &&
                  searchTerm.length >= 2 && (
                    <div className="p-12 text-center text-gray-400 text-xl">
                      No encontramos resultados.
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* 4. VENTANA DEL CARRITO (MEJORA DE TAMAÑO) */}
          <div className="flex items-center gap-6 z-20">
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)}
                  className="flex items-center gap-2 text-lg font-bold text-secondary hover:text-primary transition focus:outline-none"
                >
                  <FaUserCircle className="text-xl" />

                  <span className="truncate max-w-[100px]">
                    Hola, {user.firstName || user.nombres}
                  </span>

                  <FaChevronRight
                    className={`text-xs transition-transform ${isUserMenuOpen ? "rotate-90" : ""}`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50">
                      <p className="text-xs text-gray-500">Conectado como</p>

                      <p className="text-xs font-bold text-secondary truncate">
                        {user.email}
                      </p>
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
              <Link
                href="/login"
                className="hidden md:flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition"
              >
                <FaUser className="text-lg" />

                <span>Iniciar Sesión</span>
              </Link>
            )}

            <div className="hidden md:block h-6 w-px bg-gray-200"></div>

            <div className="relative">
              <button
                className="relative group p-3 bg-gray-100 rounded-full hover:bg-primary/10 transition"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <FaShoppingCart className="text-2xl text-secondary group-hover:text-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-black h-6 w-6 flex items-center justify-center rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>

              {isCartOpen && (
                /* Ancho: w-80 -> w-96 */
                <div className="absolute right-0 top-full mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-black text-xl text-secondary uppercase tracking-tighter">
                      Mi Lista ({totalItems})
                    </h3>
                    <Link
                      href="/carrito"
                      className="text-sm text-primary font-bold hover:underline"
                    >
                      VER TODO
                    </Link>
                  </div>
                  {cart.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-lg">
                      Tu lista está vacía
                    </div>
                  ) : (
                    <div className="max-h-[450px] overflow-y-auto">
                      {cart.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="p-6 flex gap-5 border-b border-gray-50 hover:bg-gray-50/50 transition"
                        >
                          {/* Imagen: w-12 h-12 -> w-20 h-20 */}
                          <div className="w-20 h-20 relative border border-gray-100 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-sm">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                              unoptimized
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            {/* Texto: text-xs -> text-base */}
                            <h4 className="text-base font-bold text-secondary leading-tight mb-1">
                              {item.name}
                            </h4>
                            <p className="text-lg font-black text-primary">
                              Cant: {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromCart(item.id);
                            }}
                            className="text-gray-300 hover:text-red-500 transition"
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-6 bg-white border-t border-gray-100">
                    {/* Botón más grande: py-3 text-sm -> py-5 text-lg */}
                    <Link
                      href="/carrito"
                      className="block w-full bg-secondary hover:bg-black text-white text-center py-5 rounded-xl font-black text-lg transition uppercase tracking-widest shadow-lg"
                    >
                      Ir a Cotizar
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button
              className="xl:hidden text-3xl text-secondary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg p-4 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSearchSubmit} className="mb-4 relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary"
            >
              <FaSearch />
            </button>
          </form>
          {user ? (
            <div className="mb-4 pb-4 border-b border-gray-100">
              <p className="font-bold text-secondary">Hola, {user.firstName}</p>
              <button onClick={logout} className="text-red-500 text-sm mt-1">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="block mb-4 font-bold text-xl"
            >
              Iniciar Sesión
            </Link>
          )}

          <Link
            href="/nosotros"
            onClick={closeMobileMenu}
            className="block py-2 text-secondary font-bold hover:text-primary transition"
          >
            NOSOTROS
          </Link>

          {/* Productos con menú desplegable */}
          <div>
            <button
              onClick={toggleMobileCategories}
              className="w-full flex items-center justify-between py-2 text-secondary font-bold hover:text-primary transition"
            >
              <span>PRODUCTOS</span>
              <FaChevronRight
                className={`text-xs transition-transform ${isMobileCategoriesOpen ? "rotate-90" : ""}`}
              />
            </button>

            {isMobileCategoriesOpen && (
              <div className="ml-4 mt-2 space-y-2">
                {/* Link a todos los productos */}
                <Link
                  href="/productos"
                  onClick={closeMobileMenu}
                  className="block py-2 text-sm text-gray-600 hover:text-primary transition"
                >
                  Ver todos los productos
                </Link>

                {/* Categorías */}
                {categories.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => toggleMobileCategory(category.id)}
                      className="w-full flex items-center justify-between py-2 text-sm text-gray-700 font-semibold hover:text-primary transition"
                    >
                      <span>{category.name}</span>
                      <FaChevronRight
                        className={`text-xs transition-transform ${expandedMobileCategory === category.id ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Subcategorías */}
                    {expandedMobileCategory === category.id &&
                      category.subCategories && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.subCategories.map((subCategory) => (
                            <Link
                              key={subCategory.id}
                              href={`/productos?category=${category.slug}&subcategory=${subCategory.slug}`}
                              onClick={closeMobileMenu}
                              className="block py-2 text-sm text-gray-600 hover:text-primary transition hover:underline"
                            >
                              {subCategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contacto"
            onClick={closeMobileMenu}
            className="block py-2 text-secondary font-bold hover:text-primary transition"
          >
            CONTACTO
          </Link>
        </div>
      )}
    </header>
  );
}
