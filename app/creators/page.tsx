"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Users, ArrowLeft } from "lucide-react";
import CreatorCard from "@/components/CreatorCard";
import Link from "next/link";

function CreatorsContent() {
  const searchParams = useSearchParams();
  const productUrl = searchParams.get("url");
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"followers" | "sales">("followers");

  useEffect(() => {
    if (productUrl && productUrl !== "#") {
      const getCreators = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/creators", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productUrl }),
          });
          const data = await res.json();
          setCreators(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Erro ao buscar criadores:", err);
          setCreators([]);
        } finally {
          setLoading(false);
        }
      };
      getCreators();
    }
  }, [productUrl]);

  const sortedCreators = [...creators].sort((a, b) => {
    if (sortBy === "followers") {
      const followersA = a.followers || a.follower_count || 0;
      const followersB = b.followers || b.follower_count || 0;
      return followersB - followersA;
    } else {
      const salesA = a.sales || a.total_sales || 0;
      const salesB = b.sales || b.total_sales || 0;
      return salesB - salesA;
    }
  });

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 text-[#a3a3a3] hover:text-[#00d9ff] transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Voltar para Produtos
        </Link>

        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-lg bg-[#121212] border border-[#262626] mb-6">
            <Users size={40} className="text-[#00d9ff]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="text-gradient">Top Creators</span>
          </h1>
          <p className="text-[#a3a3a3] text-lg">Afiliados com melhor performance neste produto</p>
        </div>

        {/* Sort Controls */}
        {!loading && creators.length > 0 && (
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setSortBy("followers")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                sortBy === "followers"
                  ? "bg-[#00d9ff] text-[#0a0a0a]"
                  : "bg-[#121212] text-[#a3a3a3] border border-[#262626] hover:border-[#00d9ff]/30"
              }`}
            >
              Ordenar por Seguidores
            </button>
            <button
              onClick={() => setSortBy("sales")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                sortBy === "sales"
                  ? "bg-[#00d9ff] text-[#0a0a0a]"
                  : "bg-[#121212] text-[#a3a3a3] border border-[#262626] hover:border-[#00d9ff]/30"
              }`}
            >
              Ordenar por Vendas
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-6 py-24">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] rounded-full blur-2xl opacity-20"></div>
              <Loader2 className="relative animate-spin text-[#00d9ff]" size={64} />
            </div>
            <div className="text-center">
              <p className="font-bold text-xl text-[#e5e5e5] mb-2">Analisando Afiliados</p>
              <p className="text-[#a3a3a3]">Isso pode levar alguns segundos...</p>
            </div>
          </div>
        ) : creators.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#e5e5e5]">
                  {creators.length} Criador{creators.length !== 1 ? "es" : ""}
                </h2>
                <p className="text-[#a3a3a3] text-sm">Ativos neste produto</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedCreators.map((creator, index) => (
                <CreatorCard key={index} creator={creator} />
              ))}
            </div>
          </div>
        ) : productUrl ? (
          <div className="text-center py-24">
            <div className="inline-block p-6 rounded-lg bg-[#121212] border border-[#262626] mb-6">
              <Users size={48} className="text-[#a3a3a3]" />
            </div>
            <h3 className="text-2xl font-bold text-[#e5e5e5] mb-2">Nenhum criador encontrado</h3>
            <p className="text-[#a3a3a3] max-w-md mx-auto mb-6">
              Não conseguimos encontrar afiliados para este produto. Tente outro produto.
            </p>
            <Link
              href="/produtos"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] text-[#0a0a0a] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00d9ff]/30 transition-all"
            >
              Voltar para Busca
            </Link>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-block p-6 rounded-lg bg-[#121212] border border-[#262626] mb-6">
              <Users size={48} className="text-[#a3a3a3]" />
            </div>
            <h3 className="text-2xl font-bold text-[#e5e5e5] mb-2">Selecione um produto</h3>
            <p className="text-[#a3a3a3] max-w-md mx-auto mb-6">
              Volte para a página de produtos e selecione um para ver seus afiliados.
            </p>
            <Link
              href="/produtos"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] text-[#0a0a0a] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00d9ff]/30 transition-all"
            >
              Ir para Produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreatorsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="animate-spin text-[#00d9ff]" size={48} />
        </div>
      }
    >
      <CreatorsContent />
    </Suspense>
  );
}
