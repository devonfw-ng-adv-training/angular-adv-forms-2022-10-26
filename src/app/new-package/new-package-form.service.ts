import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Address, AddressForm, ContactForm, NewPackageForm } from '../model/new-package-types';
import { AvailabeService } from '../model/availabe-service';

@Injectable()
export class NewPackageFormService {

  prepareAddressForm(): FormGroup<AddressForm> {
    return new FormGroup<AddressForm>({
      street: new FormControl('', { nonNullable: true, validators: Validators.required }),
      postCode: new FormControl('', { nonNullable: true, validators: [Validators.required, postCode] }),
      city: new FormControl('', { nonNullable: true, validators: Validators.required }),
      country: new FormControl('', { nonNullable: true, validators: Validators.required }),
    });

    // form.controls.street.setValidators(Validators.required);
    // form.controls.postCode.setValidators([Validators.required, postCode]);
    // form.controls.city.setValidators(Validators.required);
    // form.controls.country.setValidators(Validators.required);
    //
    // form.controls.street.updateValueAndValidity();
    // form.controls.postCode.updateValueAndValidity();
    // form.controls.city.updateValueAndValidity();
    // form.controls.country.updateValueAndValidity();
  }

  prepareForm(): FormGroup<NewPackageForm> {
    const contact = new FormGroup<ContactForm>({
      firstname: new FormControl('', { nonNullable: true }),
      lastname: new FormControl('', { nonNullable: true }),
      telNo: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true })
    });

    return new FormGroup<NewPackageForm>({
      contact,
      address: new FormControl<Address>({
        street: '',
        postCode: '',
        city: '',
        country: ''
      }, { nonNullable: true }),
      services: new FormControl<AvailabeService[]>([], { nonNullable: true })
    });
  }

  setValidators(form: FormGroup<NewPackageForm>): void {
    form.controls.contact.controls.firstname.setValidators([Validators.required, tooShort(3)]);
    form.controls.contact.controls.lastname.setValidators([Validators.required, tooShort(3)]);
    form.controls.contact.controls.email.setValidators([Validators.pattern(/^\+?[1-9][0-9]{7,14}$/)]);
    form.controls.contact.controls.telNo.setValidators(Validators.email);

    form.controls.services.setValidators(serviceRequired);
    form.controls.services.updateValueAndValidity();

    form.controls.contact.controls.firstname.updateValueAndValidity();
    form.controls.contact.controls.lastname.updateValueAndValidity();
    form.controls.contact.controls.email.updateValueAndValidity();
    form.controls.contact.controls.telNo.updateValueAndValidity();

  }
}

export const serviceRequired: ValidatorFn = (control: AbstractControl) => control.value?.length < 1 ? { servicesRequired: true } : null;

export const tooShort = (minLength: number): ValidatorFn => (control: AbstractControl) => control.value.length < minLength ? { tooShort: true } : null;

export const postCode: ValidatorFn = (control: AbstractControl) => {
  const [first, second] = control.value.split('-');

  return first?.length !== 2 || second?.length !== 3 ? { postCode: true } : null;
};

export const telNoOrEmailRequired: ValidatorFn = (control: AbstractControl) => {
  const telNoCtrl = control.get('telNo');
  const emailCtrl = control.get('email');

  if (telNoCtrl && emailCtrl) {
    return telNoCtrl.value && emailCtrl.value
    || !telNoCtrl.value && !emailCtrl.value
      ? { telNoOrEmailRequired: true }
      : null;
  }

  return null;
};
