import React from 'react';
import { ComponentPreview } from '../../components/ComponentPreview';

const ConsultationFormPageDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Consultation Form</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A premium medical consultation and referral form page inspired by hospital form standards.
          Built using Helioz molecules including FormInput, Checkbox, and Button components.
        </p>
      </section>

      <section className="mb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Interactive Preview</h2>
            <p className="text-slate-400">
              This form demonstrates how Helioz components can be composed to build complex,
              real-world medical application interfaces with the dark premium theme.
            </p>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-200">Key Features:</h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li>Patient information card with structured input fields</li>
                <li>Form type selection using card-variant checkboxes</li>
                <li>Clinical data and examination notes with textarea</li>
                <li>Consultation response section with doctor signature</li>
                <li>Glassmorphism background effects and sticky submit</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-semibold text-slate-200">Components Used:</h3>
              <div className="flex flex-wrap gap-2">
                {['FormInput', 'Checkbox', 'Button'].map(comp => (
                  <span key={comp} className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 mx-auto">
            <ComponentPreview path="consultation-form" title="Live Mobile Preview" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultationFormPageDocs;
