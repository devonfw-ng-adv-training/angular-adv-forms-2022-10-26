import { Component } from '@angular/core';
import { FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AddressForm, ContactForm } from '../../model/new-package-types';
import { AbstractNestedFormInputComponent } from '../../shared/abstract-nested-form-input.component';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ContactFormComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ContactFormComponent,
      multi: true
    }
  ]
})
export class ContactFormComponent extends AbstractNestedFormInputComponent {

  override nestedForm: FormGroup<ContactForm> = this.newPackageFormService.prepareContactForm();
  override errorKey = 'contactInvalid';
}
