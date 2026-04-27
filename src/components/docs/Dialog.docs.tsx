import React, { useState } from 'react';
import { Dialog } from '../Dialog';
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
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    {children}
  </div>
);

const DialogDocs: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Dialog</h1>
        <p className="text-lg text-slate-400">A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.</p>
      </div>

      <section className="space-y-16">
        {/* Basic Usage */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <PreviewBox>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              Open Dialog
            </Button>
            
            <Dialog 
              isOpen={isOpen} 
              onClose={() => setIsOpen(false)}
              title="Edit Profile"
              description="Make changes to your profile here. Click save when you're done."
              footer={
                <>
                  <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
                </>
              }
            >
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Ziddan Dwi Putra" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email</label>
                  <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="zidda@example.com" />
                </div>
              </div>
            </Dialog>
          </PreviewBox>
          <CodeBlock code={`import { Dialog, Button } from "helioz-react-lib"
import { useState } from "react"

export default function DialogDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      
      <Dialog 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Dialogue Title"
        footer={<Button onClick={() => setIsOpen(false)}>Save</Button>}
      >
        <p>This is the content inside the dialog portal.</p>
      </Dialog>
    </>
  )
}`} />
        </div>

        {/* Customization section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Custom Header & Footer</h2>
          <p className="text-slate-400 text-sm mb-6">You can pass any React Node to the <code>title</code> and <code>footer</code> props for advanced styling.</p>
          <PreviewBox>
            <Button variant="outline" onClick={() => setIsOpen(true)}>Open Custom Dialog</Button>
            <Dialog 
              isOpen={isOpen} 
              onClose={() => setIsOpen(false)}
              title={
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 bg-indigo-500 rounded-full" />
                  <span>Advanced Settings</span>
                </div>
              }
              footer={
                <div className="flex justify-between w-full items-center">
                  <span className="text-xs text-slate-500 italic">* Changes take effect immediately</span>
                  <Button variant="primary" onClick={() => setIsOpen(false)}>Apply</Button>
                </div>
              }
            >
              <p className="text-slate-400">This dialog uses custom React nodes for its header and footer sections.</p>
            </Dialog>
          </PreviewBox>
          <CodeBlock code={`<Dialog \n  title={<div className="flex gap-2">...</div>} \n  footer={<div className="flex justify-between">...</div>} \n/>`} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-slate-400 text-sm space-y-2 mt-4 ml-2">
            <li>Portal rendering for perfect stacking</li>
            <li>Backdrop blur and dim effect</li>
            <li>Animated enter/exit transitions</li>
            <li>Escape key and outside-click support</li>
            <li>Scroll locking when open</li>
          </ul>
        </div>
      </section>

      <div className="mt-20 pt-10 border-t border-slate-800 flex justify-between items-center text-sm text-slate-500">
        <a href="/docs/components/accordion" className="hover:text-slate-300 transition-colors">← Accordion</a>
        <span className="text-slate-700">Breadcrumbs →</span>
      </div>
    </div>
  );
};

export default DialogDocs;
