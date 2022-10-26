import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvailabeService } from '../model/availabe-service';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, ValidatorFn, } from '@angular/forms';
import { NewPackageForm } from '../model/new-package-types';
import { NewPackageFormService } from './new-package-form.service';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss'],
  providers: [NewPackageFormService]
})
export class NewPackageComponent implements OnInit, OnDestroy {

  availableServices: AvailabeService[] = [];

  newPackageForm: FormGroup<NewPackageForm> = this.newPackageFormService.prepareForm();

  private readonly destroy$ = new Subject<void>();
  private readonly subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly newPackageFormService: NewPackageFormService
  ) {
  }

  ngOnInit(): void {
    this.newPackageFormService.setValidators(this.newPackageForm);

    // this.newPackageForm.controls.services.disable();

    this.subscription.add(this.activatedRoute.data
      .pipe(map(d => d['services']))
      .subscribe({
        next: availableServices => {
          this.availableServices = availableServices;
        }
      }))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.subscription.unsubscribe();
  }

}

