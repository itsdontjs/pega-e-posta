import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pega & Posta | Radar 33",
  description: "Inteligência Comercial para TikTok Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* bg-black força o fundo preto puro estilo xAI */}
      <body className={`${inter.className} bg-black text-zinc-100 min-h-screen selection:bg-yellow-400 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
