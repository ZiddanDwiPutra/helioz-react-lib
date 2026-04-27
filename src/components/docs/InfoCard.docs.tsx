import React from 'react';
import { InfoCard } from '../molecules/InfoCard';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const InfoCardDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">InfoCard</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A versatile card component for displaying clickable information like addresses, delivery options, or settings.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-300">With Icon & Label</h3>
            <div className="bg-[#020617] p-6 rounded-3xl border border-slate-800 shadow-xl">
              <InfoCard 
                label="Shipping Address"
                title="123 Sudirman St., Jakarta"
                description="Default Address"
                icon={<svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-300">Simple Variant</h3>
            <div className="bg-[#020617] p-6 rounded-3xl border border-slate-800 shadow-xl">
              <InfoCard 
                label="Delivery Option"
                title="Standard - 30 mins"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        <CodeBlock code={`import { InfoCard } from 'helioz-react-lib';

<InfoCard 
  label="Home Address"
  title="Jl. Kemang Raya No. 10"
  icon={<HomeIcon />}
  onClick={handleChangeAddress}
/>`} />
      </section>
    </div>
  );
};

export default InfoCardDocs;
