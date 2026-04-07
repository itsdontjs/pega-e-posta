export default function VideoCard({ video }: { video: any }) {
  return (
    <div className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden group hover:border-emerald-500/50 transition-all shadow-2xl">
      <div className="relative aspect-[9/16] bg-slate-800">
        {/* Badge de Em Alta */}
        <div className="absolute top-4 left-4 z-10 bg-emerald-500/90 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-tighter">
          <span className="animate-pulse">●</span> Em Alta
        </div>

        {/* A IMAGEM REAL - COM CORREÇÃO DE REFERRER */}
        <img 
          src={video.thumbnail} 
          alt={video.title}
          referrerPolicy="no-referrer" // <--- OBRIGATÓRIO PARA O TIKTOK
          className="w-full h-full object-cover"
          onError={(e) => {
            // Se o link for um vídeo ou estiver quebrado, ele carrega um placeholder bonitão
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600";
          }}
        />

        {/* Overlay de Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 h-10">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-emerald-400 font-black">
            <span className="text-xs uppercase opacity-70">Price</span>
            <span className="text-lg">{video.gmv}</span>
          </div>
          <div className="bg-slate-800 px-3 py-1 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {video.views}
          </div>
        </div>

        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20 uppercase text-xs tracking-widest">
          Modelar Vídeo
        </button>
      </div>
    </div>
  );
}