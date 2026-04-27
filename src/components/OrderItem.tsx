import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface OrderItemProps {
  image: string;
  title: string;
  quantity: number;
  price: number;
  className?: string;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  image,
  title,
  quantity,
  price,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-4 py-3 border-b border-slate-800 last:border-0", className)}>
      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-800">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-100 text-sm truncate">{title}</h4>
        <p className="text-xs text-slate-400 mt-1">{quantity}x</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-slate-100 text-sm">Rp {price.toLocaleString('id-ID')}</p>
      </div>
    </div>
  );
};
