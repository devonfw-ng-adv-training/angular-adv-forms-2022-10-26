import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AddressForm, ContactForm, NewPackageForm } from '../model/new-package-types';
import { AvailabeService } from '../model/availabe-service';

@Injectable()
export class NewPackageFormService {

  prepareForm(): FormGroup<NewPackageForm> {
    const contact = new FormGroup<ContactForm>({
      firstname: new FormControl('', { nonNullable: true }),
      lastname: new FormControl('', { nonNullable: true }),
      telNo: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true })
    }, {
      validators: telNoOrEmailRequired
    });

    const address = new FormGroup<AddressForm>({
      street: new FormControl('', { nonNullable: true }),
      postCode: new FormControl('', { nonNullable: true }),
      city: new FormControl('', { nonNullable: true }),
      country: new FormControl('', { nonNullable: true }),
    });

    return new FormGroup<NewPackageForm>({
      contact,
      address,
      services: new FormArray<FormControl<boolean>>([])
    });
  }

  setValidators(form: FormGroup<NewPackageForm>): void {
    form.controls.contact.controls.firstname.setValidators([Validators.required, tooShort(3)]);
    form.controls.contact.controls.lastname.setValidators([Validators.required, tooShort(3)]);
    form.controls.contact.controls.email.setValidators([Validators.pattern(/^\+?[1-9][0-9]{7,14}$/)]);
    form.controls.contact.controls.telNo.setValidators(Validators.email);

    form.controls.contact.setValidators(telNoOrEmailRequired);

    form.controls.address.controls.street.setValidators(Validators.required);
    form.controls.address.controls.postCode.setValidators([Validators.required, postCode]);
    form.controls.address.controls.city.setValidators(Validators.required);
    form.controls.address.controls.country.setValidators(Validators.required);

    form.controls.contact.controls.firstname.updateValueAndValidity();
    form.controls.contact.controls.lastname.updateValueAndValidity();
    form.controls.contact.controls.email.updateValueAndValidity();
    form.controls.contact.controls.telNo.updateValueAndValidity();

    form.controls.contact.updateValueAndValidity();

    form.controls.address.controls.street.updateValueAndValidity();
    form.controls.address.controls.postCode.updateValueAndValidity();
    form.controls.address.controls.city.updateValueAndValidity();
    form.controls.address.controls.country.updateValueAndValidity();

  }

  createAvailableServicesCtrls(form: FormGroup<NewPackageForm>, availableServices: AvailabeService[]): void {
    form.controls.services.clear();
    availableServices.forEach(s => {
      form.controls.services.push(new FormControl<boolean>(false, { nonNullable: true }));
    });

  }
}

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
