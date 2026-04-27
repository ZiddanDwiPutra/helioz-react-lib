import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CheckboxVariant = 'default' | 'card';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  variant?: CheckboxVariant;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  variant = 'default',
  error,
  className,
  ...props
}, ref) => {
  if (variant === 'card') {
    return (
      <label className={cn(
        "relative flex cursor-pointer rounded-xl border p-4 transition-all focus-within:ring-2 focus-within:ring-indigo-500",
        props.checked ? "bg-indigo-500/10 border-indigo-500" : "bg-slate-900 border-slate-800 hover:border-slate-700",
        error ? "border-red-500" : "",
        className
      )}>
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            {label && <span className={cn("text-sm font-semibold transition-colors", props.checked ? "text-indigo-400" : "text-slate-300")}>{label}</span>}
            {description && <span className={cn("text-xs mt-1 transition-colors", props.checked ? "text-indigo-300/70" : "text-slate-500")}>{description}</span>}
          </div>
          <div className="ml-4 flex h-5 items-center">
             <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                ref={ref}
                className={cn(
                  "peer h-5 w-5 cursor-pointer appearance-none rounded border-2 transition-all checked:border-indigo-500 checked:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900",
                  props.checked ? "border-indigo-500" : "border-slate-600 hover:border-slate-500",
                  error && "border-red-500 checked:border-red-500 checked:bg-red-500"
                )}
                {...props}
              />
              <svg
                className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </label>
    );
  }

  return (
    <label className={cn("relative flex items-start group cursor-pointer", className)}>
      <div className="flex h-6 items-center">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              "peer h-5 w-5 cursor-pointer appearance-none rounded border-2 transition-all checked:border-indigo-500 checked:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900",
              props.checked ? "border-indigo-500" : "border-slate-600 group-hover:border-slate-500",
              error && "border-red-500 checked:border-red-500 checked:bg-red-500"
            )}
            {...props}
          />
          <svg
            className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
      {(label || description) && (
        <div className="ml-3 text-sm leading-6">
          {label && <span className={cn("font-medium transition-colors group-hover:text-slate-200", props.checked ? "text-indigo-400" : "text-slate-300")}>{label}</span>}
          {description && <p className="text-slate-500 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  );
});
Checkbox.displayName = 'Checkbox';
