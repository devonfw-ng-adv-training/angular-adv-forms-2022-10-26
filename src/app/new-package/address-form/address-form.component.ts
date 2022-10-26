import { Component } from '@angular/core';
import { ControlContainer, FormGroup, NgForm } from '@angular/forms';
import { AddressForm } from '../../model/new-package-types';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AddressFormComponent {

  constructor(private readonly controlContainer: ControlContainer) {
  }

  get addressForm(): FormGroup<AddressForm> {
    return this.controlContainer.control as FormGroup<AddressForm>;
  }

}
