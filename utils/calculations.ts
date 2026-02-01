import { PRICING_TABLE, MAX_ELIGIBLE_AGE } from '../constants';
import { QuoteResult, BenefitTier } from '../types';

export const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const getBenefits = (age: number): BenefitTier | undefined => {
  if (age < 0 || age > MAX_ELIGIBLE_AGE) return undefined;

  if (age <= 39) {
    return {
      annualLimit: 'RM 5,000,000',
      roomAndBoard: 'RM 200',
      extraDetails: 'Co-payment: 5% or capped RM 1,000 per year'
    };
  } else if (age <= 59) {
    return {
      annualLimit: 'RM 2,000,000',
      roomAndBoard: 'RM 200',
      extraDetails: 'Deductible: RM 5,000 per year'
    };
  } else if (age <= 70) {
    return {
      annualLimit: 'RM 2,000,000',
      roomAndBoard: 'RM 200',
      extraDetails: 'Deductible: RM 10,000 per year'
    };
  }
  return undefined;
};

export const calculateQuote = (birthday: string): QuoteResult => {
  const age = calculateAge(birthday);
  
  if (age < 0) {
    // Basic validation for future dates
    return { age, premium: 0, eligible: false };
  }

  if (age > MAX_ELIGIBLE_AGE) {
    return { age, premium: 0, eligible: false };
  }

  const premium = PRICING_TABLE[age];
  const benefits = getBenefits(age);

  if (premium === undefined) {
    // Should not happen given constraints, but fail-safe
    return { age, premium: 0, eligible: false };
  }

  return {
    age,
    premium,
    eligible: true,
    benefits
  };
};
