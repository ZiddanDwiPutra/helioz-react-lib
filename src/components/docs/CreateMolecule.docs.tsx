/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/static-components */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { FormInput } from '../FormInput';
import { Accordion } from '../Accordion';
import { Dialog } from '../Dialog';

type ComponentType = 'Button' | 'FormInput' | 'Accordion';
type ContainerDir = 'row' | 'col';
type ViewMode = 'editor' | 'code' | 'preview';

interface GridCell {
  id: string;
  component: ComponentType | null;
  props: any;
  colSpan: number;
  vAlign?: 'start' | 'center' | 'end' | 'stretch';
  hAlign?: 'start' | 'center' | 'end' | 'stretch';
}

interface ContainerRow {
  id: string;
  direction: ContainerDir;
  cells: GridCell[];
}

const COMPONENT_LIST: { type: ComponentType; label: string; desc: string; icon: string }[] = [
  { type: 'Button', label: 'Button', desc: 'Primary, Secondary, Ghost...', icon: '▣' },
  { type: 'FormInput', label: 'FormInput', desc: 'Numeric, Currency, Phone...', icon: '▤' },
  { type: 'Accordion', label: 'Accordion', desc: 'Expandable segments', icon: '▥' },
];

const ROW_OPTIONS: { dir: ContainerDir; cols: number; label: string; icon: string }[] = [
  { dir: 'row', cols: 1, label: 'Row × 1', icon: '[ ]' },
  { dir: 'row', cols: 2, label: 'Row × 2', icon: '[ | ]' },
  { dir: 'row', cols: 3, label: 'Row × 3', icon: '[ | | ]' },
  { dir: 'row', cols: 4, label: 'Row × 4', icon: '[ ||| ]' },
  { dir: 'col', cols: 1, label: 'Col × 1', icon: '━' },
  { dir: 'col', cols: 2, label: 'Col × 2', icon: '═' },
  { dir: 'col', cols: 3, label: 'Col × 3', icon: '≡' },
];

const DEFAULT_PROPS: Record<ComponentType, any> = {
  Button: { children: 'Button', variant: 'primary', size: 'md' },
  FormInput: { label: 'Label', placeholder: 'Enter text...', variant: 'text' },
  Accordion: { items: [{ id: '1', title: 'Item 1', content: 'Content here' }], allowMultiple: false },
};

const makeCell = (type: ComponentType | null = null): GridCell => {
  const id = `cell-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return { id, component: type, props: type ? { ...DEFAULT_PROPS[type] } : {}, colSpan: 1, vAlign: 'center', hAlign: 'center' };
};

const V_ALIGN_MAP: Record<string, string> = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' };
const H_ALIGN_MAP: Record<string, string> = { start: 'justify-start', center: 'justify-center', end: 'justify-end', stretch: 'justify-stretch' };

const makeRow = (dir: ContainerDir = 'row', cols = 2): ContainerRow => ({
  id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  direction: dir,
  cells: Array.from({ length: cols }, () => makeCell()),
});

const RenderComponent: React.FC<{ type: ComponentType; props: any }> = ({ type, props }) => {
  if (type === 'Button') {
    const { children, ...rest } = props;
    return <Button {...rest}>{children}</Button>;
  }
  if (type === 'FormInput') {
    const { label, variant, placeholder, error, helperText, ...rest } = props;
    return <FormInput label={label} variant={variant} placeholder={placeholder} error={error} helperText={helperText} />;
  }
  if (type === 'Accordion') return <Accordion {...props} />;
  return null;
};

/* ─── Props Editor Dialog ─── */
const PropsEditor: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cell: GridCell | null;
  onSave: (cellId: string, updates: Partial<GridCell>) => void;
}> = ({ isOpen, onClose, cell, onSave }) => {
  const [editProps, setEditProps] = useState<any>({});
  const [vAlign, setVAlign] = useState<string>('center');
  const [hAlign, setHAlign] = useState<string>('center');

  React.useEffect(() => {
    if (cell) {
      setEditProps({ ...cell.props });
      setVAlign(cell.vAlign || 'center');
      setHAlign(cell.hAlign || 'center');
    }
  }, [cell]);

  if (!cell || !cell.component) return null;

  const update = (key: string, value: any) => setEditProps((p: any) => ({ ...p, [key]: value }));

  const handleSave = () => { onSave(cell.id, { props: editProps, vAlign: vAlign as any, hAlign: hAlign as any }); onClose(); };

  const SelectField = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-400">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => (
          <button key={opt} onClick={() => onChange(opt)} className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${value === opt ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const TextField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-400">{label}</label>
      <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200" />
    </div>
  );

  const ToggleField = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between">
      <label className="text-xs font-semibold text-slate-400">{label}</label>
      <button onClick={() => onChange(!value)} className={`w-10 h-5 rounded-full transition-colors relative ${value ? 'bg-indigo-600' : 'bg-slate-800'}`}>
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${value ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-5 bg-indigo-500 rounded-full" />
        <span className="text-base">Edit {cell.component}</span>
      </div>
    } footer={
      <div className="flex gap-2 w-full justify-end">
        <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button size="sm" onClick={handleSave}>Apply Changes</Button>
      </div>
    }>
      <div className="space-y-5 py-2">
        {/* ─── Button Props ─── */}
        {cell.component === 'Button' && (
          <>
            <TextField label="Text" value={editProps.children} onChange={v => update('children', v)} placeholder="Button label" />
            <SelectField label="Variant" value={editProps.variant} options={['primary', 'secondary', 'outline', 'ghost']} onChange={v => update('variant', v)} />
            <SelectField label="Size" value={editProps.size} options={['sm', 'md', 'lg']} onChange={v => update('size', v)} />
          </>
        )}

        {/* ─── FormInput Props ─── */}
        {cell.component === 'FormInput' && (
          <>
            <TextField label="Label" value={editProps.label} onChange={v => update('label', v)} placeholder="Input label" />
            <TextField label="Placeholder" value={editProps.placeholder} onChange={v => update('placeholder', v)} placeholder="Placeholder text" />
            <SelectField label="Variant" value={editProps.variant} options={['text', 'numeric', 'alphabet', 'currency', 'phone', 'email', 'password']} onChange={v => update('variant', v)} />
            <TextField label="Error Message" value={editProps.error} onChange={v => update('error', v)} placeholder="Leave empty for no error" />
            <TextField label="Helper Text" value={editProps.helperText} onChange={v => update('helperText', v)} placeholder="Helper text below input" />
          </>
        )}

        {/* ─── Accordion Props ─── */}
        {cell.component === 'Accordion' && (
          <>
            <ToggleField label="Allow Multiple Open" value={editProps.allowMultiple || false} onChange={v => update('allowMultiple', v)} />
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Items</label>
              <div className="space-y-2">
                {(editProps.items || []).map((item: any, idx: number) => (
                  <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-600 font-bold uppercase">Item {idx + 1}</span>
                      {editProps.items.length > 1 && (
                        <button onClick={() => update('items', editProps.items.filter((_: any, i: number) => i !== idx))} className="text-[10px] text-red-400 hover:text-red-300">Remove</button>
                      )}
                    </div>
                    <input value={item.title} onChange={e => { const newItems = [...editProps.items]; newItems[idx] = { ...item, title: e.target.value }; update('items', newItems); }} placeholder="Title" className="w-full bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200" />
                    <input value={item.content} onChange={e => { const newItems = [...editProps.items]; newItems[idx] = { ...item, content: e.target.value }; update('items', newItems); }} placeholder="Content" className="w-full bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200" />
                  </div>
                ))}
              </div>
              <button onClick={() => update('items', [...(editProps.items || []), { id: `${Date.now()}`, title: 'New Item', content: 'New content' }])} className="w-full text-xs py-1.5 border border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors mt-1">+ Add Item</button>
            </div>
          </>
        )}

        {/* ─── Cell Layout ─── */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">Cell Layout</label>
          <SelectField label="Horizontal Align" value={hAlign} options={['start', 'center', 'end', 'stretch']} onChange={setHAlign} />
          <SelectField label="Vertical Align" value={vAlign} options={['start', 'center', 'end', 'stretch']} onChange={setVAlign} />
        </div>

        {/* Live Preview */}
        <div className="pt-4 border-t border-slate-800">
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">Component Preview</label>
          <div className="bg-[#020617] rounded-xl border border-slate-800 p-6 flex items-center justify-center min-h-[80px]">
            <RenderComponent type={cell.component} props={editProps} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

/* ─── Cell ─── */
const CellView: React.FC<{
  cell: GridCell;
  onDrop: (cellId: string, compType: ComponentType) => void;
  onRemove: (cellId: string) => void;
  onResize: (cellId: string, delta: number) => void;
  onEdit: (cell: GridCell) => void;
}> = ({ cell, onDrop, onRemove, onResize, onEdit }) => {
  const [over, setOver] = useState(false);
  const resizeRef = useRef<{ startX: number } | null>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setOver(true); };
  const handleDragLeave = () => setOver(false);
  const handleDropEvt = (e: React.DragEvent) => {
    e.preventDefault(); setOver(false);
    const compType = e.dataTransfer.getData('component-type') as ComponentType;
    if (compType) onDrop(cell.id, compType);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    resizeRef.current = { startX: e.clientX };
    const move = (me: MouseEvent) => {
      if (!resizeRef.current) return;
      const diff = me.clientX - resizeRef.current.startX;
      const step = Math.round(diff / 100);
      if (step !== 0) { onResize(cell.id, step); resizeRef.current.startX = me.clientX; }
    };
    const up = () => { resizeRef.current = null; window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropEvt}
      onClick={() => { if (cell.component) onEdit(cell); }}
      style={{ flex: `${cell.colSpan} 1 0%` }}
      className={`relative group/cell min-h-[60px] rounded-lg border-2 border-dashed transition-all duration-150 flex ${V_ALIGN_MAP[cell.vAlign || 'center']} ${H_ALIGN_MAP[cell.hAlign || 'center']} p-3 ${
        cell.component ? 'cursor-pointer' : ''
      } ${
        over ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]' : cell.component ? 'border-slate-700/60 bg-slate-900/40 hover:border-indigo-500/40' : 'border-slate-800/60 bg-slate-950/30 hover:border-slate-700'
      }`}
    >
      {cell.component ? (
        <>
          <div className={`pointer-events-none ${cell.hAlign === 'stretch' ? 'w-full' : ''}`}><RenderComponent type={cell.component} props={cell.props} /></div>
          {/* Edit badge */}
          <div className="absolute top-1 left-1.5 opacity-0 group-hover/cell:opacity-100 transition-opacity z-20">
            <span className="text-[8px] font-bold bg-indigo-600/80 text-white px-1.5 py-px rounded-full">✏ Edit</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onRemove(cell.id); }} className="absolute -right-1.5 -top-1.5 w-5 h-5 bg-red-500/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity z-20 shadow text-[9px] hover:scale-110">✕</button>
          <div onMouseDown={handleResizeMouseDown} className="absolute right-0 top-0 bottom-0 w-1.5 cursor-ew-resize opacity-0 group-hover/cell:opacity-100 flex items-center justify-center z-10"><div className="w-px h-6 bg-indigo-500/50 rounded-full" /></div>
        </>
      ) : (
        <span className="text-slate-700 text-[10px] font-medium pointer-events-none select-none">Drop</span>
      )}
    </div>
  );
};

/* ─── Preview Panel ─── */
const PreviewPanel: React.FC<{ rows: ContainerRow[] }> = ({ rows }) => (
  <div className="h-full flex items-start justify-center p-8 overflow-auto">
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-3">
      {rows.map(row => (
        <div key={row.id} className={`flex gap-3 ${row.direction === 'row' ? 'flex-row' : 'flex-col'}`}>
          {row.cells.map(cell => (
            <div key={cell.id} className={`flex ${V_ALIGN_MAP[cell.vAlign || 'center']} ${H_ALIGN_MAP[cell.hAlign || 'center']}`} style={{ flex: `${cell.colSpan} 1 0%` }}>
              {cell.component ? <RenderComponent type={cell.component} props={cell.props} /> : <div className="h-10 w-full rounded-lg bg-slate-800/30 border border-dashed border-slate-800" />}
            </div>
          ))}
        </div>
      ))}
      {rows.length === 0 && <p className="text-center text-slate-600 text-sm py-12">Nothing to preview yet.</p>}
    </div>
  </div>
);

/* ─── LocalStorage ─── */
const STORAGE_KEY = 'helioz-create-molecule';

interface SavedState {
  rows: ContainerRow[];
  moleculeName: string;
  viewMode: ViewMode;
}

const loadState = (): Partial<SavedState> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore corrupt data */ }
  return {};
};

const saveState = (state: SavedState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore quota errors */ }
};

/* ─── Main ─── */
const CreateMolecule: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ContainerRow[]>(() => {
    const saved = loadState();
    return saved.rows && saved.rows.length > 0 ? saved.rows : [makeRow('row', 2)];
  });
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = loadState();
    return saved.viewMode || 'editor';
  });
  const [moleculeName, setMoleculeName] = useState(() => {
    const saved = loadState();
    return saved.moleculeName || 'MyMolecule';
  });
  const [copied, setCopied] = useState(false);
  const [editingCell, setEditingCell] = useState<GridCell | null>(null);

  // Persist all state changes to localStorage
  useEffect(() => {
    saveState({ rows, moleculeName, viewMode });
  }, [rows, moleculeName, viewMode]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRows([makeRow('row', 2)]);
    setMoleculeName('MyMolecule');
    setViewMode('editor');
    setEditingCell(null);
  }, []);

  const handleDropToCell = useCallback((cellId: string, compType: ComponentType) => {
    setRows(prev => prev.map(row => ({ ...row, cells: row.cells.map(c => c.id === cellId ? { ...makeCell(compType), id: c.id, colSpan: c.colSpan } : c) })));
  }, []);

  const handleRemoveFromCell = useCallback((cellId: string) => {
    setRows(prev => prev.map(row => ({ ...row, cells: row.cells.map(c => c.id === cellId ? { ...c, component: null, props: {} } : c) })));
  }, []);

  const handleResize = useCallback((cellId: string, delta: number) => {
    setRows(prev => prev.map(row => ({ ...row, cells: row.cells.map(c => c.id === cellId ? { ...c, colSpan: Math.max(1, Math.min(6, c.colSpan + delta)) } : c) })));
  }, []);

  const handleSaveProps = useCallback((cellId: string, updates: Partial<GridCell>) => {
    setRows(prev => prev.map(row => ({ ...row, cells: row.cells.map(c => c.id === cellId ? { ...c, ...updates } : c) })));
  }, []);

  const addRow = (dir: ContainerDir, cols: number) => setRows(prev => [...prev, makeRow(dir, cols)]);
  const removeRow = (rowId: string) => setRows(prev => prev.filter(r => r.id !== rowId));
  const addCellToRow = (rowId: string) => setRows(prev => prev.map(r => r.id === rowId ? { ...r, cells: [...r.cells, makeCell()] } : r));

  const generateCode = () => {
    const usedTypes = new Set<string>();
    rows.forEach(r => r.cells.forEach(c => { if (c.component) usedTypes.add(c.component); }));
    const imports = Array.from(usedTypes);
    const renderCell = (c: GridCell) => {
      if (!c.component) return `{/* Empty */}`;
      if (c.component === 'Button') return `<Button variant="${c.props.variant}" size="${c.props.size}">${c.props.children}</Button>`;
      if (c.component === 'FormInput') {
        const extras = [
          c.props.error ? ` error="${c.props.error}"` : '',
          c.props.helperText ? ` helperText="${c.props.helperText}"` : '',
        ].join('');
        return `<FormInput variant="${c.props.variant}" label="${c.props.label}" placeholder="${c.props.placeholder}"${extras} />`;
      }
      if (c.component === 'Accordion') return `<Accordion items={${JSON.stringify(c.props.items)}}${c.props.allowMultiple ? ' allowMultiple' : ''} />`;
      return '';
    };
    const rowsCode = rows.map(r => {
      const dir = r.direction === 'row' ? 'flex flex-row' : 'flex flex-col';
      const cells = r.cells.map(c => `        <div className="flex-${c.colSpan} flex ${V_ALIGN_MAP[c.vAlign || 'center']} ${H_ALIGN_MAP[c.hAlign || 'center']}">\n          ${renderCell(c)}\n        </div>`).join('\n');
      return `      <div className="${dir} gap-3">\n${cells}\n      </div>`;
    }).join('\n');

    return `import React from 'react';
import { ${imports.join(', ')} } from 'helioz-react-lib';

export const ${moleculeName} = () => {
  return (
    <div className="flex flex-col gap-3 p-6 border border-slate-800 rounded-2xl bg-slate-900">
${rowsCode}
    </div>
  );
};

export default ${moleculeName};`;
  };

  const handleDownload = () => {
    const el = document.createElement('a');
    el.href = URL.createObjectURL(new Blob([generateCode()], { type: 'text/plain' }));
    el.download = `${moleculeName}.tsx`;
    document.body.appendChild(el); el.click(); document.body.removeChild(el);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="dark min-h-screen bg-[#020617] text-slate-50 font-sans flex flex-col">
      {/* Top bar */}
      <div className="h-12 border-b border-slate-800 px-3 flex items-center justify-between bg-[#020617]/90 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/docs/introduction')} className="text-slate-500 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <span className="text-xs font-bold tracking-tight"><span className="text-indigo-500">Helioz</span> Builder</span>
        </div>

        <div className="flex items-center gap-1">
          <input value={moleculeName} onChange={e => setMoleculeName(e.target.value)} className="bg-slate-900 text-xs rounded-md px-2 py-1 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36 text-center font-mono" />
          <div className="flex bg-slate-900 border border-slate-800 rounded-md p-0.5 mx-1">
            {(['editor', 'preview', 'code'] as ViewMode[]).map(m => (
              <button key={m} onClick={() => setViewMode(m)} className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${viewMode === m ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                {m === 'editor' ? '✏ Editor' : m === 'preview' ? '👁 Preview' : '</> Code'}
              </button>
            ))}
          </div>
          <button onClick={handleCopy} className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button onClick={handleDownload} className="px-2 py-1 text-[10px] font-bold bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors">↓ .tsx</button>
          <button onClick={handleReset} className="px-2 py-1 text-[10px] font-bold bg-red-950/30 border border-red-900/50 text-red-400 rounded-md hover:bg-red-900/40 transition-colors">Reset</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Tool Panel */}
        {viewMode === 'editor' && (
          <div className="w-48 border-r border-slate-800 p-3 overflow-y-auto space-y-3 shrink-0 animate-in slide-in-from-left-4 duration-200">
            <h3 className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Drag & Drop</h3>
            {COMPONENT_LIST.map(comp => (
              <div key={comp.type} draggable
                onDragStart={e => e.dataTransfer.setData('component-type', comp.type)}
                className="px-2.5 py-2 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-lg cursor-grab active:cursor-grabbing transition-all hover:translate-x-0.5 select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400 text-xs">{comp.icon}</span>
                  <span className="font-semibold text-xs text-slate-200">{comp.label}</span>
                </div>
                <div className="text-[9px] text-slate-600 mt-0.5 ml-5">{comp.desc}</div>
              </div>
            ))}

            <div className="pt-3 border-t border-slate-800 space-y-1.5">
              <h3 className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Containers</h3>
              {ROW_OPTIONS.map((opt, i) => (
                <button key={i} onClick={() => addRow(opt.dir, opt.cols)} className="w-full text-left text-[10px] px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-lg transition-all flex items-center gap-2">
                  <span className="text-indigo-400/70 font-mono text-[9px] w-10 text-center">{opt.icon}</span>
                  <span className="text-slate-400 font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Area */}
        <div className="flex-1 overflow-auto">
          {viewMode === 'code' ? (
            <div className="relative group h-full animate-in fade-in duration-200">
              <pre className="bg-[#0a0c14] text-slate-300 p-6 font-mono text-[12px] leading-relaxed overflow-auto h-full">{generateCode()}</pre>
            </div>
          ) : viewMode === 'preview' ? (
            <div className="animate-in fade-in duration-200 h-full"><PreviewPanel rows={rows} /></div>
          ) : (
            <div className="p-3 space-y-2 animate-in fade-in duration-200">
              {rows.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[70vh] text-slate-700">
                  <svg className="w-14 h-14 mb-4 opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  <p className="text-xs font-medium">Add a container from the left panel</p>
                </div>
              )}

              {rows.map(row => (
                <div key={row.id} className="group/row relative bg-slate-950/40 border border-slate-800/60 rounded-xl p-2.5">
                  <div className="absolute -top-2.5 left-3 flex gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity z-20">
                    <span className="text-[8px] font-bold uppercase tracking-widest bg-slate-800/90 text-slate-500 px-1.5 py-px rounded-full">
                      {row.direction === 'row' ? `Row × ${row.cells.length}` : `Col × ${row.cells.length}`}
                    </span>
                  </div>
                  <div className="absolute -top-2.5 right-3 flex gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity z-20">
                    <button onClick={() => addCellToRow(row.id)} className="text-[8px] font-bold bg-indigo-600/90 text-white px-1.5 py-px rounded-full hover:bg-indigo-500 transition-colors">+ Cell</button>
                    <button onClick={() => removeRow(row.id)} className="text-[8px] font-bold bg-red-500/70 text-white px-1.5 py-px rounded-full hover:bg-red-500 transition-colors">Remove</button>
                  </div>

                  <div className={`flex gap-2 ${row.direction === 'row' ? 'flex-row' : 'flex-col'}`}>
                    {row.cells.map(cell => (
                      <CellView key={cell.id} cell={cell} onDrop={handleDropToCell} onRemove={handleRemoveFromCell} onResize={handleResize} onEdit={setEditingCell} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Props Editor Dialog */}
      <PropsEditor
        isOpen={!!editingCell}
        onClose={() => setEditingCell(null)}
        cell={editingCell}
        onSave={handleSaveProps}
      />
    </div>
  );
};

export default CreateMolecule;
