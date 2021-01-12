import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPinsComponent } from './admin-pins.component';

describe('AdminPinsComponent', () => {
  let component: AdminPinsComponent;
  let fixture: ComponentFixture<AdminPinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
