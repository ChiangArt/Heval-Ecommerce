export type InputType = "text" | "tel" | "email" | "number" | "password"; 

export interface Field {
  name: string;
  label: string;
  placeholder: string;
  type: InputType;
  required: boolean;
}

export interface ButtonLink {
  type: "link";
  text: string;
  href: string;
}

export interface ButtonAction {
  type: "button";
  text: string;
  onClick?: () => void; 
}

export type Button = ButtonLink | ButtonAction;

export interface FormTexts {
  formTitle: string;
  fields: Field[];
  documentLabel?: string;
  documentPlaceholder?: string;
  continueButton?: ButtonLink;
  keepBuyingButton?: ButtonAction;
}
