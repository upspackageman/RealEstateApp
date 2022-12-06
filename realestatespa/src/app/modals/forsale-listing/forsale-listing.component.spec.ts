import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForsaleListingComponent } from './forsale-listing.component';

describe('ForsaleListingComponent', () => {
  let component: ForsaleListingComponent;
  let fixture: ComponentFixture<ForsaleListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForsaleListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForsaleListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
