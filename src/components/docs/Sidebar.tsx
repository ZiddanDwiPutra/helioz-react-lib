import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const SIDEBAR_NAV = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', path: 'introduction' },
      { name: 'Guidance', path: 'guidance' }
    ]
  },
  {
    title: 'Components',
    items: [
      { name: 'Button', path: 'components/button' },
      { name: 'Accordion', path: 'components/accordion' },
      { name: 'Dialog', path: 'components/dialog' },
      { name: 'FormInput', path: 'components/form-input' },
      { name: 'Checkbox', path: 'components/checkbox' },
      { name: 'Radio', path: 'components/radio' },
      { name: 'Dropdown', path: 'components/dropdown' },
      { name: 'Product Card', path: 'components/product-card' },
      { name: 'Stepper', path: 'components/stepper' },
      { name: 'Toggle', path: 'components/toggle' },
      { name: 'Badge', path: 'components/badge' }
    ].sort((a, b) => a.name.localeCompare(b.name))
  },
  {
    title: 'Create',
    items: [
      { name: 'Molecule Component', path: 'create/molecule' },
      { name: 'Prototype Flow', path: 'create/prototype' },
      { name: 'Master Data', path: 'create/master-data' }
    ]
  },
  {
    title: 'Molecules',
    items: [
      { name: 'Location Header', path: 'components/location-header' },
      { name: 'Cart FAB', path: 'components/cart-fab' },
      { name: 'Search Bar', path: 'components/search-bar' },
      { name: 'Bottom Navigation', path: 'components/bottom-nav' },
      { name: 'Info Card', path: 'components/info-card' },
      { name: 'Order Summary', path: 'components/order-summary' }
    ]
  },
  {
    title: 'Pages',
    items: [
      { name: 'Login Page', path: 'pages/login' },
      { name: 'Product List', path: 'pages/product-list' },
      { name: 'Checkout', path: 'pages/checkout' },
      { name: 'Consultation Form', path: 'pages/consultation-form' },
      { name: 'Finance Ledger', path: 'pages/finance-ledger' }
    ]
  }
];

export const Sidebar = () => {
  const basePath = '/docs';

  return (
    <aside className="w-64 hidden md:block border-r border-slate-800 overflow-y-auto p-6 space-y-8 sticky top-16 h-[calc(100vh-64px)]">
      {SIDEBAR_NAV.map((section, idx) => (
        <div key={idx}>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            {section.title}
          </h4>
          <ul className="space-y-2 text-sm font-medium">
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <NavLink
                  to={`${basePath}/${item.path}`}
                  className={({ isActive }) =>
                    `block transition-colors ${isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200'}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
