import React, { useState, useRef, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DropdownOption = {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
};

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  variant?: 'default' | 'checkbox' | 'radio';
  searchable?: boolean;
  placeholder?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  variant = 'radio',
  searchable = false,
  placeholder = 'Select an option',
  value,
  onChange,
  className,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleOptionClick = (optionValue: string) => {
    if (variant === 'radio' || variant === 'default') {
      onChange?.(optionValue);
      setIsOpen(false);
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      let newValues;
      if (currentValues.includes(optionValue)) {
        newValues = currentValues.filter(v => v !== optionValue);
      } else {
        newValues = [...currentValues, optionValue];
      }
      onChange?.(newValues);
    }
  };

  const isSelected = (optionValue: string) => {
    if (variant === 'radio' || variant === 'default') return value === optionValue;
    return Array.isArray(value) && value.includes(optionValue);
  };

  const handleRemoveValue = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    if (Array.isArray(value)) {
      onChange?.(value.filter(v => v !== optionValue));
    }
  };

  const getDisplayValue = () => {
    if (variant === 'checkbox' && Array.isArray(value) && value.length > 0) {
      return (
        <div className="flex flex-wrap gap-1.5 -my-1">
          {value.map(val => {
            const opt = options.find(o => o.value === val);
            if (!opt) return null;
            return (
              <span key={val} className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-md border border-slate-700">
                {opt.icon && <span className="flex items-center justify-center">{opt.icon}</span>}
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => handleRemoveValue(e, val)}
                  className="hover:text-red-400 hover:bg-slate-700 rounded-full p-0.5 transition-colors focus:outline-none"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            );
          })}
        </div>
      );
    }

    if (variant === 'radio' || variant === 'default') {
      const selected = options.find(o => o.value === value);
      if (selected) {
        return (
          <div className="flex items-center gap-2">
            {selected.icon && <span className="flex items-center justify-center text-slate-400">{selected.icon}</span>}
            <span className="truncate">{selected.label}</span>
          </div>
        );
      }
    }
    
    return <span className="text-slate-600 truncate">{placeholder}</span>;
  };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2 ml-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between bg-slate-900 border rounded-xl px-4 py-2.5 text-sm text-left transition-all outline-none min-h-[46px]",
          isOpen ? "border-indigo-500 ring-1 ring-indigo-500" : "border-slate-800 hover:border-slate-700",
          error ? "border-red-500" : "",
          (value && value.length > 0) ? "text-slate-100" : "text-slate-600"
        )}
      >
        <div className="flex-1 pr-4 truncate overflow-hidden">
          {getDisplayValue()}
        </div>
        <svg
          className={cn("w-5 h-5 shrink-0 transition-transform", isOpen ? "rotate-180 text-indigo-400" : "text-slate-500")}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {error && (
        <p className="text-xs ml-1 mt-1.5 font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-lg shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95">
          {searchable && (
            <div className="p-2 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
              <div className="relative">
                <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search options..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto p-2 space-y-1">
            {filteredOptions.length === 0 ? (
              <p className="p-4 text-center text-sm text-slate-500">No options found</p>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2.5 transition-colors cursor-pointer",
                    isSelected(option.value) ? "bg-indigo-500/10" : "hover:bg-slate-800/50"
                  )}
                >
                  <div className="pointer-events-none">
                    {variant === 'checkbox' ? (
                      <Checkbox
                        checked={isSelected(option.value)}
                        label={option.label}
                        description={option.description}
                        onChange={() => {}}
                      />
                    ) : variant === 'radio' ? (
                      <Radio
                        checked={isSelected(option.value)}
                        label={option.label}
                        description={option.description}
                        onChange={() => {}}
                      />
                    ) : (
                      <div className="flex items-center gap-3">
                        {option.icon && <span className="shrink-0 text-slate-500">{option.icon}</span>}
                        <div className="flex flex-col">
                          <span className={cn("text-sm transition-colors", isSelected(option.value) ? "font-semibold text-indigo-400" : "font-medium text-slate-300")}>
                            {option.label}
                          </span>
                          {option.description && <span className="text-xs text-slate-500 mt-0.5">{option.description}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
