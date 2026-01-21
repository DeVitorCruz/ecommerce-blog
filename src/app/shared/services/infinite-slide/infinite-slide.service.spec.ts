import { TestBed } from '@angular/core/testing';

import { InfiniteSlideService } from './infinite-slide.service';

describe('InfiniteSlideService', () => {
  let service: InfiniteSlideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfiniteSlideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
