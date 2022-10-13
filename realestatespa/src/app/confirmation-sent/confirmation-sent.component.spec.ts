import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSentComponent } from './confirmation-sent.component';

describe('ConfirmationSentComponent', () => {
  let component: ConfirmationSentComponent;
  let fixture: ComponentFixture<ConfirmationSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
