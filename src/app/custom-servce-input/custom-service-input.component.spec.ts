import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomServiceInputComponent } from './custom-service-input.component';

describe('CustomServceInputComponent', () => {
  let component: CustomServiceInputComponent;
  let fixture: ComponentFixture<CustomServiceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomServiceInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomServiceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
