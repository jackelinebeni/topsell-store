import { FaWhatsapp } from "react-icons/fa";
import { safeWhatsappNumber } from "@/utils/urlSafety";

export default function WhatsappFloatingButton({ phoneNumber, message = "Hola, quisiera más información." }) {
  const number = safeWhatsappNumber(phoneNumber, "51933636607");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 md:gap-4">
      <span className="bg-white text-secondary text-sm md:text-2xl font-bold px-2 py-1 md:px-4 md:py-2 shadow-md whitespace-nowrap">
        Contáctate
        <br />
        con nosotros
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-3xl md:text-5xl shadow-lg hover:scale-110 transition-all duration-300"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}