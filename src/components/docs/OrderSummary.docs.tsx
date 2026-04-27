import React from 'react';
import { OrderSummary } from '../molecules/OrderSummary';
import nasiGoreng from '../../assets/helioz/nasi-goreng.png';

const ITEM = { id: '1', image: nasiGoreng, title: 'Special Fried Rice', quantity: 1, price: 32000 };

const OrderSummaryDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">OrderSummary</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A high-level molecule that lists order items and provides a detailed financial breakdown (subtotal, fees, total).
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Example</h2>
        <div className="bg-[#020617] p-8 rounded-3xl border border-slate-800 shadow-2xl max-w-sm mx-auto">
          <OrderSummary
            items={[ITEM]}
            subtotal={32000}
            deliveryFee={10000}
          />
        </div>
      </section>
    </div>
  );
};

export default OrderSummaryDocs;
