import { TestBed } from '@angular/core/testing';

import { ErroService } from './erro.service';

describe('ErroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErroService = TestBed.get(ErroService);
    expect(service).toBeTruthy();
  });
});
