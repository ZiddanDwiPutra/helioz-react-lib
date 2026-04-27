import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PaymentOption {
  id: string;
  label: string;
}

export interface PaymentSelectorProps {
  options: PaymentOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  options,
  selectedId,
  onSelect,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "flex-1 min-w-[80px] px-4 py-2.5 rounded-xl border-2 transition-all flex items-center justify-center gap-2 cursor-pointer",
              isSelected 
                ? "bg-indigo-600/10 border-indigo-600 text-indigo-400" 
                : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700"
            )}
          >
            <div className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
              isSelected ? "border-indigo-400" : "border-slate-700"
            )}>
              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
