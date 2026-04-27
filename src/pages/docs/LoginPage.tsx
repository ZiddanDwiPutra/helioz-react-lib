import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { Checkbox } from '../../components/Checkbox';

const PreviewBox = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`mt-4 flex items-center justify-center bg-[#020617] rounded-xl border border-slate-800 min-h-[500px] shadow-sm relative overflow-hidden p-6 ${className}`}>
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    {children}
  </div>
);

const LoginPageVariant1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto relative z-10 p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
        <p className="text-slate-400 text-sm mt-2">Sign in to your account to continue</p>
      </div>

      <div className="space-y-5">
        <FormInput 
          label="Email Address" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />
        <FormInput 
          label="Password" 
          type="password" 
          variant="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        
        <div className="flex items-center justify-between mt-4">
          <Checkbox 
            label="Remember me" 
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Forgot password?
          </a>
        </div>

        <Button className="w-full mt-6" variant="primary" size="lg">
          Sign in
        </Button>

        <p className="text-center text-sm text-slate-400 mt-8">
          Don't have an account? <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign up</a>
        </p>
      </div>
    </div>
  );
};

const LoginPageVariant2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto h-full min-h-[600px] flex rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative z-10 bg-slate-950">
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-900">
        <div className="max-w-sm w-full mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Helioz</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Sign in</h2>
          <p className="text-slate-400 text-sm mb-8">Ready to jump back in? Enter your details.</p>

          <div className="space-y-5">
            <FormInput 
              label="Email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
            />
            <FormInput 
              label="Password" 
              type="password" 
              variant="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            
            <div className="flex items-center justify-between">
              <Checkbox 
                label="Remember me" 
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Forgot password?</a>
            </div>

            <Button className="w-full mt-6 shadow-lg shadow-indigo-500/20" variant="primary" size="lg">
              Sign in
            </Button>
            
            <p className="text-center text-sm text-slate-400 mt-6">
              Don't have an account? <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign up</a>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 relative bg-indigo-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(129,140,248,0.2) 0%, transparent 50%)' }}></div>
        
        <div className="relative z-10 p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Build Faster.</h3>
            <p className="text-indigo-200 text-lg max-w-md mx-auto leading-relaxed">
              Experience the power of a highly optimized, beautifully designed component library. Join thousands of developers building the future.
            </p>
        </div>
      </div>
    </div>
  );
};

const LoginPageDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Login Page</h1>
        <p className="text-lg text-slate-400">Pre-built login pages combining FormInput, Button, and Checkbox components into ready-to-use compositions.</p>
      </div>

      <section className="space-y-16">
        <div>
          <h2 className="text-xl font-semibold mb-4">Variant 1: Centered Card</h2>
          <p className="text-slate-400 text-sm mb-6">A clean, traditional centered floating card. Ideal for standard B2B applications.</p>
          <PreviewBox className="p-4 md:p-12">
            <LoginPageVariant1 />
          </PreviewBox>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Variant 2: Split Screen</h2>
          <p className="text-slate-400 text-sm mb-6">A modern split-screen layout displaying a prominent graphic or branding area on the right.</p>
          <PreviewBox className="p-0 border-none bg-transparent">
            {/* Remove p-6 border constraints to let the split screen shine through */}
            <LoginPageVariant2 />
          </PreviewBox>
        </div>
      </section>
    </div>
  );
};

export default LoginPageDocs;
