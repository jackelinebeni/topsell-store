/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Permitimos nuestro proveedor de imágenes dummy
      },
      {
        protocol: 'https',
        hostname: '**', // (Opcional) En desarrollo puedes usar esto para permitir todo, pero en prod restringe.
      }
    ],
  },
};

export default nextConfig;