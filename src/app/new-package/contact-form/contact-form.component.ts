import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ContactForm } from '../../model/new-package-types';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ContactFormComponent {

  constructor(private readonly controlContainer: ControlContainer) {
  }

  get contactForm(): FormGroup<ContactForm> {
    return this.controlContainer.control as FormGroup<ContactForm>;
  }

}
