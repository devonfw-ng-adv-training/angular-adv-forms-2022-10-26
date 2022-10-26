import {
  ComponentRef,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  Self,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { filter, merge, Observable, of, Subject, takeUntil } from 'rxjs';
import { FormControlErrorComponent } from './form-control-error.component';

@Directive({
  selector: '[formControlName],[formControl]'
})
export class FormControlErrorDirective implements OnInit, OnDestroy {

  private ref?: ComponentRef<FormControlErrorComponent>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    @Self() private readonly control: NgControl,
    private readonly vcr: ViewContainerRef,
    private readonly hostElement: ElementRef<HTMLFormElement>,
    private readonly renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    const validity$ = merge(this.control.statusChanges as Observable<any>, of({}), this.control.valueChanges as Observable<any>)
      .pipe(takeUntil(this.destroy$));

    const invalid$ = validity$.pipe(filter(() => !!this.control.invalid && !!this.control.dirty));
    const valid$ = validity$.pipe(filter(() => !!this.control.valid));

    invalid$.subscribe({
      next: () => this.addErrorComponent()
    });

    valid$.subscribe({
      next: () => this.removeErrorComponent()
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.removeErrorComponent();
  }

  private addErrorComponent(): void {
    if (!this.ref) {
      this.ref = this.vcr.createComponent(FormControlErrorComponent);
      this.renderer.addClass(this.hostElement.nativeElement, 'is-invalid');
    }

    this.ref.instance.errors = this.control.errors;
  }

  private removeErrorComponent(): void {
    if (this.ref) {
      this.renderer.removeClass(this.hostElement.nativeElement, 'is-invalid');
      this.ref.destroy();
      this.ref = undefined;
    }
  }

}
