import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 1. IMPORTAR TUS CONTEXTOS
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext"; // <--- ESTO ES LO QUE FALTA

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Topsell",
    template: "Topsell | %s",
  },
  description: "Tienda oficial de Topsell Perú",
  icons: {
    icon: "/logotipo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        
        {/* 2. ENVOLVER TODO CON AUTHPROVIDER (Nivel más alto) */}
        <AuthProvider>
          
          {/* CartProvider va dentro, porque a veces el carrito depende del usuario */}
          <CartProvider>
            
            <Header />
            
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />
            
          </CartProvider>
          
        </AuthProvider>

      </body>
    </html>
  );
}