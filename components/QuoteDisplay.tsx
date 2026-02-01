import React from 'react';
import { QuoteResult } from '../types';

interface QuoteDisplayProps {
  quote: QuoteResult;
  onContinue: () => void;
  onBack: () => void;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, onContinue, onBack }) => {
  if (!quote.eligible || !quote.benefits) {
    return (
      <div className="text-center space-y-6 animate-fadeIn">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-800">Not Eligible</h3>
          <p className="text-gray-600 mt-2">
            Based on the age provided ({quote.age} years old), this plan is only available for individuals aged 0 to 70.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-brand-primary font-semibold hover:underline"
        >
          &larr; Check another age
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
       <div className="text-center">
        <h2 className="text-2xl font-bold text-brand-dark">Your Estimated Premium</h2>
        <p className="text-brand-accent font-medium mt-1">Age {quote.age} Plan</p>
      </div>

      {/* Pricing Card */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-primary p-6 rounded-2xl text-white shadow-xl transform transition-transform hover:scale-[1.02]">
        <div className="text-center border-b border-blue-400/30 pb-4 mb-4">
          <span className="text-blue-200 text-sm uppercase tracking-wider font-semibold">Monthly Premium</span>
          <div className="text-5xl font-bold mt-2">
            <span className="text-2xl align-top mr-1">RM</span>
            {quote.premium.toLocaleString()}
          </div>
          <div className="text-blue-200 text-sm font-medium mt-1">(Approximate premium)</div>
        </div>
        
        <div className="space-y-3">
            <BenefitRow label="Annual Limit" value={quote.benefits.annualLimit} icon={
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            } />
            <BenefitRow label="Room & Board" value={quote.benefits.roomAndBoard} icon={
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            } />
             <div className="flex items-start space-x-3 pt-2">
                <div className="flex-shrink-0 mt-0.5 text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="text-sm">
                   <span className="block text-blue-200 font-medium text-xs uppercase">Conditions</span>
                   <span className="font-semibold text-white">{quote.benefits.extraDetails}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 pt-4">
        <button
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-lg font-bold text-lg text-white bg-brand-primary shadow-lg hover:bg-blue-800 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          Get full quotation with other options &rarr;
        </button>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-brand-dark text-sm font-medium py-2"
        >
          Recalculate
        </button>
      </div>
    </div>
  );
};

const BenefitRow = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 text-brand-accent">
            {icon}
        </div>
        <div className="flex-grow">
            <span className="block text-blue-200 text-xs font-medium uppercase">{label}</span>
            <span className="block text-lg font-semibold text-white">{value}</span>
        </div>
    </div>
);