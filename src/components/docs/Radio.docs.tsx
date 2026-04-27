import React, { useState } from 'react';
import { Radio } from '../Radio';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-700">
        Copy
      </button>
    </div>
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const PreviewBox = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 flex items-center justify-center p-12 bg-[#020617] rounded-xl border border-slate-800 min-h-[200px] shadow-sm relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    <div className="relative z-10 w-full max-w-sm">
      {children}
    </div>
  </div>
);

const RadioDocs: React.FC = () => {
  const [selected1, setSelected1] = useState('one');
  const [selected2, setSelected2] = useState('three');

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Radio</h1>
        <p className="text-lg text-slate-400">A control that allows the user to select one option from a set.</p>
      </div>

      <section className="space-y-16">
        <div>
          <h2 className="text-xl font-semibold mb-4">Default Variant</h2>
          <PreviewBox>
            <div className="space-y-4">
              <Radio 
                checked={selected1 === 'one'}
                onChange={() => setSelected1('one')}
                label="Option One" 
                description="This is the first option."
              />
              <Radio 
                checked={selected1 === 'two'}
                onChange={() => setSelected1('two')}
                label="Option Two" 
                description="This is the second option."
              />
            </div>
          </PreviewBox>
          <CodeBlock code={`import { Radio } from "helioz-react-lib"

export default function RadioDemo() {
  return (
    <div className="space-y-4">
      <Radio label="Option One" description="This is the first option." />
      <Radio label="Option Two" description="This is the second option." />
    </div>
  )
}`} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Card Variant</h2>
          <p className="text-slate-400 text-sm mb-6">A more prominent, clickable card style radio.</p>
          <PreviewBox>
            <div className="space-y-4">
              <Radio 
                variant="card"
                checked={selected2 === 'three'}
                onChange={() => setSelected2('three')}
                label="Basic Plan" 
                description="$10/month per user"
              />
              <Radio 
                variant="card"
                checked={selected2 === 'four'}
                onChange={() => setSelected2('four')}
                label="Pro Plan" 
                description="$20/month per user"
              />
            </div>
          </PreviewBox>
          <CodeBlock code={`<div className="space-y-4">
  <Radio 
    variant="card"
    label="Basic Plan" 
    description="$10/month per user"
  />
  <Radio 
    variant="card"
    label="Pro Plan" 
    description="$20/month per user"
  />
</div>`} />
        </div>
      </section>
    </div>
  );
};

export default RadioDocs;
