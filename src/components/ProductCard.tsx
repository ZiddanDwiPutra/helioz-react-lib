import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  isFavorite?: boolean;
  onAdd?: () => void;
  onToggleFavorite?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  rating,
  isFavorite,
  onAdd,
  onToggleFavorite,
  className,
}) => {
  return (
    <div className={cn(
      "bg-[#1e1e2d] rounded-3xl overflow-hidden relative group border border-slate-800/50 hover:border-indigo-500/50 transition-all duration-300",
      className
    )}>
      {/* Favorite Button */}
      <button 
        onClick={onToggleFavorite}
        className="absolute top-3 right-3 z-10 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
      >
        <svg 
          className={cn("w-4 h-4 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-white")} 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>

      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden bg-slate-800">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-xs font-semibold text-slate-300">{rating}</span>
        </div>
        
        <h3 className="font-bold text-slate-100 text-sm leading-snug line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-slate-100 italic">
            Rp {price.toLocaleString('id-ID')}
          </span>
          <button 
            onClick={onAdd}
            className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors active:scale-90 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
