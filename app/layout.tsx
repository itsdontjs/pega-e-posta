import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Pega & Posta | JNX Engine",
  description: "Automação de Conteúdo e Inteligência de Vendas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-black text-white h-screen flex overflow-hidden`}>
        
        {/* O Menu Lateral está de volta! */}
        <Sidebar />

        {/* Área Principal de Renderização */}
        <main className="flex-1 flex flex-col relative overflow-y-auto">
          {/* Header minimalista apenas para Mobile */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5">
            <div className="text-sm font-bold tracking-widest uppercase">JNX ENGINE</div>
          </div>

          {/* Gradiente sutil no fundo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-10 bg-gradient-to-b from-zinc-500 to-transparent blur-[100px] pointer-events-none" />
          
          <div className="flex-1 relative z-10 w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
