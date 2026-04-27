import React from 'react';
import { Accordion } from '../Accordion';

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
    {children}
  </div>
);

const AccordionDocs: React.FC = () => {
  const demoItems = [
    {
      id: 'item-1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    },
    {
      id: 'item-2',
      title: 'Is it styled?',
      content: 'Yes. It comes with default styles that matches the other components aesthetic.',
    },
    {
      id: 'item-3',
      title: 'Is it animated?',
      content: 'Yes. It uses smooth transitions for height and opacity changes.',
    },
  ];

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Accordion</h1>
        <p className="text-lg text-slate-400">A vertically stacked set of interactive headings that each reveal a section of content.</p>
      </div>

      <section className="space-y-16">
        {/* Usage */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <PreviewBox>
            <Accordion items={demoItems} />
          </PreviewBox>
          <CodeBlock code={`import { Accordion } from "helioz-react-lib"

const items = [
  { id: "1", title: "Question 1", content: "Answer 1" },
  { id: "2", title: "Question 2", content: "Answer 2" },
]

export default function AccordionDemo() {
  return <Accordion items={items} />
}`} />
        </div>

        {/* Multiple section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Allow Multiple</h2>
          <p className="text-slate-400 text-sm mb-6">Open multiple items at the same time by setting <code>allowMultiple</code> prop.</p>
          <PreviewBox>
            <Accordion items={demoItems} allowMultiple />
          </PreviewBox>
          <CodeBlock code={`<Accordion items={demoItems} allowMultiple />`} />
        </div>
      </section>

      <div className="mt-20 pt-10 border-t border-slate-800 flex justify-between items-center text-sm text-slate-500">
        <a href="/docs/components/button" className="hover:text-slate-300 transition-colors">← Button</a>
        <span className="text-slate-700">Dialog →</span>
      </div>
    </div>
  );
};

export default AccordionDocs;
