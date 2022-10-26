import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'div.invalid-feedback',
  template: `{{ errors | errorMessages }}`,
  styleUrls: ['./form-control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlErrorComponent implements OnInit {

  private _error?: ValidationErrors | null;

  @Input() set errors(errors: ValidationErrors | null | undefined) {
    this._error = errors;
    this.cd.detectChanges();
  }

  get errors(): ValidationErrors | null | undefined {
    return this._error;
  }

  constructor(
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

}
