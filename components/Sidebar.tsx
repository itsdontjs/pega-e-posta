import { LayoutDashboard, ShoppingBag, Users, Video, Settings, Rocket } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 h-screen flex flex-col fixed text-slate-300 z-20">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white tracking-tighter">
          PEGA<span className="text-emerald-400">&</span>POSTA
        </h1>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold text-center bg-slate-900 py-1 rounded">Modo Jeff Ativado</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] font-bold text-slate-600 mb-2 ml-2 uppercase">Inteligência</p>
        
        <Link href="/" className="flex items-center gap-3 p-3 hover:bg-slate-900 rounded-lg transition-all font-medium group">
          <LayoutDashboard size={18} className="group-hover:text-emerald-400" />
          Dashboard
        </Link>

        <Link href="/produtos" className="flex items-center gap-3 p-3 hover:bg-slate-900 rounded-lg transition-all font-medium group border border-transparent hover:border-emerald-500/20">
          <ShoppingBag size={18} className="group-hover:text-emerald-400" />
          Produto Vencedor
        </Link>

        <Link href="/creators" className="flex items-center gap-3 p-3 hover:bg-slate-900 rounded-lg transition-all font-medium group border border-transparent hover:border-emerald-500/20">
          <Users size={18} className="group-hover:text-emerald-400" />
          Top Creators
        </Link>

        <div className="pt-4">
          <p className="text-[10px] font-bold text-slate-600 mb-2 ml-2 uppercase">Minha Operação</p>
          <Link href="#" className="flex items-center gap-3 p-3 hover:bg-slate-900 rounded-lg transition-all font-medium group">
            <Video size={18} className="group-hover:text-emerald-400" />
            Meus Vídeos
          </Link>
          <Link href="#" className="flex items-center gap-3 p-3 hover:bg-slate-900 rounded-lg transition-all font-medium group">
            <Settings size={18} className="group-hover:text-emerald-400" />
            Configurações
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-gradient-to-tr from-emerald-600/20 to-emerald-400/5 p-4 rounded-xl border border-emerald-500/20">
          <div className="flex items-center gap-2 font-bold mb-1 text-emerald-400 text-sm">
            <Rocket size={16} />
            PLANO ULTRA
          </div>
          <p className="text-[10px] text-slate-400 mb-3">Acesso ilimitado à API de Vendas</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
             <div className="bg-emerald-500 h-full w-[85%]"></div>
          </div>
          <button className="w-full bg-emerald-500 text-slate-950 text-xs font-black py-2 rounded-lg hover:bg-emerald-400 transition-colors uppercase">
            Upgrade Pro
          </button>
        </div>
      </div>
    </aside>
  );
}