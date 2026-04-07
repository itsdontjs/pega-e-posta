import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pega & Posta | Radar 33",
  description: "Inteligência Comercial para TikTok Shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-zinc-100 flex min-h-screen selection:bg-yellow-400 selection:text-black`}>
        {/* Menu Lateral Fixo */}
        <Sidebar />
        
        {/* Conteúdo Principal (Margem de 64 para não ficar atrás do menu) */}
        <main className="flex-1 ml-64 min-h-screen bg-black">
          {children}
        </main>
      </body>
    </html>
  );
}
