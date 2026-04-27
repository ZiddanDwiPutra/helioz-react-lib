import React from 'react';
import { Button } from '../Button';

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
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    {children}
  </div>
);

const ButtonDocs: React.FC = () => {
  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Button</h1>
        <p className="text-lg text-slate-400">Displays a button or a component that looks like a button.</p>
      </div>

      <section className="space-y-16">
        {/* Usage section mimics Shadcn */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Usage
          </h2>
          <PreviewBox>
            <Button variant="primary">Button</Button>
          </PreviewBox>
          <CodeBlock code={`import { Button } from "helioz-react-lib"

export default function ButtonDemo() {
  return <Button variant="primary">Button</Button>
}`} />
        </div>

        {/* Variants Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Variants</h2>
          <p className="text-slate-400 text-sm mb-6">Use different variants to express intent.</p>
          
          <div className="space-y-12">
            {/* Primary */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-300">Primary</h3>
              <PreviewBox>
                <Button variant="primary">Primary Action</Button>
              </PreviewBox>
              <CodeBlock code={`<Button variant="primary">Primary Action</Button>`} />
            </div>

            {/* Secondary */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-300">Secondary</h3>
              <PreviewBox>
                <Button variant="secondary">Secondary Action</Button>
              </PreviewBox>
              <CodeBlock code={`<Button variant="secondary">Secondary Action</Button>`} />
            </div>

            {/* Outline */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-300">Outline</h3>
              <PreviewBox>
                <Button variant="outline">Outline Action</Button>
              </PreviewBox>
              <CodeBlock code={`<Button variant="outline">Outline Action</Button>`} />
            </div>

            {/* Ghost */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-300">Ghost</h3>
              <PreviewBox>
                <Button variant="ghost">Ghost Action</Button>
              </PreviewBox>
              <CodeBlock code={`<Button variant="ghost">Ghost Action</Button>`} />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Sizes</h2>
          <p className="text-slate-400 text-sm mb-6">Available in different sizes for various layouts.</p>
          <PreviewBox>
            <div className="flex items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </PreviewBox>
          <CodeBlock code={`<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`} />
        </div>

        {/* Custom Styling Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Custom Styling</h2>
          <p className="text-slate-400 text-sm mb-6">Override default styles like background using the <code>className</code> prop.</p>
          <PreviewBox>
            <div className="flex flex-wrap gap-6">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Emerald Background</Button>
              <Button className="bg-rose-600 hover:bg-rose-700">Rose Background</Button>
              <Button className="bg-amber-500 hover:bg-amber-600 border-none shadow-lg text-slate-900">Amber Shadow</Button>
            </div>
          </PreviewBox>
          <CodeBlock code={`<Button className="bg-emerald-600 hover:bg-emerald-700">Emerald</Button>\n<Button className="bg-rose-600 hover:bg-rose-700">Rose</Button>`} />
        </div>

        {/* Icons Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Icons</h2>
          <p className="text-slate-400 text-sm mb-6">Enhance buttons with icons at the start or end.</p>
          <PreviewBox>
            <div className="flex flex-wrap gap-6">
              <Button 
                leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>}
              >
                Add Item
              </Button>
              <Button 
                variant="outline"
                rightIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
              >
                Get Started
              </Button>
              <Button 
                variant="ghost"
                leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>}
              />
            </div>
          </PreviewBox>
          <CodeBlock code={`<Button leftIcon={<PlusIcon />}>Add Item</Button>\n<Button rightIcon={<ArrowIcon />}>Next</Button>`} />
        </div>
      </section>

      <div className="mt-20 pt-10 border-t border-slate-800 flex justify-between items-center text-sm text-slate-500">
        <a href="#" className="hover:text-slate-300 transition-colors">← Introduction</a>
        <a href="#" className="hover:text-slate-300 transition-colors">Accordion →</a>
      </div>
    </div>
  );
};

export default ButtonDocs;
