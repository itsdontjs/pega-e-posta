import { Zap } from "lucide-react";

export default function VideoCard({ video }: { video: any }) {
  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-white/5 bg-transparent hover:bg-zinc-900/50 transition-colors">
      
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-16 h-24 sm:w-12 sm:h-16 shrink-0 bg-zinc-900 border border-white/10 overflow-hidden">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600";
            }}
          />
        </div>
        
        <div className="flex flex-col max-w-md">
          <span className="text-[10px] font-mono text-zinc-500 mb-1 flex items-center gap-1 tracking-wider uppercase">
            <Zap size={10} className="text-white animate-pulse" /> Signal Detectado
          </span>
          <h3 className="text-sm font-medium text-zinc-300 line-clamp-1 group-hover:text-white transition-colors">
            {video.title}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex flex-col items-start sm:items-end font-mono text-xs">
          <span className="text-zinc-600 uppercase tracking-widest text-[10px]">Views</span>
          <span className="text-zinc-300">{video.views}</span>
        </div>
        
        <div className="flex flex-col items-start sm:items-end font-mono text-xs">
          <span className="text-zinc-600 uppercase tracking-widest text-[10px]">Price/GMV</span>
          <span className="text-white">{video.gmv}</span>
        </div>
        
        <button className="text-xs font-mono text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 bg-black px-4 py-2 transition-all group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          &gt;_ MODELAR
        </button>
      </div>
    </div>
  );
}
