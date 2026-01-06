'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/auth';
import { FaLock, FaEnvelope } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Llamada al Backend Real
      const data = await loginUser(email, password);
      
      // 2. Guardar en Contexto Global (LocalStorage)
      login(data.user, data.token);
      
      // 3. Redirigir (Si vino del carrito, idealmente volvería ahí, por ahora al home)
      router.push('/');
      
    } catch (err) {
      setError(err.message || 'Ocurrió un error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Cabecera Roja */}
        <div className="bg-secondary p-8 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tighter">
                TOP<span className="text-primary">SELL</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">Ingresa a tu cuenta para cotizar</p>
        </div>

        {/* Formulario */}
        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Mensaje de Error */}
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg border border-red-100 text-center font-medium">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-2">Correo Electrónico</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaEnvelope />
                        </div>
                        <input 
                            type="email"
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                            placeholder="nombre@empresa.com"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-secondary uppercase">Contraseña</label>
                        <Link href="/recuperar" className="text-xs text-primary hover:underline font-medium">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaLock />
                        </div>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {/* Botón */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
                >
                    {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
                </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-gray-50">
                <p className="text-sm text-gray-500 mb-2">¿Aún no tienes cuenta?</p>
                <Link href="/registro" className="text-secondary font-bold hover:text-primary transition border-b-2 border-secondary hover:border-primary pb-0.5">
                    Regístrate aquí
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}