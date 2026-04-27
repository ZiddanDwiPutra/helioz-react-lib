import React from 'react';
import { Stepper } from '../Stepper';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const StepperDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Stepper</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A visual progress indicator for multi-step processes like checkout or onboarding.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6" id="usage">Usage</h2>
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-300">Default (Step 2 of 3)</h3>
            <div className="bg-[#1e1e2d] p-8 rounded-2xl border border-slate-800/50">
               <Stepper steps={['Order', 'Pay', 'Success']} currentStep={1} />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-300">Completed (Last Step)</h3>
            <div className="bg-[#1e1e2d] p-8 rounded-2xl border border-slate-800/50">
               <Stepper steps={['Order', 'Pay', 'Success']} currentStep={2} />
            </div>
          </div>
        </div>
        <CodeBlock code={`import { Stepper } from 'helioz-react-lib';

<Stepper 
  steps={['Order', 'Pay', 'Success']} 
  currentStep={1} 
/>`} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="py-4 font-semibold text-slate-300">Prop</th>
                <th className="py-4 font-semibold text-slate-300">Type</th>
                <th className="py-4 font-semibold text-slate-300">Default</th>
                <th className="py-4 font-semibold text-slate-300">Description</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">steps</td>
                <td className="py-4">string[]</td>
                <td className="py-4">-</td>
                <td className="py-4">Array of step labels</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">currentStep</td>
                <td className="py-4">number</td>
                <td className="py-4">0</td>
                <td className="py-4">Index of the current active step (0-based)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StepperDocs;
