import { TestBed } from '@angular/core/testing';

import { SalidasService } from './salidas.service';

describe('SalidasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalidasService = TestBed.get(SalidasService);
    expect(service).toBeTruthy();
  });
});
