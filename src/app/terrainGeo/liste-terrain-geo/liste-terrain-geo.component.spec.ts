import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTerrainGeoComponent } from './liste-terrain-geo.component';

describe('ListeTerrainGeoComponent', () => {
  let component: ListeTerrainGeoComponent;
  let fixture: ComponentFixture<ListeTerrainGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTerrainGeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTerrainGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
