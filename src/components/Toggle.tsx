import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({
  checked = false,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
  className,
}, ref) => {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
  };

  const s = sizes[size];

  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group", disabled && "opacity-50 cursor-not-allowed", className)}>
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          "relative inline-flex shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer",
          s.track,
          checked ? "bg-indigo-600" : "bg-slate-700 group-hover:bg-slate-600",
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
            s.thumb,
            checked ? s.translate : "translate-x-0"
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col select-none">
          {label && (
            <span className={cn(
              "text-sm font-medium transition-colors",
              checked ? "text-indigo-400" : "text-slate-300 group-hover:text-slate-200"
            )}>
              {label}
            </span>
          )}
          {description && <span className="text-xs text-slate-500 mt-0.5">{description}</span>}
        </div>
      )}
    </label>
  );
});

Toggle.displayName = 'Toggle';
