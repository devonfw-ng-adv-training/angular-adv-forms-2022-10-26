import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddressForm } from '../../model/new-package-types';

@Component({
  selector: 'app-address-form[addressForm]',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {

  @Input() addressForm!: FormGroup<AddressForm>

}
