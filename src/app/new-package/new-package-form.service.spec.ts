import { TestBed } from '@angular/core/testing';

import { NewPackageFormService } from './new-package-form.service';

describe('NewPackageFormService', () => {
  let service: NewPackageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPackageFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
