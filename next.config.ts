const useRewrite = process.env.USE_DOCKER_REWRITE === "true";
const internalApi = process.env.API_INTERNAL_URL || "http://api:8080";

const nextConfig = {
  // sin output:"export" — Next server
  async rewrites() {
    if (useRewrite) {
      return [
        {
          // el browser pide a same-origin
          source: "/api/v1/:path*",
          // Next lo proxyea al contenedor de la API
          destination: `${internalApi}/api/v1/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
