import React from 'react';
import { NavLink } from 'react-router-dom';

const StepBox = ({ number, title, description, isLast = false }: { number: number, title: string, description: string, isLast?: boolean }) => (
  <div className="flex gap-4 relative">
    {!isLast && <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-800"></div>}
    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-500/30 z-10">
      {number}
    </div>
    <div className="pb-8">
      <h3 className="text-lg font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm md:text-base">{description}</p>
    </div>
  </div>
);

const GuidanceDocs: React.FC = () => {
  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Guidance & Philosophy</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          More than just a UI library. Helioz is an <strong>All-In-One React Component System</strong> engineered to accelerate product development from atomic structures to fully functional prototypes.
        </p>
      </div>

      <section className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-slate-100 border-b border-slate-800 pb-2">The Architecture of Speed</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Helioz is designed with a specific workflow in mind. It acts as a comprehensive design system but its true power lies in how seamlessly it allows you to compose complex interfaces and prototype flows. We embrace the Atomic Design methodology, tailored for rapid iteration.
          </p>

          <div className="space-y-2 mt-8 bg-[#020617] p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl shadow-black/20">
            <StepBox 
              number={1} 
              title="Atoms (The Design System)" 
              description="Start with our highly-customizable, ready-to-use primitive components like Button, FormInput, Checkbox, and Dropdown. These follow strict design tokens and ensure visual consistency across your app out of the box."
            />
            <StepBox 
              number={2} 
              title="Molecules (Compositions)" 
              description="Combine atomic components to create complex, reusable 'Molecules'. For instance, composing a FormInput and a Dropdown. Helioz makes aligning and managing states across these components incredibly easy."
            />
            <StepBox 
              number={3} 
              title="Pages (The Canvas)" 
              description="Assemble your ready-made molecules into full pages. Just like our pre-built Login Page, you can rapidly structure layouts without worrying about breaking the underlying visual harmony."
            />
            <StepBox 
              number={4} 
              title="Functional Prototypes (The Magic)" 
              description="A beautiful page means nothing if you can't test it. Helioz encourages wiring up simple React states (using `useState` for routing logic and boolean toggles) directly within pages. This transforms static mockups into interactive, high-fidelity prototypes you can instantly showcase to stakeholders or test with actual users."
              isLast={true}
            />
          </div>
        </div>

        <div>
          <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
            <h3 className="text-lg font-semibold text-indigo-300 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Why this approach?
            </h3>
            <p className="text-indigo-200/70 text-sm leading-relaxed">
              Traditional development isolates the design from the prototype. With Helioz, your prototype <strong>is</strong> your production code base. The components you assemble to test an idea today are the exact same components that will be shipped to production tomorrow. This eliminates handoff friction between design and engineering entirely.
            </p>
          </div>
        </div>
      </section>
      
      <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center text-sm font-medium">
        <NavLink to="/docs/introduction" className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Introduction
        </NavLink>
        <NavLink to="/docs/components/button" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
          Explore Components
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </NavLink>
      </div>

    </div>
  );
};

export default GuidanceDocs;
