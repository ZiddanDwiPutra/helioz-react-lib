import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex items-center justify-between relative px-2">
        {/* Progress Line */}
        <div className="absolute top-[14px] left-0 right-0 h-0.5 bg-slate-800 z-0 mx-8">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center z-10 relative">
              <div 
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isCompleted ? "bg-indigo-600 border-indigo-600" : 
                  isActive ? "bg-[#1e1e2d] border-indigo-500 ring-4 ring-indigo-500/20" : 
                  "bg-[#1e1e2d] border-slate-700"
                )}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <div className={cn("w-2 h-2 rounded-full", isActive ? "bg-indigo-500" : "bg-slate-700")} />
                )}
              </div>
              <span className={cn(
                "mt-2 text-[10px] font-medium transition-colors duration-300",
                isActive ? "text-slate-100" : "text-slate-500"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
