import { FaWhatsapp } from "react-icons/fa";
import { safeWhatsappNumber } from "@/utils/urlSafety";

export default function WhatsappFloatingButton({ phoneNumber, message = "Hola, quisiera más información." }) {
  const number = safeWhatsappNumber(phoneNumber, "51933636607");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
      <span className="bg-white text-secondary text-2xl font-bold px-4 py-2 shadow-md whitespace-nowrap">
        Contáctate
        <br />
        con nosotros
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-5xl shadow-lg hover:scale-110 transition-all duration-300"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}