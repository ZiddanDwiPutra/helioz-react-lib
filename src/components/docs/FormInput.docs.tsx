import React, { useState } from 'react';
import { FormInput } from '../FormInput';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const PreviewBox = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 flex flex-col items-center justify-center p-12 bg-[#020617] rounded-xl border border-slate-800 min-h-[200px] shadow-sm relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    <div className="w-full max-w-sm relative z-10 space-y-4">
      {children}
    </div>
  </div>
);

const FormInputDocs: React.FC = () => {
  const [values, setValues] = useState({
    numeric: '',
    alphabet: '',
    currency: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (key: string) => (e: any) => {
    setValues(prev => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">FormInput</h1>
        <p className="text-lg text-slate-400">A robust input component with built-in formatting and validation variants.</p>
      </div>

      <section className="space-y-16">
        {/* Numeric */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Numeric Only</h2>
          <p className="text-slate-400 text-sm mb-6">Restricts input to numbers only.</p>
          <PreviewBox>
            <FormInput 
              label="Age" 
              variant="numeric" 
              placeholder="Enter your age" 
              value={values.numeric} 
              onChange={handleChange('numeric')} 
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput variant="numeric" placeholder="Enter your age" label="Age" />`} />
        </div>

        {/* Alphabet */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Alphabet Only</h2>
          <p className="text-slate-400 text-sm mb-6">Restricts input to letters and spaces only.</p>
          <PreviewBox>
            <FormInput 
              label="Full Name" 
              variant="alphabet" 
              placeholder="Enter your name" 
              value={values.alphabet} 
              onChange={handleChange('alphabet')} 
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput variant="alphabet" placeholder="Enter your name" label="Full Name" />`} />
        </div>

        {/* Currency */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Currency (Rupiah)</h2>
          <p className="text-slate-400 text-sm mb-6">Automatically formats numeric input into IDR currency format.</p>
          <PreviewBox>
            <FormInput 
              label="Price" 
              variant="currency" 
              placeholder="Rp 0" 
              value={values.currency} 
              onChange={handleChange('currency')} 
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput variant="currency" placeholder="Rp 0" label="Price" />`} />
        </div>

        {/* Phone */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Phone Number</h2>
          <p className="text-slate-400 text-sm mb-6">Restricts input to numbers and the plus (+) sign.</p>
          <PreviewBox>
            <FormInput 
              label="Phone Number" 
              variant="phone" 
              placeholder="+62" 
              value={values.phone} 
              onChange={handleChange('phone')} 
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput variant="phone" placeholder="+62" label="Phone Number" />`} />
        </div>

        {/* Email */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-slate-400 text-sm mb-6">Standard email input type with validation support.</p>
          <PreviewBox>
            <FormInput 
              label="Email Address" 
              variant="email" 
              placeholder="example@mail.com" 
              value={values.email} 
              onChange={handleChange('email')} 
              error={values.email && !values.email.includes('@') ? 'Invalid email address' : ''}
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput variant="email" placeholder="example@mail.com" label="Email" />`} />
        </div>

        {/* Password */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Password</h2>
          <p className="text-slate-400 text-sm mb-6">Masked input with a toggle to reveal current password.</p>
          <PreviewBox>
            <FormInput 
              label="Account Password" 
              variant="password" 
              placeholder="Min. 8 characters" 
              value={values.password} 
              onChange={handleChange('password')} 
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput variant="password" placeholder="Min. 8 characters" label="Password" />`} />
        </div>

        {/* No Label */}
        <div>
          <h2 className="text-xl font-semibold mb-2">No Label</h2>
          <p className="text-slate-400 text-sm mb-6">The label is optional. Useful for compact layouts.</p>
          <PreviewBox>
            <FormInput 
              placeholder="Search or type here..." 
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput placeholder="Search or type here..." />`} />
        </div>

        {/* Validation & Error */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Validation & Error</h2>
          <p className="text-slate-400 text-sm mb-6">Display error messages and highlight the input when validation fails.</p>
          <PreviewBox>
            <FormInput 
              label="Username"
              placeholder="JohnDoe"
              error="Username is already taken"
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput \n  label="Username" \n  placeholder="JohnDoe" \n  error="Username is already taken" \n/>`} />
        </div>

        {/* Helper Text */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Helper Text</h2>
          <p className="text-slate-400 text-sm mb-6">Add additional context or instructions below the input field.</p>
          <PreviewBox>
            <FormInput 
              label="New Password"
              placeholder="••••••••"
              variant="password"
              helperText="Must be at least 8 characters long."
            />
          </PreviewBox>
          <CodeBlock code={`<FormInput \n  label="New Password" \n  placeholder="••••••••" \n  variant="password" \n  helperText="Must be at least 8 characters long." \n/>`} />
        </div>
      </section>

      <div className="mt-20 pt-10 border-t border-slate-800 flex justify-between items-center text-sm text-slate-500">
        <a href="/docs/components/dialog" className="hover:text-slate-300 transition-colors">← Dialog</a>
        <span className="text-slate-700">Select →</span>
      </div>
    </div>
  );
};

export default FormInputDocs;
