import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPackageComponent } from './new-package/new-package.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesPipe } from './new-package/error-messages.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewPackageComponent,
    ErrorMessagesPipe
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
