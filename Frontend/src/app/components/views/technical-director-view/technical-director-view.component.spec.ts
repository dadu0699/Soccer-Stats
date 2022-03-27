import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalDirectorViewComponent } from './technical-director-view.component';

describe('TechnicalDirectorViewComponent', () => {
  let component: TechnicalDirectorViewComponent;
  let fixture: ComponentFixture<TechnicalDirectorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalDirectorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalDirectorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
