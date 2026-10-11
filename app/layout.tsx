import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vinicios-ferreira.vercel.app"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Vinicios Ferreira",
    title: "Vinicios Ferreira — QA Engineer",
    description:
      "Automação de testes, métricas de qualidade e produtos digitais.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
  title: "Vinicios Ferreira – QA Engineer / Software Engineer in Test",
  description:
    "Portfólio de Vinicios Ferreira. QA Engineer focado em automação de testes, ferramentas de métricas e processos de qualidade.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-page text-primary">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
