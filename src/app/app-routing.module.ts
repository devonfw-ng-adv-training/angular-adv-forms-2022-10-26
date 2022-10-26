import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPackageComponent } from './new-package/new-package.component';
import { AvailableServicesResolver } from './resolvers/available-services.resolver';

const routes: Routes = [
  {
    path: '',
    component: NewPackageComponent,
    title: 'New Package',
    resolve: { services: AvailableServicesResolver  }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
