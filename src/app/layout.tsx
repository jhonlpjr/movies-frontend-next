import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"
import Providers from "./providers"
import "./globals.css"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // CSS pequeño y seguro
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Movies App",
  description: "Catálogo de películas con Next + shadcn/ui",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors /> {/* Toaster global */}
      </body>
    </html>
  )
}
