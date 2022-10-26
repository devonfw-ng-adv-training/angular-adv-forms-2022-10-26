import { ControlValueAccessor, FormControl, UntypedFormGroup, ValidationErrors, Validator } from '@angular/forms';
import { NewPackageFormService } from '../new-package/new-package-form.service';
import { Component, Injector } from '@angular/core';

@Component({
  template: ''
})
export class AbstractNestedFormInputComponent implements ControlValueAccessor, Validator {

  nestedForm!: UntypedFormGroup;
  errorKey: string = 'invalidNestedForm';
  newPackageFormService!: NewPackageFormService;

  constructor(injector: Injector) {
    this.newPackageFormService = injector.get(NewPackageFormService);
  }

  private onModelTouched: Function = () => {
  };

  registerOnChange(fn: any): void {
    this.nestedForm.valueChanges.subscribe({ next: address => fn(address) })
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }


  writeValue(val: any): void {
    this.nestedForm.setValue(val);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.nestedForm.disable({ emitEvent: false });
    } else {
      this.nestedForm.enable({ emitEvent: false });
    }
  }

  validate(control: FormControl): ValidationErrors | null {
    return this.nestedForm.invalid ? { [this.errorKey]: true } : null;
  }

}
