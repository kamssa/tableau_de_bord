import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerrainGeoComponent } from './add-terrain-geo.component';

describe('AddTerrainGeoComponent', () => {
  let component: AddTerrainGeoComponent;
  let fixture: ComponentFixture<AddTerrainGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTerrainGeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTerrainGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
