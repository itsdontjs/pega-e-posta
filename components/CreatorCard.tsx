"use client";

import { Users, TrendingUp } from "lucide-react";

interface CreatorCardProps {
  creator: {
    avatar_url?: string;
    creator_avatar?: string;
    username?: string;
    name?: string;
    followers?: number;
    follower_count?: number;
    sales?: number;
    total_sales?: number;
  };
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const getAvatarUrl = () => {
    if (creator.avatar_url) return creator.avatar_url;
    if (creator.creator_avatar) return creator.creator_avatar;
    const seed = creator.username || creator.name || "user";
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
  };

  const getUsername = () => creator.username || creator.name || "Criador Desconhecido";

  const getFollowers = () => {
    const count = creator.followers || creator.follower_count || 0;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getSales = () => {
    const sales = creator.sales || creator.total_sales || 0;
    return `R$ ${sales.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="group flex items-center justify-between p-3 border-b border-white/5 hover:bg-zinc-900/40 transition-colors">
      <div className="flex items-center gap-3">
        <img 
          src={getAvatarUrl()} 
          alt={getUsername()}
          className="w-8 h-8 rounded-sm grayscale group-hover:grayscale-0 border border-white/10 transition-all" 
          referrerPolicy="no-referrer" 
        />
        <span className="font-mono text-sm text-zinc-400 group-hover:text-white transition-colors">
          @{getUsername()}
        </span>
      </div>

      <div className="flex items-center gap-6 font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-600">
          <Users size={12} /> <span className="text-zinc-300">{getFollowers()}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-600">
          <TrendingUp size={12} /> <span className="text-white">{getSales()}</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-6">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-white text-[10px] tracking-widest uppercase">Ativo</span>
        </div>
      </div>
    </div>
  );
}
