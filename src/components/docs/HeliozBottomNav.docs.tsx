import React, { useState } from 'react';
import { HeliozBottomNav } from '../molecules/HeliozBottomNav';

const NAV_ITEMS = [
  { id: '1', label: 'Home', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: '2', label: 'Orders', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
];

const HeliozBottomNavDocs: React.FC = () => {
  const [active, setActive] = useState('1');

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">HeliozBottomNav</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          The main navigation component for mobile screens. Use this to provide quick access to top-level sections.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Example</h2>
        <div className="bg-[#020617] h-[150px] border border-slate-800 rounded-3xl relative overflow-hidden flex items-center justify-center p-0">
           <HeliozBottomNav 
              items={NAV_ITEMS} 
              activeId={active} 
              onSelect={setActive} 
              className="!static !w-full"
           />
        </div>
      </section>
    </div>
  );
};

export default HeliozBottomNavDocs;
