import { Component } from '@angular/core';
import { FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AddressForm } from '../../model/new-package-types';
import { AbstractNestedFormInputComponent } from '../../shared/abstract-nested-form-input.component';

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
export class AddressFormComponent extends AbstractNestedFormInputComponent {

  override nestedForm: FormGroup<AddressForm> = this.newPackageFormService.prepareAddressForm();
  override errorKey = 'addressInvalid';

}
