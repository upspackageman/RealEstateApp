import { TestBed } from '@angular/core/testing';

import { ImageBusyService } from './image-busy.service';

describe('ImageBusyService', () => {
  let service: ImageBusyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageBusyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
