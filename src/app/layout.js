import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";
import { getCompanyInfo } from "@/services/api";

// 1. IMPORTAR TUS CONTEXTOS
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext"; // <--- ESTO ES LO QUE FALTA

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata = {
  title: {
    default: "Topsell",
    template: "Topsell | %s",
  },
  description: "Página oficial de Topsell Perú",
  icons: {
    icon: "/logotipo.png",
  },
  charset: "UTF-8",
};

// El footer (horarios, redes, whatsapp) se edita desde el admin: no debe congelarse en el build
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const companyInfo = await getCompanyInfo();

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
            
            <Footer companyInfo={companyInfo} />
            
            <WhatsappFloatingButton phoneNumber={companyInfo?.whatsappNumber} />
            
          </CartProvider>
          
        </AuthProvider>

      </body>
    </html>
  );
}