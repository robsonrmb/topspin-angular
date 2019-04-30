import { TestBed } from '@angular/core/testing';

import { ConviteService } from './convite.service';

describe('ConviteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConviteService = TestBed.get(ConviteService);
    expect(service).toBeTruthy();
  });
});
