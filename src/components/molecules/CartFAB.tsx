import React from 'react';

export interface CartFABProps {
  itemCount: number;
  totalPrice: number;
  onClick?: () => void;
  className?: string;
}

export const CartFAB: React.FC<CartFABProps> = ({
  itemCount,
  totalPrice,
  onClick,
  className
}) => {
  if (itemCount === 0) return null;

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-20 ${className}`}>
      <button 
        onClick={onClick}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-3xl shadow-2xl shadow-indigo-500/40 flex items-center justify-between transition-all active:scale-95 group cursor-pointer animate-in fade-in slide-in-from-bottom-10"
      >
        <div className="flex items-center gap-3">
           <div className="bg-white/20 p-2 rounded-xl">
             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
             </svg>
           </div>
           <div className="text-left">
             <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-tighter">{itemCount} {itemCount === 1 ? 'Item' : 'Items'} | Rp {totalPrice.toLocaleString('id-ID')}</p>
             <p className="text-sm font-black">Continue to Payment</p>
           </div>
        </div>
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14m-7-7 7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};
