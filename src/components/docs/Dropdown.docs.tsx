import React, { useState } from 'react';
import { Dropdown } from '../Dropdown';

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
  <div className="mt-4 flex items-center justify-center p-12 bg-[#020617] rounded-xl border border-slate-800 min-h-[300px] shadow-sm relative overflow-visible">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    <div className="relative z-10 w-full max-w-sm">
      {children}
    </div>
  </div>
);

const OPTIONS = [
  { label: 'Next.js', value: 'next' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
];

const OPTIONS_WITH_ICONS = [
  { label: 'Database', value: 'db', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg> },
  { label: 'Server', value: 'server', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg> },
  { label: 'Cloud', value: 'cloud', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> }
];

const DropdownDocs: React.FC = () => {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState<string[]>([]);
  const [val3, setVal3] = useState('');
  const [val4, setVal4] = useState('');
  const [val5, setVal5] = useState('');
  const setStateAsString = (setState: (value: string) => void, value: string) => {
    setState(value);
  }
  const setStateAsStringArray = (setState: (value: string[]) => void, value: string[]) => {
    setState(value);
  }

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Dropdown</h1>
        <p className="text-lg text-slate-400">Displays a list of options for the user to pick from, supporting single, multi-selection, and search.</p>
      </div>

      <section className="space-y-16">
        <div>
          <h2 className="text-xl font-semibold mb-4">Radio Variant (Single Select)</h2>
          <PreviewBox>
            <Dropdown 
              label="Select Framework"
              options={OPTIONS}
              variant="radio"
              value={val1}
              onChange={(value: string) => setStateAsString(setVal1, value)}
            />
          </PreviewBox>
          <CodeBlock code={`import { Dropdown } from "helioz-react-lib"

export default function DropdownDemo() {
  const [val, setVal] = useState('');
  
  return (
    <Dropdown 
      label="Select Framework"
      options={options}
      variant="radio"
      value={val}
      onChange={setVal}
    />
  )
}`} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Default Variant (Without Radio)</h2>
          <PreviewBox>
            <Dropdown 
              label="Select Framework"
              options={OPTIONS}
              variant="default"
              value={val4}
              onChange={(value: string) => setStateAsString(setVal4, value)}
            />
          </PreviewBox>
          <CodeBlock code={`<Dropdown 
  label="Select Framework"
  options={options}
  variant="default"
  value={val}
  onChange={setVal}
/>`} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Icons Support</h2>
          <PreviewBox>
            <Dropdown 
              label="Select Resource"
              options={OPTIONS_WITH_ICONS}
              variant="default"
              value={val5}
              onChange={(value: string) => setStateAsString(setVal5, value)}
            />
          </PreviewBox>
          <CodeBlock code={`<Dropdown 
  label="Select Resource"
  options={OPTIONS_WITH_ICONS}
  variant="default"
  value={val}
  onChange={setVal}
/>`} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Checkbox Variant (Multi Select)</h2>
          <PreviewBox>
            <Dropdown 
              label="Select Frameworks"
              options={OPTIONS}
              variant="checkbox"
              value={val2}
              onChange={(value: string[]) => setStateAsStringArray(setVal2, value)}
            />
          </PreviewBox>
          <CodeBlock code={`<Dropdown 
  label="Select Frameworks"
  options={options}
  variant="checkbox"
  value={val} // string[]
  onChange={setVal}
/>`} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Searchable Dropdown</h2>
          <PreviewBox>
            <Dropdown 
              label="Search Framework"
              options={OPTIONS}
              variant="radio"
              searchable={true}
              value={val3}
              onChange={(value: string) => setStateAsString(setVal3, value)}
            />
          </PreviewBox>
          <CodeBlock code={`<Dropdown 
  label="Search Framework"
  options={options}
  variant="radio"
  searchable={true}
  value={val}
  onChange={setVal}
/>`} />
        </div>
      </section>
    </div>
  );
};

export default DropdownDocs;
