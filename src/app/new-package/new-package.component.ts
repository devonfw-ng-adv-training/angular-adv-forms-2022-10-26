import { Component, OnInit } from '@angular/core';
import { AvailabeService } from '../model/availabe-service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  UntypedFormBuilder,
  FormArray,
  Validators,
  ValidatorFn, AbstractControl,
} from '@angular/forms';
import { AddressForm, ContactForm, NewPackageForm } from '../model/new-package-types';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss']
})
export class NewPackageComponent implements OnInit {

  availableServices: AvailabeService[] = [];

  newPackageForm!: FormGroup<NewPackageForm>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly untypedFormBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.availableServices = this.activatedRoute.snapshot.data['services'];

    const contact = new FormGroup<ContactForm>({
      firstname: new FormControl('', { nonNullable: true, validators: [Validators.required, tooShort(3)] }),
      lastname: new FormControl('', { nonNullable: true, validators: [Validators.required, tooShort(3)] }),
      telNo: new FormControl('', { nonNullable: true, validators: [Validators.pattern(/^\+?[1-9][0-9]{7,14}$/)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.email] })
    }, {
      validators: telNoOrEmailRequired
    });

    const address = new FormGroup<AddressForm>({
      street: new FormControl('', { nonNullable: true, validators: Validators.required }),
      postCode: new FormControl('', { nonNullable: true, validators: [Validators.required, postCode] }),
      city: new FormControl('', { nonNullable: true, validators: Validators.required }),
      country: new FormControl('', { nonNullable: true, validators: Validators.required }),
    });

    this.newPackageForm = new FormGroup<NewPackageForm>({
      contact,
      address,
      services: new FormArray<FormControl<boolean>>(this.availableServices.map(s => new FormControl<boolean>(false, { nonNullable: true })))
    });

    // Typed Forms - FormBuilder
    // this.newPackageForm = this.formBuilder.nonNullable.group<NewPackageForm>({
    //   contact: this.formBuilder.group<ContactForm>({
    //     firstname: this.formBuilder.nonNullable.control(''),
    //     lastname: this.formBuilder.nonNullable.control(''),
    //     telNo: this.formBuilder.nonNullable.control(''),
    //     email: this.formBuilder.nonNullable.control('')
    //   }),
    //   address: this.formBuilder.group<AddressForm>({
    //     street: this.formBuilder.nonNullable.control(''),
    //     postCode: this.formBuilder.nonNullable.control(''),
    //     city: this.formBuilder.nonNullable.control(''),
    //     country: this.formBuilder.nonNullable.control('')
    //   }),
    //   services: this.formBuilder.array(this.availableServices.map(s => this.formBuilder.nonNullable.control(false)))
    // });

    // Untyped Forms - FormBuilder
    // this.newPackageForm = this.untypedFormBuilder.group({
    //   contact: this.untypedFormBuilder.group({
    //     firstname: '',
    //     lastname: '',
    //     telNo: '',
    //     email: ''
    //   }),
    //   address: this.untypedFormBuilder.group({
    //     street: '',
    //     postCode: '',
    //     city: '',
    //     country: ''
    //   }),
    //   services: this.untypedFormBuilder.array(this.availableServices.map(s => this.untypedFormBuilder.control(false)))
    // });
  }

}

export const tooShort = (minLength: number): ValidatorFn => (control: AbstractControl) => control.value.length < minLength ? { tooShort: true } : null;

export const postCode: ValidatorFn = (control: AbstractControl) => {
  const [first, second] = control.value.split('-');

  return first?.length !== 2 || second?.length !== 3 ? { postCode: true } : null;
};


// export const telNoOrEmailRequired: ValidatorFn = ((contactForm: FormGroup<ContactForm>) => {
//   return contactForm.controls.telNo.value && contactForm.controls.email.value
//     || !contactForm.controls.telNo.value && !contactForm.controls.email.value
//   ? { telNoOrEmailRequired: true }
//   : null;
// }) as ValidatorFn;

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


