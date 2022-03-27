import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceDialogComponent } from './incidence-dialog.component';

describe('IncidenceDialogComponent', () => {
  let component: IncidenceDialogComponent;
  let fixture: ComponentFixture<IncidenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
