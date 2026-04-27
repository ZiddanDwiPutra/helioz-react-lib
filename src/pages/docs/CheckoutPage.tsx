import React, { useState } from 'react';
import { Stepper } from '../../components/Stepper';
import { OrderSummary } from '../../components/molecules/OrderSummary';
import { InfoCard } from '../../components/molecules/InfoCard';
import { PaymentSelector } from '../../components/PaymentSelector';
import nasiGoreng from '../../assets/helioz/nasi-goreng.png';
import ayamBakar from '../../assets/helioz/ayam-bakar.png';

const ORDER_ITEMS = [
  { id: '1', image: nasiGoreng, title: 'Special Fried Rice', quantity: 1, price: 32000 },
  { id: '2', image: ayamBakar, title: 'Honey Glazed Grilled Chicken', quantity: 1, price: 38000 },
];

const PAYMENT_OPTIONS = [
  { id: 'gopay', label: 'GoPay' },
  { id: 'card', label: 'Card' },
  { id: 'cash', label: 'Cash' },
];

const CheckoutPage: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState('gopay');
  const subtotal = 70000;
  const deliveryFee = 10000;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-md mx-auto bg-[#020617] min-h-screen shadow-2xl relative overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-[#020617]/80 backdrop-blur-xl z-20">
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-lg font-black text-slate-100 italic tracking-tight">My Order</h1>
        <div className="w-10" />
      </header>

      {/* Content Molecules */}
      <main className="flex-1 px-6 space-y-8 pb-32">
        <Stepper steps={['Order', 'Pay', 'Success']} currentStep={1} />

        <OrderSummary
          items={ORDER_ITEMS}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
        />

        <InfoCard
          label="Shipping Address"
          title="123 Sudirman St., Jakarta, default"
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
          onClick={() => console.log('Change Address')}
        />

        <InfoCard
          label="Delivery Option"
          title="Standard - 30-45 mins | Rp 10,000"
          onClick={() => console.log('Change Delivery')}
        />

        <div className="space-y-3">
          <h3 className="font-bold text-slate-100 text-sm">Payment Method</h3>
          <PaymentSelector
            options={PAYMENT_OPTIONS}
            selectedId={selectedPayment}
            onSelect={setSelectedPayment}
          />
        </div>

        <div className="space-y-3 pt-4">
          <h3 className="font-bold text-slate-100 text-sm">Summary</h3>
          <div className="flex justify-between items-center bg-indigo-600/5 border border-indigo-500/10 rounded-2xl p-4 shadow-inner">
            <span className="text-slate-400 font-bold">Final Total</span>
            <span className="text-indigo-400 font-black text-xl">Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </main>

      {/* Order Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-[#020617]/90 backdrop-blur-md border-t border-slate-800 z-30">
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-3xl font-black text-lg shadow-2xl shadow-indigo-500/40 transition-all active:scale-95 cursor-pointer"
          onClick={() => alert('Order Placed Successfully!')}
        >
          Order Now - Rp {total.toLocaleString('id-ID')}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
