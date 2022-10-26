import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPackageComponent } from './new-package/new-package.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesPipe } from './form-control-error/error-messages.pipe';
import { FormControlErrorDirective } from './form-control-error/form-control-error.directive';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPackageComponent,
    ErrorMessagesPipe,
    FormControlErrorDirective,
    FormControlErrorComponent
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
