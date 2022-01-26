/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VelocityService } from './velocity.service';

describe('Service: Velocity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VelocityService],
    });
  });

  it('should ...', inject([VelocityService], (service: VelocityService) => {
    expect(service).toBeTruthy();
  }));
});
