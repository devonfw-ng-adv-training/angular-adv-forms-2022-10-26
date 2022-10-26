import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AvailabeService } from '../model/availabe-service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-service-input',
  templateUrl: './custom-service-input.component.html',
  styleUrls: ['./custom-service-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomServiceInputComponent,
      multi: true
    }
  ]
})
export class CustomServiceInputComponent implements OnInit, ControlValueAccessor {

  @Input() availableServices: AvailabeService[] = [];

  @Input() tabindex: number = 0;

  // @ViewChild('item') item?: HTMLDivElement;

  focusedElement?: HTMLDivElement;

  disabled = false;

  private selectedServices: AvailabeService[] = [];

  private onModelChange: Function = () => {};

  private onModelTouched: Function = () => {};

  constructor() { }

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

  onBlur() {
    this.focusedElement = undefined;
    this.onModelTouched();
  }
}
