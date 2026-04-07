"use client";
import { Search, TerminalSquare, Users } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] md:min-h-screen flex flex-col items-center justify-center p-6 md:p-8 relative overflow-hidden">
      {/* Brilho de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-400/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl w-full text-center relative z-10 mt-10 md:mt-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-zinc-800 bg-[#050505] mb-6 md:mb-8">
          <TerminalSquare size={14} className="text-yellow-400" />
          <p className="text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-widest">Motor de Extração Online</p>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter leading-tight md:leading-none text-white">
          Quebre o código do <br className="hidden md:block" />
          <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">TikTok Shop.</span>
        </h1>

        <p className="text-sm md:text-lg text-zinc-500 font-mono mb-10 max-w-xl mx-auto px-4">
          Ferramenta furtiva para mineração de produtos validados e rastreio de afiliados de alta conversão.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link href="/produtos" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black rounded font-black text-sm hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all uppercase tracking-widest">
            <Search size={18} /> Iniciar Radar
          </Link>
          <Link href="/creators" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0a0a0a] text-zinc-300 border border-zinc-800 rounded font-black text-sm hover:border-yellow-400/50 hover:text-yellow-400 transition-all uppercase tracking-widest">
            <Users size={18} /> Espiar Afiliados
          </Link>
        </div>
      </div>
    </div>
  );
}
