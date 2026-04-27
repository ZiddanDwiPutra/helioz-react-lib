import React, { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes safely
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
    id: string;
  }[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, className }) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className={cn('w-full border-t border-slate-800', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="border-b border-slate-800">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between py-4 text-left font-medium transition-colors hover:text-indigo-400 group"
            >
              <span>{item.title}</span>
              <svg
                className={cn('w-4 h-4 text-slate-500 transition-transform duration-200', isOpen && 'rotate-180 text-indigo-500')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'
              )}
            >
              <div className="text-slate-400 text-sm leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
