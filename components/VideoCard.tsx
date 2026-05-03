"use client";
import { Download, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function VideoCard({
  video,
  onRefazer,
}: {
  video: any;
  onRefazer: () => void;
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!video.videoUrl) {
      alert("URL do vídeo não disponível.");
      return;
    }
    setDownloading(true);
    try {
      const res = await fetch("http://localhost:8000/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: video.videoUrl }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Erro desconhecido");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${video.author || "video"}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert("Erro ao baixar: " + (e.message || "O backend está rodando?"));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden group bg-slate-900 aspect-[9/16] border border-slate-800/50">
      {/* Thumbnail */}
      {video.thumbnail ? (
        <img
          src={video.thumbnail}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        {/* KPIs */}
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1 flex items-center gap-1.5">
            <span className="text-[9px] font-black text-black/50 uppercase tracking-wider">Views</span>
            <span className="text-[11px] font-black text-black">{video.views}</span>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1 flex items-center gap-1.5">
            <span className="text-[9px] font-black text-black/50 uppercase tracking-wider">Likes</span>
            <span className="text-[11px] font-black text-black">{video.likes}</span>
          </div>
        </div>

        {/* Author */}
        <p className="text-white/70 text-[11px] font-bold mb-2.5 truncate">
          @{video.author}
        </p>

        {/* Buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 bg-white hover:bg-slate-100 disabled:opacity-60 text-black font-black text-[10px] py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95 uppercase tracking-wide"
          >
            {downloading ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Download size={12} />
            )}
            {downloading ? "..." : "Baixar"}
          </button>

          <button
            onClick={onRefazer}
            className="flex-1 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white font-black text-[10px] py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95 uppercase tracking-wide"
          >
            <Sparkles size={12} />
            Refazer IA
          </button>
        </div>
      </div>
    </div>
  );
}
