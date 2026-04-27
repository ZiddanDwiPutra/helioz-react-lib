import React from 'react';
import { CartFAB } from '../molecules/CartFAB';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const CartFABDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">CartFAB</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A Floating Action Button (FAB) that summarizes the current cart state and serves as the primary transition to checkout.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Example</h2>
        <div className="bg-[#020617] h-[200px] border border-slate-800 rounded-3xl relative overflow-hidden flex items-center justify-center">
            <p className="text-slate-600 text-sm italic">Simulated view (Button is fixed in actual use)</p>
            <div className="absolute inset-x-0 bottom-6 px-6">
                <div className="relative bottom-0 left-0 right-0 !static !translate-x-0">
                    <CartFAB 
                        itemCount={2} 
                        totalPrice={70000} 
                        onClick={() => alert('Proceeding to payment')}
                        className="!static !translate-x-0 !max-w-none !px-0"
                    />
                </div>
            </div>
        </div>
        <CodeBlock code={`import { CartFAB } from 'helioz-react-lib';

<CartFAB 
  itemCount={cart.length} 
  totalPrice={total} 
  onClick={() => navigate('/checkout')}
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
                <td className="py-4 font-mono text-indigo-400">itemCount</td>
                <td className="py-4">number</td>
                <td className="py-4">-</td>
                <td className="py-4">Number of items currently in the cart</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">totalPrice</td>
                <td className="py-4">number</td>
                <td className="py-4">-</td>
                <td className="py-4">Total price of items in the cart</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CartFABDocs;
