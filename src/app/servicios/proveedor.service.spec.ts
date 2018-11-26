import { TestBed } from '@angular/core/testing';

import { ProveedorService } from './proveedor.service';

describe('ProveedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorService = TestBed.get(ProveedorService);
    expect(service).toBeTruthy();
  });
});
