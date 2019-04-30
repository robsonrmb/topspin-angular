import { TestBed } from '@angular/core/testing';

import { LoginMockService } from './login-mock.service';

describe('LoginMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginMockService = TestBed.get(LoginMockService);
    expect(service).toBeTruthy();
  });
});
