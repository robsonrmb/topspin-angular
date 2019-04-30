import { TestBed } from '@angular/core/testing';

import { UsuarioMockService } from './usuario-mock.service';

describe('UsuarioMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioMockService = TestBed.get(UsuarioMockService);
    expect(service).toBeTruthy();
  });
});
