import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFieldComponent } from './team-field.component';

describe('TeamFieldComponent', () => {
  let component: TeamFieldComponent;
  let fixture: ComponentFixture<TeamFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
