"use client";
import { useState } from "react";
import { Sparkles, Loader2, Search, DollarSign } from "lucide-react";

export default function ProdutosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("BR");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

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

      const formatados = data.map((item: any, index: number) => {
        const firstSkuKey = item.skus ? Object.keys(item.skus)[0] : null;
        const skuData = firstSkuKey ? item.skus[firstSkuKey] : null;

        const precoReal = skuData?.real_price?.sale_price_format
          ? `${skuData.real_price.currency_symbol} ${skuData.real_price.sale_price_format}`
          : item.min_price || "Ver Preço";

        const imagemReal = skuData?.image || item.sale_props?.[0]?.sale_prop_values?.[0]?.image || item.main_image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600";
        const urlReal = item.product_url || item.url || skuData?.product_url || "#";

        return {
          id: index,
          title: item.product_name || item.title || `Produto #${index + 1}`,
          price: precoReal,
          sales: item.sold_count || "100+",
          image: imagemReal,
          url: urlReal,
        };
      });
      setProducts(formatados);
    } catch (err) {
      console.error("Erro na busca");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
          Radar <span className="text-yellow-400">33</span>
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Extração de catálogos</p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-3xl flex gap-3 mb-12">
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="px-4 bg-[#050505] border border-zinc-800 rounded text-zinc-300 font-mono text-sm outline-none focus:border-yellow-400">
          <option value="BR">BRA</option>
          <option value="US">USA</option>
        </select>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Comando de busca (ex: fone)..." className="w-full pl-12 pr-4 py-4 bg-[#050505] border border-zinc-800 rounded text-zinc-100 font-mono text-sm placeholder-zinc-600 outline-none focus:border-yellow-400" />
        </div>
        <button disabled={isLoading || !searchQuery.trim()} className="px-8 bg-yellow-400 text-black rounded font-black text-xs uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-50 transition-all flex items-center gap-2">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Executar
        </button>
      </form>

      {hasSearched && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-[#050505] border border-zinc-900 rounded-lg overflow-hidden flex flex-col hover:border-yellow-400/50 transition-all group">
              <div className="relative aspect-square border-b border-zinc-900">
                <img src={item.image} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-3 right-3 bg-black/90 px-2 py-1 rounded text-yellow-400 font-mono text-[10px] border border-zinc-800">
                  {item.sales} VENDAS
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 gap-4">
                <h3 className="font-bold text-sm text-zinc-300 line-clamp-2 h-10 leading-tight">{item.title}</h3>
                <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-auto">
                  <span className="text-lg font-mono text-white">{item.price}</span>
                  <DollarSign className="text-yellow-400" size={18} />
                </div>
                <button onClick={() => { if(item.url !== "#") window.location.href = `/creators?url=${encodeURIComponent(item.url)}`; }} className="w-full border border-zinc-800 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black text-zinc-500 font-black py-3 rounded text-[10px] uppercase tracking-widest transition-all mt-2">
                  Rastrear Afiliados
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
