/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoronaAnalyticService } from './coronaAnalytic.service';

describe('Service: CoronaAnalytic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoronaAnalyticService]
    });
  });

  it('should ...', inject([CoronaAnalyticService], (service: CoronaAnalyticService) => {
    expect(service).toBeTruthy();
  }));
});
