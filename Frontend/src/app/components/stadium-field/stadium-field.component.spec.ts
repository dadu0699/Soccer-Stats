import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumFieldComponent } from './stadium-field.component';

describe('StadiumFieldComponent', () => {
  let component: StadiumFieldComponent;
  let fixture: ComponentFixture<StadiumFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StadiumFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
