import React, { useState } from 'react';
import { Checkbox } from '../Checkbox';

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

const CheckboxDocs: React.FC = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Checkbox</h1>
        <p className="text-lg text-slate-400">A control that allows the user to toggle between checked and not checked.</p>
      </div>

      <section className="space-y-16">
        <div>
          <h2 className="text-xl font-semibold mb-4">Default Variant</h2>
          <PreviewBox>
            <div className="space-y-4">
              <Checkbox 
                checked={checked1}
                onChange={(e) => setChecked1(e.target.checked)}
                label="Accept terms and conditions" 
                description="You agree to our Terms of Service and Privacy Policy."
              />
            </div>
          </PreviewBox>
          <CodeBlock code={`import { Checkbox } from "helioz-react-lib"

export default function CheckboxDemo() {
  return (
    <Checkbox 
      label="Accept terms and conditions" 
      description="You agree to our Terms of Service and Privacy Policy."
    />
  )
}`} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Card Variant</h2>
          <p className="text-slate-400 text-sm mb-6">A more prominent, clickable card style checkbox.</p>
          <PreviewBox>
            <div className="space-y-4">
              <Checkbox 
                variant="card"
                checked={checked2}
                onChange={(e) => setChecked2(e.target.checked)}
                label="Enable Notifications" 
                description="Receive updates when someone replies to your thread."
              />
            </div>
          </PreviewBox>
          <CodeBlock code={`<Checkbox 
  variant="card"
  label="Enable Notifications" 
  description="Receive updates when someone replies to your thread."
/>`} />
        </div>
      </section>
    </div>
  );
};

export default CheckboxDocs;
