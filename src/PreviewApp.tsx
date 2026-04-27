import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/docs/ProductListPage';
import CheckoutPage from './pages/docs/CheckoutPage';
import LoginPageDocs from './pages/docs/LoginPage';
import ConsultationFormPage from './pages/docs/ConsultationFormPage';
import FinanceLedgerPage from './pages/docs/FinanceLedgerPage';
import PrototypePreviewPage from './pages/docs/PrototypePreviewPage';

export const PreviewApp = () => {
  return (
    <div className="dark min-h-screen bg-[#020617] text-slate-50">
      <Routes>
        <Route path="product-list" element={<ProductListPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="login" element={<LoginPageDocs />} />
        <Route path="consultation-form" element={<ConsultationFormPage />} />
        <Route path="finance-ledger" element={<FinanceLedgerPage />} />
        <Route path="prototype/:screenId" element={<PrototypePreviewPage />} />
      </Routes>
    </div>
  );
};

export default PreviewApp;
