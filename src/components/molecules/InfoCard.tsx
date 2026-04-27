import React from 'react';

export interface InfoCardProps {
  label?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  label,
  title,
  description,
  icon,
  onClick,
  className
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {label && <h3 className="font-bold text-slate-100 text-sm">{label}</h3>}
      <button 
        onClick={onClick}
        className="w-full bg-[#1e1e2d] border border-slate-800 rounded-2xl p-4 flex items-center justify-between group hover:border-indigo-500/30 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
               {icon}
            </div>
          )}
          <div className="text-left">
            <p className="text-sm font-bold text-slate-100">{title}</p>
            {description && <p className="text-[10px] text-slate-500 mt-0.5">{description}</p>}
          </div>
        </div>
        <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
};
