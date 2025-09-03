/** @type {import('next').NextConfig} */

// lee envs para decidir
const useDockerRewrite = process.env.USE_DOCKER_REWRITE === "true";
const internalApi = process.env.API_INTERNAL_URL; // ej: "http://api:8080"

const nextConfig = {
  output: "export", // habilita `next export` para S3 estático

  async rewrites() {
    // ⚡ solo agrega rewrites en local con compose
    if (useDockerRewrite && internalApi) {
      return [
        {
          source: "/api/:path*",
          destination: `${internalApi}/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
