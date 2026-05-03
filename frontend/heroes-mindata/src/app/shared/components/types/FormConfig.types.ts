export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'textarea' | 'select';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: InputType;
  placeholder?: string;
  initialValue?: any;
  validators?: any[];
  gridCols?: 'col-span-1' | 'col-span-2' | 'col-span-full'; 
  options?: { label: string; value: any }[]; 
  icon?: string;
  colorTheme?: 'primary' | 'secondary';
}

export interface FormActionConfig {
  label: string;
  type: 'submit' | 'button' | 'reset';
  style: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: string;
}

export interface DynamicFormConfig {
  id: string;
  title: string;

  fields: FormFieldConfig[];
  actions: FormActionConfig[];
}