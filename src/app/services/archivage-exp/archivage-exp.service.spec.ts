import { TestBed } from '@angular/core/testing';

import { ArchivageExpService } from './archivage-exp.service';

describe('ArchivageExpService', () => {
  let service: ArchivageExpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivageExpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
