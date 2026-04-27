import React from 'react';

export interface LocationHeaderProps {
  location: string;
  userAvatar?: string;
  onLocationClick?: () => void;
  onProfileClick?: () => void;
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
  location,
  userAvatar = "https://i.pravatar.cc/100?u=zidda",
  onLocationClick,
  onProfileClick,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button 
          onClick={onLocationClick}
          className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600/30 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>
        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Location</p>
          <button 
            onClick={onLocationClick}
            className="text-sm font-bold text-slate-100 flex items-center gap-1 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            {location}
            <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>
      <button 
        onClick={onProfileClick}
        className="w-10 h-10 rounded-full border-2 border-indigo-500/20 overflow-hidden bg-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer"
      >
        <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};
