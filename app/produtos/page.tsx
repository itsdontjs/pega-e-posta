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

        // BUSCA BLINDADA DA URL: Tenta em 3 lugares diferentes do JSON
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
    <div className="max-w-7xl mx-auto pt-10 px-4 pb-20 font-inter text-white">
      <h1 className="text-5xl font-black italic uppercase text-center mb-12">Radar <span className="text-emerald-400">33</span></h1>
      <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto flex gap-4 mb-16">
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-slate-900 border-2 border-slate-800 rounded-2xl px-6 font-bold">
          <option value="BR">BRA 🇧🇷</option>
          <option value="US">USA 🇺🇸</option>
        </select>
        <div className="relative flex-1">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="O que vamos minerar?" className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-5 px-8 outline-none focus:border-emerald-500" />
          <button disabled={isLoading} className="absolute right-2 top-2 bottom-2 bg-emerald-500 text-slate-950 px-8 rounded-xl font-black uppercase text-xs transition-all active:scale-95">
            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {products.map((item) => (
          <div key={item.id} className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden flex flex-col hover:border-emerald-400 transition-all shadow-2xl">
            <div className="relative aspect-square">
              <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-slate-950/80 px-3 py-1 rounded-xl text-emerald-400 font-bold text-[10px]">{item.sales} SOLD</div>
            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <h3 className="font-bold text-sm line-clamp-2 uppercase italic leading-tight h-10">{item.title}</h3>
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800/50">
                <span className="text-xl font-black">{item.price}</span>
                <DollarSign className="text-emerald-400" size={20} />
              </div>
              <button 
                onClick={() => { if(item.url !== "#") window.location.href = `/creators?url=${encodeURIComponent(item.url)}`; }}
                className="w-full bg-white hover:bg-emerald-500 text-slate-950 font-black py-4 rounded-xl uppercase text-[10px] tracking-widest mt-auto"
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