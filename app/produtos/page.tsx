"use client";

import { useState } from "react";
import { Sparkles, Loader2, Search, Filter } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";

export default function ProdutosPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("BR");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [minSales, setMinSales] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery, country_code: country }),
      });

      const data = await res.json();

      const formatados = data
        .map((item: any, index: number) => {
          const firstSkuKey = item.skus ? Object.keys(item.skus)[0] : null;
          const skuData = firstSkuKey ? item.skus[firstSkuKey] : null;

          const precoReal = skuData?.real_price?.sale_price_format
            ? `${skuData.real_price.currency_symbol} ${skuData.real_price.sale_price_format}`
            : item.min_price || "Ver Preço";

          const imagemReal =
            skuData?.image ||
            item.sale_props?.[0]?.sale_prop_values?.[0]?.image ||
            item.main_image ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600";

          const urlReal = item.product_url || item.url || skuData?.product_url || "#";
          const salesCount = parseInt(String(item.sold_count || 0));

          return {
            id: index,
            title: item.product_name || item.title || `Produto #${index + 1}`,
            price: precoReal,
            sales: salesCount,
            image: imagemReal,
            url: urlReal,
          };
        })
        .filter((p: any) => p.sales >= minSales);

      setProducts(formatados);
    } catch (err) {
      console.error("Erro na busca:", err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCreators = (url: string) => {
    router.push(`/creators?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="text-gradient">Radar 33</span>
          </h1>
          <p className="text-[#a3a3a3] text-lg">Encontre produtos vencedores no TikTok Shop</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
          <div className="flex gap-3 mb-4">
            {/* Country Select */}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-3 bg-[#121212] border border-[#262626] rounded-lg text-[#e5e5e5] font-semibold hover:border-[#00d9ff]/30 focus:border-[#00d9ff] focus:outline-none transition-all"
            >
              <option value="BR">🇧🇷 Brasil</option>
              <option value="US">🇺🇸 EUA</option>
            </select>

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a3a3a3]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos (ex: shampoo, fone, smartwatch)..."
                className="w-full pl-12 pr-4 py-3 bg-[#121212] border border-[#262626] rounded-lg text-[#e5e5e5] placeholder-[#737373] hover:border-[#00d9ff]/30 focus:border-[#00d9ff] focus:outline-none transition-all"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="px-8 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] text-[#0a0a0a] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00d9ff]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-wider flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Buscar
                </>
              )}
            </button>
          </div>

          {/* Min Sales Filter */}
          {hasSearched && (
            <div className="flex items-center gap-3">
              <Filter size={16} className="text-[#a3a3a3]" />
              <label className="text-sm text-[#a3a3a3]">Vendas mínimas:</label>
              <input
                type="number"
                value={minSales}
                onChange={(e) => setMinSales(parseInt(e.target.value) || 0)}
                className="w-24 px-3 py-2 bg-[#121212] border border-[#262626] rounded-lg text-[#e5e5e5] text-sm"
              />
            </div>
          )}
        </form>

        {/* Results Section */}
        {hasSearched && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#e5e5e5] mb-1">Resultados da Busca</h2>
                <p className="text-[#a3a3a3]">
                  {products.length} produto{products.length !== 1 ? "s" : ""} encontrado{products.length !== 1 ? "s" : ""}
                </p>
              </div>
              {products.length > 0 && (
                <div className="text-right">
                  <p className="text-sm text-[#a3a3a3]">Ordenado por relevância</p>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewCreators={handleViewCreators}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-block p-4 rounded-lg bg-[#121212] border border-[#262626] mb-4">
                  <Search size={32} className="text-[#a3a3a3]" />
                </div>
                <h3 className="text-xl font-bold text-[#e5e5e5] mb-2">Nenhum produto encontrado</h3>
                <p className="text-[#a3a3a3]">Tente ajustar seus filtros ou fazer uma nova busca</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!hasSearched && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-lg bg-[#121212] border border-[#262626] mb-6">
              <Sparkles size={48} className="text-[#00d9ff]" />
            </div>
            <h2 className="text-2xl font-bold text-[#e5e5e5] mb-2">Comece sua busca</h2>
            <p className="text-[#a3a3a3] max-w-md mx-auto">
              Digite um termo de busca acima para descobrir produtos vencedores e analisar seus afiliados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
