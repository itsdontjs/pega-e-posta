"use client";

import { useState } from "react";
import { Search, TerminalSquare, Zap } from "lucide-react";

export default function Home() {
  const [command, setCommand] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    // Aqui entrará a lógica de conexão com seu backend Node.js / Python
    setIsExecuting(true);
    console.log("Executando comando:", command);
    
    setTimeout(() => setIsExecuting(false), 2000); // Mock de loading
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto z-10">
      
      {/* Branding Central */}
      <div className="mb-10 text-center flex flex-col items-center">
        <TerminalSquare className="w-10 h-10 mb-6 text-zinc-600" strokeWidth={1.5} />
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-400">
          O que vamos <span className="font-medium text-white">escalar</span> hoje?
        </h1>
      </div>

      {/* Input de Comando (Grok Style) */}
      <div className="w-full max-w-2xl relative group">
        <form onSubmit={handleCommand} className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {isExecuting ? (
              <Zap className="h-5 w-5 text-white animate-pulse" />
            ) : (
              <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-white transition-colors" />
            )}
          </div>
          
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            disabled={isExecuting}
            placeholder="Ex: /extrair @maya_fox ou colar link do TikTok Shop..."
            className="w-full bg-zinc-900/60 border border-white/10 rounded-2xl py-5 pl-14 pr-32 text-lg text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all shadow-2xl disabled:opacity-50"
            autoFocus
          />
          
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button 
              type="submit"
              disabled={isExecuting || !command.trim()}
              className="bg-white text-black px-5 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isExecuting ? "Processando..." : "Executar"}
            </button>
          </div>
        </form>
      </div>

      {/* Sugestões Rápidas de Growth */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-mono text-zinc-500">
        <button 
          onClick={() => setCommand("/trend tiktok-shop")}
          className="px-4 py-2 border border-white/5 rounded-lg hover:bg-white/5 hover:text-zinc-200 transition-all"
        >
          /trend tiktok-shop
        </button>
        <button 
          onClick={() => setCommand("/spy meta-ads --niche=saude")}
          className="px-4 py-2 border border-white/5 rounded-lg hover:bg-white/5 hover:text-zinc-200 transition-all"
        >
          /spy meta-ads
        </button>
        <button 
          onClick={() => setCommand("/generate copy --hook=agressivo")}
          className="px-4 py-2 border border-white/5 rounded-lg hover:bg-white/5 hover:text-zinc-200 transition-all"
        >
          /generate copy
        </button>
      </div>

    </div>
  );
}
