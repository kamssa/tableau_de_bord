import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTerrainGeoComponent } from './update-terrain-geo.component';

describe('UpdateTerrainGeoComponent', () => {
  let component: UpdateTerrainGeoComponent;
  let fixture: ComponentFixture<UpdateTerrainGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTerrainGeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTerrainGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
