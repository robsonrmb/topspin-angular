import { TestBed } from '@angular/core/testing';

import { EstadosbrService } from './estadosbr.service';

describe('EstadosbrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadosbrService = TestBed.get(EstadosbrService);
    expect(service).toBeTruthy();
  });
});
