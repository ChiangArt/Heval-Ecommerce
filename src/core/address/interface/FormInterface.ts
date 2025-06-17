export interface FieldConfig {
  name: keyof AddressFormValues;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

export interface FormButton {
  type: "link" | "button";
  text: string;
  href?: string;
}

export interface FormTexts {
  formTitle: string;
  fields: FieldConfig[];
  continueButton: FormButton;
  keepBuyingButton?: FormButton;
}

export interface StepFormProps {
  stepNumber: string;
  title: string;
  formTexts: FormTexts;
}

export interface AddressFormValues {
  fullAddress: string;
  apartmentOrFloor: string;
  district: string;
  province: string;
  department: string;
  reference: string;
  additionalInfo: string;
}
