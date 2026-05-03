import { Injectable, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormConfig, FormFieldConfig } from '../types/FormConfig.types';
@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  public buildForm(config: DynamicFormConfig) {
    const group: any = {};

    config.fields.forEach((field) => {
      group[field.name] = new FormControl(field.initialValue ?? '', {
        validators: field.validators ?? [],
        nonNullable: true,
      });
    });

    const formGroup = new FormGroup(group);


    const isValid = signal(formGroup.valid);
    formGroup.statusChanges.subscribe(() => isValid.set(formGroup.valid));

    return {
      instance: formGroup,
      isValid,
      config,
    };
  }
}
