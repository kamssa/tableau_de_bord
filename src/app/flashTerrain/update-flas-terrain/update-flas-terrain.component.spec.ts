import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlasTerrainComponent } from './update-flas-terrain.component';

describe('UpdateFlasTerrainComponent', () => {
  let component: UpdateFlasTerrainComponent;
  let fixture: ComponentFixture<UpdateFlasTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFlasTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFlasTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
