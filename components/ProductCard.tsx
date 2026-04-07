"use client";

import { ShoppingCart, TrendingUp } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: {
    url?: string;
    product_url?: string;
    main_image?: string;
    title?: string;
    skus?: Record<string, any>;
    min_price?: number;
    max_price?: number;
    sales?: number;
  };
  onViewCreators?: (url: string) => void;
}

export default function ProductCard({ product, onViewCreators }: ProductCardProps) {
  const getImageUrl = () => {
    if (product.main_image) return product.main_image;
    if (product.skus) {
      const firstSku = Object.values(product.skus)[0] as any;
      if (firstSku?.image) return firstSku.image;
      if (firstSku?.sale_props?.[0]?.sale_prop_values?.[0]?.image) {
        return firstSku.sale_props[0].sale_prop_values[0].image;
      }
    }
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";
  };

  const getPrice = () => {
    if (product.skus) {
      const firstSku = Object.values(product.skus)[0] as any;
      if (firstSku?.real_price?.sale_price_format) {
        return firstSku.real_price.sale_price_format;
      }
      if (firstSku?.real_price) return `R$ ${firstSku.real_price}`;
    }
    if (product.min_price) return `R$ ${product.min_price.toFixed(2)}`;
    return "Preço não disponível";
  };

  const getProductUrl = () => {
    return product.url || product.product_url || "#";
  };

  const handleViewCreators = () => {
    const url = getProductUrl();
    if (url !== "#" && onViewCreators) {
      onViewCreators(url);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#262626] bg-[#121212] hover:border-[#00d9ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#00d9ff]/10">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-[#1a1a1a]">
        <img
          src={getImageUrl()}
          alt={product.title || "Produto"}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Sales Badge */}
        {product.sales && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#00d9ff]/10 border border-[#00d9ff] px-3 py-1.5 rounded-lg backdrop-blur-sm">
            <TrendingUp size={14} className="text-[#00d9ff]" />
            <span className="text-xs font-bold text-[#00d9ff]">{product.sales.toLocaleString()} vendas</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-bold text-[#e5e5e5] line-clamp-2 mb-3 group-hover:text-[#00d9ff] transition-colors">
          {product.title || "Produto sem título"}
        </h3>

        {/* Price */}
        <div className="mb-4 pb-4 border-b border-[#262626]">
          <p className="text-xs text-[#a3a3a3] mb-1">Preço</p>
          <p className="text-lg font-bold text-[#00d9ff]">{getPrice()}</p>
        </div>

        {/* Button */}
        <button
          onClick={handleViewCreators}
          disabled={getProductUrl() === "#"}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00d9ff] to-[#00a8cc] text-[#0a0a0a] py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-[#00d9ff]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 uppercase tracking-wider"
        >
          <ShoppingCart size={16} />
          Ver Afiliados
        </button>
      </div>
    </div>
  );
}
