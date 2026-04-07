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
    // Fallback para avatar gerado
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
    <div className="group relative overflow-hidden rounded-lg border border-[#262626] bg-[#121212] hover:border-[#00d9ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#00d9ff]/10 p-4">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#00d9ff]/30 group-hover:border-[#00d9ff] transition-all">
          <img
            src={getAvatarUrl()}
            alt={getUsername()}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=default`;
            }}
          />
        </div>
      </div>

      {/* Username */}
      <h3 className="text-center text-sm font-bold text-[#e5e5e5] line-clamp-1 mb-1 group-hover:text-[#00d9ff] transition-colors">
        {getUsername()}
      </h3>

      {/* Stats */}
      <div className="space-y-2 mb-4 pb-4 border-b border-[#262626]">
        {/* Followers */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#a3a3a3] flex items-center gap-1">
            <Users size={12} />
            Seguidores
          </span>
          <span className="font-bold text-[#00d9ff]">{getFollowers()}</span>
        </div>

        {/* Sales */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#a3a3a3] flex items-center gap-1">
            <TrendingUp size={12} />
            Vendas
          </span>
          <span className="font-bold text-[#34c759]">{getSales()}</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-center gap-1 px-3 py-1.5 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-lg">
        <div className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
        <span className="text-xs font-bold text-[#00d9ff]">Ativo</span>
      </div>
    </div>
  );
}
