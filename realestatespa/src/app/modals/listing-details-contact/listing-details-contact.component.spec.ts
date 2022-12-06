import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDetailsContactComponent } from './listing-details-contact.component';

describe('ListingDetailsContactComponent', () => {
  let component: ListingDetailsContactComponent;
  let fixture: ComponentFixture<ListingDetailsContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingDetailsContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingDetailsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
