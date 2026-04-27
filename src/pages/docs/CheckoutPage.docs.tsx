import React from 'react';
import { ComponentPreview } from '../../components/ComponentPreview';

const CheckoutPageDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Checkout Page</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          The final stage of the ordering process. This page provides a clear breakdown of the order, 
          shipping details, and payment selection in a streamlined mobile interface.
        </p>
      </section>

      <section className="mb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Interactive Preview</h2>
            <p className="text-slate-400">
              Isolated preview demonstrating the flow from order summary to payment confirmation.
            </p>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-200">Key Features:</h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li>Visual step progress indicator</li>
                <li>Detailed cost breakdown (Subtotal, Tax, Delivery)</li>
                <li>Integrated payment method selector</li>
                <li>Clear "Order Now" call to action</li>
              </ul>
            </div>
          </div>

          <div className="shrink-0 mx-auto">
            <ComponentPreview path="checkout" title="Live Mobile Preview" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPageDocs;
