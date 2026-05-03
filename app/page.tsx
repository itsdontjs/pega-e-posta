"use client";
import { useState, useEffect } from "react";
import { Search, Loader2, TrendingUp } from "lucide-react";
import VideoCard from "../components/VideoCard";
import ExtractionModal from "../components/ExtractionModal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [activeQuery, setActiveQuery] = useState("tiktokshop");

  const fetchVideos = async (searchQuery: string) => {
    setLoading(true);
    setVideos([]);
    try {
      const res = await fetch("/api/trending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos("tiktokshop");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setActiveQuery(q);
    fetchVideos(q);
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero / Search ── */}
      <div className="flex flex-col items-center pt-14 pb-10 px-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={16} className="text-emerald-400" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400">
            Videos virais em tempo real
          </span>
        </div>

        <h1 className="text-[2.8rem] font-black tracking-tighter text-white text-center leading-none mb-8">
          Qual produto você quer{" "}
          <span className="text-emerald-400">vender</span>?
        </h1>

        <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: tênis, perfume, air fryer..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/60 rounded-2xl py-4 pl-13 pr-32 text-[15px] text-white placeholder-slate-600 outline-none transition-all shadow-xl pl-12"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2.5 top-2 bottom-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : "Buscar"}
          </button>
        </form>
      </div>

      {/* ── Feed ── */}
      <div className="px-6 pb-16">
        {!loading && videos.length > 0 && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              #{activeQuery} · {videos.length} vídeos
            </p>
            <span className="text-[10px] text-slate-600 font-mono uppercase">fonte: tiktok shop live</span>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-3xl aspect-[9/16] animate-pulse border border-slate-800"
              />
            ))}
          </div>
        )}

        {!loading && videos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((v, i) => (
              <VideoCard
                key={v.id || i}
                video={v}
                onRefazer={() => setSelectedVideo(v)}
              />
            ))}
          </div>
        )}

        {!loading && videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-slate-600">
            <p className="font-bold uppercase text-sm">Nenhum vídeo encontrado.</p>
            <p className="text-xs mt-1">Tente outro termo ou aguarde o Apify processar.</p>
          </div>
        )}
      </div>

      {selectedVideo && (
        <ExtractionModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
