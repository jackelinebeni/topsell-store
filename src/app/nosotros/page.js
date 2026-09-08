import ValuesCarousel from "@/components/ValuesCarousel";
import Image from "next/image";
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
import { getAboutPageContent } from "@/services/api";
import { sanitizeRichText } from "@/utils/sanitizeHtml";

export const metadata = {
  title: "Nosotros",
};

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

const DEFAULT_VALUES = [
  {
    icon: "FaCubes",
    title: "Innovación",
    paragraph:
      "Promovemos el desarrollo de nuevas marcas y productos que respondan a las necesidades cambiantes.",
  },
  {
    icon: "FaGem",
    title: "Calidad",
    paragraph:
      "Nos comprometemos con estándares altos en todos nuestros procesos, desde la selección de productos.",
  },
  {
    icon: "FaHandshake",
    title: "Compromiso",
    paragraph:
      "Escuchamos y entendemos a nuestros clientes para ofrecerles soluciones que realmente agreguen valor.",
  },
  {
    icon: "FaSearch",
    title: "Transparencia",
    paragraph:
      "Actuamos con claridad y honestidad en nuestras comunicaciones y relaciones comerciales.",
  },
];

export default async function NosotrosPage() {
  const data = await getAboutPageContent();

  const heroTitle = data?.heroTitle || "¿Quiénes somos?";
  const heroParagraph =
    data?.heroParagraph ||
    "Corporación Topsell S.A.C. es un grupo corporativo que consolida la experiencia acumulada por más de 13 años en el rubro de iluminación, eléctricos y ferretería del equipo fundador Grupo Celux, dedicada a la importación y distribución mayorista de diversos productos con las marcas Celux, Stronglight y Bemlux. Y así mismo, sigue desarrollando nuevas propuestas que respondan a las necesidades del mercado, con atención cercana, transparencia y calidad.";
  const heroImage = data?.heroImage || "/nosotros.jpg";

  const visionTitle = data?.visionTitle || "Visión";
  const visionParagraph =
    data?.visionParagraph ||
    "Ser líderes en el mercado peruano en la venta de productos innovadores para el hogar, mejorando la calidad de vida de nuestros clientes a través de soluciones prácticas, accesibles y confiables, y consolidándonos como referentes en el comercio digital.";
  const visionImage = data?.visionImage || "/vision.jpg";

  const missionTitle = data?.missionTitle || "Misión";
  const missionParagraph =
    data?.missionParagraph ||
    "Ofrecer productos en tendencia para el hogar que combinen funcionalidad, innovación y diseño, utilizando principalmente canales digitales para brindar una experiencia de compra sencilla, segura y personalizada, mientras fomentamos la sostenibilidad y la accesibilidad tecnológica.";
  const missionImage = data?.missionImage || "/mision.jpg";

  const valuesTitle = data?.valuesTitle || "Nuestros Valores";
  const values = data?.values?.length ? data.values : DEFAULT_VALUES;

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto max-w-[1600px] px-[30px] sm:px-[38px] lg:px-[46px] py-20 space-y-32">
        {/* ¿Quiénes somos? */}
        <section className="text-center flex flex-col items-center py-8">
          <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-12">
            {heroTitle}
          </h2>
          <div className="relative w-full max-w-4xl h-72 md:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-xl">
            <Image
              src={heroImage}
              alt="Equipo Topsell"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div
            className="rich-text-content text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg md:text-xl text-justify px-[30px]"
            style={{
              fontSize: data?.heroParagraphFontSize
                ? `${data.heroParagraphFontSize}px`
                : undefined,
            }}
            dangerouslySetInnerHTML={{
              __html: sanitizeRichText(heroParagraph),
            }}
          />
        </section>

        <div className="border-t border-gray-200 max-w-md mx-auto"></div>

        {/* Visión */}
        <section className="flex flex-col md:flex-row items-center gap-16 py-8">
          <div className="md:w-1/2 text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">
              {visionTitle}
            </h2>
            <div
              className="rich-text-content text-gray-600 leading-relaxed text-lg md:text-xl text-justify pr-0 md:pr-8"
              style={{
                fontSize: data?.visionParagraphFontSize
                  ? `${data.visionParagraphFontSize}px`
                  : undefined,
              }}
              dangerouslySetInnerHTML={{
                __html: sanitizeRichText(visionParagraph),
              }}
            />
          </div>
          <div className="md:w-1/2 relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={visionImage}
              alt="Visión"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </section>

        {/* Misión */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={missionImage}
              alt="Misión"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="md:w-1/2 text-left space-y-6 md:pl-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">
              {missionTitle}
            </h2>
            <div
              className="rich-text-content text-gray-600 leading-relaxed text-lg md:text-xl text-justify"
              style={{
                fontSize: data?.missionParagraphFontSize
                  ? `${data.missionParagraphFontSize}px`
                  : undefined,
              }}
              dangerouslySetInnerHTML={{
                __html: sanitizeRichText(missionParagraph),
              }}
            />
          </div>
        </section>

        <div className="border-t border-gray-200 max-w-md mx-auto"></div>

        {/* Nuestros Valores */}
        <section className="text-center py-8">
          <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-16">
            {valuesTitle}
          </h2>

          {values.length <= 4 ? (
            // Estático cuando son 4 o menos
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((v, i) => (
                <ValueCard
                  key={i}
                  icon={v.icon}
                  title={v.title}
                  paragraph={v.paragraph}
                  paragraphFontSize={v.paragraphFontSize}
                />
              ))}
            </div>
          ) : (
            // Carousel automático cuando hay más de 4
            <ValuesCarousel values={values} />
          )}
        </section>
      </div>
    </main>
  );
}

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
