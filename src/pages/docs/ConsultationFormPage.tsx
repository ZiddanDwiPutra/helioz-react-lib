import React, { useState } from 'react';
import { FormInput } from '../../components/FormInput';
import { Checkbox } from '../../components/Checkbox';
import { Button } from '../../components/Button';

const ConsultationFormPage: React.FC = () => {
  const [formType, setFormType] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nama: '',
    noRM: '',
    tanggalLahir: '',
    tanggal: '',
    kepadaYth: '',
    bagianRS: '',
    diagnosis: '',
    dataKlinis: '',
    dokterDPJP: '',
    jawabanKonsultasi: '',
    tanggalJawaban: '',
    dokterKonsulen: '',
  });

  const handleCheckbox = (type: string) => {
    setFormType(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    alert(JSON.stringify({ formType, ...formData }, null, 2));
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#020617] min-h-screen shadow-2xl relative overflow-hidden flex flex-col font-sans">
      {/* Background Glow */}
      <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="px-6 pt-10 pb-6 relative z-10">
        <div className="flex items-start gap-4">
          {/* Logo Area */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black text-white tracking-tight">RSKB Bedah SS Medika</h1>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Jl. Salemba I No.11, Jakarta Pusat<br />
              Tlp. (021) 3913336 • www.ssmedika.co.id
            </p>
          </div>
        </div>
      </header>

      {/* Patient Info Card */}
      <div className="px-6 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data Pasien</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Nama Pasien"
              placeholder="Masukkan nama pasien"
              value={formData.nama}
              onChange={handleChange('nama')}
            />
            <FormInput
              label="No. RM"
              variant="numeric"
              placeholder="000000"
              value={formData.noRM}
              onChange={handleChange('noRM')}
            />
          </div>
          <FormInput
            label="Tanggal Lahir"
            placeholder="DD/MM/YYYY"
            value={formData.tanggalLahir}
            onChange={handleChange('tanggalLahir')}
          />
        </div>
      </div>

      {/* Main Form Content */}
      <main className="flex-1 px-6 py-6 space-y-6 relative z-10">
        {/* Form Title */}
        <div className="text-center py-2">
          <h2 className="text-base font-black text-white uppercase tracking-widest">
            Formulir Konsultasi / Rujukan Pasien
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Form Type Checkboxes */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Jenis Formulir</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Checkbox
              variant="card"
              label="Konsultasi"
              checked={formType.includes('konsultasi')}
              onChange={() => handleCheckbox('konsultasi')}
            />
            <Checkbox
              variant="card"
              label="Alih Rawat"
              checked={formType.includes('alih-rawat')}
              onChange={() => handleCheckbox('alih-rawat')}
            />
            <Checkbox
              variant="card"
              label="Rawat Bersama"
              checked={formType.includes('rawat-bersama')}
              onChange={() => handleCheckbox('rawat-bersama')}
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <FormInput
            label="Tanggal"
            placeholder="DD/MM/YYYY"
            value={formData.tanggal}
            onChange={handleChange('tanggal')}
          />
          <FormInput
            label="Kepada Yth"
            placeholder="Nama dokter tujuan"
            value={formData.kepadaYth}
            onChange={handleChange('kepadaYth')}
          />
          <FormInput
            label="Bagian / Rumah Sakit"
            placeholder="Departemen atau rumah sakit tujuan"
            value={formData.bagianRS}
            onChange={handleChange('bagianRS')}
          />
          <FormInput
            label="Diagnosis"
            placeholder="Diagnosis pasien"
            value={formData.diagnosis}
            onChange={handleChange('diagnosis')}
          />
        </div>

        {/* Data Klinis Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h3 className="text-sm font-bold text-white">Data Klinis dan Pemeriksaan Penunjang</h3>
          </div>
          <textarea
            value={formData.dataKlinis}
            onChange={handleChange('dataKlinis')}
            placeholder="Tuliskan data klinis dan hasil pemeriksaan penunjang..."
            rows={6}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm hover:border-slate-700 resize-none"
          />

          {/* Signature DPJP */}
          <div className="flex justify-end pt-4">
            <div className="text-center space-y-2">
              <div className="w-48 border-b border-dashed border-slate-700" />
              <FormInput
                placeholder="Nama Dokter / DPJP"
                value={formData.dokterDPJP}
                onChange={handleChange('dokterDPJP')}
                className="text-center"
              />
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Dokter / DPJP</p>
            </div>
          </div>
        </div>

        {/* Jawaban Konsultasi Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <h3 className="text-sm font-bold text-white">Jawaban Konsultasi / Rujukan</h3>
          </div>
          <textarea
            value={formData.jawabanKonsultasi}
            onChange={handleChange('jawabanKonsultasi')}
            placeholder="Tuliskan jawaban konsultasi atau rujukan..."
            rows={6}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm hover:border-slate-700 resize-none"
          />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4">
            <div className="space-y-2">
              <FormInput
                label="Tanggal"
                placeholder="DD/MM/YYYY"
                value={formData.tanggalJawaban}
                onChange={handleChange('tanggalJawaban')}
              />
            </div>
            <div className="text-center space-y-2">
              <div className="w-48 border-b border-dashed border-slate-700" />
              <FormInput
                placeholder="Nama Dokter Konsulen"
                value={formData.dokterKonsulen}
                onChange={handleChange('dokterKonsulen')}
                className="text-center"
              />
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Dokter / Konsulen</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="flex items-start gap-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4">
          <svg className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-bold text-indigo-400">Catatan:</span> Bila ada hasil rekaman data agar dilampirkan
          </p>
        </div>
      </main>

      {/* Submit Button */}
      <div className="sticky bottom-0 p-6 bg-[#020617]/90 backdrop-blur-md border-t border-slate-800 z-30">
        <Button
          variant="primary"
          size="lg"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-500/30 rounded-2xl py-4 font-black"
          onClick={handleSubmit}
          rightIcon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          }
        >
          Kirim Formulir
        </Button>
      </div>
    </div>
  );
};

export default ConsultationFormPage;
