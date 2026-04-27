import React from 'react';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const IntroductionDocs: React.FC = () => {
  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Introduction</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
        </p>
        <p className="mt-6 text-slate-400 leading-relaxed">
          <strong>Helioz React Lib</strong> is a collection of re-usable components built with React and Tailwind CSS.
          It's designed to be fast, responsive, and easy to integrate into any project.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4" id="installation">Installation</h2>
        <p className="text-slate-400 mb-6">Install the library via your favorite package manager:</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">npm</h3>
            <CodeBlock code={`npm install helioz-react-lib`} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">pnpm</h3>
            <CodeBlock code={`pnpm add helioz-react-lib`} />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Usage</h2>
        <p className="text-slate-400 mb-6">Import the styles and components in your application entry point:</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">1. Import CSS</h3>
            <p className="text-xs text-slate-500 mb-2">Add this to your main.tsx or App.tsx:</p>
            <CodeBlock code={`import 'helioz-react-lib/dist/style.css'`} />
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">2. Use Components</h3>
            <CodeBlock code={`import { Button } from 'helioz-react-lib';

function App() {
  return (
    <div className="p-10">
      <Button variant="primary">
        Hello World
      </Button>
    </div>
  );
}`} />
          </div>
        </div>
      </section>

      <div className="mt-20 pt-10 border-t border-slate-800 flex justify-end items-center text-sm text-slate-500">
        <a href="components/button" className="hover:text-slate-300 transition-colors">Component: Button →</a>
      </div>
    </div>
  );
};

export default IntroductionDocs;
