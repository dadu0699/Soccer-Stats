import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerParameterComponent } from './users-per-parameter.component';

describe('UsersPerParameterComponent', () => {
  let component: UsersPerParameterComponent;
  let fixture: ComponentFixture<UsersPerParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPerParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPerParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
