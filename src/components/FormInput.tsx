import React, { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type InputVariant = 'text' | 'numeric' | 'alphabet' | 'currency' | 'phone' | 'email' | 'password';

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  variant?: InputVariant;
  error?: string;
  helperText?: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  variant = 'text', 
  error, 
  helperText, 
  value, 
  onChange, 
  className,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');

  // Sync local value when prop changes
  React.useEffect(() => {
    if (value !== undefined) setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (variant === 'numeric') {
      val = val.replace(/[^0-9]/g, '');
    } else if (variant === 'alphabet') {
      val = val.replace(/[^a-zA-Z\s]/g, '');
    } else if (variant === 'currency') {
      const numeric = val.replace(/[^0-9]/g, '');
      val = numeric ? `Rp ${new Intl.NumberFormat('id-ID').format(parseInt(numeric))}` : '';
    } else if (variant === 'phone') {
      val = val.replace(/[^0-9+]/g, '');
    }

    if (value === undefined) {
      setLocalValue(val);
    }

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: val }
      };
      onChange(syntheticEvent as any);
    }
  };

  const getInputType = () => {
    if (variant === 'password') return showPassword ? 'text' : 'password';
    if (variant === 'email') return 'email';
    return 'text';
  };

  return (
    <div className="w-full space-y-1.5 group">
      {label && (
        <div className="mb-2">
          <label className="text-sm font-semibold text-slate-300 ml-1 transition-colors group-focus-within:text-indigo-400">
            {label}
          </label>
        </div>
      )}
      
      <div className="relative flex items-center">
        <input
          type={getInputType()}
          value={localValue}
          onChange={handleChange}
          className={cn(
            "w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all",
            "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "hover:border-slate-700",
            variant === 'password' ? "pr-11" : "",
            className
          )}
          {...props}
        />

        {variant === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-800"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.04m4.066-1.516A9.95 9.95 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21m-2.101-2.101L3 3m9 9a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {(error || helperText) && (
        <p className={cn(
          "text-xs ml-1 font-medium",
          error ? "text-red-500 animate-in fade-in slide-in-from-top-1" : "text-slate-500"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
