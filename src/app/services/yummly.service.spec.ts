/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YummlyService } from './yummly.service';

describe('Service: Yummly', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YummlyService]
    });
  });

  it('should ...', inject([YummlyService], (service: YummlyService) => {
    expect(service).toBeTruthy();
  }));
});
