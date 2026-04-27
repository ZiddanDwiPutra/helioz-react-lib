import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import { usePrototypeStore, type ComponentType, type PrototypeCell, type PrototypeRow } from '../../store/usePrototypeStore';
import { Button } from '../Button';
import { FormInput } from '../FormInput';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import { Dropdown } from '../Dropdown';
import { Badge } from '../Badge';
import { Toggle } from '../Toggle';
import { LocationHeader } from '../molecules/LocationHeader';
import { SearchBar } from '../molecules/SearchBar';
import { Dialog } from '../Dialog';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
  Square, 
  Type, 
  CaseSensitive, 
  AlignLeft, 
  CheckSquare, 
  CircleDot, 
  ChevronDown, 
  Tag, 
  ToggleRight, 
  MapPin, 
  Search,
  Undo2,
  Redo2,
  ExternalLink,
  Trash2,
  Plus,
  LayoutList,
  LayoutTemplate,
  Zap,
  Save
} from 'lucide-react';

const COMPONENTS: { type: ComponentType; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: 'Button', label: 'Button', icon: <Square size={18} />, desc: 'Clickable action element' },
  { type: 'FormInput', label: 'Input', icon: <Type size={18} />, desc: 'Text entry field' },
  { type: 'Label', label: 'Label', icon: <CaseSensitive size={18} />, desc: 'Heading or short text' },
  { type: 'Paragraph', label: 'Paragraph', icon: <AlignLeft size={18} />, desc: 'Rich text content' },
  { type: 'Checkbox', label: 'Checkbox', icon: <CheckSquare size={18} />, desc: 'Multiple selection' },
  { type: 'Radio', label: 'Radio', icon: <CircleDot size={18} />, desc: 'Single selection' },
  { type: 'Dropdown', label: 'Dropdown', icon: <ChevronDown size={18} />, desc: 'Selection list' },
  { type: 'Badge', label: 'Badge', icon: <Tag size={18} />, desc: 'Status indicator' },
  { type: 'BadgeSlider', label: 'Badge Slider', icon: <LayoutList size={18} />, desc: 'Horizontal badge list' },
  { type: 'Toggle', label: 'Toggle', icon: <ToggleRight size={18} />, desc: 'On/Off switch' },
];

const MOLECULES: { type: ComponentType; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: 'LocationHeader', label: 'Location Header', icon: <MapPin size={18} />, desc: 'Header with location info' },
  { type: 'SearchBar', label: 'Search Bar', icon: <Search size={18} />, desc: 'Interactive search input' },
];

const TEMPLATES = [
  {
    id: 'registration-form',
    name: 'Registration Form',
    desc: 'Complete user registration flow with validation',
    icon: <LayoutTemplate size={20} />,
    rows: [
      {
        direction: 'col',
        minHeight: 100,
        cells: [
          { component: 'Label', props: { html: '<h2 style="margin-bottom: 0;">Create Account</h2><p style="color: #64748b; font-size: 14px;">Join our community today</p>' }, flex: 1 }
        ]
      },
      {
        direction: 'row',
        minHeight: 80,
        cells: [
          { component: 'FormInput', props: { label: 'First Name', placeholder: 'John', variant: 'text' }, flex: 1 },
          { component: 'FormInput', props: { label: 'Last Name', placeholder: 'Doe', variant: 'text' }, flex: 1 }
        ]
      },
      {
        direction: 'col',
        minHeight: 80,
        cells: [
          { component: 'FormInput', props: { label: 'Email Address', placeholder: 'john@example.com', variant: 'email' }, flex: 1 }
        ]
      },
      {
        direction: 'col',
        minHeight: 80,
        cells: [
          { component: 'FormInput', props: { label: 'Phone Number', placeholder: '0812...', variant: 'phone' }, flex: 1 }
        ]
      },
      {
        direction: 'col',
        minHeight: 80,
        cells: [
          { component: 'FormInput', props: { label: 'Password', placeholder: '••••••••', variant: 'password' }, flex: 1 }
        ]
      },
      {
        direction: 'row',
        minHeight: 60,
        cells: [
          { component: 'Checkbox', props: { label: 'I agree to the Terms & Conditions' }, flex: 1 }
        ]
      },
      {
        direction: 'col',
        minHeight: 100,
        cells: [
          { 
            component: 'Button', 
            props: { 
              children: 'Register Now', 
              variant: 'primary', 
              actionType: 'validate',
              validateInputIds: [] // Will be populated in applyTemplate or handled by ID mapping
            }, 
            flex: 1 
          }
        ]
      }
    ]
  }
];

const DEFAULT_PROPS: Record<ComponentType, any> = {
  Button: { children: 'Button Text', variant: 'primary', size: 'md' },
  FormInput: { label: 'Label', placeholder: 'Placeholder...', variant: 'text' },
  Label: { html: '<h1>Heading</h1>' },
  Paragraph: { html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' },
  Checkbox: { label: 'Option', checked: false },
  Radio: { label: 'Option', checked: false },
  Dropdown: { label: 'Select', options: [{ label: 'Option 1', value: '1' }], variant: 'default' },
  Badge: { children: 'Badge', variant: 'default' },
  BadgeSlider: { badges: ['All', 'Popular', 'New', 'Discount'], variant: 'primary' },
  Toggle: { label: 'Toggle', checked: false },
  LocationHeader: { location: 'Jakarta, Indonesia' },
  SearchBar: { placeholder: 'Search something...' },
  BottomNav: {},
  InfoCard: { title: 'Card Title', description: 'Description here' },
  ProductCard: { name: 'Product', price: 10000 },
  OrderSummary: { total: 50000 },
};

const RenderElement: React.FC<{ type: ComponentType; props: any }> = ({ type, props }) => {
  const commonProps = { ...props, className: `w-full ${props.className || ''}` };

  switch (type) {
    case 'Button': return <Button {...commonProps}>{props.children || 'Button'}</Button>;
    case 'FormInput': return <FormInput {...commonProps} />;
    case 'Checkbox': return <Checkbox {...commonProps} />;
    case 'Radio': return <Radio {...commonProps} />;
    case 'Dropdown': return <Dropdown {...commonProps} />;
    case 'Badge': return <div className="w-full flex justify-center"><Badge {...props}>{props.children || 'Badge'}</Badge></div>;
    case 'BadgeSlider': 
      return (
        <div className="w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex gap-2 min-w-max px-2">
            {(props.badges || []).map((text: string, i: number) => (
              <Badge key={i} variant={props.variant || 'primary'}>{text}</Badge>
            ))}
          </div>
        </div>
      );
    case 'Toggle': return <Toggle {...commonProps} />;
    case 'Label': 
    case 'Paragraph': 
      return (
        <div 
          className={`w-full prose prose-invert max-w-none ${type === 'Label' ? 'font-bold' : ''}`}
          dangerouslySetInnerHTML={{ __html: props.html || '' }} 
        />
      );
    case 'LocationHeader': return <LocationHeader {...commonProps} />;
    case 'SearchBar': return <SearchBar {...commonProps} />;
    default: return null;
  }
};

const CellView: React.FC<{ 
  screenId: string;
  rowId: string;
  cell: PrototypeCell; 
  onEdit: (cell: PrototypeCell) => void 
}> = ({ screenId, rowId, cell, onEdit }) => {
  const { updateCellComponent, updateCellFlex, removeCell } = usePrototypeStore();
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const type = e.dataTransfer.getData('component-type') as ComponentType;
    if (type) {
      updateCellComponent(screenId, cell.id, type);
    }
  };

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      style={{ flex: cell.flex }}
      className={`relative h-full border-2 border-dashed rounded-xl transition-all flex items-center justify-center p-2 group/cell ${
        isOver ? 'border-indigo-500 bg-indigo-500/10' : cell.component ? 'border-transparent bg-slate-900/40' : 'border-slate-800 bg-slate-950/20 hover:border-slate-700'
      }`}
    >
      {cell.component ? (
        <>
          <div className="w-full">
            <RenderElement type={cell.component} props={{ ...DEFAULT_PROPS[cell.component], ...cell.props }} />
          </div>
          <div className="absolute top-1 left-1 opacity-0 group-hover/cell:opacity-100 transition-opacity flex gap-1">
            <button 
              onClick={() => onEdit(cell)}
              className="px-1.5 py-0.5 bg-indigo-600 text-[8px] font-bold rounded uppercase text-white hover:bg-indigo-500"
            >
              Edit
            </button>
            <button 
              onClick={() => removeCell(screenId, rowId, cell.id)}
              className="px-1.5 py-0.5 bg-red-600 text-[8px] font-bold rounded uppercase text-white hover:bg-red-500"
            >
              ✕
            </button>
          </div>
          
          {/* Width Adjustment */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/cell:opacity-100 transition-opacity z-20 flex flex-col gap-1">
            <button 
              onClick={() => updateCellFlex(screenId, cell.id, Math.min(12, cell.flex + 1))}
              className="w-4 h-4 bg-slate-800 border border-slate-700 text-[10px] rounded flex items-center justify-center hover:bg-indigo-600"
            >
              +
            </button>
            <button 
              onClick={() => updateCellFlex(screenId, cell.id, Math.max(1, cell.flex - 1))}
              className="w-4 h-4 bg-slate-800 border border-slate-700 text-[10px] rounded flex items-center justify-center hover:bg-indigo-600"
            >
              -
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">Drop Item</span>
          <button 
            onClick={() => removeCell(screenId, rowId, cell.id)}
            className="opacity-0 group-hover/cell:opacity-100 text-red-500 hover:text-red-400 text-[10px] font-bold"
          >
            Remove Cell
          </button>
        </div>
      )}
    </div>
  );
};

const BadgeSliderInput: React.FC<{ value: string; onChange: (tags: string[]) => void }> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    const tags = newVal.split(',').map(t => t.trim()).filter(t => t !== '');
    onChange(tags);
  };

  return (
    <textarea 
      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-indigo-500 min-h-[100px] resize-none"
      value={localValue}
      onChange={handleChange}
    />
  );
};

export const PrototypeFlow: React.FC = () => {
  const navigate = useNavigate();
  const { 
    screens, 
    currentScreenId, 
    addScreen, 
    removeScreen, 
    setCurrentScreen,
    addRow,
    removeRow,
    addCell,
    updateRowHeight,
    updateCellFlex,
    updateCellProps,
    applyTemplate,
    saveAsTemplate,
    userTemplates,
    resetPrototype 
  } = usePrototypeStore();

  const { undo, redo, pastStates, futureStates } = useStore(usePrototypeStore.temporal, (state) => state);

  const [activeTab, setActiveTab] = useState<'components' | 'molecules'>('components');
  const [isAddingScreen, setIsAddingScreen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTemplateSidebarCollapsed, setIsTemplateSidebarCollapsed] = useState(true);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [newScreenName, setNewScreenName] = useState('');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDesc, setNewTemplateDesc] = useState('');
  const [editingCellInfo, setEditingCellInfo] = useState<{ rowId: string, cellId: string } | null>(null);

  const currentScreen = screens.find(s => s.id === currentScreenId);
  
  // Find the actual editing cell from the store to ensure it's reactive
  const editingCell = editingCellInfo 
    ? currentScreen?.rows.find(r => r.id === editingCellInfo.rowId)?.cells.find(c => c.id === editingCellInfo.cellId)
    : null;

  const handleDragStart = (e: React.DragEvent, type: ComponentType) => {
    e.dataTransfer.setData('component-type', type);
  };

  return (
    <div className="dark min-h-screen bg-[#020617] text-slate-50 font-sans flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-[#020617]/90 backdrop-blur-md shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/docs')} className="text-slate-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div className="h-5 w-px bg-slate-800" />
          <h1 className="text-sm font-black tracking-tight"><span className="text-indigo-500">Helioz</span> Prototype Flow</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 mr-2">
            <button 
              onClick={() => undo()} 
              disabled={pastStates.length === 0}
              className="p-1.5 text-slate-500 hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 transition-all"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={16} />
            </button>
            <div className="w-px h-4 bg-slate-800 mx-1" />
            <button 
              onClick={() => redo()} 
              disabled={futureStates.length === 0}
              className="p-1.5 text-slate-500 hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 transition-all"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={16} />
            </button>
          </div>

          <button 
            onClick={() => window.open(`/preview/prototype/${currentScreenId}`, '_blank')}
            disabled={!currentScreenId}
            className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <ExternalLink size={14} />
            Open Preview
          </button>

          <button 
            onClick={() => setIsTemplateSidebarCollapsed(!isTemplateSidebarCollapsed)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${!isTemplateSidebarCollapsed ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <Zap size={14} />
            Templates
          </button>
          
          <button onClick={resetPrototype} className="px-3 py-1.5 text-xs font-bold bg-red-950/30 border border-red-900/50 text-red-400 rounded-lg hover:bg-red-900/40 transition-all">
            Clear Flow
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Toggle Button (Floating when collapsed) */}
        {isSidebarCollapsed && (
          <button 
            onClick={() => setIsSidebarCollapsed(false)}
            className="absolute left-4 top-4 z-[60] w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-xl shadow-indigo-600/20 hover:scale-110 transition-all border border-indigo-500"
          >
            <Plus size={20} />
          </button>
        )}

        {/* LEFT SIDEBAR: Library & Screens */}
        <aside className={`border-r border-slate-800 flex flex-col bg-[#020617] shrink-0 transition-all duration-300 ease-in-out relative overflow-hidden ${isSidebarCollapsed ? 'w-0' : 'w-[320px]'}`}>
          <div className="flex flex-col h-full min-w-[320px]">
            {/* Sidebar Header with Collapse Button */}
            <div className="flex items-center justify-between p-6 pb-2">
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Library</h2>
              <button 
                onClick={() => setIsSidebarCollapsed(true)}
                className="p-2 text-slate-600 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7M19 19l-7-7 7-7"/></svg>
              </button>
            </div>

            {/* Tabs Section */}
            <div className="p-6 pt-2 pb-0">
              <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-slate-800/50 mb-6">
                <button 
                  onClick={() => setActiveTab('components')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'components' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Components
                </button>
                <button 
                  onClick={() => setActiveTab('molecules')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'molecules' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Molecules
                </button>
              </div>
            </div>

            {/* Library Items (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0">
               <div className="space-y-3">
                  {(activeTab === 'components' ? COMPONENTS : MOLECULES).map(item => (
                    <div 
                      key={item.type}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.type)}
                      className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl cursor-grab active:cursor-grabbing hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:text-indigo-400 transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-200">{item.label}</p>
                          <p className="text-[10px] text-slate-600 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </div>))}
              </div>
          </div>

          {/* Screens Navigation */}
          <div className="p-6 border-t border-slate-800 bg-slate-900/20">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Screens</h2>
                <button onClick={() => setIsAddingScreen(true)} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  <Plus size={16} />
                </button>
             </div>
             <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {screens.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setCurrentScreen(s.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentScreenId === s.id ? 'bg-indigo-600/10 border border-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-300 border border-transparent'}`}
                  >
                    {s.name}
                    {screens.length > 1 && (
                      <span onClick={(e) => { e.stopPropagation(); removeScreen(s.id); }} className="hover:text-red-400 transition-colors">✕</span>
                    )}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDEBAR: Templates */}
      <aside className={`border-l border-slate-800 flex flex-col bg-[#020617] shrink-0 transition-all duration-300 ease-in-out relative overflow-hidden ${isTemplateSidebarCollapsed ? 'w-0' : 'w-[280px]'}`}>
        <div className="flex flex-col h-full min-w-[280px]">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Templates</h2>
            <button 
              onClick={() => setIsTemplateSidebarCollapsed(true)}
              className="p-2 text-slate-600 hover:text-white transition-colors"
            >
              <Trash2 size={14} className="rotate-45" /> {/* Close icon using rotated trash or just X */}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="space-y-4">
              {[...TEMPLATES, ...userTemplates].map(template => (
                <div 
                  key={template.id}
                  className="group p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all cursor-pointer"
                  onClick={() => {
                    if (currentScreenId) {
                      applyTemplate(currentScreenId, template.rows);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-all">
                      {template.icon || <LayoutTemplate size={20} />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-200">{template.name}</p>
                      <p className="text-[10px] text-slate-600 leading-tight mt-0.5">{template.desc}</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 bg-slate-800 text-[10px] font-black text-slate-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all uppercase tracking-widest">
                    Apply Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

        {/* MAIN CANVAS */}
        <main className="flex-1 bg-slate-950 p-8 overflow-auto relative flex flex-col items-center">
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <div className="w-full max-w-5xl transition-all">
             {/* Open Canvas Container */}
             <div className={`w-full min-h-[600px] bg-[#020617] rounded-3xl border border-slate-800 shadow-2xl relative flex flex-col p-10 transition-all ${!currentScreenId ? 'opacity-20 grayscale' : ''}`}>
                
                {currentScreen ? (
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="mb-4 flex items-center justify-between">
                       <div>
                         <h2 className="text-xl font-black text-white">{currentScreen.name}</h2>
                         <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Live Canvas</p>
                       </div>
                       <button 
                         onClick={() => {
                           setNewTemplateName(currentScreen.name);
                           setIsSavingTemplate(true);
                         }}
                         className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all group"
                       >
                         <Save size={14} className="group-hover:text-indigo-400 transition-colors" />
                         Save as Template
                       </button>
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                      {currentScreen?.rows?.map(row => (
                        <div key={row.id} 
                             style={{ minHeight: row.minHeight }}
                             className="group/row relative border border-dashed border-slate-800/50 rounded-2xl p-3 hover:border-indigo-500/30 transition-all bg-slate-900/20">
                          <div className={`flex gap-4 h-full ${row.direction === 'row' ? 'flex-row items-end' : 'flex-col'}`}>
                            {row.cells.map(cell => (
                              <CellView 
                                key={cell.id} 
                                screenId={currentScreen.id} 
                                rowId={row.id} 
                                cell={cell} 
                                onEdit={(c) => setEditingCellInfo({ rowId: row.id, cellId: c.id })} 
                              />
                            ))}
                          </div>

                          {/* Height Adjustment Handle */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity cursor-ns-resize z-20">
                            <div className="flex gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 mb-1 shadow-xl">
                               <button onClick={() => updateRowHeight(currentScreen.id, row.id, Math.max(48, row.minHeight - 48))} className="text-xs font-black text-slate-400 hover:text-white px-1">-</button>
                               <span className="text-[8px] font-black text-slate-500 flex items-center tracking-widest">HEIGHT ({row.minHeight}px)</span>
                               <button onClick={() => updateRowHeight(currentScreen.id, row.id, row.minHeight + 48)} className="text-xs font-black text-slate-400 hover:text-white px-1">+</button>
                            </div>
                          </div>

                          {/* Row Actions */}
                          <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity flex flex-col gap-2">
                            <button 
                              onClick={() => addCell(currentScreen.id, row.id)} 
                              className="w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xs shadow-lg hover:bg-indigo-500 hover:scale-110 transition-all"
                              title="Add Column"
                            >
                              <Plus size={14} />
                            </button>
                            <button 
                              onClick={() => removeRow(currentScreen.id, row.id)} 
                              className="w-8 h-8 bg-slate-800 text-red-400 border border-red-500/20 rounded-xl flex items-center justify-center text-xs shadow-lg hover:bg-red-950 hover:text-red-200 transition-all"
                              title="Remove Row"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button 
                        onClick={() => addRow(currentScreen.id, 'row', 1)}
                        className="w-full py-8 border-2 border-dashed border-slate-800/50 rounded-3xl text-slate-700 hover:border-indigo-500/30 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all font-black text-xs uppercase tracking-[0.2em] mt-4"
                      >
                        + Add Section / Container
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-800">
                      <Plus size={32} className="text-slate-700" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-6">Canvas is empty</p>
                    <Button variant="primary" size="md" onClick={() => setIsAddingScreen(true)} className="px-8 bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-xl shadow-indigo-600/20">
                      Create New Screen
                    </Button>
                  </div>
                )}
             </div>
          </div>
        </main>
      </div>

      {/* Screen Dialog */}
      <Dialog isOpen={isAddingScreen} onClose={() => setIsAddingScreen(false)} title="Create New Screen">
        <div className="space-y-4 pt-2">
          <FormInput label="Screen Name" placeholder="Home, Settings, Profile..." value={newScreenName} onChange={(e) => setNewScreenName(e.target.value)} />
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="ghost" onClick={() => setIsAddingScreen(false)}>Cancel</Button>
            <Button onClick={() => { if(newScreenName) { addScreen(newScreenName); setNewScreenName(''); setIsAddingScreen(false); } }}>Create Screen</Button>
          </div>
        </div>
      </Dialog>

      {/* Save Template Dialog */}
      <Dialog isOpen={isSavingTemplate} onClose={() => setIsSavingTemplate(false)} title="Save Screen as Template">
        <div className="space-y-4 pt-2">
          <FormInput label="Template Name" placeholder="Enter template name..." value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} />
          <FormInput label="Description" placeholder="What is this layout for?" value={newTemplateDesc} onChange={(e) => setNewTemplateDesc(e.target.value)} />
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="ghost" onClick={() => setIsSavingTemplate(false)}>Cancel</Button>
            <Button onClick={() => { 
              if(newTemplateName && currentScreen) { 
                saveAsTemplate(newTemplateName, newTemplateDesc, currentScreen.rows); 
                setNewTemplateName(''); 
                setNewTemplateDesc('');
                setIsSavingTemplate(false); 
                setIsTemplateSidebarCollapsed(false);
              } 
            }}>Save Template</Button>
          </div>
        </div>
      </Dialog>

      {/* Props Editor */}
      <Dialog isOpen={!!editingCellInfo} onClose={() => setEditingCellInfo(null)} title={`Edit ${editingCell?.component}`}>
        {editingCell && (
          <div className="space-y-4 pt-2">
            {editingCell.component === 'Button' && (
              <>
                <FormInput label="Button Text" value={editingCell.props.children || ''} onChange={(e) => updateCellProps(currentScreenId!, editingCell.id, { children: e.target.value })} />
                <Dropdown label="Variant" value={editingCell.props.variant || 'primary'} options={[{label:'Primary',value:'primary'},{label:'Secondary',value:'secondary'},{label:'Outline',value:'outline'},{label:'Ghost',value:'ghost'}]} onChange={(v) => updateCellProps(currentScreenId!, editingCell.id, { variant: v })} />
                
                <div className="pt-4 border-t border-slate-800">
                  <Dropdown 
                    label="Action Type" 
                    value={editingCell.props.actionType || 'none'} 
                    options={[
                      {label:'None', value:'none'},
                      {label:'Redirection', value:'redirection'},
                      {label:'Validate', value:'validate'}
                    ]} 
                    onChange={(v) => updateCellProps(currentScreenId!, editingCell.id, { actionType: v })} 
                  />
                </div>

                {editingCell.props.actionType === 'redirection' && (
                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Screen</label>
                    <div className="grid grid-cols-2 gap-2">
                      {screens.map(s => (
                        <button 
                          key={s.id}
                          onClick={() => updateCellProps(currentScreenId!, editingCell.id, { targetScreenId: s.id })}
                          className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all text-left ${editingCell.props.targetScreenId === s.id ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {editingCell.props.actionType === 'validate' && (
                  <div className="space-y-2 pt-2 pb-20">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inputs to Validate</label>
                    <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                      {currentScreen?.rows.flatMap(r => r.cells).filter(c => c.component === 'FormInput').map(c => (
                        <div key={c.id} className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                          <Checkbox 
                            checked={(editingCell.props.validateInputIds || []).includes(c.id)} 
                            onChange={(checked) => {
                              const ids = editingCell.props.validateInputIds || [];
                              const newIds = checked ? [...ids, c.id] : ids.filter((id: string) => id !== c.id);
                              updateCellProps(currentScreenId!, editingCell.id, { validateInputIds: newIds });
                            }} 
                          />
                          <div className="flex-1">
                             <p className="text-xs font-bold text-slate-200">{c.props.label || 'Unnamed Input'}</p>
                             <p className="text-[10px] text-slate-600">ID: {c.id.slice(-6)}</p>
                          </div>
                        </div>
                      ))}
                      {currentScreen?.rows.flatMap(r => r.cells).filter(c => c.component === 'FormInput').length === 0 && (
                        <p className="text-[10px] text-slate-600 italic">No inputs found on this screen.</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
            {editingCell.component === 'FormInput' && (
              <>
                <FormInput label="Label" value={editingCell.props.label || ''} onChange={(e) => updateCellProps(currentScreenId!, editingCell.id, { label: e.target.value })} />
                <FormInput label="Placeholder" value={editingCell.props.placeholder || ''} onChange={(e) => updateCellProps(currentScreenId!, editingCell.id, { placeholder: e.target.value })} />
                <Dropdown 
                  label="Variant" 
                  value={editingCell.props.variant || 'text'} 
                  options={[
                    {label:'Text', value:'text'},
                    {label:'Numeric', value:'numeric'},
                    {label:'Alphabet', value:'alphabet'},
                    {label:'Currency', value:'currency'},
                    {label:'Phone', value:'phone'},
                    {label:'Email', value:'email'},
                    {label:'Password', value:'password'}
                  ]} 
                  onChange={(v) => updateCellProps(currentScreenId!, editingCell.id, { variant: v })} 
                />
              </>
            )}
            {editingCell.component === 'Badge' && (
              <>
                <FormInput label="Badge Text" value={editingCell.props.children || ''} onChange={(e) => updateCellProps(currentScreenId!, editingCell.id, { children: e.target.value })} />
                <Dropdown 
                  label="Variant" 
                  value={editingCell.props.variant || 'default'} 
                  options={[
                    {label:'Default', value:'default'},
                    {label:'Primary', value:'primary'},
                    {label:'Secondary', value:'secondary'},
                    {label:'Success', value:'success'},
                    {label:'Warning', value:'warning'},
                    {label:'Error', value:'error'},
                    {label:'Info', value:'info'}
                  ]} 
                  onChange={(v) => updateCellProps(currentScreenId!, editingCell.id, { variant: v })} 
                />
              </>
            )}
            {editingCell.component === 'Dropdown' && (
              <>
                <FormInput label="Label" value={editingCell.props.label || ''} onChange={(e) => updateCellProps(currentScreenId!, editingCell.id, { label: e.target.value })} />
                <Dropdown 
                  label="Variant" 
                  value={editingCell.props.variant || 'default'} 
                  options={[
                    {label:'Default', value:'default'},
                    {label:'Checkbox', value:'checkbox'},
                    {label:'Radio', value:'radio'}
                  ]} 
                  onChange={(v) => updateCellProps(currentScreenId!, editingCell.id, { variant: v })} 
                />
              </>
            )}
            {editingCell.component === 'BadgeSlider' && (
              <>
                <Dropdown 
                  label="Variant" 
                  value={editingCell.props.variant || 'primary'} 
                  options={[
                    {label:'Default', value:'default'},
                    {label:'Primary', value:'primary'},
                    {label:'Secondary', value:'secondary'},
                    {label:'Success', value:'success'},
                    {label:'Warning', value:'warning'},
                    {label:'Error', value:'error'},
                    {label:'Info', value:'info'}
                  ]} 
                  onChange={(v) => updateCellProps(currentScreenId!, editingCell.id, { variant: v })} 
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Badges (Comma separated)</label>
                  <BadgeSliderInput 
                    value={(editingCell.props.badges || []).join(', ')} 
                    onChange={(tags) => updateCellProps(currentScreenId!, editingCell.id, { badges: tags })} 
                  />
                  <p className="text-[10px] text-slate-600 italic">Separate each badge text with a comma.</p>
                </div>
              </>
            )}
            {editingCell.component === 'LocationHeader' && (
              <FormInput label="Location" value={editingCell.props.location || ''} onChange={(e) => updateCellProps(currentScreenId!, editingCell.id, { location: e.target.value })} />
            )}
            {(editingCell.component === 'Label' || editingCell.component === 'Paragraph') && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Content (Rich Text)</label>
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                  <ReactQuill 
                    theme="snow" 
                    value={editingCell.props.html || ''} 
                    onChange={(val) => updateCellProps(currentScreenId!, editingCell.id, { html: val })}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        ['clean']
                      ],
                    }}
                  />
                </div>
              </div>
            )}
            <div className="flex gap-2 justify-end pt-4">
              <Button onClick={() => setEditingCellInfo(null)}>Done</Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default PrototypeFlow;
