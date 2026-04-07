"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TerminalSquare, ShoppingCart, Users, Crosshair, Zap } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Command Center", href: "/", icon: TerminalSquare },
    { name: "Minerador (Apify)", href: "/produtos", icon: ShoppingCart },
    { name: "Top Creators", href: "/creators", icon: Users },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-[#050505] hidden md:flex flex-col h-screen shrink-0 z-20">
      {/* Branding / Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="text-sm font-bold tracking-widest uppercase text-white flex items-center gap-3">
          <Zap size={16} className="text-white" />
          JNX ENGINE
        </div>
      </div>

      {/* Navegação Tática */}
      <nav className="flex-1 p-4 space-y-1 font-mono text-xs">
        <div className="text-zinc-600 uppercase tracking-widest text-[10px] mb-4 px-3 mt-2">
          Módulos Ativos
        </div>
        
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-white/10 text-white border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon size={16} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Status da API / Usuário */}
      <div className="p-5 border-t border-white/10 font-mono flex flex-col gap-2">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-500">
          <span>Status Apify</span>
          <span className="flex items-center gap-1 text-white">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Online
          </span>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          root@jeancarlo:~
        </div>
      </div>
    </aside>
  );
}
