"use client";
import { LayoutDashboard, ShoppingBag, Users, Video, Settings, Rocket, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden md:flex w-64 bg-[#050505] border-r border-zinc-900 h-screen flex-col fixed left-0 top-0 text-zinc-400 z-50">
      {/* Header Grok Style */}
      <div className="p-6 border-b border-zinc-900">
        <Link href="/" className="flex items-center gap-2 mb-2">
          <TerminalSquare className="text-yellow-400" size={24} />
          <h1 className="text-xl font-black text-white tracking-tighter hover:text-yellow-400 transition-colors">
            PEGA<span className="text-yellow-400">&</span>POSTA
          </h1>
        </Link>
        <div className="inline-block px-2 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded text-[9px] text-yellow-400 font-mono uppercase tracking-widest">
          SISTEMA_ATIVO
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-mono text-zinc-600 mb-3 ml-2 uppercase tracking-widest">Módulos</p>

        <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all group ${isActive("/") ? "bg-zinc-900 border border-zinc-800 text-yellow-400" : "hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"}`}>
          <LayoutDashboard size={18} className={isActive("/") ? "text-yellow-400" : "group-hover:text-yellow-400"} />
          Dashboard
        </Link>

        <Link href="/produtos" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all group ${isActive("/produtos") ? "bg-zinc-900 border border-zinc-800 text-yellow-400" : "hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"}`}>
          <ShoppingBag size={18} className={isActive("/produtos") ? "text-yellow-400" : "group-hover:text-yellow-400"} />
          Radar de Produtos
        </Link>

        <Link href="/creators" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all group ${isActive("/creators") ? "bg-zinc-900 border border-zinc-800 text-yellow-400" : "hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"}`}>
          <Users size={18} className={isActive("/creators") ? "text-yellow-400" : "group-hover:text-yellow-400"} />
          Espião de Afiliados
        </Link>

        <div className="pt-4 mt-4 border-t border-zinc-900">
          <p className="text-[10px] font-mono text-zinc-600 mb-3 ml-2 uppercase tracking-widest">Configurações</p>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800">
            <Video size={18} className="text-zinc-500" />
            Meus Vídeos
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800">
            <Settings size={18} className="text-zinc-500" />
            Preferências
          </Link>
        </div>
      </nav>

      {/* Box Club 33 */}
      <div className="p-4 border-t border-zinc-900">
        <div className="bg-[#0a0a0a] border border-zinc-800 p-4 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 font-black mb-1 text-zinc-100 uppercase tracking-tighter">
              <Rocket size={16} className="text-yellow-400" />
              CLUB 33
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mb-4">Acesso total à API Apify</p>
            <button className="w-full bg-yellow-400 text-black text-[10px] font-black py-3 rounded hover:bg-yellow-300 transition-colors uppercase tracking-widest">
              Fazer Upgrade
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
