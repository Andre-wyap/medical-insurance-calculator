import React, { useState, useCallback } from 'react';
import { FormData, QuoteResult, Gender, SmokerStatus } from './types';
import { calculateQuote } from './utils/calculations';
import { WEBHOOK_URL, REDIRECT_URL } from './constants';
import { StepOne } from './components/StepOne';
import { QuoteDisplay } from './components/QuoteDisplay';
import { StepTwo } from './components/StepTwo';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    birthday: '',
    gender: '',
    smoker: '',
    fullName: '',
    mobileNumber: '',
    email: ''
  });
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Step 1: Calculate Quote
  const handleCalculate = useCallback(() => {
    if (formData.birthday && formData.gender && formData.smoker) {
      const result = calculateQuote(formData.birthday);
      setQuoteResult(result);
      setStep(1.5); // 1.5 represents the Quote Display state
    }
  }, [formData.birthday, formData.gender, formData.smoker]);

  // Proceed from Quote to Contact Form
  const handleProceed = useCallback(() => {
    setStep(2);
  }, []);

  // Back Navigations
  const handleBackToInput = useCallback(() => {
    setStep(1);
    setQuoteResult(null);
  }, []);

  const handleBackToQuote = useCallback(() => {
    setStep(1.5);
  }, []);

  // Final Submission
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    // Prepare payload
    const payload = {
      ...formData,
      age: quoteResult?.age,
      premium: quoteResult?.premium,
      eligible: quoteResult?.eligible,
      timestamp: new Date().toISOString()
    };

    try {
        // Send to Webhook
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        
        // Always redirect regardless of webhook response status (fire and forget pattern often used for leads)
        // or strictly checking response.ok. Here we assume success or handle silently to ensure UX flow.
        window.location.href = REDIRECT_URL;
        
    } catch (error) {
        console.error("Submission error:", error);
        // Fallback redirection even if webhook fails, to not trap the user
        window.location.href = REDIRECT_URL;
    } finally {
        setIsSubmitting(false);
    }
  }, [formData, quoteResult]);


  // Validation
  const isStepOneValid = !!formData.birthday && !!formData.gender && !!formData.smoker;
  const isStepTwoValid = !!formData.fullName && !!formData.mobileNumber && !!formData.email;

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
        
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-brand-dark p-6 text-center">
           <h1 className="text-xl font-bold text-white tracking-wide uppercase">Medical Insurance Calculator</h1>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
            {step === 1 && (
                <StepOne 
                    formData={formData} 
                    onChange={handleInputChange} 
                    onCalculate={handleCalculate}
                    isValid={isStepOneValid}
                />
            )}

            {step === 1.5 && quoteResult && (
                <QuoteDisplay 
                    quote={quoteResult} 
                    onContinue={handleProceed}
                    onBack={handleBackToInput}
                />
            )}

            {step === 2 && (
                <StepTwo 
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    onBack={handleBackToQuote}
                    isValid={isStepTwoValid}
                />
            )}
        </div>

        {/* Progress Bar (Visual only) */}
        <div className="h-1.5 bg-gray-100 w-full">
            <div 
                className="h-full bg-brand-accent transition-all duration-500 ease-out"
                style={{ width: step === 1 ? '33%' : step === 1.5 ? '66%' : '100%' }}
            ></div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} PremiumShield Insurance. All rights reserved.
      </div>
    </div>
  );
};

export default App;