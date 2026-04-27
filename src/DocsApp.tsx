import React from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import ButtonDocs from './components/docs/Button.docs'
import IntroductionDocs from './components/docs/Introduction.docs'
import AccordionDocs from './components/docs/Accordion.docs'
import DialogDocs from './components/docs/Dialog.docs'
import FormInputDocs from './components/docs/FormInput.docs'
import CheckboxDocs from './components/docs/Checkbox.docs'
import RadioDocs from './components/docs/Radio.docs'
import DropdownDocs from './components/docs/Dropdown.docs'
import ProductCardDocs from './components/docs/ProductCard.docs'
import StepperDocs from './components/docs/Stepper.docs'
import LocationHeaderDocs from './components/docs/LocationHeader.docs'
import CartFABDocs from './components/docs/CartFAB.docs'
import SearchBarDocs from './components/docs/SearchBar.docs'
import HeliozBottomNavDocs from './components/docs/HeliozBottomNav.docs'
import InfoCardDocs from './components/docs/InfoCard.docs'
import OrderSummaryDocs from './components/docs/OrderSummary.docs'
import GuidanceDocs from './components/docs/Guidance.docs'
import LoginPageDocs from './pages/docs/LoginPage'
import ProductListPageDocs from './pages/docs/ProductListPage.docs'
import CheckoutPageDocs from './pages/docs/CheckoutPage.docs'
import ConsultationFormPageDocs from './pages/docs/ConsultationFormPage.docs'
import ToggleDocs from './components/docs/Toggle.docs'
import BadgeDocs from './components/docs/Badge.docs'
import FinanceLedgerPageDocs from './pages/docs/FinanceLedgerPage.docs'
import logoMini from './assets/helioz-rl-logo-mini.png'
import Sidebar from './components/docs/Sidebar'

const SEARCH_PAGES: { name: string; path: string; section: string; disabled?: boolean }[] = [
  { name: 'Introduction', path: 'introduction', section: 'Getting Started' },
  { name: 'Guidance', path: 'guidance', section: 'Getting Started' },
  { name: 'Installation', path: 'introduction', section: 'Getting Started' },
  { name: 'Button', path: 'components/button', section: 'Components' },
  { name: 'Accordion', path: 'components/accordion', section: 'Components' },
  { name: 'Dialog', path: 'components/dialog', section: 'Components' },
  { name: 'FormInput', path: 'components/form-input', section: 'Components' },
  { name: 'Checkbox', path: 'components/checkbox', section: 'Components' },
  { name: 'Radio', path: 'components/radio', section: 'Components' },
  { name: 'Dropdown', path: 'components/dropdown', section: 'Components' },
  { name: 'Product Card', path: 'components/product-card', section: 'Components' },
  { name: 'Stepper', path: 'components/stepper', section: 'Components' },
  { name: 'Toggle', path: 'components/toggle', section: 'Components' },
  { name: 'Badge', path: 'components/badge', section: 'Components' },
  { name: 'Location Header', path: 'components/location-header', section: 'Molecules' },
  { name: 'Cart FAB', path: 'components/cart-fab', section: 'Molecules' },
  { name: 'Search Bar', path: 'components/search-bar', section: 'Molecules' },
  { name: 'Bottom Nav', path: 'components/bottom-nav', section: 'Molecules' },
  { name: 'Info Card', path: 'components/info-card', section: 'Molecules' },
  { name: 'Order Summary', path: 'components/order-summary', section: 'Molecules' },
  { name: 'Login Page', path: 'pages/login', section: 'Pages' },
  { name: 'Product List', path: 'pages/product-list', section: 'Pages' },
  { name: 'Checkout', path: 'pages/checkout', section: 'Pages' },
  { name: 'Consultation Form', path: 'pages/consultation-form', section: 'Pages' },
  { name: 'Finance Ledger', path: 'pages/finance-ledger', section: 'Pages' },
  { name: 'Create Molecule', path: 'create/molecule', section: 'Create' },
  { name: 'Prototype Flow', path: 'create/prototype', section: 'Create' },
]

const Search = () => {
  const [query, setQuery] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const searchRef = React.useRef<HTMLDivElement>(null)

  const results = React.useMemo(() => {
    if (!query) return []
    return SEARCH_PAGES.filter(page =>
      page.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative group" ref={searchRef}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search components..."
          className="bg-slate-900 text-sm rounded-md pl-10 pr-3 py-1.5 w-64 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600 transition-all focus:w-80"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-md shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="p-2">
            {results.map((page, i) => (
              <button
                key={i}
                disabled={page.disabled}
                onClick={() => {
                  if (!page.disabled) {
                    navigate(`/docs/${page.path}`)
                    setIsOpen(false)
                    setQuery('')
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between group/item ${page.disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-800 transition-colors cursor-pointer'
                  }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-200">{page.name}</span>
                  <span className="text-[10px] text-slate-500">{page.section}</span>
                </div>
                {!page.disabled && (
                  <svg className="w-3 h-3 text-slate-600 opacity-0 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-md p-4 text-center z-50">
          <p className="text-sm text-slate-500">No results found for "{query}"</p>
        </div>
      )}
    </div>
  )
}


const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="dark min-h-screen bg-[#020617] text-slate-50 flex flex-col font-sans">
    {/* Header */}
    <nav className="h-16 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 bg-[#020617]/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
        <img src={logoMini} alt="Helioz RL Logo" className="h-10 w-auto rounded-xl p-1" />
        <span className="text-xl font-bold tracking-tight">Helioz RL</span>
      </div>
      <div className="flex items-center gap-4">
        <Search />
      </div>
    </nav>

    <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
      <Sidebar />
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>

    <footer className="border-t border-slate-800 py-8 px-6 text-center text-slate-600 text-xs">
      &copy; 2026 Helioz React Library. Powering premium user interfaces.
    </footer>
  </div>
)

export const DocsApp = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Navigate to="introduction" replace />} />
      <Route path="introduction" element={<IntroductionDocs />} />
      <Route path="guidance" element={<GuidanceDocs />} />
      <Route path="components/button" element={<ButtonDocs />} />
      <Route path="components/accordion" element={<AccordionDocs />} />
      <Route path="components/dialog" element={<DialogDocs />} />
      <Route path="components/form-input" element={<FormInputDocs />} />
      <Route path="components/checkbox" element={<CheckboxDocs />} />
      <Route path="components/radio" element={<RadioDocs />} />
      <Route path="components/dropdown" element={<DropdownDocs />} />
      <Route path="components/product-card" element={<ProductCardDocs />} />
      <Route path="components/stepper" element={<StepperDocs />} />
      <Route path="components/toggle" element={<ToggleDocs />} />
      <Route path="components/badge" element={<BadgeDocs />} />
      <Route path="components/location-header" element={<LocationHeaderDocs />} />
      <Route path="components/cart-fab" element={<CartFABDocs />} />
      <Route path="components/search-bar" element={<SearchBarDocs />} />
      <Route path="components/bottom-nav" element={<HeliozBottomNavDocs />} />
      <Route path="components/info-card" element={<InfoCardDocs />} />
      <Route path="components/order-summary" element={<OrderSummaryDocs />} />
      <Route path="pages/login" element={<LoginPageDocs />} />
      <Route path="pages/product-list" element={<ProductListPageDocs />} />
      <Route path="pages/checkout" element={<CheckoutPageDocs />} />
      <Route path="pages/consultation-form" element={<ConsultationFormPageDocs />} />
      <Route path="pages/finance-ledger" element={<FinanceLedgerPageDocs />} />
    </Routes>
  </Layout>
)

export default DocsApp;
