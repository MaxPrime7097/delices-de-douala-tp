import { TestBed } from '@angular/core/testing';

import { Plat } from './plats';

describe('Plat', () => {
  let service: Plat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Plat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
