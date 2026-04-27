import React from 'react';
import { Badge } from '../Badge';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const BadgeDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Badge</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A compact label component for categorization, status indicators, and tagging. Supports multiple color variants and removable state.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Variants</h2>
        <div className="bg-[#020617] p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="purple">Purple</Badge>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Sizes & Features</h2>
        <div className="bg-[#020617] p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success" size="sm">Small</Badge>
            <Badge variant="info" size="md">Medium</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="warning" icon={<svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}>With Icon</Badge>
            <Badge variant="danger" removable onRemove={() => alert('Removed!')}>Removable</Badge>
          </div>
        </div>
        <CodeBlock code={`import { Badge } from 'helioz-react-lib';

<Badge variant="success">Completed</Badge>
<Badge variant="danger" removable onRemove={handleRemove}>
  Remove Me
</Badge>
<Badge variant="warning" icon={<WarningIcon />}>
  Pending
</Badge>`} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-300">
                <th className="py-4 font-semibold">Prop</th>
                <th className="py-4 font-semibold">Type</th>
                <th className="py-4 font-semibold">Default</th>
                <th className="py-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">variant</td>
                <td className="py-4">'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'</td>
                <td className="py-4">'default'</td>
                <td className="py-4">Color variant</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">size</td>
                <td className="py-4">'sm' | 'md'</td>
                <td className="py-4">'sm'</td>
                <td className="py-4">Size of the badge</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">icon</td>
                <td className="py-4">ReactNode</td>
                <td className="py-4">-</td>
                <td className="py-4">Leading icon</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">removable</td>
                <td className="py-4">boolean</td>
                <td className="py-4">false</td>
                <td className="py-4">Show remove button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BadgeDocs;
