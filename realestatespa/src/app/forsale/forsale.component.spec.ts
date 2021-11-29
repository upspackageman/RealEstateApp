import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForsaleComponent } from './forsale.component';

describe('ForsaleComponent', () => {
  let component: ForsaleComponent;
  let fixture: ComponentFixture<ForsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForsaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
