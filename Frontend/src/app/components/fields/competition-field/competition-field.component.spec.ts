import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionFieldComponent } from './competition-field.component';

describe('CompetitionFieldComponent', () => {
  let component: CompetitionFieldComponent;
  let fixture: ComponentFixture<CompetitionFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
