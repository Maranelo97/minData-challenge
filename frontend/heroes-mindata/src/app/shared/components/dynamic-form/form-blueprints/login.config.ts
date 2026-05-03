import { Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../types/FormConfig.types';

export const LOGIN_DYNAMIC_CONFIG: DynamicFormConfig = {
  id: 'login-terminal',
  title: 'VND Auth_Protocol',
  fields: [
    {
      name: 'email',
      label: 'User_Identifier',
      type: 'email',
      placeholder: 'NAME@DOMAIN.COM',
      validators: [Validators.required, Validators.email],
      colorTheme: 'primary',
    },
    {
      name: 'password',
      label: 'Access_Keyphrase',
      type: 'password',
      placeholder: '••••••••',
      validators: [Validators.required],
      colorTheme: 'secondary',
    },
  ],
  actions: [{ label: 'INITIALIZE SESSION', type: 'submit', style: 'primary' }],
};
  