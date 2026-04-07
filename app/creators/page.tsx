"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, TerminalSquare } from "lucide-react";

function CreatorsContent() {
  const searchParams = useSearchParams();
  const productUrl = searchParams.get("url");
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productUrl && productUrl !== "#") {
      const getCreators = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/creators", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productUrl })
          });
          const data = await res.json();
          setCreators(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Erro");
        } finally {
          setLoading(false);
        }
      };
      getCreators();
    }
  }, [productUrl]);

  return (
    <div className="max-w-6xl mx-auto pt-10 px-4 font-inter text-zinc-100">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="mb-6">
          <TerminalSquare className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tight">
          Espião <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">33</span>
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-4">Extração de rede de afiliados</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-6 mt-20">
          <Loader2 className="animate-spin text-yellow-400" size={50} />
          <div className="text-center">
            <p className="font-mono text-sm text-yellow-400 animate-pulse tracking-widest drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">RESOLVENDO_CAPTCHA...</p>
            <p className="text-zinc-600 text-[10px] font-mono uppercase mt-2">Bypass via proxy residencial ativo</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.length > 0 ? creators.map((c, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-zinc-800/80 p-6 rounded-xl hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(250,204,21,0.05)] transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <img src={c.avatar_url || c.creator_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=0a0a0a`} className="w-16 h-16 rounded border border-zinc-800 object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="font-bold text-zinc-100 truncate w-32">@{c.username || c.creator_name}</h3>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">{c.follower_count || 'K'} Seg</p>
                </div>
              </div>
              <div className="bg-black p-4 rounded border border-zinc-800/50 flex justify-between items-center group-hover:border-yellow-400/20 transition-colors">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Vendas_Trackeadas</span>
                <span className="text-yellow-400 font-mono text-lg drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">{c.sales_badge || c.total_sales || "100+"}</span>
              </div>
            </div>
          )) : !loading && productUrl && (
            <div className="col-span-full py-16 text-center border border-dashed border-zinc-800 rounded-xl">
               <p className="text-zinc-500 font-mono uppercase text-xs tracking-widest">Nenhum_dado_encontrado_na_rede.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CreatorsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center pt-20"><Loader2 className="animate-spin text-yellow-400" /></div>}>
      <CreatorsContent />
    </Suspense>
  );
}
