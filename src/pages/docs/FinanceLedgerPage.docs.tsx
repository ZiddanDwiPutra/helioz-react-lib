import React from 'react';
import { ComponentPreview } from '../../components/ComponentPreview';

const FinanceLedgerPageDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Finance Ledger</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          An interactive financial notes page for tracking income and expenses.
          Features real-time balance calculation, category filtering, and full CRUD operations.
        </p>
      </section>

      <section className="mb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Interactive Preview</h2>
            <p className="text-slate-400">
              A fully functional personal finance tracker built entirely with Helioz components.
              Add, delete, and filter transactions in real-time.
            </p>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-200">Key Features:</h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li>Real-time income, expense, and balance summary</li>
                <li>Clickable summary cards to filter by type</li>
                <li>Add new transactions with Dialog form</li>
                <li>Category-based Badge labeling</li>
                <li>Toggle switch for income/expense selection</li>
                <li>Currency-formatted input</li>
                <li>Hover-to-reveal delete action</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-semibold text-slate-200">Components Used:</h3>
              <div className="flex flex-wrap gap-2">
                {['FormInput', 'Button', 'Badge', 'Toggle', 'Dialog', 'Dropdown'].map(comp => (
                  <span key={comp} className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 mx-auto">
            <ComponentPreview path="finance-ledger" title="Live Mobile Preview" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinanceLedgerPageDocs;
