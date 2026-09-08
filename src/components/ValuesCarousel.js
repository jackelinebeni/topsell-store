"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  FaCubes,
  FaGem,
  FaShieldAlt,
  FaHandshake,
  FaSearch,
  FaChessKnight,
  FaRocket,
  FaStar,
  FaHeart,
  FaLeaf,
  FaGlobe,
  FaBolt,
} from "react-icons/fa";
import { sanitizeRichText } from "@/utils/sanitizeHtml";

const ICON_MAP = {
  FaCubes,
  FaGem,
  FaShieldAlt,
  FaHandshake,
  FaSearch,
  FaChessKnight,
  FaRocket,
  FaStar,
  FaHeart,
  FaLeaf,
  FaGlobe,
  FaBolt,
};

function ValuesCarousel({ values }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  function ValueCard({ icon, title, paragraph, paragraphFontSize }) {
    const IconComponent = ICON_MAP[icon] || FaCubes;
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl flex flex-col items-center text-center h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200">
        <div className="text-4xl text-secondary mb-5 border-2 border-secondary rounded-full p-4 bg-white shadow-sm">
          <IconComponent />
        </div>
        <h3 className="font-extrabold text-secondary mb-3 text-2xl">{title}</h3>
        <div
          className="rich-text-content text-xl text-gray-600 leading-relaxed"
          style={{
            fontSize: paragraphFontSize ? `${paragraphFontSize}px` : undefined,
          }}
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(paragraph) }}
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex -ml-3">
        {values.map((v, i) => (
          <div
            key={i}
            className="pl-3 min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
          >
            <ValueCard
              icon={v.icon}
              title={v.title}
              paragraph={v.paragraph}
              paragraphFontSize={v.paragraphFontSize}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default ValuesCarousel;