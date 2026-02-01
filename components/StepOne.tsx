import React from 'react';
import { FormData, Gender, SmokerStatus } from '../types';
import { InputField } from './InputField';
import { SelectField } from './SelectField';

interface StepOneProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCalculate: () => void;
  isValid: boolean;
}

export const StepOne: React.FC<StepOneProps> = ({ formData, onChange, onCalculate, isValid }) => {
  // Get today's date formatted as YYYY-MM-DD for the max date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-dark">Get Your Instant Quote</h2>
        <p className="text-gray-600 mt-2">Enter your details to see your estimated premium.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <InputField
          label="Date of Birth"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={onChange}
          max={today}
          required
        />

        <SelectField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={onChange}
          required
          options={[
            { label: 'Male', value: Gender.Male },
            { label: 'Female', value: Gender.Female },
          ]}
        />

        <SelectField
          label="Are you a smoker?"
          name="smoker"
          value={formData.smoker}
          onChange={onChange}
          required
          options={[
            { label: 'Yes', value: SmokerStatus.Yes },
            { label: 'No', value: SmokerStatus.No },
          ]}
        />
      </div>

      <button
        type="button"
        onClick={onCalculate}
        disabled={!isValid}
        className={`w-full mt-6 py-4 px-6 rounded-lg font-bold text-lg text-white shadow-lg transition-all duration-300 transform 
          ${isValid 
            ? 'bg-brand-primary hover:bg-blue-800 hover:-translate-y-1 hover:shadow-xl' 
            : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Calculate Quote
      </button>
    </div>
  );
};
