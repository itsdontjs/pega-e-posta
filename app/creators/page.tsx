"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, UserCheck } from "lucide-react";

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
    <div className="max-w-6xl mx-auto pt-10 px-4 text-white font-inter">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="bg-blue-500/10 p-4 rounded-3xl mb-6 border border-blue-500/20 shadow-lg">
          <UserCheck className="text-blue-400" size={32} />
        </div>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter">Ranking de <span className="text-blue-400">Afiliados</span></h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-6 mt-20">
          <Loader2 className="animate-spin text-blue-400" size={60} />
          <p className="font-black uppercase text-xl italic animate-pulse">Hackeando Afiliados...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creators.length > 0 ? creators.map((c, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl hover:border-blue-500 transition-all group">
              <div className="flex items-center gap-5 mb-8">
                <img src={c.avatar_url || c.creator_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="font-black text-xl text-blue-400 leading-none">@{c.username || c.creator_name}</h3>
                  <p className="text-xs text-slate-500 uppercase font-black mt-2">{c.follower_count || 'K'} SEGUIDORES</p>
                </div>
              </div>
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/50 flex justify-between items-center group-hover:border-blue-500/30 transition-colors">
                <span className="text-[10px] font-black text-slate-500 uppercase italic">Vendas</span>
                <span className="text-emerald-400 font-black text-xl italic">{c.sales_badge || c.total_sales || "100+"}</span>
              </div>
            </div>
          )) : !loading && productUrl && (
            <p className="col-span-full text-center text-slate-500 font-bold uppercase text-xs">Nenhum criador encontrado para este link.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function CreatorsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center pt-20"><Loader2 className="animate-spin text-blue-400" /></div>}>
      <CreatorsContent />
    </Suspense>
  );
}