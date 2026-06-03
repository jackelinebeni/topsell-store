'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; // token malformado o inválido
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Inicializar desde localStorage solo en el cliente, validando la expiración
  useEffect(() => {
    const storedToken = localStorage.getItem('topsell_token');

    if (storedToken && !isTokenExpired(storedToken)) {
      const storedUser = localStorage.getItem('topsell_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('topsell_user');
        }
      }
      setToken(storedToken);
    } else if (storedToken) {
      // Token expirado o inválido: limpiar
      localStorage.removeItem('topsell_token');
      localStorage.removeItem('topsell_user');
    }

    setLoading(false);
  }, []);

  // FUNCIÓN LOGIN: Se llama cuando el Backend devuelve OK
  const login = (userData, tokenData) => {
    if (!userData || !tokenData) return;
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('topsell_token', tokenData);
    localStorage.setItem('topsell_user', JSON.stringify(userData));
  };

  // FUNCIÓN LOGOUT: Borrar todo y sacar al usuario
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('topsell_token');
    localStorage.removeItem('topsell_user');
    router.push('/login');
  };

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