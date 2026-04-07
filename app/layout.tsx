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
      {/* Retirei o 'flex' daqui para não quebrar a tela */}
      <body className={`${inter.className} bg-black text-zinc-100 min-h-screen selection:bg-yellow-400 selection:text-black`}>
        
        <Sidebar />
        
        {/* No celular (padrão): sem margem. Em telas grandes (md): margem de 64 para caber o menu */}
        <main className="md:ml-64 min-h-screen bg-black overflow-x-hidden relative">
          {children}
        </main>
        
      </body>
    </html>
  );
}
