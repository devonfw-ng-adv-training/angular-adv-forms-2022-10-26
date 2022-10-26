import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AvailabeService } from './availabe-service';

export type ControlsOf<T> = {
  [K in keyof T]: T[K] extends string | number
    ? FormControl<T[K]>
    : FormGroup<ControlsOf<T[K]>>
}

export interface Contact {
  firstname: string;
  lastname: string;
  telNo: string;
  email: string;
}

export interface Address {
  street: string;
  postCode: string;
  city: string;
  country: string;
}

export interface ContactForm {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  telNo: FormControl<string>;
  email: FormControl<string>;
}

export interface AddressForm {
  street: FormControl<string>;
  postCode: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<string>;
}

export interface NewPackageForm {
  contact: FormGroup<ControlsOf<Contact>>;
  address: FormGroup<ControlsOf<Address>>;
  services: FormControl<AvailabeService[]>
}
