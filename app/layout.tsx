import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.variable} ${mono.variable} font-sans bg-black text-white min-h-screen flex flex-col`}>
        
        {/* Header Minimalista (Navegação via comandos) */}
        <header className="w-full flex items-center justify-between p-5 border-b border-white/5">
          <div className="text-sm font-bold tracking-widest uppercase">
            Pega & Posta<span className="text-zinc-600">.com</span>
          </div>
          
          <nav className="flex gap-6 text-xs font-mono text-zinc-500">
            <button className="hover:text-white transition-colors">/radar-trends</button>
            <button className="hover:text-white transition-colors">/mazallo-shoes</button>
            <button className="hover:text-white transition-colors">/creators</button>
          </nav>
        </header>

        {/* Área Principal de Renderização */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Gradiente sutil no fundo para não ficar 100% flat */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-10 bg-gradient-to-b from-zinc-500 to-transparent blur-[100px] pointer-events-none" />
          
          {children}
        </main>
      </body>
    </html>
  );
}
