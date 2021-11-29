import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderListingsComponent } from './builder-listings.component';

describe('BuilderListingsComponent', () => {
  let component: BuilderListingsComponent;
  let fixture: ComponentFixture<BuilderListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
