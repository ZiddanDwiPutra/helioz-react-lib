import React from 'react';
import { ComponentPreview } from '../../components/ComponentPreview';

const ProductListPageDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Product List Page</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A premium product listing page designed for mobile food applications. 
          It includes category filtering, product grid, and a sticky checkout summary.
        </p>
      </section>

      <section className="mb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Interactive Preview</h2>
            <p className="text-slate-400">
              The preview below is isolated in an iframe to ensure fixed elements like the nav bar and floating action buttons 
              don't interfere with the documentation layout.
            </p>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-200">Key Features:</h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li>Responsive mobile layout</li>
                <li>Dynamic category tabs</li>
                <li>Integrated product grid with molecules</li>
                <li>Glassmorphism header and footer</li>
                <li>Floating action button for cart summary</li>
              </ul>
            </div>
          </div>

          <div className="shrink-0 mx-auto">
            <ComponentPreview path="product-list" title="Live Mobile Preview" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListPageDocs;
