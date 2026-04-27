import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { temporal } from 'zundo';

export type ComponentType = 
  | 'Button' 
  | 'FormInput' 
  | 'Checkbox' 
  | 'Radio' 
  | 'Dropdown' 
  | 'Badge' 
  | 'BadgeSlider'
  | 'Toggle'
  | 'Label'
  | 'Paragraph'
  | 'LocationHeader'
  | 'SearchBar'
  | 'BottomNav'
  | 'InfoCard'
  | 'ProductCard'
  | 'OrderSummary';

export interface PrototypeCell {
  id: string;
  component: ComponentType | null;
  props: any;
  flex: number;
}

export interface PrototypeRow {
  id: string;
  direction: 'row' | 'col';
  minHeight: number;
  cells: PrototypeCell[];
}

export interface PrototypeScreen {
  id: string;
  name: string;
  rows: PrototypeRow[];
}

export interface PrototypeState {
  screens: PrototypeScreen[];
  currentScreenId: string | null;
  addScreen: (name: string) => void;
  removeScreen: (id: string) => void;
  updateScreenName: (id: string, name: string) => void;
  setCurrentScreen: (id: string | null) => void;
  
  addRow: (screenId: string, direction: 'row' | 'col', cols: number) => void;
  removeRow: (screenId: string, rowId: string) => void;
  updateRowHeight: (screenId: string, rowId: string, height: number) => void;
  addCell: (screenId: string, rowId: string) => void;
  removeCell: (screenId: string, rowId: string, cellId: string) => void;
  
  updateCellComponent: (screenId: string, cellId: string, type: ComponentType) => void;
  updateCellProps: (screenId: string, cellId: string, props: any) => void;
  updateCellFlex: (screenId: string, cellId: string, flex: number) => void;
  
  applyTemplate: (screenId: string, rows: any[]) => void;
  saveAsTemplate: (name: string, desc: string, rows: any[]) => void;
  resetPrototype: () => void;
}

const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

const createCell = (type: ComponentType | null = null): PrototypeCell => ({
  id: generateId('cell'),
  component: type,
  props: {},
  flex: 1,
});

const createRow = (direction: 'row' | 'col' = 'row', cols: number = 1): PrototypeRow => ({
  id: generateId('row'),
  direction,
  minHeight: 50,
  cells: Array.from({ length: cols }, () => createCell()),
});

export const usePrototypeStore = create<PrototypeState>()(
  temporal(
    persist(
      (set) => ({
        screens: [],
        userTemplates: [],
        currentScreenId: null,

        addScreen: (name) => set((state) => {
          const id = `screen-${Date.now()}`;
          const newScreen = { id, name, rows: [createRow('row', 1)] };
          return {
            screens: [...state.screens, newScreen],
            currentScreenId: state.currentScreenId || id,
          };
        }),

        removeScreen: (id) => set((state) => ({
          screens: state.screens.filter((s) => s.id !== id),
          currentScreenId: state.currentScreenId === id ? (state.screens[0]?.id || null) : state.currentScreenId,
        })),

        updateScreenName: (id, name) => set((state) => ({
          screens: state.screens.map((s) => s.id === id ? { ...s, name } : s),
        })),

        setCurrentScreen: (id) => set({ currentScreenId: id }),

        addRow: (screenId, direction, cols) => set((state) => ({
          screens: state.screens.map((s) => 
            s.id === screenId ? { ...s, rows: [...s.rows, createRow(direction, cols)] } : s
          ),
        })),

        removeRow: (screenId, rowId) => set((state) => ({
          screens: state.screens.map((s) => 
            s.id === screenId ? { ...s, rows: s.rows.filter(r => r.id !== rowId) } : s
          ),
        })),

        updateRowHeight: (screenId, rowId, height) => set((state) => ({
          screens: state.screens.map((s) => 
            s.id === screenId ? { 
              ...s, 
              rows: s.rows.map(r => r.id === rowId ? { ...r, minHeight: height } : r)
            } : s
          ),
        })),

        addCell: (screenId, rowId) => set((state) => ({
          screens: state.screens.map((s) => 
            s.id === screenId ? { 
              ...s, 
              rows: s.rows.map(r => r.id === rowId ? { ...r, cells: [...r.cells, createCell()] } : r)
            } : s
          ),
        })),

        removeCell: (screenId, rowId, cellId) => set((state) => ({
          screens: state.screens.map((s) => 
            s.id === screenId ? { 
              ...s, 
              rows: s.rows.map(r => r.id === rowId ? { ...r, cells: r.cells.filter(c => c.id !== cellId) } : r)
            } : s
          ),
        })),

        updateCellComponent: (screenId, cellId, type) => set((state) => ({
          screens: state.screens.map((s) => 
            s.id === screenId ? { 
              ...s, 
              rows: s.rows.map(r => ({
                ...r,
                cells: r.cells.map(c => c.id === cellId ? { ...c, component: type, props: {} } : c)
              }))
            } : s
          ),
        })),

        updateCellProps: (screenId, cellId, props) => set((state) => ({
          screens: state.screens.map((s) => 
            s.id === screenId ? { 
              ...s, 
              rows: s.rows.map(r => ({
                ...r,
                cells: r.cells.map(c => c.id === cellId ? { ...c, props: { ...c.props, ...props } } : c)
              }))
            } : s
          ),
        })),

        updateCellFlex: (screenId, cellId, flex) => set((state) => ({
          screens: state.screens.map((s) => 
            s.id === screenId ? { 
              ...s, 
              rows: s.rows.map(r => ({
                ...r,
                cells: r.cells.map(c => c.id === cellId ? { ...c, flex } : c)
              }))
            } : s
          ),
        })),
        
        applyTemplate: (screenId, templateRows) => set((state) => {
          // Helper to recursively regenerate IDs for template rows/cells
          const processedRows = templateRows.map(row => ({
            ...row,
            id: generateId('row'),
            cells: row.cells.map((cell: any) => ({
              ...cell,
              id: generateId('cell')
            }))
          }));

          return {
            screens: state.screens.map((s) => 
              s.id === screenId ? { ...s, rows: processedRows } : s
            ),
          };
        }),

        saveAsTemplate: (name, desc, rows) => set((state) => ({
          userTemplates: [
            ...state.userTemplates,
            { id: generateId('template'), name, desc, rows }
          ]
        })),

        resetPrototype: () => set({ screens: [], currentScreenId: null }),
      }),
      {
        name: 'helioz-prototype-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
