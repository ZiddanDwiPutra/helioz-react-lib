import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface HeliozBottomNavProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const HeliozBottomNav: React.FC<HeliozBottomNavProps> = ({
  items,
  activeId,
  onSelect,
  className
}) => {
  return (
    <nav className={`bg-[#020617]/80 backdrop-blur-xl border-t border-slate-800 h-20 px-8 flex items-center justify-between sticky bottom-0 z-30 ${className}`}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${isActive ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <div className="w-6 h-6">{item.icon}</div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
