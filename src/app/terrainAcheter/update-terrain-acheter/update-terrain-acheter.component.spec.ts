import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTerrainAcheterComponent } from './update-terrain-acheter.component';

describe('UpdateTerrainAcheterComponent', () => {
  let component: UpdateTerrainAcheterComponent;
  let fixture: ComponentFixture<UpdateTerrainAcheterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTerrainAcheterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTerrainAcheterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
