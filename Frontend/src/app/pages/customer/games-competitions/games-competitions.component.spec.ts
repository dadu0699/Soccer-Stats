import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCompetitionsComponent } from './games-competitions.component';

describe('GamesCompetitionsComponent', () => {
  let component: GamesCompetitionsComponent;
  let fixture: ComponentFixture<GamesCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesCompetitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
