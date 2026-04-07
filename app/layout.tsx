import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Pega & Posta | Radar 33",
  description: "Inteligência Comercial para TikTok Shop",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="no-referrer" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={`${inter.className} bg-[#0a0a0a] text-[#ffffff] flex min-h-screen`}>
        <Sidebar />
        <main className="flex-1 ml-64 p-8 bg-[#0a0a0a] overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
