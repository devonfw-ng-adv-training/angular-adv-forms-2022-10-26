import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPackageComponent } from './new-package/new-package.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesPipe } from './form-control-error/error-messages.pipe';
import { FormControlErrorDirective } from './form-control-error/form-control-error.directive';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';
import { CustomServiceInputComponent } from './custom-servce-input/custom-service-input.component';
import { ContactFormComponent } from './new-package/contact-form/contact-form.component';
import { AddressFormComponent } from './new-package/address-form/address-form.component';
import { AbstractNestedFormInputComponent } from './shared/abstract-nested-form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPackageComponent,
    ErrorMessagesPipe,
    FormControlErrorDirective,
    FormControlErrorComponent,
    CustomServiceInputComponent,
    ContactFormComponent,
    AddressFormComponent,
    AbstractNestedFormInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
