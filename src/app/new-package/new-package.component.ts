import { Component, OnInit } from '@angular/core';
import { AvailabeService } from '../model/availabe-service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, UntypedFormBuilder, FormArray, } from '@angular/forms';
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
      firstname: new FormControl('', { nonNullable: true }),
      lastname: new FormControl('', { nonNullable: true }),
      telNo: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true })
    });

    const address = new FormGroup<AddressForm>({
      street: new FormControl('', { nonNullable: true }),
      postCode: new FormControl('', { nonNullable: true }),
      city: new FormControl('', { nonNullable: true }),
      country: new FormControl('', { nonNullable: true }),
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
