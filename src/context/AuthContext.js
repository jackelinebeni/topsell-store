'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Para evitar "parpadeos" mientras carga
  const router = useRouter();

  // 1. CARGA INICIAL: Verificar si hay sesión guardada en el navegador
  useEffect(() => {
    const storedToken = localStorage.getItem('topsell_token');
    const storedUser = localStorage.getItem('topsell_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al leer datos de sesión", error);
        // Si hay error (JSON corrupto), limpiamos todo
        localStorage.removeItem('topsell_token');
        localStorage.removeItem('topsell_user');
      }
    }
    setLoading(false);
  }, []);

  // 2. FUNCIÓN LOGIN: Se llama cuando el Backend devuelve OK
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    
    // Guardar en el navegador (Persistencia)
    localStorage.setItem('topsell_token', tokenData);
    localStorage.setItem('topsell_user', JSON.stringify(userData));
  };

  // 3. FUNCIÓN LOGOUT: Borrar todo y sacar al usuario
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('topsell_token');
    localStorage.removeItem('topsell_user');
    
    // Opcional: Limpiar también el carrito si quieres
    // localStorage.removeItem('topsell_cart'); 
    
    router.push('/login');
  };

  // Helper para verificar si está autenticado
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isAuthenticated,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);