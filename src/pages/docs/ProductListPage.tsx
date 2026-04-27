import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryTabs } from '../../components/CategoryTabs';
import { LocationHeader } from '../../components/molecules/LocationHeader';
import { SearchBar } from '../../components/molecules/SearchBar';
import { ProductGrid } from '../../components/molecules/ProductGrid';
import { CartFAB } from '../../components/molecules/CartFAB';
import { HeliozBottomNav } from '../../components/molecules/HeliozBottomNav';

import nasiGoreng from '../../assets/helioz/nasi-goreng.png';
import ayamBakar from '../../assets/helioz/ayam-bakar.png';
import mieGoreng from '../../assets/helioz/mie-goreng.png';
import sateAyam from '../../assets/helioz/sate-ayam.png';

const CATEGORIES = ['All', 'Chicken', 'Noodles', 'Dessert', 'Drinks'];

const INITIAL_PRODUCTS = [
  { id: '1', image: nasiGoreng, title: 'Special Fried Rice', price: 32000, rating: 4.8, isFavorite: false },
  { id: '2', image: ayamBakar, title: 'Honey Glazed Grilled Chicken', price: 38000, rating: 4.9, isFavorite: true },
  { id: '3', image: mieGoreng, title: 'Javanese Fried Noodles', price: 28000, rating: 4.9, isFavorite: false },
  { id: '4', image: sateAyam, title: 'Chicken Satay', price: 30000, rating: 4.9, isFavorite: false },
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { id: 'orders', label: 'Orders', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> },
  { id: 'favs', label: 'Favorites', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg> },
  { id: 'account', label: 'Account', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
];

const ProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Chicken');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cartCount, setCartCount] = useState(1);
  const [cartTotal, setCartTotal] = useState(32000);
  const [activeTab, setActiveTab] = useState('home');

  const handleToggleFavorite = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const handleAddProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setCartCount(prev => prev + 1);
      setCartTotal(prev => prev + product.price);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#020617] min-h-screen shadow-2xl relative overflow-hidden flex flex-col font-sans">
      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Molecule */}
      <header className="px-6 pt-12 pb-4 space-y-6 relative z-10">
        <LocationHeader location="Rasa Helioz" />
        <SearchBar onSearch={(q) => console.log('Searching:', q)} />
      </header>

      {/* Content Molecules */}
      <main className="flex-1 px-6 space-y-6 pb-32 relative z-10">
        <CategoryTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ProductGrid
          title="Ayam & Bebek"
          products={products}
          onAddProduct={handleAddProduct}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>

      {/* Floating Cart Molecule */}
      <CartFAB
        itemCount={cartCount}
        totalPrice={cartTotal}
        onClick={() => navigate('/preview/checkout')}
      />

      {/* Navigation Molecule */}
      <HeliozBottomNav
        items={NAV_ITEMS}
        activeId={activeTab}
        onSelect={setActiveTab}
      />
    </div>
  );
};

export default ProductListPage;
