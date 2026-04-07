"use client";
import { LayoutDashboard, ShoppingBag, Users, TerminalSquare, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${isActive("/") ? "bg-zinc-900 border border-zinc-800 text-yellow-400" : "hover:bg-zinc-900/50 text-zinc-400 border border-transparent"}`}>
        <LayoutDashboard size={18} /> Dashboard
      </Link>
      <Link href="/produtos" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${isActive("/produtos") ? "bg-zinc-900 border border-zinc-800 text-yellow-400" : "hover:bg-zinc-900/50 text-zinc-400 border border-transparent"}`}>
        <ShoppingBag size={18} /> Radar 33
      </Link>
      <Link href="/creators" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${isActive("/creators") ? "bg-zinc-900 border border-zinc-800 text-yellow-400" : "hover:bg-zinc-900/50 text-zinc-400 border border-transparent"}`}>
        <Users size={18} /> Espião
      </Link>
    </>
  );

  return (
    <>
      {/* Mobile Header (Aparece só no celular) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#050505] border-b border-zinc-900 z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <TerminalSquare className="text-yellow-400" size={20} />
          <h1 className="text-lg font-black text-white tracking-tighter">PEGA<span className="text-yellow-400">&</span>POSTA</h1>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-yellow-400 p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-[#050505] border-b border-zinc-900 z-40 p-4 flex flex-col gap-2 shadow-2xl">
          <NavLinks />
        </div>
      )}

      {/* Desktop Sidebar (Aparece só no PC) */}
      <aside className="hidden md:flex w-64 bg-[#050505] border-r border-zinc-900 h-screen flex-col fixed left-0 top-0 text-zinc-400 z-50">
        <div className="p-6 border-b border-zinc-900">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <TerminalSquare className="text-yellow-400" size={24} />
            <h1 className="text-xl font-black text-white tracking-tighter">PEGA<span className="text-yellow-400">&</span>POSTA</h1>
          </Link>
          <div className="inline-block px-2 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded text-[9px] text-yellow-400 font-mono uppercase tracking-widest">
            SISTEMA_ATIVO
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-[10px] font-mono text-zinc-600 mb-3 ml-2 uppercase tracking-widest">Módulos</p>
          <NavLinks />
        </nav>
      </aside>
    </>
  );
}
