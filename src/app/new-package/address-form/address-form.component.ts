import { Component } from '@angular/core';
import {
  ControlValueAccessor, FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { Address, AddressForm } from '../../model/new-package-types';
import { NewPackageFormService } from '../new-package-form.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressFormComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AddressFormComponent,
      multi: true
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, Validator {

  addressForm: FormGroup<AddressForm> = this.newPackageFormService.prepareAddressForm();

  private onModelTouched: Function = () => {
  };

  constructor(private readonly newPackageFormService: NewPackageFormService) {
  }

  validate(control: FormControl<Address>): ValidationErrors | null {
    return this.addressForm.invalid ? { addressInvalid: true } : null;
  }

  registerOnChange(fn: any): void {
    this.addressForm.valueChanges.subscribe({ next: address => fn(address) })
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.addressForm.disable({ emitEvent: false });
    } else {
      this.addressForm.enable({ emitEvent: false });
    }
  }

  writeValue(address: Address): void {
    this.addressForm.setValue(address);
  }


}
