import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesPerParameterComponent } from './employees-per-parameter.component';

describe('EmployeesPerParameterComponent', () => {
  let component: EmployeesPerParameterComponent;
  let fixture: ComponentFixture<EmployeesPerParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesPerParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesPerParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
