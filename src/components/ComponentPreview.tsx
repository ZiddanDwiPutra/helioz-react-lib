import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ComponentPreviewProps {
  path: string;
  title?: string;
  type?: 'mobile' | 'desktop';
  className?: string;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  path,
  title,
  type = 'mobile',
  className,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {title && <h3 className="text-sm font-medium text-slate-300">{title}</h3>}
      
      <div className={cn(
        "relative mx-auto border-[12px] border-slate-800 rounded-[3.5rem] overflow-hidden bg-[#020617] shadow-2xl transition-all",
        type === 'mobile' ? "w-[390px] h-[844px]" : "w-full h-[600px]"
      )}>
        {/* Device elements for mobile */}
        {type === 'mobile' && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-700 rounded-full z-50 pointer-events-none" />
          </>
        )}

        <iframe 
          src={path.startsWith('/') ? path : `/preview/${path}`}
          className="w-full h-full border-none"
          title="Component Preview"
          loading="lazy"
        />
      </div>

      <div className="flex justify-center gap-4">
        <a 
          href={path.startsWith('/') ? path : `/preview/${path}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1"
        >
          Open In New Tab
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
          </svg>
        </a>
      </div>
    </div>
  );
};
