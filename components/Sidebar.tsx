"use client";

import { LayoutDashboard, ShoppingBag, Users, Video, Settings, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-[#262626] h-screen flex flex-col fixed text-[#a3a3a3] z-20">
      {/* Header */}
      <div className="p-6 border-b border-[#262626]">
        <Link href="/" className="block">
          <h1 className="text-2xl font-black text-white tracking-tight mb-2 hover:text-[#00d9ff] transition-colors">
            PEGA<span className="text-[#00d9ff]">&</span>POSTA
          </h1>
        </Link>
        <div className="flex items-center gap-1 px-2 py-1 bg-[#121212] rounded-md w-fit">
          <Zap size={10} className="text-[#00d9ff]" />
          <p className="text-[9px] text-[#00d9ff] font-bold uppercase tracking-widest">Modo Ativo</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-[#737373] mb-3 ml-2 uppercase tracking-widest">Inteligência</p>

        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium group ${
            isActive("/")
              ? "bg-[#1a1a1a] border border-[#00d9ff] text-[#00d9ff]"
              : "hover:bg-[#121212] border border-transparent hover:border-[#262626]"
          }`}
        >
          <LayoutDashboard size={18} className={isActive("/") ? "text-[#00d9ff]" : "group-hover:text-[#00d9ff]"} />
          Dashboard
        </Link>

        <Link
          href="/produtos"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium group ${
            isActive("/produtos")
              ? "bg-[#1a1a1a] border border-[#00d9ff] text-[#00d9ff]"
              : "hover:bg-[#121212] border border-transparent hover:border-[#262626]"
          }`}
        >
          <ShoppingBag size={18} className={isActive("/produtos") ? "text-[#00d9ff]" : "group-hover:text-[#00d9ff]"} />
          Produto Vencedor
        </Link>

        <Link
          href="/creators"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium group ${
            isActive("/creators")
              ? "bg-[#1a1a1a] border border-[#00d9ff] text-[#00d9ff]"
              : "hover:bg-[#121212] border border-transparent hover:border-[#262626]"
          }`}
        >
          <Users size={18} className={isActive("/creators") ? "text-[#00d9ff]" : "group-hover:text-[#00d9ff]"} />
          Top Creators
        </Link>

        <div className="pt-4 mt-4 border-t border-[#262626]">
          <p className="text-[10px] font-bold text-[#737373] mb-3 ml-2 uppercase tracking-widest">Minha Operação</p>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium group hover:bg-[#121212] border border-transparent hover:border-[#262626]"
          >
            <Video size={18} className="group-hover:text-[#00d9ff]" />
            Meus Vídeos
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium group hover:bg-[#121212] border border-transparent hover:border-[#262626]"
          >
            <Settings size={18} className="group-hover:text-[#00d9ff]" />
            Configurações
          </Link>
        </div>
      </nav>

      {/* Upgrade Card */}
      <div className="p-4 border-t border-[#262626]">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#00d9ff]/10 to-[#00a8cc]/5 p-4 rounded-lg border border-[#00d9ff]/20 hover:border-[#00d9ff]/40 transition-all">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/0 via-[#00d9ff]/5 to-[#00d9ff]/0 opacity-0 hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 font-bold mb-2 text-[#00d9ff] text-sm">
              <Rocket size={16} />
              PLANO ULTRA
            </div>
            <p className="text-[11px] text-[#a3a3a3] mb-3">Acesso ilimitado à API de Vendas</p>
            <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full overflow-hidden mb-3 border border-[#262626]">
              <div className="bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] h-full w-[85%] rounded-full"></div>
            </div>
            <button className="w-full bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] text-[#0a0a0a] text-xs font-black py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#00d9ff]/20 transition-all uppercase tracking-wider">
              Upgrade Pro
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
