import React from 'react';
import { ProductCard } from '../ProductCard';
import nasiGoreng from '../../assets/helioz/nasi-goreng.png';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const ProductCardDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">ProductCard</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A premium product card designed for the Helioz Food App theme, featuring image, rating, title, price, and actions.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6" id="usage">Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-300">Default Variant</h3>
            <div className="max-w-[200px]">
              <ProductCard
                image={nasiGoreng}
                title="Special Fried Rice"
                price={32000}
                rating={4.8}
                onAdd={() => alert('Added to cart')}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-300">Favorite State</h3>
            <div className="max-w-[200px]">
              <ProductCard
                image={nasiGoreng}
                title="Special Fried Rice"
                price={32000}
                rating={4.8}
                isFavorite={true}
                onAdd={() => alert('Added to cart')}
              />
            </div>
          </div>
        </div>
        <CodeBlock code={`import { ProductCard } from 'helioz-react-lib';

<ProductCard
  image="/path/to/image.png"
  title="Special Fried Rice"
  price={32000}
  rating={4.8}
  isFavorite={true}
  onAdd={() => console.log('Added')}
  onToggleFavorite={() => console.log('Toggled')}
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
                <td className="py-4 font-mono text-indigo-400">image</td>
                <td className="py-4">string</td>
                <td className="py-4">-</td>
                <td className="py-4">URL of the product image</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">title</td>
                <td className="py-4">string</td>
                <td className="py-4">-</td>
                <td className="py-4">Product name</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">price</td>
                <td className="py-4">number</td>
                <td className="py-4">-</td>
                <td className="py-4">Price in numerical value</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">rating</td>
                <td className="py-4">number</td>
                <td className="py-4">-</td>
                <td className="py-4">Product rating (0-5)</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">isFavorite</td>
                <td className="py-4">boolean</td>
                <td className="py-4">false</td>
                <td className="py-4">Whether the item is marked as favorite</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductCardDocs;
