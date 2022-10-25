import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPackageComponent } from './new-package/new-package.component';

const routes: Routes = [
  {
    path: '',
    component: NewPackageComponent,
    title: 'New Package'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
