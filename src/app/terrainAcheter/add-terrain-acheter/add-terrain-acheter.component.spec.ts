import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerrainAcheterComponent } from './add-terrain-acheter.component';

describe('AddTerrainAcheterComponent', () => {
  let component: AddTerrainAcheterComponent;
  let fixture: ComponentFixture<AddTerrainAcheterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTerrainAcheterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTerrainAcheterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
