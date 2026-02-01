import React from 'react';
import { FormData } from '../types';
import { InputField } from './InputField';

interface StepTwoProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  onBack: () => void;
  isValid: boolean;
}

export const StepTwo: React.FC<StepTwoProps> = ({ 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting, 
  onBack,
  isValid
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
       <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-brand-dark">Final Step</h2>
        <p className="text-gray-600 mt-2">Where should we send your official quote?</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="e.g. John Doe"
          required
        />
        
        <InputField
          label="Mobile Number"
          name="mobileNumber"
          type="tel"
          value={formData.mobileNumber}
          onChange={onChange}
          placeholder="e.g. 0123456789"
          required
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="e.g. john@example.com"
          required
        />
      </div>

       <div className="flex flex-col gap-3 mt-8">
        <button
            type="button"
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className={`w-full py-4 px-6 rounded-lg font-bold text-lg text-white shadow-lg transition-all duration-300 flex justify-center items-center
            ${isValid && !isSubmitting
                ? 'bg-green-600 hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl' 
                : 'bg-gray-400 cursor-not-allowed'}`}
        >
            {isSubmitting ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
                </>
            ) : 'Get full quotation now'}
        </button>

         <button
            onClick={onBack}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-brand-dark font-medium py-2 transition-colors"
        >
            &larr; Back to Quote
        </button>
      </div>
      
      <p className="text-xs text-center text-gray-400 mt-4">
        By submitting this form, you agree to our terms and conditions.
      </p>
    </div>
  );
};