/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActivitylogsService } from './activitylogs.service';

describe('Service: Activitylogs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivitylogsService]
    });
  });

  it('should ...', inject([ActivitylogsService], (service: ActivitylogsService) => {
    expect(service).toBeTruthy();
  }));
});
