import { TestBed } from '@angular/core/testing';

import { DetailUserService } from './detailuser.service';

describe('DetailUserService', () => {
  let service: DetailUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
