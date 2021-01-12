import { TestBed } from '@angular/core/testing';

import { DataexportService } from './dataexport.service';

describe('DataexportService', () => {
  let service: DataexportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataexportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
