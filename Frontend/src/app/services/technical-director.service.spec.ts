import { TestBed } from '@angular/core/testing';

import { TechnicalDirectorService } from './technical-director.service';

describe('TechnicalDirectorService', () => {
  let service: TechnicalDirectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalDirectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
