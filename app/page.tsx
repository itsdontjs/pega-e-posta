"use client";
import { useState } from "react";
import { Search, Sparkles, Lock, Play } from "lucide-react";
import VideoCard from "../components/VideoCard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("produtos"); // 'produtos' ou 'videos'
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Simulação dos dados que virão dos seus dois robôs do Apify
  const mockResultados = [
    { id: 1, title: "Tênis Mazallo Ultra Comfort", views: "1.2M", gmv: "R$ 89k", thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "Suplemento Zentic Pro", views: "850k", gmv: "R$ 42k", thumbnail: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "Fone Noise Cancelling Max", views: "2.1M", gmv: "R$ 150k", thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setHasSearched(true);
    // Aqui depois a gente pluga a chamada real para o Apify
  };

  return (
    <div className="max-w-6xl mx-auto pt-10">
      
      {/* HEADER E NAVEGAÇÃO DE ABAS */}
      <div className="flex flex-col items-center mb-12">
        <div className="bg-slate-900 p-1 rounded-full border border-slate-800 flex mb-8">
          <button 
            onClick={() => { setActiveTab("produtos"); setHasSearched(false); }}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'produtos' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Pesquisar Produtos
          </button>
          <button 
            onClick={() => { setActiveTab("videos"); setHasSearched(false); }}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'videos' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Espionar Afiliados
          </button>
        </div>

        {/* BUSCA MINIMALISTA ESTILO GROK */}
        <h1 className="text-4xl font-black text-white mb-6 tracking-tighter text-center">
          O que você quer <span className="text-emerald-400">vender</span> hoje?
        </h1>
        
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'produtos' ? "Ex: Tênis Ortopédico, Air Fryer..." : "Cole o link do produto ou nome do afiliado..."}
            className="w-full bg-slate-900 border-2 border-slate-800 focus:border-emerald-500 rounded-2xl py-5 pl-14 pr-32 text-lg text-white placeholder-slate-600 outline-none transition-all shadow-2xl"
          />
          <button 
            type="submit"
            className="absolute right-3 top-3 bottom-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <Sparkles size={18} />
            {activeTab === 'produtos' ? 'Buscar' : 'Analisar'}
          </button>
        </form>
      </div>

      {/* ÁREA DE RESULTADOS COM O "DEGRADÊ DE TRAVA" */}
      <div className="relative min-h-[400px]">
        {!hasSearched && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            {/* O "DEGRADÊ FODA" QUE BLOQUEIA A VISÃO */}
            <div className="grid grid-cols-3 gap-6 w-full opacity-20 blur-[2px] pointer-events-none select-none">
              {mockResultados.map(v => (
                <div key={v.id} className="bg-slate-900 aspect-[9/16] rounded-2xl border border-slate-800" />
              ))}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col items-center justify-center text-center px-4">
              <div className="bg-slate-900/80 p-4 rounded-full border border-slate-700 mb-4 animate-bounce">
                <Lock className="text-emerald-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito ao Banco de Dados</h2>
              <p className="text-slate-400 max-w-sm">Digite um termo acima para desbloquear os vídeos de afiliados que mais estão vendendo agora.</p>
            </div>
          </div>
        )}

        {hasSearched && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-200">
                Resultados para: <span className="text-emerald-400">"{searchQuery}"</span>
              </h3>
              <div className="text-xs font-mono text-slate-500">FONTE: API TIKTOK SHOP LIVE</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockResultados.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}