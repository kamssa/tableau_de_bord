import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTerrainAcheterComponent } from './liste-terrain-acheter.component';

describe('ListeTerrainAcheterComponent', () => {
  let component: ListeTerrainAcheterComponent;
  let fixture: ComponentFixture<ListeTerrainAcheterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTerrainAcheterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTerrainAcheterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
