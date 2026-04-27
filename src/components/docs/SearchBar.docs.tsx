import React from 'react';
import { SearchBar } from '../molecules/SearchBar';

const SearchBarDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">SearchBar</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A stylized search bar molecule with glassmorphism effects and integrated icon state.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Example</h2>
        <div className="bg-[#020617] p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <SearchBar onSearch={(q) => console.log('Searching for:', q)} />
        </div>
      </section>
    </div>
  );
};

export default SearchBarDocs;
