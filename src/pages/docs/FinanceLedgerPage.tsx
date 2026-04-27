import React, { useState } from 'react';
import { FormInput } from '../../components/FormInput';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Toggle } from '../../components/Toggle';
import { Dropdown } from '../../components/Dropdown';
import { Dialog } from '../../components/Dialog';

type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
};

const CATEGORIES = [
  { label: 'Gaji', value: 'gaji' },
  { label: 'Makan & Minum', value: 'makan' },
  { label: 'Transport', value: 'transport' },
  { label: 'Belanja', value: 'belanja' },
  { label: 'Hiburan', value: 'hiburan' },
  { label: 'Investasi', value: 'investasi' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Lainnya', value: 'lainnya' },
];

const CATEGORY_BADGE: Record<string, { variant: 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'default'; icon: React.ReactNode }> = {
  gaji: { variant: 'success', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  makan: { variant: 'warning', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg> },
  transport: { variant: 'info', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  belanja: { variant: 'purple', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  hiburan: { variant: 'danger', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  investasi: { variant: 'success', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
  freelance: { variant: 'info', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  lainnya: { variant: 'default', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg> },
};

const INITIAL_DATA: Transaction[] = [
  { id: '1', title: 'Gaji Bulanan', amount: 12000000, type: 'income', category: 'gaji', date: '2026-04-01' },
  { id: '2', title: 'Project Website', amount: 3500000, type: 'income', category: 'freelance', date: '2026-04-05' },
  { id: '3', title: 'Makan Siang', amount: 45000, type: 'expense', category: 'makan', date: '2026-04-10' },
  { id: '4', title: 'Grab ke Kantor', amount: 25000, type: 'expense', category: 'transport', date: '2026-04-10' },
  { id: '5', title: 'Netflix', amount: 54000, type: 'expense', category: 'hiburan', date: '2026-04-12' },
  { id: '6', title: 'Belanja Bulanan', amount: 850000, type: 'expense', category: 'belanja', date: '2026-04-15' },
  { id: '7', title: 'Reksadana', amount: 1000000, type: 'expense', category: 'investasi', date: '2026-04-18' },
];

const formatCurrency = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const FinanceLedgerPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [newTx, setNewTx] = useState({ title: '', amount: '', category: 'lainnya', type: false }); // type false = expense, true = income

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const filtered = transactions.filter(t => filter === 'all' || t.type === filter);

  const handleAdd = () => {
    if (!newTx.title || !newTx.amount) return;
    const tx: Transaction = {
      id: Date.now().toString(),
      title: newTx.title,
      amount: parseInt(newTx.amount.replace(/[^0-9]/g, '')) || 0,
      type: newTx.type ? 'income' : 'expense',
      category: newTx.category,
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [tx, ...prev]);
    setNewTx({ title: '', amount: '', category: 'lainnya', type: false });
    setShowAddDialog(false);
  };

  const handleDelete = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#020617] min-h-screen shadow-2xl relative overflow-hidden flex flex-col font-sans">
      {/* Background Glow */}
      <div className="absolute top-[-60px] left-[-60px] w-[200px] h-[200px] bg-emerald-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[200px] h-[200px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="px-6 pt-10 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">Catatan Keuangan</h1>
            <p className="text-xs text-slate-500 mt-1">April 2026</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20"
            onClick={() => setShowAddDialog(true)}
            leftIcon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            }
          >
            Tambah
          </Button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="px-4 pb-2 relative z-10">
        <div className="grid grid-cols-3 gap-2">
          {/* Income */}
          <button onClick={() => setFilter(f => f === 'income' ? 'all' : 'income')} className={`rounded-2xl p-3 border transition-all cursor-pointer text-left ${filter === 'income' ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}>
            <div className="flex items-center gap-1 mb-1">
              <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Pemasukan</span>
            </div>
            <p className="text-[11px] font-black text-emerald-400 truncate">{formatCurrency(totalIncome)}</p>
          </button>
          {/* Expense */}
          <button onClick={() => setFilter(f => f === 'expense' ? 'all' : 'expense')} className={`rounded-2xl p-3 border transition-all cursor-pointer text-left ${filter === 'expense' ? 'bg-red-500/10 border-red-500/30 ring-1 ring-red-500/20' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}>
            <div className="flex items-center gap-1 mb-1">
              <svg className="w-3 h-3 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/></svg>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Pengeluaran</span>
            </div>
            <p className="text-[11px] font-black text-red-400 truncate">{formatCurrency(totalExpense)}</p>
          </button>
          {/* Balance */}
          <div className={`rounded-2xl p-3 border ${balance >= 0 ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
            <div className="flex items-center gap-1 mb-1">
              <svg className="w-3 h-3 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Saldo</span>
            </div>
            <p className={`text-[11px] font-black truncate ${balance >= 0 ? 'text-indigo-400' : 'text-red-400'}`}>{formatCurrency(balance)}</p>
          </div>
        </div>
      </div>

      {/* Filter Indicator */}
      {filter !== 'all' && (
        <div className="px-6 pt-3 relative z-10">
          <Badge
            variant={filter === 'income' ? 'success' : 'danger'}
            size="md"
            removable
            onRemove={() => setFilter('all')}
          >
            Filter: {filter === 'income' ? 'Pemasukan' : 'Pengeluaran'}
          </Badge>
        </div>
      )}

      {/* Transaction List */}
      <main className="flex-1 px-6 py-6 space-y-3 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-slate-300">Riwayat Transaksi</h2>
          <span className="text-xs text-slate-500">{filtered.length} transaksi</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-slate-700 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            <p className="text-slate-500 text-sm">Belum ada transaksi</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((tx) => {
              const cat = CATEGORY_BADGE[tx.category] || CATEGORY_BADGE.lainnya;
              return (
                <div key={tx.id} className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {tx.type === 'income' ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 11 12 6 7 11"/><line x1="12" y1="6" x2="12" y2="18"/></svg>
                        ) : (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 13 12 18 17 13"/><line x1="12" y1="18" x2="12" y2="6"/></svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-100 truncate">{tx.title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge variant={cat.variant} icon={cat.icon}>
                            {CATEGORIES.find(c => c.value === tx.category)?.label}
                          </Badge>
                          <span className="text-[10px] text-slate-600">{tx.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-sm font-black tabular-nums ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </span>
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Add Transaction Dialog */}
      <Dialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        title="Tambah Transaksi"
      >
        <div className="space-y-5">
          <Toggle
            checked={newTx.type}
            onChange={(v) => setNewTx(prev => ({ ...prev, type: v }))}
            label={newTx.type ? 'Pemasukan' : 'Pengeluaran'}
            description={newTx.type ? 'Uang yang masuk' : 'Uang yang keluar'}
          />

          <FormInput
            label="Keterangan"
            placeholder="Contoh: Gaji Bulanan"
            value={newTx.title}
            onChange={(e) => setNewTx(prev => ({ ...prev, title: e.target.value }))}
          />

          <FormInput
            label="Jumlah (Rp)"
            variant="currency"
            placeholder="Rp 0"
            value={newTx.amount}
            onChange={(e) => setNewTx(prev => ({ ...prev, amount: e.target.value }))}
          />

          <Dropdown
            label="Kategori"
            options={CATEGORIES}
            value={newTx.category}
            onChange={(v) => setNewTx(prev => ({ ...prev, category: v as string }))}
            placeholder="Pilih kategori"
          />

          <div className="flex gap-3 pt-2">
            <Button
              variant="ghost"
              size="md"
              className="flex-1 text-slate-400"
              onClick={() => setShowAddDialog(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1 bg-indigo-600 hover:bg-indigo-500"
              onClick={handleAdd}
              rightIcon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              }
            >
              Simpan
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default FinanceLedgerPage;
