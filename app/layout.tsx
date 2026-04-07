import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pega & Posta | Radar 33",
  description: "Fábrica de vídeos virais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-50 flex min-h-screen`}>
        <Sidebar />
        <main className="flex-1 ml-64 p-8 bg-slate-950">
          {children}
        </main>
      </body>
    </html>
  );
}