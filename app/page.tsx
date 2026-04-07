"use client";

import { useState } from "react";
import { Search, Sparkles, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setHasSearched(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full text-center mb-12">
          {/* Badge */}
          <div className="inline-block px-4 py-2 rounded-full bg-[#121212] border border-[#262626] mb-8">
            <p className="text-sm text-[#a3a3a3] flex items-center gap-2">
              <Sparkles size={14} className="text-[#00d9ff]" />
              Inteligência Comercial em Tempo Real
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Encontre os <span className="text-gradient">Produtos Vencedores</span> do TikTok Shop
          </h1>

          {/* Subheading */}
          <p className="text-xl text-[#a3a3a3] mb-12 leading-relaxed">
            Descubra quais produtos estão gerando mais vendas, analise seus afiliados e domine o mercado com dados em tempo real.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/produtos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] text-[#0a0a0a] rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-[#00d9ff]/30 transition-all uppercase tracking-wider"
            >
              <Search size={20} />
              Buscar Produtos
            </Link>
            <Link
              href="/creators"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#121212] text-[#e5e5e5] border border-[#262626] rounded-lg font-bold text-lg hover:border-[#00d9ff]/30 transition-all uppercase tracking-wider"
            >
              <Sparkles size={20} />
              Ver Afiliados
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Card 1 */}
          <div className="p-6 rounded-lg border border-[#262626] bg-[#121212] hover:border-[#00d9ff]/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#00d9ff]/10 border border-[#00d9ff]/20 flex items-center justify-center mb-4">
              <Search size={24} className="text-[#00d9ff]" />
            </div>
            <h3 className="text-lg font-bold text-[#e5e5e5] mb-2">Busca Inteligente</h3>
            <p className="text-sm text-[#a3a3a3]">Encontre produtos com melhor performance usando palavras-chave</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-lg border border-[#262626] bg-[#121212] hover:border-[#00d9ff]/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#00d9ff]/10 border border-[#00d9ff]/20 flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-[#00d9ff]" />
            </div>
            <h3 className="text-lg font-bold text-[#e5e5e5] mb-2">Dados em Tempo Real</h3>
            <p className="text-sm text-[#a3a3a3]">Informações atualizadas constantemente do TikTok Shop</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-lg border border-[#262626] bg-[#121212] hover:border-[#00d9ff]/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#00d9ff]/10 border border-[#00d9ff]/20 flex items-center justify-center mb-4">
              <ArrowRight size={24} className="text-[#00d9ff]" />
            </div>
            <h3 className="text-lg font-bold text-[#e5e5e5] mb-2">Análise de Afiliados</h3>
            <p className="text-sm text-[#a3a3a3]">Descubra quem está vendendo mais e como replicar o sucesso</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl w-full grid grid-cols-3 gap-6 py-12 border-t border-b border-[#262626]">
          <div className="text-center">
            <p className="text-3xl font-black text-[#00d9ff] mb-2">10K+</p>
            <p className="text-sm text-[#a3a3a3]">Produtos Analisados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-[#00d9ff] mb-2">50K+</p>
            <p className="text-sm text-[#a3a3a3]">Afiliados Rastreados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-[#00d9ff] mb-2">99.9%</p>
            <p className="text-sm text-[#a3a3a3]">Uptime</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-12 border-t border-[#262626]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#e5e5e5] mb-4">Pronto para começar?</h2>
          <p className="text-[#a3a3a3] mb-8">Acesse a plataforma e comece a descobrir produtos vencedores agora mesmo.</p>
          <Link
            href="/produtos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] text-[#0a0a0a] rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-[#00d9ff]/30 transition-all uppercase tracking-wider"
          >
            Acessar Plataforma
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
