import { FormArray, FormControl, FormGroup } from '@angular/forms';

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
  contact: FormGroup<ContactForm>;
  address: FormGroup<AddressForm>;
  services: FormArray<FormControl<boolean>>
}
