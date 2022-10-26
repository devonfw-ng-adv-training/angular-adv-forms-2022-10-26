import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AvailabeService } from '../model/availabe-service';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Component({
  selector: 'app-custom-service-input',
  templateUrl: './custom-service-input.component.html',
  styleUrls: ['./custom-service-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomServiceInputComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CustomServiceInputComponent,
      multi: true
    }
  ]
})
export class CustomServiceInputComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() availableServices: AvailabeService[] = [];

  @Input() tabindex: number = 0;

  @Input() maxPrice: number = 15;

  // @ViewChild('item') item?: HTMLDivElement;

  focusedElement?: HTMLDivElement;

  disabled = false;

  private selectedServices: AvailabeService[] = [];

  private onModelChange: Function = () => {
  };

  private onModelTouched: Function = () => {
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.focusedElement = undefined;
  }

  writeValue(services: AvailabeService[]): void {
    this.selectedServices = services;
  }


  validate(control: FormControl<AvailabeService[]>): ValidationErrors | null {
    const sum = control.value
      .map(as => as.price)
      .reduce((sum: number, curr: number) => sum + curr, 0);

    return sum > this.maxPrice ? { priceTooBig: true } : null;
  }

  selectService(service: AvailabeService): void {
    if (!this.disabled) {
      const index = this.findServiceIndex(service);

      if (index === -1) {
        this.selectedServices = [...this.selectedServices, service];
      } else {
        this.selectedServices = this.selectedServices.filter(v => v.id !== service.id);
      }

      this.onModelChange(this.selectedServices);
    }
  }

  private findServiceIndex(service: AvailabeService): number {
    return this.selectedServices.findIndex(v => v.id === service.id);
  }

  isSelected(service: AvailabeService): boolean {
    return this.findServiceIndex(service) !== -1;
  }

  onFocus($event: FocusEvent): void {
    if (!this.disabled) {
      this.focusedElement = <HTMLDivElement> $event.target;
    }
  }

  onBlur(): void {
    this.focusedElement = undefined;
    this.onModelTouched();
  }
}
