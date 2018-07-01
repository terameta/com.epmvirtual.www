import { TestBed, inject } from '@angular/core/testing';

import { CentralstatusService } from './centralstatus.service';

describe('CentralstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CentralstatusService]
    });
  });

  it('should be created', inject([CentralstatusService], (service: CentralstatusService) => {
    expect(service).toBeTruthy();
  }));
});
