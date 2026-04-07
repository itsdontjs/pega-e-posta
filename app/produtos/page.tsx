"use client";
import { useState } from "react";
import { Sparkles, Loader2, DollarSign } from "lucide-react";

export default function ProdutosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("BR");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery, country_code: country })
      });
      const data = await res.json();
      
      const formatados = data.map((item: any, index: number) => {
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

        return {
          id: index,
          title: item.product_name || item.title || `Produto #${index + 1}`,
          price: precoReal,
          sales: item.sold_count || "100+",
          image: imagemReal,
          url: urlReal
        };
      });
      setProducts(formatados);
    } catch (err) {
      console.error("Erro na busca");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-10 px-4 pb-20 font-inter">
      <h1 className="text-5xl font-black uppercase text-center mb-12 tracking-tight">
        Radar <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">33</span>
      </h1>
      
      <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto flex gap-4 mb-16">
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-[#0a0a0a] border border-zinc-800 text-zinc-300 rounded-lg px-6 font-mono text-sm outline-none focus:border-yellow-400 transition-colors">
          <option value="BR">BRA</option>
          <option value="US">USA</option>
        </select>
        <div className="relative flex-1">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Comando de mineração..." className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg py-4 px-6 outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] text-zinc-100 font-mono text-sm transition-all placeholder:text-zinc-600" />
          <button disabled={isLoading} className="absolute right-2 top-2 bottom-2 bg-yellow-400 hover:bg-yellow-300 text-black px-8 rounded flex items-center justify-center font-black uppercase text-xs transition-all hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] active:scale-95 disabled:opacity-50">
            {isLoading ? <Loader2 className="animate-spin text-black" size={18} /> : <Sparkles size={18} />}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item.id} className="bg-[#0a0a0a] border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.05)] transition-all group">
            <div className="relative aspect-square border-b border-zinc-800/80">
              <img src={item.image} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3 bg-black/90 px-2 py-1 rounded text-yellow-400 font-mono text-[10px] border border-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.2)]">
                {item.sales} SOLD
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 gap-4">
              <h3 className="font-medium text-sm line-clamp-2 text-zinc-300 h-10 leading-snug">{item.title}</h3>
              <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 mt-auto">
                <span className="text-lg font-mono text-white">{item.price}</span>
                <DollarSign className="text-yellow-400" size={18} />
              </div>
              <button 
                onClick={() => { if(item.url !== "#") window.location.href = `/creators?url=${encodeURIComponent(item.url)}`; }}
                className="w-full border border-zinc-700 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black text-zinc-400 font-bold py-3 rounded text-[10px] uppercase tracking-widest transition-all mt-2"
              >
                Espiar Afiliados
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
