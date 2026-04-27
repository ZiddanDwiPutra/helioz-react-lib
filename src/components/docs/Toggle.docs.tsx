import React, { useState } from 'react';
import { Toggle } from '../Toggle';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const ToggleDocs: React.FC = () => {
  const [on1, setOn1] = useState(false);
  const [on2, setOn2] = useState(true);
  const [on3, setOn3] = useState(false);
  const [on4, setOn4] = useState(true);

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Toggle</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A switch toggle component for boolean on/off states. Supports multiple sizes, labels, and descriptions.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Examples</h2>
        <div className="bg-[#020617] p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <Toggle checked={on1} onChange={setOn1} label="Notifications" description="Receive push notifications" />
          <Toggle checked={on2} onChange={setOn2} label="Dark Mode" />
          <Toggle checked={on3} onChange={setOn3} label="Small" size="sm" />
          <Toggle checked={on4} onChange={setOn4} label="Large" size="lg" />
          <Toggle checked={false} label="Disabled" disabled />
        </div>
        <CodeBlock code={`import { Toggle } from 'helioz-react-lib';

<Toggle
  checked={isOn}
  onChange={setIsOn}
  label="Notifications"
  description="Receive push notifications"
  size="md"
/>`} />
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
                <td className="py-4 font-mono text-indigo-400">checked</td>
                <td className="py-4">boolean</td>
                <td className="py-4">false</td>
                <td className="py-4">Whether the toggle is on</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">onChange</td>
                <td className="py-4">(checked: boolean) =&gt; void</td>
                <td className="py-4">-</td>
                <td className="py-4">Callback when toggled</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">size</td>
                <td className="py-4">'sm' | 'md' | 'lg'</td>
                <td className="py-4">'md'</td>
                <td className="py-4">Size of the toggle</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">label</td>
                <td className="py-4">string</td>
                <td className="py-4">-</td>
                <td className="py-4">Label text</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">disabled</td>
                <td className="py-4">boolean</td>
                <td className="py-4">false</td>
                <td className="py-4">Disables interaction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ToggleDocs;
