import React from 'react';
import { OrderItem, type OrderItemProps } from '../OrderItem';

export interface OrderSummaryProps {
  items: (OrderItemProps & { id: string })[];
  subtotal: number;
  deliveryFee: number;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  deliveryFee,
  className
}) => {
  const total = subtotal + deliveryFee;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-1">
        <h3 className="font-bold text-slate-100 text-base">Order Summary</h3>
        <div className="bg-[#1e1e2d] rounded-3xl p-4 border border-slate-800/50 shadow-sm">
          {items.map((item) => (
            <OrderItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="space-y-3 px-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400 font-medium">Subtotal</span>
          <span className="text-slate-200 font-bold">Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400 font-medium">Delivery Fee</span>
          <span className="text-slate-200 font-bold">Rp {deliveryFee.toLocaleString('id-ID')}</span>
        </div>
        <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
          <span className="text-slate-100 font-bold">Total</span>
          <span className="text-indigo-400 font-black text-lg">Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  );
};
