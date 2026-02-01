export interface PricingData {
  [age: number]: number;
}

export interface BenefitTier {
  annualLimit: string;
  roomAndBoard: string;
  extraDetails: string; // Co-payment or Deductible
}

export interface QuoteResult {
  age: number;
  premium: number;
  eligible: boolean;
  benefits?: BenefitTier;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export enum SmokerStatus {
  Yes = 'Yes',
  No = 'No'
}

export interface FormData {
  // Step 1
  birthday: string;
  gender: Gender | '';
  smoker: SmokerStatus | '';
  
  // Step 2
  fullName: string;
  mobileNumber: string;
  email: string;
}
