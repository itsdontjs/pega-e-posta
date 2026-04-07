import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pega & Posta | Radar 33",
  description: "Inteligência Comercial para TikTok Shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-zinc-100 min-h-screen selection:bg-yellow-400 selection:text-black`}>
        <Sidebar />
        {/* pt-16 é o espaço do cabeçalho no celular. md:pt-0 remove no PC. md:ml-64 dá o espaço do menu no PC. */}
        <main className="pt-16 md:pt-0 md:ml-64 min-h-screen bg-black">
          {children}
        </main>
      </body>
    </html>
  );
}
