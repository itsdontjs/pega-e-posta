"use client";
import { useState } from "react";
import { Sparkles, Loader2, Search, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProdutosPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("BR");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true); setHasSearched(true);
    try {
      const res = await fetch("/api/radar", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery, country_code: country }),
      });
      const data = await res.json();
      const formatados = data.map((item: any, index: number) => {
        const firstSkuKey = item.skus ? Object.keys(item.skus)[0] : null;
        const skuData = firstSkuKey ? item.skus[firstSkuKey] : null;
        const precoReal = skuData?.real_price?.sale_price_format ? `${skuData.real_price.currency_symbol} ${skuData.real_price.sale_price_format}` : item.min_price || "Ver Preço";
        const imagemReal = skuData?.image || item.sale_props?.[0]?.sale_prop_values?.[0]?.image || item.main_image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600";
        return {
          id: index, title: item.product_name || item.title || `Produto #${index + 1}`,
          price: precoReal, sales: item.sold_count || "100+", image: imagemReal, url: item.product_url || item.url || skuData?.product_url || "#",
        };
      });
      setProducts(formatados);
    } catch (err) { console.error(err); setProducts([]); } finally { setIsLoading(false); }
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8 pb-20">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-1">
          Radar <span className="text-yellow-400">33</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">Extração de catálogos</p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-4xl flex flex-col md:flex-row gap-3 mb-10">
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full md:w-32 p-4 bg-[#050505] border border-zinc-800 rounded-lg text-zinc-300 font-mono text-sm outline-none focus:border-yellow-400 appearance-none">
          <option value="BR">BRA</option>
          <option value="US">USA</option>
        </select>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Comando de busca (ex: smartwatch)..." className="w-full pl-12 pr-4 py-4 bg-[#050505] border border-zinc-800 rounded-lg text-zinc-100 font-mono text-sm placeholder-zinc-600 outline-none focus:border-yellow-400" />
        </div>
        <button disabled={isLoading || !searchQuery.trim()} className="w-full md:w-auto px-8 py-4 md:py-0 bg-yellow-400 text-black rounded-lg font-black text-xs uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Executar
        </button>
      </form>

      {hasSearched && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-[#050505] border border-zinc-900 rounded-xl overflow-hidden flex flex-col hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.05)] transition-all group">
              <div className="relative aspect-square border-b border-zinc-900">
                <img src={item.image} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-3 right-3 bg-black/90 px-2 py-1 rounded text-yellow-400 font-mono text-[10px] border border-zinc-800 shadow-xl">
                  {item.sales} VENDAS
                </div>
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-1 gap-3">
                <h3 className="font-bold text-xs md:text-sm text-zinc-300 line-clamp-2 leading-snug">{item.title}</h3>
                <div className="flex items-center justify-between border-t border-zinc-900 pt-3 mt-auto">
                  <span className="text-base md:text-lg font-mono text-white">{item.price}</span>
                  <DollarSign className="text-yellow-400" size={16} />
                </div>
                <button onClick={() => { if(item.url !== "#") router.push(`/creators?url=${encodeURIComponent(item.url)}`); }} className="w-full border border-zinc-800 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black text-zinc-500 font-black py-3 rounded text-[10px] uppercase tracking-widest transition-all mt-2">
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
