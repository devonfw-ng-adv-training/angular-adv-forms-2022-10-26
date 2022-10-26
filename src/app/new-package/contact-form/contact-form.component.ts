import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactForm } from '../../model/new-package-types';

@Component({
  selector: 'app-contact-form[contactForm]',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  @Input() contactForm!: FormGroup<ContactForm>;

}
