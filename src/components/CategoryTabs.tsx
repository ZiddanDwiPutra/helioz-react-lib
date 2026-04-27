import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar", className)}>
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer",
              isActive 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                : "bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
