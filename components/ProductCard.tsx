"use client";

import { ShoppingCart } from "lucide-react";

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
      if (firstSku?.real_price?.sale_price_format) return firstSku.real_price.sale_price_format;
      if (firstSku?.real_price) return `R$ ${firstSku.real_price}`;
    }
    if (product.min_price) return `R$ ${product.min_price.toFixed(2)}`;
    return "N/A";
  };

  const getProductUrl = () => product.url || product.product_url || "#";

  return (
    <div className="group relative flex flex-col border border-white/10 bg-black hover:border-white/30 transition-colors p-3">
      <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden mb-3">
        <img
          src={getImageUrl()}
          alt={product.title}
          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        {product.sales && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 font-mono text-[10px] text-white border border-white/10">
            {product.sales.toLocaleString()} VENDAS
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between gap-4">
        <div>
          <h3 className="text-xs font-medium text-zinc-300 line-clamp-2 leading-relaxed">
            {product.title || "Unknown Item"}
          </h3>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <p className="font-mono text-sm text-white">{getPrice()}</p>
          <button
            onClick={() => onViewCreators && onViewCreators(getProductUrl())}
            disabled={getProductUrl() === "#"}
            className="text-zinc-500 hover:text-white transition-colors disabled:opacity-50"
            title="Ver Afiliados"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
